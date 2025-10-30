import { useEffect } from 'react';
import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { Outlet } from 'react-router';

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
        <div className='page dashboard-page'>
            <p>Dashboard</p>
            <Outlet context={"test"}/>
        </div>
    );
};

export default DashboardPage;