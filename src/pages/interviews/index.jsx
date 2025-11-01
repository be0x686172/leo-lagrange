import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import BadgeUI from '../../components/ui/badge';
import { Hourglass } from 'lucide-react';
import { supabaseGetCandidates } from '../../services/supabase/supabaseCandidatesDatabase'

const InterviewsPage = () => {

    const [candidates, setCandidates] = useState([]);
    const lengthData = candidates.length;
    const [slice, setSlice] = useState([0, 11]);

    useEffect(() => {
        supabaseGetCandidates().then((data) => {
                const transformedData = data.map(candidat => ({
                id: candidat.id,
                interviews_date: candidat.application_date,
                name: candidat.name.toUpperCase(),
                firstname: candidat.firstname,
                job: <BadgeUI text={candidat.job} className={"badge-default"} />,
                interview_status: <BadgeUI text={candidat.interview_status} className={"badge-primary"} />,
                interview_decision: <BadgeUI text={candidat.interview_decision} className={"badge-secondary"} />
            }));

            setCandidates(transformedData.slice(slice[0], slice[1]));
        })
    }, [candidates, slice]);

    // Fonction pour changer de tranche
    const changeSlice = (direction) => {
        setSlice(prev => {
            let start = prev[0] + direction * 10;
            let end = prev[1] + direction * 10;

            // Limiter à 0 minimum
            if (start < 0) {
                start = 0;
                end = 10;
            }

            // Limiter à la longueur max
            if (end > lengthData) {
                end = lengthData;
                start = Math.max(lengthData - 10, 0); // au cas où moins de 10 restant
            }

            return [start, end];
        });
    }

    return (
        <div className="page interviews-page">
            <TableContainerFeature clickable={true} version={"interviews"} columns={["Date d'entretien", "Nom", "Prénom", "Poste", "Statut d'entretien", "Décision"]} data={candidates} lengthData={lengthData} slice={slice} changeSlice={changeSlice} />
        </div>
    );
};

export default InterviewsPage;