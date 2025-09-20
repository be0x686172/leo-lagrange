import './style.scss';
import { supabase } from '../../services/supabaseClient';
import { useEffect } from 'react';
import Header from '../../components/header/Header';
import Grid from '../../components/grid/Grid';

const Users = () => {

    useEffect(() => {
        const fetchUsers = async () => {
            // Récupérer la session actuelle
            const { data: { session } } = await supabase.auth.getSession();
            const accessToken = session?.access_token;

            // Fetch vers ta fonction Edge
            const res = await fetch('https://gjpaydokzdgjyvtpvwku.supabase.co/functions/v1/listAllUsers', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
            const data = await res.json();
            console.log(data);
        };

        fetchUsers();
    }, []);

    return (
        <div className='page p-Users'>
            <Header />
            Grid
        </div>
    );
};

export default Users;