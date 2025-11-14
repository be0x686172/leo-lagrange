import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import BadgeUI from '../../components/ui/badge';
import { supabaseGetCandidates, supabaseUpdateCandidate} from '../../services/supabase/supabaseCandidatesDatabase';

const statusOptions = [
  "À traiter",
  "Présent(e)",
  "Absent(e)"
];

const decisionOptions = [
  "En attente", "Éligible", "Non éligible", "Sélectionné(e)"
];

const InterviewsPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [slice, setSlice] = useState([0, 11]);
  
  const lengthData = filteredCandidates.length;
  const paginatedCandidates = filteredCandidates.slice(slice[0], slice[1]);

  const loadCandidates = async () => {
    const data = await supabaseGetCandidates();
    // Filtrer les candidats AVEC une date d'entretien
    const candidatesWithInterview = data.filter(candidat => candidat.interview_date);
    
    const transformedData = candidatesWithInterview.map(candidat => ({
      id: candidat.id,
      interviews_date: candidat.interview_date,
      interview_time: candidat.interview_time,
      name: candidat.name.toUpperCase(),
      firstname: candidat.firstname,
      job: <BadgeUI text={candidat.job} className={"badge-default"} />,
      interview_status: candidat.interview_status,
      interview_decision: candidat.interview_decision
    }));
    setCandidates(transformedData);
    setFilteredCandidates(transformedData);
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const updateInterviewField = async (id, field, value) => {
    try {
      await supabaseUpdateCandidate({ id, [field]: value });
      setCandidates(prev =>
        prev.map(c => c.id === id ? { ...c, [field]: value } : c)
      );
    } catch (error) {
      console.error(`Erreur lors de la mise à jour de ${field} :`, error);
    }
  };

  const changeSlice = (direction) => {
    setSlice((prev) => {
      let start = prev[0] + direction * 11;
      let end = prev[1] + direction * 11;

      if (start < 0) {
        start = 0;
        end = 11;
      }
      if (end > lengthData) {
        end = lengthData;
        start = Math.max(lengthData - 11, 0);
      }

      return [start, end];
    });
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredCandidates(candidates);
    } else {
      const filtered = candidates.filter(candidate => {
        const searchLower = term.toLowerCase();
        return (
          (candidate.name && candidate.name.toLowerCase().includes(searchLower)) ||
          (candidate.firstname && candidate.firstname.toLowerCase().includes(searchLower))
        );
      });
      setFilteredCandidates(filtered);
    }
    setSlice([0, 11]);
  };

  const handleReset = () => {
    setSlice([0, 11]);
  };

  const tableData = paginatedCandidates.map(c => ({
    ...c,
    interview_status: (
      <select
        value={c.interview_status}
        onChange={(e) => updateInterviewField(c.id, "interview_status", e.target.value)}
        className="border rounded px-2 py-1"
      >
        {statusOptions.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    ),
    interview_decision: (
      <select
        value={c.interview_decision}
        onChange={(e) => updateInterviewField(c.id, "interview_decision", e.target.value)}
        className="border rounded px-2 py-1"
      >
        {decisionOptions.map(decision => (
          <option key={decision} value={decision}>{decision}</option>
        ))}
      </select>
    ),
  }));

  return (
    <div className="page interviews-page">
      <TableContainerFeature
        clickable={true}
        version={"interviews"}
        columns={[
          "Date d'entretien",
          "Heure d'entretien",
          "Nom",
          "Prénom",
          "Poste",
          "Statut d'entretien",
          "Décision",
        ]}
        data={tableData}
        lengthData={lengthData}
        slice={slice}
        changeSlice={changeSlice}
        searchTerm={searchTerm}
        onSearchChange={handleSearch}
        onReset={handleReset}
      />
    </div>
  );
};

export default InterviewsPage;
