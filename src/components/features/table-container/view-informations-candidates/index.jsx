import './style.scss';
import { useEffect, useState } from 'react';
import BadgeUI from '../../../ui/badge';
import ButtonUI from '../../../ui/button';
import { supabaseGetCandidateById } from '../../../../services/supabase/supabaseCandidatesDatabase';

const ViewInformationsCandidatesTableContainerFeature = ({ candidatId }) => {
    const [candidat, setCandidat] = useState({});

    useEffect(() => {
        if (candidatId)
            supabaseGetCandidateById(candidatId).then((data) => {
                if (data) setCandidat({...data[0]});
            })
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
                                    <BadgeUI text={district + 'e'} key={i} className={"badge-default"} />
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
                                {candidat.diploma ? candidat.diploma.map((diploma, i) => (
                                    <BadgeUI text={diploma} key={i} className={"badge-secondary"} />
                                )) : ''}
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
                    <div className='footer'>
                        <ButtonUI text={"Planifier un entretien"} className={"button-primary"}/>
                        <ButtonUI text={"Voir le CV"} className={"button-tertiary"}/>
                    </div>
                    <p className='responsible'>Responsable : <span>{candidat.responsible}</span></p>
                </>
            )}
        </div>
    );
};

export default ViewInformationsCandidatesTableContainerFeature;