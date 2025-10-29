import { useEffect } from 'react';
import { supabaseSignOut } from '../../services/supabase/supabaseAuthentication';
import { useNavigate } from 'react-router';

const LogoutPage = () => {

    let navigate = useNavigate();

    useEffect(() => {
        supabaseSignOut()
        .then(() => {
            navigate('/login');
        });
    })

    return (
        <div className="page logout-page">
            Logout
        </div>
    );
};

export default LogoutPage;