import './style.scss';
import InputText from '../inputText/InputText';

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
                <div className='component c-Input'>
                    <label>Rôle</label>
                    <input className='i-role' type="text" />
                </div>
                <div>
                    <label>Accès Candidats</label>
                    <input className='i-candidates' type="checkbox" />
                </div>
                <div>
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