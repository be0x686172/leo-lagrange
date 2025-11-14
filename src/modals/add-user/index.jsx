import './style.scss';
import { useState } from 'react';
import { X } from 'lucide-react';
import TextInputUI from '../../components/ui/text-input';
import ButtonUI from '../../components/ui/button';
import { supabaseAddUser } from '../../services/supabase/supabaseUsersDatabase';
import { supabaseAddUserAuth } from '../../services/supabase/supabaseUsersAuth';

const AddUserModal = ({setOpenAddUserModal}) => {
    
    const [user, setUser] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleForm(event) {
        event.preventDefault();
        setError(null);
        setSuccess(false);
        setLoading(true);

        supabaseAddUserAuth(user).then((response) => {
            console.log('Response:', response);
            
            if (response && response.user && response.user.id) {
                const newUser = {
                    id: response.user.id,
                    email: user.email
                };
                supabaseAddUser(newUser).then(() => {
                    setSuccess(true);
                    setLoading(false);
                    setOpenAddUserModal(false)
                }).catch((err) => {
                    console.error('Error adding user to DB:', err);
                    setError("Erreur lors de l'ajout de l'utilisateur à la base de données");
                    setLoading(false);
                });
            } else {
                console.error('Invalid response structure:', response);
                setError("Erreur : réponse invalide du serveur");
                setLoading(false);
                setOpenAddUserModal(false)
            }
        }).catch((err) => {
            console.error('Error creating user:', err);
            setError(err?.message || "Erreur lors de la création du compte");
            setLoading(false);
        });
    }
    
    return (
        <div className='add-user-modal'>
            <div>
                <X className='cross' onClick={() => {setOpenAddUserModal(false)}}/>
                <h1>Ajouter un utilisateur</h1>
                <form>
                    {error && <div style={{ color: 'var(--common-interactive-color-danger)', fontSize: 'var(--font-size-s)', marginBottom: '10px' }}>{error}</div>}
                    {success && <div style={{ color: 'var(--common-interactive-color-success)', fontSize: 'var(--font-size-s)', marginBottom: '10px' }}>Utilisateur ajouté avec succès !</div>}
                    <TextInputUI label="E-mail" name={"email"} type={"email"} value={user?.email} action={setUser}/>
                    <TextInputUI label="Mot de passe" name={"password"} value={user?.password} type={"password"} action={setUser} />
                    <div>
                        <ButtonUI text={loading ? "En cours..." : "Confirmer"} className={"button-primary"} action={(event) => handleForm(event)} disabled={loading}/>
                        <ButtonUI text={"Annuler"} className={"button-secondary"} action={() => {setOpenAddUserModal(false)}} disabled={loading} />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUserModal;
