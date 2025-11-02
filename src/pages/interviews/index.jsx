import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import BadgeUI from '../../components/ui/badge';
import { supabaseGetCandidates } from '../../services/supabase/supabaseCandidatesDatabase';

const InterviewsPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [slice, setSlice] = useState([0, 11]);

  useEffect(() => {
    supabaseGetCandidates().then((data) => {
      const transformedData = data.map((candidat) => ({
        id: candidat.id,
        interviews_date: candidat.interview_date,
        interview_time: candidat.interview_time,
        name: candidat.name.toUpperCase(),
        firstname: candidat.firstname,
        job: <BadgeUI text={candidat.job} className={"badge-default"} />,
        interview_status: <BadgeUI text={candidat.interview_status} className={"badge-primary"} />,
        interview_decision: <BadgeUI text={candidat.interview_decision} className={"badge-secondary"} />,
      }));
      setCandidates(transformedData);
    });
  }, [candidates]); // pas de dépendance pour éviter la boucle

  const lengthData = candidates.length;
  const paginatedCandidates = candidates.slice(slice[0], slice[1]);

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
        data={paginatedCandidates}
        lengthData={lengthData}
        slice={slice}
        changeSlice={changeSlice}
      />
    </div>
  );
};

export default InterviewsPage;
