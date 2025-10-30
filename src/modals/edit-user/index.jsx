import './style.scss';
import { X } from 'lucide-react';
import TextInputUI from '../../components/ui/text-input';
import SelectUI from '../../components/ui/select';
import SwitchUI from '../../components/ui/switch';
import { useEffect, useState } from 'react';
import ButtonUI from '../../components/ui/button';
import { supabaseGetUserById } from '../../services/supabase/supabaseUsersDatabase';
import { supabaseUpdateUser } from '../../services/supabase/supabaseUsersDatabase';

const EditUserModal = ({userId, setOpenEditUserModal}) => {
    
    const [user, setUser] = useState(null);
    const [candidatesAccess, setCandidatesAccess] = useState(false);
    const [interviewsAccess, setInterviewsAccess] = useState(false);

    useEffect(() => {
        supabaseGetUserById(userId).then((data) => {
            setUser({
                ...data[0]
            });
        })
    }, [userId]);

    function handleForm(event) {
        event.preventDefault();
        supabaseUpdateUser(user).then((success) => {
            console.log(success);
        });
    }
    
    return (
        <div className='edit-user-modal'>
            <div>
                <X className='cross' onClick={() => {setOpenEditUserModal(false)}}/>
                <h1>Modifier un utilisateur</h1>
                <form>
                    <div>
                        <TextInputUI label="Nom" name={"name"} type={"text"} value={user?.name} action={setUser} />
                        <TextInputUI label="Prénom" name={"firstname"} type={"text"} value={user?.firstname} action={setUser} />
                    </div>
                    <TextInputUI label="E-mail" name={"email"} type={"email"} value={user?.email} action={setUser}/>
                    <TextInputUI label="Mot de passe" name={"password"} value={user?.password} type={"password"} action={setUser} />
                    <SelectUI label={"Statut"} name={"role"} value={user?.role} action={setUser} />
                    {user ? (
                        <div>
                            <label>Accès candidats</label>
                            <SwitchUI id={"candidates_access"} value={user.candidates_access} handleToggle={() => setUser(prev => ({ ...prev, candidates_access: !prev.candidates_access })) }/>
                        </div>
                    ) : ''}
                    {user ? (
                        <div>
                            <label>Accès entretiens</label>
                            <SwitchUI id={"interviews_access"} value={user.interviews_access} handleToggle={() => setUser(prev => ({ ...prev, interviews_access: !prev.interviews_access }))}/>
                        </div>
                    ) : ''}
                    <div>
                        <ButtonUI text={"Confirmer"} className={"button-primary"} action={(event) => handleForm(event)}/>
                        <ButtonUI text={"Supprimer l'utilisateur"} className={"button-secondary"}/>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUserModal;