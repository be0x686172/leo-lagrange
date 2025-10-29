import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';

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
            <TableContainerFeature />
        </div>
    );
};

export default UsersPage;