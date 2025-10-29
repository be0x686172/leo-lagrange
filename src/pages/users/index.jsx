import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import usersData from './data.json';
import { Ellipsis } from 'lucide-react';

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
            <TableContainerFeature version={"users"}   columns={["Nom", "Prénom", "E-mail", "Statut", "Accès candidats", "Accès entretiens", "Action"]} data={usersData} lengthData={Object.keys(usersData).length} />
        </div>
    );
};

export default UsersPage;