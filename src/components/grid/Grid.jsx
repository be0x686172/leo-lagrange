import './style.scss';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const Grid = (props) => {
    return (
        <div className='component c-Grid'>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    rows={props.rows}
                    columns={props.columns}
                    sx={{
                        '.MuiDataGrid-columnSeparator': {
                            display: 'none', // supprime le petit séparateur de colonne
                        },
                    }}
                />
            </Box>
        </div>
    );
};

export default Grid;