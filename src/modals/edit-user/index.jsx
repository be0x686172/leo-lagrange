import './style.scss';
import { X } from 'lucide-react';

const EditUserModal = ({setOpenEditUserModal}) => {
    return (
        <div className='edit-user-modal'>
            <div>
                <X className='cross' onClick={setOpenEditUserModal(false)}/>
                <h1>Modifier un utilisateur</h1>
            </div>
        </div>
    );
};

export default EditUserModal;