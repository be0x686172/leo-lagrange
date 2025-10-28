import { useEffect } from 'react';
import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import HeaderUI from '../../components/ui/header';

const DashboardPage = () => {

    let navigate = useNavigate();

    useEffect(() => {
        supabaseGetSession()
        .then((data) => {
            if (!data.session)
                navigate('/login');
        });
    }, []);

    return (
        <div className='dashboard-page'>
            <HeaderUI />
            <p>Salut</p>
        </div>
    );
};

export default DashboardPage;