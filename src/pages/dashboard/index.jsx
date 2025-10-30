import { useEffect } from 'react';
import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { Outlet } from 'react-router';
import { NavLink } from 'react-router';

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
            <div>
                <NavLink 
                    to={"/dashboard/candidates"} 
                    className={({ isActive }) =>
                        isActive ? "a-active" : ""
                    }
                > Candidats</NavLink>
                <NavLink 
                    to={"/dashboard/interviews"}
                    className={({ isActive }) =>
                        isActive ? "a-active" : ""
                    }
                >Interviews</NavLink>
            </div>
            <Outlet />
        </div>
    );
};

export default DashboardPage;