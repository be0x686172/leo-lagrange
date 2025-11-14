import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import BadgeUI from '../../components/ui/badge';
import { getPosteColor } from '../../constants/colors';
import { Hourglass } from 'lucide-react';
import { supabaseGetCandidates, supabaseUpdateCandidate } from '../../services/supabase/supabaseCandidatesDatabase';
import { supabase } from '../../services/supabase/supabaseClient';
import SelectUI from '../../components/ui/select';

// colors imported from src/constants/colors.js

const statusOptions = [
  "À rappeler",
  "RDV à prendre",
  "intéressé"
];

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    application_status: ''
  });
  const [slice, setSlice] = useState([0, 11]);
  const [loading, setLoading] = useState(true);

  const loadCandidates = async () => {
    setLoading(true);
    const data = await supabaseGetCandidates();
    // Filtrer les candidats SANS date d'entretien
    const candidatesWithoutInterview = data.filter(candidat => !candidat.interview_date);

    const transform = (candidat) => ({
      id: candidat.id,
      "⏳": <Hourglass color="#c4c4c4ff" size={19} />,
      interviews_date: candidat.application_date,
      name: candidat.name ? candidat.name.toUpperCase() : '-',
      firstname: candidat.firstname,
      job: (
        <BadgeUI
          text={candidat.job}
          className="badge-default"
          color={getPosteColor(candidat.job)}
        />
      ),
      application_status: candidat.application_status,
    });

    const transformedData = candidatesWithoutInterview.map(transform);
    setCandidates(transformedData);
    setFilteredCandidates(transformedData);
    setLoading(false);
  };

  useEffect(() => {
    loadCandidates();

    const channel = supabase
      .channel('public:candidates')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'candidates' }, (payload) => {
        const updated = payload.new;
        setCandidates(prev => prev.map(item => {
          if (item.id !== updated.id) return item;
          return {
            ...item,
            interviews_date: updated.application_date,
            name: updated.name ? updated.name.toUpperCase() : item.name,
            firstname: updated.firstname,
            job: (
              <BadgeUI text={updated.job} className={'badge-default'} color={getPosteColor(updated.job)} />
            ),
            application_status: updated.application_status,
          };
        }));
        setFilteredCandidates(prev => prev.map(item => item.id === updated.id ? ({
          ...item,
          interviews_date: updated.application_date,
          name: updated.name ? updated.name.toUpperCase() : item.name,
          firstname: updated.firstname,
          job: (
            <BadgeUI text={updated.job} className={'badge-default'} color={getPosteColor(updated.job)} />
          ),
          application_status: updated.application_status,
        }) : item));
      })
      .subscribe();

    return () => {
      try { channel.unsubscribe(); } catch { /* ignore */ }
    };
  }, []);

  const updateStatus = async (id, newStatus) => {
    // Optimistic update
    setCandidates(prev => prev.map(c => c.id === id ? { ...c, application_status: newStatus } : c));
    setFilteredCandidates(prev => prev.map(c => c.id === id ? { ...c, application_status: newStatus } : c));

    try {
      const res = await supabaseUpdateCandidate({ id, application_status: newStatus });
      if (!res) console.error('Update did not return data for candidate', id);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
    }
  };

  const lengthData = filteredCandidates.length;
  const paginatedCandidates = filteredCandidates.slice(slice[0], slice[1]);

  const changeSlice = (direction) => {
    setSlice(prev => {
      let start = prev[0] + direction * 11;
      let end = prev[1] + direction * 11;
      if (start < 0) { start = 0; end = 11; }
      if (end > lengthData) { end = lengthData; start = Math.max(lengthData - 11, 0); }
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
    if (activeFilters.application_status) {
      result = result.filter(candidate => candidate.application_status === activeFilters.application_status);
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
    application_status: (
      <SelectUI
        value={c.application_status}
        options={statusOptions}
        onValueChange={(v) => updateStatus(c.id, v)}
        className={'table-select'}
        compact={true}
      />
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
          searchTerm={searchTerm}
          onSearchChange={handleSearch}
          onReset={handleReset}
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />
      )}
    </div>
  );
};

export default CandidatesPage;
