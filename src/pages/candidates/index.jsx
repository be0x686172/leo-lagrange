import { useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import candidatesData from './data.json';

const CandidatesPage = () => {

    const [users, setUsers] = useState([]);

    return (
        <div className="page candidates-page">
            <TableContainerFeature version={"candidates"} columns={["Date de candidature", "Nom", "Prénom", "Poste"]} data={candidatesData} lengthData={Object.keys(candidatesData).length}/>
        </div>
    );
};

export default CandidatesPage;