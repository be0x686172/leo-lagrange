import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import usersData from './data.json';
import { Pen } from 'lucide-react';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() => {
    
        supabaseGetSession()
        .then((data) => {
            if (!data.session)
                navigate('/login');
        });

        const transformedData = usersData.map(user => ({
            ...user,
            candidates_access: user.candidates_access ? 'oui' : 'non',
            interviews_access: user.interviews_access ? 'oui' : 'non',
            action: <Pen size={17} style={{cursor: "pointer", display: "block"}} onClick={() => console.log('ok')} />  // On "transforme" la clé en JSX
        }));

        setUsers(transformedData);
    }, []);

    return (
        <div className='page users-page'>
            <TableContainerFeature version={"users"}   columns={["Nom", "Prénom", "E-mail", "Statut", "Accès candidats", "Accès entretiens", "Action"]} data={users} lengthData={Object.keys(usersData).length} />
        </div>
    );
};

export default UsersPage;