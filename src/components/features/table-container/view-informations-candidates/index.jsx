import './style.scss';
import { forwardRef, useEffect, useState } from 'react';
import BadgeUI from '../../../ui/badge';
import ButtonUI from '../../../ui/button';
import { supabaseGetCandidateById } from '../../../../services/supabase/supabaseCandidatesDatabase';
import ScheduleInterviewModal from '../../../../modals/schedule_interview';

const ViewInformationsCandidatesTableContainerFeature = forwardRef(({ candidatId, candidate, setCandidate, handleUpdateField}, ref) => {
    
    const horaires = ["7h20 - 8h30", "11h15 - 13h30", "16h10 - 18H", "16h10 - 18H30"]
    const arrondissements = ["1er", "2e", "3e", "4e", "5e", "6e", "7e", "8e", "9e", "10e", "13e"]
    const [showPopup, setShowPopup] = useState(false)
    const [candidat, setCandidat] = useState({});
    const [openScheduleInterviewModal, setOpenScheduleInterviewModal] = useState(false);

    useEffect(() => {
        if (candidatId)
            supabaseGetCandidateById(candidatId).then((data) => {
                if (data) setCandidat({...data[0]});
            })
    }, [candidatId])

    const handleSave = () => {
        ;["email", "telephone", "provenance", "diplomes", "experience_enfants", "commentaire"].forEach((field) =>
        handleUpdateField(candidate.id_candidat, field, candidate[field]),
        )
        setCandidate({ ...candidate, isEditing: false })

        setShowPopup(true)
        setTimeout(() => setShowPopup(false), 2500) // disparaît après 2,5s
    }

    const handleCancel = () => {
        if (candidate.originalData) {
        // Restaure les anciennes valeurs
        const { originalData } = candidate
        setCandidate({ ...originalData, isEditing: false })
        } else {
        // Cas de sécurité
        setCandidate({ ...candidate, isEditing: false })
        }
    }  

    return (
        <div className={`view-informations-candidates-table-container-feature ${candidatId == null ? 'view-informations-candidates-table-container-feature-center': ''}`}>
            {candidatId == null ? <p className='no-candidat-id'>Sélectionnez un candidat pour consulter sa fiche</p> : (
                <>
                    <div className='header'>
                        <h1><span>{candidat.name}</span> {candidat.firstname}</h1>
                        {!candidate.isEditing && (
                            <button
                            className="edit-toggle-btn"
                            onClick={() => {
                                setCandidate({ ...candidate, isEditing: true, originalData: { ...candidate } })
                            }}
                            >
                            ✏️
                            </button>
                        )}  
                    </div>
                    <p>{candidat.job}</p>
                    <div className='main'>
                        <div>
                            <p>Horaires</p>
                            <div>
                                {candidat.working_hours ? candidat.working_hours.map((hours, i) => (
                                    <BadgeUI text={hours} key={i} className={"badge-default"} />
                                )) : ''}

                                {horaires.map((h, i) => {
                                    const isSelected = candidate.working_hours?.some(
                                    (d) => d.toLowerCase().replace(/\s/g, "") === h.toLowerCase().replace(/\s/g, "")
                                    )

                                    return (
                                    <div
                                        key={i}
                                        className={`horaire-item ${isSelected ? "selected" : ""} ${candidate.isEditing ? "editable" : ""}`}
                                        onClick={() => {
                                        if (!candidate.isEditing) return
                                        let newDispo = [...(candidate.working_hours || [])]
                                        if (isSelected) {
                                            newDispo = newDispo.filter(
                                            (d) => d.toLowerCase().replace(/\s/g, "") !== h.toLowerCase().replace(/\s/g, "")
                                            )
                                        } else {
                                            newDispo.push(h)
                                        }
                                        setCandidate({ ...candidate, working_hours: newDispo })
                                        }}
                                    >
                                        {h}
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                        <div>
                            <p>Arrondissements</p>
                            <div>
                                {candidat.districts ? candidat.districts.map((district, i) => (
                                    <BadgeUI text={district + 'e'} key={i} className={"badge-default"} />
                                )) : ''}

                                {arrondissements.map((arr, i) => {
                                    const isSelected = candidate.districts?.includes(arr)
                                    return (
                                    <div
                                        key={i}
                                        className={`arr-item ${isSelected ? "selected" : ""} ${candidate.isEditing ? "editable" : ""}`}
                                        onClick={() => {
                                        if (!candidate.isEditing) return
                                        let newArr = [...(candidate.districts || [])]
                                        if (isSelected) {
                                            newArr = newArr.filter((a) => a !== arr)
                                        } else {
                                            newArr.push(arr)
                                        }
                                        setCandidate({ ...candidate, districts: newArr })
                                        }}
                                    >
                                        {arr}
                                    </div>
                                    )
                                })}
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

                                {candidate.isEditing ? (
                                    <div className="phone-input-group">
                                        <select className="country-code">
                                            <option value="+33">+33</option>
                                        </select>
                                        <input
                                            type="text"
                                            value={candidate.phone_number || ""}
                                            onChange={(e) => setCandidate({ ...candidate, phone_number: e.target.value })}
                                            placeholder="7 89 69 36 21"
                                        />
                                    </div>
                                    ) : (
                                    <p>{candidate.phone_number}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p>E-mail :</p>
                            <div>
                                <p>{candidat.email}</p>

                                {candidate.isEditing ? (
                                    <input
                                        type="email"
                                        value={candidate.email || ""}
                                        onChange={(e) => setCandidate({ ...candidate, email: e.target.value })}
                                        placeholder="merroune.younsi@gmail.com"
                                    />
                                    ) : (
                                    <p>{candidate.email}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p>Diplôme :</p>
                            <div>
                                {candidat.diploma ? candidat.diploma.map((diploma, i) => (
                                    <BadgeUI text={diploma} key={i} className={"badge-secondary"} />
                                )) : ''}

                                {candidate.isEditing ? (
                                <>
                                    {candidate.diploma?.map((d, i) => (
                                    <div key={i} className="field-item">
                                        <select
                                        value={d || ""}
                                        onChange={(e) => {
                                            const newDiplomes = [...candidate.diploma]
                                            newDiplomes[i] = e.target.value
                                            setCandidate({ ...candidate, diploma: newDiplomes })
                                        }}
                                        >
                                        <option value="">Sélectionner</option>
                                        <option value="B.A.F.A">B.A.F.A</option>
                                        <option value="C.A.P. petite enfance">C.A.P. petite enfance</option>
                                        <option value="C.Q.P. Périscolaire">C.Q.P. Périscolaire</option>
                                        <option value="C.P.J.E.P.S. ou B.A.P.A.A.T.">C.P.J.E.P.S. ou B.A.P.A.A.T.</option>
                                        <option value="B.P.J.E.P.S.">B.P.J.E.P.S.</option>
                                        <option value="Aucun diplôme pour le moment">Aucun diplôme pour le moment</option>
                                        </select>
                                        <button
                                        className="btn-remove"
                                        onClick={() => {
                                            const newDiplomes = candidate.diploma.filter((_, index) => index !== i)
                                            setCandidate({ ...candidate, diploma: newDiplomes })
                                        }}
                                        >
                                        ⊖
                                        </button>
                                    </div>
                                    ))}
                                    <button
                                    className="btn-add"
                                    onClick={() => {
                                        const newDiplomes = [...(candidate.diploma || []), ""]
                                        setCandidate({ ...candidate, diploma: newDiplomes })
                                    }}
                                    >
                                    ⊕
                                    </button>
                                </>
                                ) : (
                                candidate.diploma?.map((d, i) => <p key={i}>{d}</p>)
                                )}
                            </div>
                        </div>
                        <div>
                            <p>Expériences avec les enfants :</p>
                            <div>
                                {candidat.children_experience ? <p>Oui</p> : <p>Non</p>}

                                {candidate.isEditing ? (
                                    <select
                                        value={candidate.children_experience ? "Oui" : "Non"}
                                        onChange={(e) => setCandidate({ ...candidate, children_experience: e.target.value === "Oui" })}
                                    >
                                        <option value="Oui">Oui</option>
                                        <option value="Non">Non</option>
                                    </select>
                                    ) : (
                                    <p>{candidate.children_experience ? "Oui" : "Non"}</p>
                                )}
                            </div>
                        </div>
                        <div className='commentary'>
                            <p>Commentaire :</p>
                            <div>
                                <p>{candidat.commentary}</p>

                                {candidate.isEditing ? (
                                    <textarea
                                        value={candidate.commentary || ""}
                                        onChange={(e) => setCandidate({ ...candidate, commentary: e.target.value })}
                                        placeholder="Écris ici tes notes sur le candidat..."
                                    />
                                    ) : (
                                    <div className="comment-display">
                                        {candidate.commentary || "Aucune note enregistrée."}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div>
                            <p>Date et heure d'entretien :</p>
                            <div>
                                <p>{candidat.interview_date} {candidat.interview_time}</p>
                            </div>
                        </div>
                    </div>
                    <div className='footer'>

                        {!candidate.isEditing && (
                            <div className="edit-actions">
                                <ButtonUI text={"Planifier un entretien"} className={"button-primary"} action={() => { setOpenScheduleInterviewModal(true); }}/>
                                <ButtonUI text={"Voir le CV"} className={"button-tertiary"}/>
                            </div>
                        )};

                        {candidate.isEditing ? (
                            <div className="edit-actions">
                                <ButtonUI text={"Enregistrer"} className={"button-primary"} action={() => { handleSave(true); }}/>
                                <ButtonUI text={"Annuler"} className={"button-tertiary"} action={() => { handleCancel(true); }}/>
                            <button className="btn-save" onClick={handleSave}>
                                Enregistrer
                            </button>
                            <button className="btn-cancel" onClick={handleCancel}>
                                Annuler
                            </button>
                            </div>
                        ) : null}

                        {showPopup && (
                            <div className="popup-success">
                                ✅ Modifications de la fiche candidat enregistrées avec succès
                            </div>
                        )}

                    </div>
                    <p className='responsible'>Responsable : <span>{candidat.responsible}</span></p>
                    {openScheduleInterviewModal ? <ScheduleInterviewModal candidatId={candidatId} setOpenScheduleInterviewModal={setOpenScheduleInterviewModal} /> : ''}
                </>
            )}
        </div>
    );
});

export default ViewInformationsCandidatesTableContainerFeature;