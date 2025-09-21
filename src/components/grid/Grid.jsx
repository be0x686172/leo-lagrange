import './style.scss';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Grid = (props) => {

    function handleEdit(id)
    {
        console.log(id);
    }

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
                <img
                    src="icons/square_pen.png"
                    alt="Edit"
                    style={{ width: 17, height: 17, cursor: 'pointer' }}
                    onClick={() => handleEdit(params.row.id)}
                />
            )
        }
    ];

    return (
        <div className='component c-Grid'>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={props.profiles}
                    columns={columns}
                />
            </Box>
        </div>
    );
};

export default Grid;