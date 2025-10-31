import './style.scss';
import candidatesData from '../../../../pages/candidates/data.json';
import { useEffect, useState } from 'react';

const ViewInformationsCandidatesTableContainerFeature = ({ candidatId }) => {
    
    const [candidat, setCandidat] = useState({});

    useEffect(() => {
        const found = candidatesData.find((candidat) => candidat.id == candidatId);
        if (found) setCandidat({...found});
    }, [candidatId])

    return (
        <div className={`view-informations-candidates-table-container-feature ${candidatId == null ? 'view-informations-candidates-table-container-feature-center': ''}`}>
            {candidatId == null ? <p className='no-candidat-id'>Sélectionnez un candidat pour consulter sa fiche</p> : (
                <h2><span>{candidat.name}</span> {candidat.firstname}</h2>
            )}
        </div>
    );
};

export default ViewInformationsCandidatesTableContainerFeature;