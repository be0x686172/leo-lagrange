import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import candidatesData from './data.json';
import BadgeUI from '../../components/ui/badge';
import { Hourglass } from 'lucide-react';
import SelectUI from "../../components/ui/select";

const CandidatesPage = () => {

    const [candidates, setCandidates] = useState([]);
    const [slice, setSlice] = useState([0, 11]);

    useEffect(() => {
        const transformedData = candidatesData.map(candidat => ({
            id: candidat.id,
            "⏳": <Hourglass color='#c4c4c4ff' size={19} />,
            interviews_date: candidat.application_date,
            name: candidat.name.toUpperCase(),
            firstname: candidat.firstname,
            job: <BadgeUI text={candidat.job} className={"badge-default"} />,
            application_status: candidat.application_status == "Candidat à rappeler" ? <BadgeUI text={candidat.application_status} className={"badge-primary"} /> : <BadgeUI text={candidat.application_status} className={"badge-secondary"} />
        }));

        setCandidates(transformedData.slice(slice[0], slice[1]));
    }, [candidatesData]);

    return (
        <div className="page candidates-page">
            <TableContainerFeature clickable={true} version={"candidates"} columns={[<Hourglass color='#c4c4c4ff' size={19}/>, "Date de candidature", "Nom", "Prénom", "Poste", "Statut"]} data={candidates} lengthData={Object.keys(candidatesData).length} slice={slice} setSlice={setSlice} />
        </div>
    );
};

export default CandidatesPage;