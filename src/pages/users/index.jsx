import './style.scss';
import { data, useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import usersData from './data.json';
import { Pen } from 'lucide-react';
import BadgeUI from '../../components/ui/badge';
import { supabaseGetUsers } from '../../services/supabase/supabaseDatabase';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    let navigate = useNavigate();
    
    useEffect(() => {
    
        supabaseGetSession()
        .then((data) => {
            if (!data.session)
                navigate('/login');
        });

        supabaseGetUsers().then((data) => {
            const transformedData = data.map(user => ({
                ...user,
                name: user.name ? user.name : '-',
                firstname: user.firstname ? user.firstname : '-',
                role: user.role ? <BadgeUI text={user.role} className={"badge-default"} /> : <BadgeUI text={"Aucun statut"} className={"badge-default"} />,
                candidates_access: user.candidates_access ? <BadgeUI text={"OUI"} className={"badge-secondary"} /> : <BadgeUI text={"NON"} className={"badge-primary-false"} />,
                interviews_access: user.interviews_access ? <BadgeUI text={"OUI"} className={"badge-secondary"} /> : <BadgeUI text={"NON"} className={"badge-primary-false"} />,
                action: <Pen size={17} style={{cursor: "pointer", display: "block"}} onClick={() => console.log(user.id)} />  // On "transforme" la clé en JSX
            }));

            setUsers(transformedData);
        })
    }, [data]);

    return (
        <div className='page users-page'>
            <TableContainerFeature version={"users"} columns={["E-mail", "Nom", "Prénom", "Statut", "Accès candidats", "Accès entretiens", "Action"]} data={users} lengthData={Object.keys(usersData).length} />
        </div>
    );
};

export default UsersPage;