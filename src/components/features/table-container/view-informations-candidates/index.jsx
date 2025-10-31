import './style.scss';
import candidatesData from '../../../../pages/candidates/data.json';
import { useEffect, useState } from 'react';
import BadgeUI from '../../../ui/badge';

const ViewInformationsCandidatesTableContainerFeature = ({ candidatId }) => {
    
    const [candidat, setCandidat] = useState({});

    useEffect(() => {
        const found = candidatesData.find((candidat) => candidat.id == candidatId);
        if (found) setCandidat({...found});
    }, [candidatId])

    return (
        <div className={`view-informations-candidates-table-container-feature ${candidatId == null ? 'view-informations-candidates-table-container-feature-center': ''}`}>
            {candidatId == null ? <p className='no-candidat-id'>Sélectionnez un candidat pour consulter sa fiche</p> : (
                <>
                    <div>
                        <h1><span>{candidat.name}</span> {candidat.firstname}</h1>
                        <p>{candidat.job}</p>
                    </div>
                    <div>
                        <div>
                            <p>Horaires</p>
                            {candidat.working_hours ? candidat.working_hours.map((hours) => {
                                {console.log(hours)}
                            }) : ''}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewInformationsCandidatesTableContainerFeature;