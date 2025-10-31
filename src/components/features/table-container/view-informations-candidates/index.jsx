import './style.scss';
import candidatesData from '../../../../pages/candidates/data.json';
import { useEffect } from 'react';

const ViewInformationsCandidatesTableContainerFeature = ({ candidatId }) => {
    return (
        <div className={`view-informations-candidates-table-container-feature ${candidatId == null ? 'view-informations-candidates-table-container-feature-center': ''}`}>
            {candidatId == null ? <p className='no-candidat-id'>Sélectionnez un candidat pour consulter sa fiche</p> : (
                <p>Salut</p>
            )}
        </div>
    );
};

export default ViewInformationsCandidatesTableContainerFeature;