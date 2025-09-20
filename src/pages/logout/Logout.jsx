import { useEffect } from 'react';
import { supabase } from '../../services/supabaseClient';
import { useNavigate } from 'react-router';

const Logout = () => {
    let navigate = useNavigate();

    useEffect(() => {
        const doSignOut = async () => {
            const { error } = await supabase.auth.signOut();
            if (!error) {
                navigate("/login");
            } else
                console.error("Erreur lors de la déconnexion :", error.message);
        };
        
        doSignOut();
    }, [navigate]);
};

export default Logout;