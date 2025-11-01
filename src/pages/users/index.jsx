import './style.scss';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect, useState } from 'react';
import TableContainerFeature from '../../components/features/table-container/container';
import { Pen } from 'lucide-react';
import BadgeUI from '../../components/ui/badge';
import { supabaseGetUsers } from '../../services/supabase/supabaseUsersDatabase';
import EditUserModal from '../../modals/edit-user';

const UsersPage = () => {

    const [users, setUsers] = useState([]);
    let navigate = useNavigate();
    const [openEditUserModal, setOpenEditUserModal] = useState(false);
    const [userId, setUserId] = useState(null);
    const lengthData = users.length;
    const [slice, setSlice] = useState([0, lengthData > 10 ? 10 : lengthData]);
    
    useEffect(() => {
        supabaseGetSession()
        .then((data) => {
            if (!data.session)
                navigate('/login');
        });

        supabaseGetUsers().then((data) => {
            const transformedData = data.map(user => ({
                ...user,
                name: user.name ? user.name.toUpperCase() : '-',
                firstname: user.firstname ? user.firstname : '-',
                role: user.role ? <BadgeUI text={user.role} className={"badge-default"} /> : <BadgeUI text={"Aucun statut"} className={"badge-default"} />,
                candidates_access: user.candidates_access ? <BadgeUI text={"OUI"} className={"badge-secondary"} /> : <BadgeUI text={"NON"} className={"badge-primary-false"} />,
                interviews_access: user.interviews_access ? <BadgeUI text={"OUI"} className={"badge-secondary"} /> : <BadgeUI text={"NON"} className={"badge-primary-false"} />,
                action: <Pen size={17} className='pen' style={{cursor: "pointer", display: "block"}} onClick={() => { setUserId(user.id); setOpenEditUserModal(true); }} />  // On "transforme" la clé en JSX
            }));

            setUsers(transformedData);

            setSlice([0, transformedData.length > 10 ? 10 : transformedData.length]);
        })
    }, [users, slice]);

    // Fonction pour changer de tranche
    const changeSlice = (direction) => {
        setSlice(prev => {
            let start = prev[0] + direction * 10;
            let end = prev[1] + direction * 10;

            // Limiter à 0 minimum
            if (start < 0) {
                start = 0;
                end = 10;
            }

            // Limiter à la longueur max
            if (end > lengthData) {
                end = lengthData;
                start = Math.max(lengthData - 10, 0); // au cas où moins de 10 restant
            }

            return [start, end];
        });
    }

    return (
        <div className='page users-page'>
            <TableContainerFeature clickable={false} version={"users"} columns={["E-mail", "Nom", "Prénom", "Statut", "Accès candidats", "Accès entretiens", "Action"]} data={users} lengthData={Object.keys(users).length} slice={slice} changeSlice={changeSlice} />
            {openEditUserModal ? <EditUserModal userId={userId} setOpenEditUserModal={setOpenEditUserModal} /> : ''}
        </div>
    );
};

export default UsersPage;