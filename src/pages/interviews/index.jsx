import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import BadgeUI from '../../components/ui/badge';
import SelectUI from '../../components/ui/select';
import { getPosteColor } from '../../constants/colors';
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
  const [filters, setFilters] = useState({
    interview_status: '',
    interview_decision: ''
  });
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
      job: <BadgeUI text={candidat.job} className={"badge-default"} color={getPosteColor(candidat.job)} />,
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
    applyFilters(term, filters);
    setSlice([0, 11]);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
    applyFilters(searchTerm, newFilters);
    setSlice([0, 11]);
  };

  const applyFilters = (term, activeFilters) => {
    let result = candidates;

    // Appliquer les filtres
    if (activeFilters.interview_status) {
      result = result.filter(candidate => candidate.interview_status === activeFilters.interview_status);
    }

    if (activeFilters.interview_decision) {
      result = result.filter(candidate => candidate.interview_decision === activeFilters.interview_decision);
    }

    // Appliquer la recherche
    if (term === '') {
      setFilteredCandidates(result);
    } else {
      const filtered = result.filter(candidate => {
        const searchLower = term.toLowerCase();
        return (
          (candidate.name && candidate.name.toLowerCase().includes(searchLower)) ||
          (candidate.firstname && candidate.firstname.toLowerCase().includes(searchLower))
        );
      });
      setFilteredCandidates(filtered);
    }
  };

  const handleReset = () => {
    setSlice([0, 11]);
  };

  const tableData = paginatedCandidates.map(c => ({
    ...c,
    interview_status: (
      <SelectUI
        value={c.interview_status}
        options={statusOptions}
        onValueChange={(v) => updateInterviewField(c.id, "interview_status", v)}
        className={'table-select'}
        compact={true}
      />
    ),
    interview_decision: (
      <SelectUI
        value={c.interview_decision}
        options={decisionOptions}
        onValueChange={(v) => updateInterviewField(c.id, "interview_decision", v)}
        className={'table-select'}
        compact={true}
      />
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
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
    </div>
  );
};

export default InterviewsPage;
