import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import candidatesData from './data.json';
import BadgeUI from '../../components/ui/badge';

const CandidatesPage = () => {

    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const transformedData = candidatesData.map(candidat => ({
            "⏳": "⏳",
            ...candidat,
            job: <BadgeUI text={candidat.job} className={"badge-secondary"} />
        }));

        setCandidates(transformedData);
    }, [candidatesData]);

    return (
        <div className="page candidates-page">
            <TableContainerFeature version={"candidates"} columns={["⏳", "Date de candidature", "Nom", "Prénom", "Poste"]} data={candidates} lengthData={Object.keys(candidatesData).length}/>
        </div>
    );
};

export default CandidatesPage;