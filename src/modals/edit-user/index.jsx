import './style.scss';
import { X } from 'lucide-react';
import TextInputUI from '../../components/ui/text-input';
import SelectUI from '../../components/ui/select';
import SwitchUI from '../../components/ui/switch';
import { useState } from 'react';

const EditUserModal = ({setOpenEditUserModal}) => {

    const [candidatesAccess, setCandidatesAccess] = useState(false);
    const [interviewsAccess, setInterviewsAccess] = useState(false);
    
    return (
        <div className='edit-user-modal'>
            <div>
                <X className='cross' onClick={() => {setOpenEditUserModal(false)}}/>
                <h1>Modifier un utilisateur</h1>
                <form>
                    <div>
                        <TextInputUI label="Nom" name={"name"} type={"text"} />
                        <TextInputUI label="Prénom" name={"firstname"} type={"text"} />
                    </div>
                    <TextInputUI label="E-mail" name={"email"} type={"email"} />
                    <TextInputUI label="Mot de passe" name={"password"} type={"password"} />
                    <SelectUI label={"Statut"} name={"role"} />
                    <div>
                        <label>Accès candidats</label>
                        <SwitchUI id={"candidates_access"} isOn={candidatesAccess} handleToggle={() => setCandidatesAccess(!candidatesAccess)}/>
                    </div>
                    <div>
                        <label>Accès entretiens</label>
                        <SwitchUI id={"interviews_access"} isOn={interviewsAccess} handleToggle={() => setInterviewsAccess(!interviewsAccess)}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;