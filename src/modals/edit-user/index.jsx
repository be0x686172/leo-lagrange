import './style.scss';
import { X } from 'lucide-react';
import TextInputUI from '../../components/ui/text-input';

const EditUserModal = ({setOpenEditUserModal}) => {
    return (
        <div className='edit-user-modal'>
            <div>
                <X className='cross' onClick={() => setOpenEditUserModal(false)}/>
                <h1>Modifier un utilisateur</h1>
                <form>
                    <div>
                        <TextInputUI label="Nom" name={"name"} type={"text"} />
                        <TextInputUI label="Prénom" name={"firstname"} type={"text"} />
                    </div>
                    <TextInputUI label="E-mail" name={"email"} type={"email"} />
                    <TextInputUI label="Mot de passe" name={"password"} type={"password"} />
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;