import './style.scss';
import { supabase } from '../../services/supabaseClient';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../components/header/Header';

const Dashboard = () => {

    let navigate = useNavigate();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (!session)
                navigate("/login");
        })
    }, [navigate])

    return (
        <div className="page p-Dashboard">
            <Header />
            <p>Dashboard</p>
        </div>
    );
};

export default Dashboard;