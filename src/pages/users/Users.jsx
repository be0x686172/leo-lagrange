import './style.scss';
import { supabase } from '../../services/supabaseClient';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Grid from '../../components/grid/Grid';

const Users = () => {

    const [profiles, setProfiles] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            const {data: profiles, error} = await supabase.from('profiles').select('*');
            setProfiles(profiles);
        };

        fetchProfiles();
    }, []);

    return (
        <div className='page p-Users'>
            <Header />
            <Grid profiles={profiles} />
        </div>
    );
};

export default Users;