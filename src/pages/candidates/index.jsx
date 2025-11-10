import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import BadgeUI from '../../components/ui/badge';
import { Hourglass } from 'lucide-react';
import { supabaseGetCandidates, supabaseUpdateCandidate } from '../../services/supabase/supabaseCandidatesDatabase';

const posteColor = {
  'animateur jeune h/f': { background: '#FFFFEA', color: '#BB6C02' },
  'animatrice périscolaire': { background: '#E0F2FE', color: '#0369A1' },
  'animateur/animatrice enfance': { background: '#D9F99D', color: '#365314' },
  'formateur/trice animateur/trice': { background: '#F6F4FE', color: '#8E67EB' },
  'fonction support': { background: '#FEE2E2', color: '#991B1B' },
  'psychomotricienne': { background: '#FEF3C7', color: '#92400E' },
};

const getPosteColor = (job) => {
  if (!job) return { background: '#e5e7eb', color: '#374151' };
  const key = job.trim().toLowerCase();
  return posteColor[key] || { background: '#e5e7eb', color: '#374151' };
};

const statusOptions = [
  "À rappeler",
  "RDV à prendre",
  "intéressé"
];

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [slice, setSlice] = useState([0, 11]);
  const [loading, setLoading] = useState(true);

  const loadCandidates = async () => {
    setLoading(true);
    const data = await supabaseGetCandidates();
    const transformedData = data.map((candidat) => ({
      id: candidat.id,
      "⏳": <Hourglass color="#c4c4c4ff" size={19} />,
      interviews_date: candidat.application_date,
      name: candidat.name.toUpperCase(),
      firstname: candidat.firstname,
      job: (
        <BadgeUI
          text={candidat.job}
          className="px-3 py-1 rounded-full font-medium"
          style={getPosteColor(candidat.job)}
        />
      ),
      application_status: candidat.application_status,
    }));
    setCandidates(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    loadCandidates();
  }, []);

  const updateStatus = async (id, newStatus) => {
    try {
      await supabaseUpdateCandidate({ id, application_status: newStatus });
      setCandidates(prev =>
        prev.map(c => c.id === id ? { ...c, application_status: newStatus } : c)
      );
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  };

  const lengthData = candidates.length;
  const paginatedCandidates = candidates.slice(slice[0], slice[1]);

  const changeSlice = (direction) => {
    setSlice(prev => {
      let start = prev[0] + direction * 11;
      let end = prev[1] + direction * 11;
      if (start < 0) { start = 0; end = 11; }
      if (end > lengthData) { end = lengthData; start = Math.max(lengthData - 11, 0); }
      return [start, end];
    });
  };

  const tableData = paginatedCandidates.map(c => ({
    ...c,
    application_status: (
      <select
        value={c.application_status}
        onChange={(e) => updateStatus(c.id, e.target.value)}
        className="border rounded px-2 py-1"
      >
        {statusOptions.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>
    ),
  }));

  return (
    <div className="page candidates-page">
      {loading ? <p>Chargement...</p> : (
        <TableContainerFeature
          clickable={true}
          version={"candidates"}
          columns={[
            <Hourglass color="#c4c4c4ff" size={19} />,
            "Date de candidature",
            "Nom",
            "Prénom",
            "Poste",
            "Statut",
          ]}
          data={tableData}
          lengthData={lengthData}
          slice={slice}
          changeSlice={changeSlice}
        />
      )}
    </div>
  );
};

export default CandidatesPage;
