import './style.scss';
import { supabase } from '../../services/supabaseClient';
import { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import Grid from '../../components/grid/Grid';
import UserEditModal from '../../components/userEditModal/UserEditModal';

const Users = () => {

    const [profiles, setProfiles] = useState(null);
    const [open, setOpen] = useState(false)
    const [rowId, setRowId] = useState(null);

    useEffect(() => {
        const fetchProfiles = async () => {
            const {data: profiles, error} = await supabase.from('profiles').select('*');
            setProfiles(profiles);
        };

        fetchProfiles();
    }, []);

    const columns = [
        {
            field: 'name',
            headerName: 'Nom',
            flex: 1,
            editable: false,
        },
        {
            field: 'firstname',
            headerName: 'Prénom',
            flex: 1,
            editable: false,
        },
        {
            field: 'email',
            headerName: 'Adresse électronique',
            flex: 1.3,
            editable: false,
        },
        {
            field: 'role',
            headerName: 'Rôle',
            flex: 1,
            editable: false,
        },
        {
            field: 'candidates_access',
            headerName: 'Accès candidats',
            flex: 1,
            editable: false,
        },
        {
            field: 'interviews_access',
            headerName: 'Accès entretiens',
            flex: 1,
            editable: false,
        },
        {
            field: 'action',
            headerName: 'Action',
            flex: 0.7,
            editable: false,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', height: '100%' }}>
                    <img
                        src="icons/square_pen.png"
                        alt="Edit"
                        style={{ width: 18, height: 18, cursor: 'pointer' }}
                        onClick={() => handleEdit(params.row.id)}
                    />
                    <img
                        src="icons/trash.png"
                        alt="Delete"
                        style={{ width: 18, height: 18, cursor: 'pointer' }}
                        onClick={() => handleDelete(params.row.id)}
                    />
                </div>
            )
        }
    ];

    function handleEdit(id)
    {
        setOpen(true)
        setRowId(id);
    }

    return (
        <div className='page p-Users'>
            <Header />
            <h1>Base de données des utilisateurs</h1>
            <Grid rows={profiles} columns={columns} />
            <UserEditModal id={rowId} open={open} onClose={() => setOpen(false)} />
        </div>
    );
};

export default Users;