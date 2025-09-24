import './style.scss';
import InputText from '../inputText/InputText';
import Select from '../select/Select';

const UserEditModal = ({id, open, onClose }) => {
    if (!open) return null
    return (
        <div className='component c-UserEditModal'>
            <img src='icons/x.png' onClick={onClose} />
            <h2>Modifier un utilisateur</h2>
            <form>
                <div className='d-nf'>
                    <InputText label="Nom" name="name" />
                    <InputText label="Prénom" name="firstname" />
                </div>
                <InputText label="E-mail" name="email" />
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