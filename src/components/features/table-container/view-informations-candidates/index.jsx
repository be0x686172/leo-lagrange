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
                    <div className='header'>
                        <h1><span>{candidat.name}</span> {candidat.firstname}</h1>
                        <p>{candidat.job}</p>
                    </div>
                    <div className='main'>
                        <div>
                            <p>Horaires</p>
                            <div>
                                {candidat.working_hours ? candidat.working_hours.map((hours, i) => (
                                    <BadgeUI text={hours} key={i} className={"badge-default"} />
                                )) : ''}
                            </div>
                        </div>
                        <div>
                            <p>Arrondissements</p>
                            <div>
                                {candidat.districts ? candidat.districts.map((district, i) => (
                                    <BadgeUI text={district + 'er'} key={i} className={"badge-default"} />
                                )) : ''}
                            </div>
                        </div>
                        <div>
                            <p>Date de candidature :</p>
                            <div>
                                <p>{candidat.application_date}</p>
                            </div>
                        </div>
                        <div>
                            <p>Téléphone :</p>
                            <div>
                                <p>{candidat.phone_number}</p>
                            </div>
                        </div>
                        <div>
                            <p>E-mail :</p>
                            <div>
                                <p>{candidat.email}</p>
                            </div>
                        </div>
                        <div>
                            <p>Diplôme :</p>
                            <div>
                                <p>{candidat.diploma}</p>
                            </div>
                        </div>
                        <div>
                            <p>Expériences avec les enfants :</p>
                            <div>
                                {candidat.children_experience ? <p>Oui</p> : <p>Non</p>}
                            </div>
                        </div>
                        <div className='commentary'>
                            <p>Commentaire :</p>
                            <div>
                                <p>{candidat.commentary}</p>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ViewInformationsCandidatesTableContainerFeature;