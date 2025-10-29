import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect } from 'react';

const UsersPage = () => {

    let navigate = useNavigate();
    
    useEffect(() => {
        supabaseGetSession()
        .then((data) => {
            if (!data.session)
                navigate('/login');
        });
    }, []);

    return (
        <div className='page users-page'>
            Users
        </div>
    );
};

export default UsersPage;