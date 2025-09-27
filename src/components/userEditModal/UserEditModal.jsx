import './style.scss';
import InputText from '../inputText/InputText';
import Select from '../select/Select';
import { useEffect, useState } from 'react';
import { getProfileById, updateProfile } from '../../services/profilesService';

const UserEditModal = ({id, open, onClose }) => {

    const [profile, setProfile] = useState({
        name: '',
        firstname: '',
        email: '',
        role: '',
        candidates_access: '',
        interviews_access: ''
    });

    useEffect(() => {
        if (id) {
            getProfileById(id)
            .then((data) => setProfile(data))
            .catch(console.error);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((data) => ({ ...data, [name]: value }));
    };

    if (!open) return null
    return (
        <div className='component c-UserEditModal'>
            <img src='icons/x.png' onClick={onClose} />
            <h2>Modifier un utilisateur</h2>
            <form>
                <div className='d-nf'>
                    <InputText label="Nom" name="name" value={profile?.name || ''} onChange={handleChange} />
                    <InputText label="Prénom" name="firstname" value={profile?.firstname || ''} onChange={handleChange} />
                </div>
                <InputText label="E-mail" name="email" value={profile?.email || ''} onChange={handleChange} />
                <InputText label="Mot de passe" name="password" />
                <Select label="Rôle" name="role" choices={['Choisir un rôle', 'Assistant RH', 'Assistante RH', 'Coordinateur', 'Coordinatrice', 'Administrateur', 'Administratrice', 'Aucun']} value={profile?.role || ''} onChange={handleChange} />
                <div className='d-InputCheckbox'>
                    <label>Accès Candidats</label>
                    <input
                        className='i-candidates'
                        type="checkbox"
                        name="candidates_access"
                        checked={profile.candidates_access === "✅"}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                candidates_access: e.target.checked ? "✅" : "❌",
                            }))
                        } 
                    />
                </div>
                <div className='d-InputCheckbox'>
                    <label>Accès Entretiens</label>
                    <input
                        className='i-interviews'
                        type="checkbox"
                        name="interviews_access"
                        checked={profile.interviews_access === "✅"}
                        onChange={(e) =>
                            setProfile((prev) => ({
                                ...prev,
                                interviews_access: e.target.checked ? "✅" : "❌",
                            }))
                        }
                    />
                </div>
                <div className='d-submit'>
                    <button onClick={onClose}>Annuler</button>
                    <button>Confirmer</button>
                </div>
            </form>
        </div>
    );
};

export default UserEditModal;