import './style.scss';
import { useEffect, useState } from 'react';
import BadgeUI from '../../../ui/badge';
import ButtonUI from '../../../ui/button';
import SelectUI from '../../../ui/select';
import { supabaseGetCandidateById } from '../../../../services/supabase/supabaseCandidatesDatabase';
import { supabaseUpdateCandidate } from '../../../../services/supabase/supabaseCandidatesDatabase';
import ScheduleInterviewModal from '../../../../modals/schedule_interview';

const ViewInformationsCandidatesTableContainerFeature = ({ candidatId }) => {
    
    const [candidat, setCandidat] = useState({});
    const [openScheduleInterviewModal, setOpenScheduleInterviewModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [editData, setEditData] = useState({});
    const AVAILABLE_HOURS = ["7h20 - 8h30", "11h15 - 13h30", "16h10 - 18h", "16h10 - 18h30"];
    const AVAILABLE_DISTRICTS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "13"];
    const EXPERIENCE_OPTIONS = ["Oui", "Non"];
    const AVAILABLE_DIPLOMAS = ["B.A.F.A", "C.A.P. petite enfance", "C.Q.P. Périscolaire", "C.P.J.E.P.S. ou B.A.P.A.A.T.", "B.P.J.E.P.S.", "Aucun diplôme pour le moment"];

    useEffect(() => {
        if (candidatId) {
            supabaseGetCandidateById(candidatId).then((data) => {
                if (data) {
                    setCandidat({...data[0]});
                    setEditData({...data[0]});
                }
            })
        }
    }, [candidatId])

    const toggleEditMode = () => {
        setEditMode(!editMode);
        if (!editMode) setEditData({...candidat});
    };

    const handleChange = (field, value) => {
        setEditData(prev => ({ ...prev, [field]: value }));
    };

    const handleAddDiploma = () => {
        setEditData(prev => ({ ...prev, diploma: [...(prev.diploma || []), ""] }));
    };

    const handleDiplomaChange = (index, value) => {
        const newDiplomas = [...(editData.diploma || [])];
        newDiplomas[index] = value;
        handleChange('diploma', newDiplomas);
    };

    const handleSave = async () => {
        try {
            const updatedData = await supabaseUpdateCandidate(editData);
            if (updatedData) {
                setCandidat({ ...editData });
                setEditMode(false);
            } else {
                console.error("Erreur lors de la sauvegarde");
            }
        } catch (error) {
            console.error("Erreur lors de la sauvegarde :", error);
        }
    };

    const handleCancel = () => {
        setEditData({...candidat});
        setEditMode(false);
    };

    const renderEditableCheckboxes = (options, selectedValues, field) => {
        return options.map(option => (
            <label key={option} style={{ marginRight: "8px" }}>
                <input
                    type="checkbox"
                    checked={selectedValues?.includes(option)}
                    onChange={(e) => {
                        let newValues = selectedValues || [];
                        if (e.target.checked) newValues = [...newValues, option];
                        else newValues = newValues.filter(val => val !== option);
                        handleChange(field, newValues);
                    }}
                />
                {option}
            </label>
        ));
    };

    return (
        <div className={`view-informations-candidates-table-container-feature ${candidatId == null ? 'view-informations-candidates-table-container-feature-center': ''}`}>
            {candidatId == null ? <p className='no-candidat-id'>Sélectionnez un candidat pour consulter sa fiche</p> : (
                <>
                    <div className='header' style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0" }}>
                        <div>
                            <h1 style={{ margin: 0 }}>
                                <span>{candidat.name}</span> {candidat.firstname}
                            </h1>
                            <p>{candidat.job}</p>
                        </div>

                        <button 
                            onClick={toggleEditMode} 
                            style={{
                                background: "none",
                                border: "none",
                                cursor: "pointer",
                                fontSize: "18px"
                            }}
                        >
                            ✏️
                        </button>
                    </div>

                    <div className='main'>
                        <div>
                            <p>Horaires</p>
                            <div className="tags-container">
                                {AVAILABLE_HOURS.map((hours, i) => {
                                const isSelected = editMode
                                    ? editData.working_hours?.includes(hours)
                                    : candidat.working_hours?.includes(hours);

                                const handleClick = () => {
                                    if (!editMode) return; 
                                    let newHours = editData.working_hours || [];
                                    if (newHours.includes(hours)) {
                                    newHours = newHours.filter(h => h !== hours);
                                    } else {
                                    newHours = [...newHours, hours];
                                    }
                                    handleChange("working_hours", newHours);
                                };

                                return (
                                    <BadgeUI
                                        key={i}
                                        text={hours}
                                        className={isSelected ? 'badge-selected' : 'badge-default'}
                                        color={isSelected ? { background: 'var(--common-interactive-color-primary)', color: '#fff' } : undefined}
                                        style={{ cursor: editMode ? 'pointer' : 'default', userSelect: 'none' }}
                                        onClick={editMode ? handleClick : undefined}
                                    />
                                );
                                })}
                            </div>
                        </div>
                        <div>
                            <p>Arrondissements</p>
                            <div className="tags-container">
                            {AVAILABLE_DISTRICTS.map((district, i) => {
                            const selectedDistricts = editMode ? editData.districts || [] : candidat.districts || [];
                            const isSelected = selectedDistricts.includes(district);

                            const handleClick = () => {
                                if (!editMode) return;
                                const current = editData.districts || [];
                                const newDistricts = current.includes(district)
                                ? current.filter(d => d !== district)
                                : [...current, district];
                                handleChange("districts", newDistricts);
                            };

                            return (
                                <BadgeUI
                                  key={i}
                                  text={`${district}e`}
                                  className={isSelected ? 'badge-selected' : 'badge-default'}
                                  color={isSelected ? { background: 'var(--common-interactive-color-primary)', color: '#fff' } : undefined}
                                  style={{ cursor: editMode ? 'pointer' : 'default', userSelect: 'none' }}
                                  onClick={editMode ? handleClick : undefined}
                                />
                            );
                            })}
                        </div>
                        </div>
                        <div>
                            <p>Téléphone :</p>
                            <div>
                                {editMode ? (
                                    <input type="text" value={editData.phone_number || ''} onChange={e => handleChange('phone_number', e.target.value)} />
                                ) : (
                                    <p>{candidat.phone_number}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p>E-mail :</p>
                            <div>
                                {editMode ? (
                                    <input type="text" value={editData.email || ''} onChange={e => handleChange('email', e.target.value)} />
                                ) : (
                                    <p>{candidat.email}</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p>Diplôme :</p>
                            <div>
                                {editMode ? (
                                    <>
                                                {editData.diploma?.map((d, i) => (
                                                    <div key={i} className="diploma-row">
                                                        <SelectUI
                                                            value={d}
                                                            options={AVAILABLE_DIPLOMAS}
                                                            onValueChange={(v) => handleDiplomaChange(i, v)}
                                                            compact={true}
                                                        />
                                                        <ButtonUI text={'Supprimer'} className={'button-tertiary'} action={() => {
                                                            const newDiplomas = [...editData.diploma];
                                                            newDiplomas.splice(i, 1);
                                                            handleChange('diploma', newDiplomas);
                                                        }} />
                                                    </div>
                                                ))}
                                                <ButtonUI text="Ajouter diplôme" className="button-secondary" action={handleAddDiploma}/>
                                    </>
                                ) : (
                                    candidat.diploma?.map((diploma, i) => (
                                        <BadgeUI text={diploma} key={i} className={"badge-secondary"} />
                                    ))
                                )}
                            </div>
                        </div>
                        <div>
                            <p>Expériences avec les enfants :</p>
                            <div>
                                {editMode ? (
                                    <select value={editData.children_experience ? "Oui" : "Non"} onChange={e => handleChange('children_experience', e.target.value === "Oui")}>
                                        {EXPERIENCE_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                    </select>
                                ) : (
                                    <p>{candidat.children_experience ? "Oui" : "Non"}</p>
                                )}
                            </div>
                        </div>
                        <div className='commentary'>
                            <p>Commentaire :</p>
                            <div>
                                {editMode ? (
                                    <textarea value={editData.commentary || ''} onChange={e => handleChange('commentary', e.target.value)} />
                                ) : (
                                    <p>{candidat.commentary}</p>
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
                        {editMode ? (
                            <>
                                <ButtonUI text={"Confirmer"} className={"button-primary"} action={handleSave} />
                                <ButtonUI text={"Annuler"} className={"button-secondary"} action={handleCancel} />
                            </>
                        ) : (
                            <>
                                <ButtonUI text={"Planifier un entretien"} className={"button-primary"} action={() => setOpenScheduleInterviewModal(true)} />
                                <ButtonUI text={"Voir le CV"} className={"button-tertiary"} />
                            </>
                        )}
                    </div>

                    <p className='responsible'>Responsable : <span>{candidat.responsible}</span></p>
                    {openScheduleInterviewModal && <ScheduleInterviewModal candidatId={candidatId} setOpenScheduleInterviewModal={setOpenScheduleInterviewModal} />}
                </>
            )}
        </div>
    );
};

export default ViewInformationsCandidatesTableContainerFeature;

