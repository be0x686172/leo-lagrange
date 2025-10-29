import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect } from 'react';

const SupportPage = () => {

    let navigate = useNavigate();
    
    useEffect(() => {
        supabaseGetSession()
        .then((data) => {
            if (!data.session)
                navigate('/login');
        });
    }, []);

    return (
        <div className='page support-page'>
            <p>Si vous rencontrez un problème technique, contactez le support au +33 6 56 48 54 82.</p>
        </div>
    );
};

export default SupportPage;