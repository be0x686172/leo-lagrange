import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import BadgeUI from '../../components/ui/badge';
import { Hourglass } from 'lucide-react';
import { supabaseGetCandidates } from '../../services/supabase/supabaseCandidatesDatabase';

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const [slice, setSlice] = useState([0, 11]);

  useEffect(() => {
    supabaseGetCandidates().then((data) => {
      const transformedData = data.map((candidat) => ({
        id: candidat.id,
        "⏳": <Hourglass color="#c4c4c4ff" size={19} />,
        interviews_date: candidat.application_date,
        name: candidat.name.toUpperCase(),
        firstname: candidat.firstname,
        job: <BadgeUI text={candidat.job} className={"badge-default"} />,
        application_status:
          candidat.application_status === "Candidat à rappeler" ? (
            <BadgeUI text={candidat.application_status} className={"badge-primary"} />
          ) : (
            <BadgeUI text={candidat.application_status} className={"badge-secondary"} />
          ),
      }));
      setCandidates(transformedData);
    });
  }, [candidates]);

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
    <div className="page candidates-page">
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
        data={paginatedCandidates}
        lengthData={lengthData}
        slice={slice}
        changeSlice={changeSlice}
      />
    </div>
  );
};

export default CandidatesPage;

