import './style.scss';
import InputText from '../inputText/InputText';
import Select from '../select/Select';
import { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../services/userService';

const UserEditModal = ({id, open, onClose }) => {

    const [user, setUser] = useState({
        name: '',
        firstname: '',
        email: '',
        role: '',
        candidates_access: '',
        interviews_access: ''
    });

    useEffect(() => {
        if (id) {
            getUserById(id)
            .then((data) => setUser(data))
            .catch(console.error);
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({ ...prev, [name]: value }));
    };

    if (!open) return null
    return (
        <div className='component c-UserEditModal'>
            <img src='icons/x.png' onClick={onClose} />
            <h2>Modifier un utilisateur</h2>
            <form>
                <div className='d-nf'>
                    <InputText label="Nom" name="name" value={user?.name || ''} onChange={handleChange} />
                    <InputText label="Prénom" name="firstname" value={user?.firstname || ''} onChange={handleChange} />
                </div>
                <InputText label="E-mail" name="email" value={user?.email || ''} onChange={handleChange} />
                <InputText label="Mot de passe" name="password" />
                <Select label="Rôle" name="role" choices={['Choisir un rôle', 'Assistant RH', 'Coordinateur', 'Administrateur', 'Aucun']} />
                <div className='d-InputCheckbox'>
                    <label>Accès Candidats</label>
                    <input className='i-candidates' type="checkbox" />
                </div>
                <div className='d-InputCheckbox'>
                    <label>Accès Entretiens</label>
                    <input className='i-interviews' type="checkbox" />
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