import './style.scss';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TableTableContainerFeature = ({ clickable, version, columns, data, lengthData, setCandidatId, slice, changeSlice }) => {
    return (
        <table className='table-table-container-feature'>
            <thead>
                <tr>
                    {columns.map((column, i) => (
                        <th className={version == "candidates" ? 'little-first' : ''} key={i}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={row.id} onClick={setCandidatId ? () => {setCandidatId(row.id)} : () => {}}>
                        {Object.entries(row).filter(([key]) => key !== "id").map(([key, cell], j) => (
                            <td key={j} className={clickable ? "clickable": ''}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                <tr>
                    <th>{lengthData} {version == "users" ? "utilisateurs" : "candidats"}</th>
                    <th><ChevronLeft size={21} onClick={() => changeSlice(-1)} /> <p>{slice[0] + 1} - {slice[1]}</p> <ChevronRight size={21} onClick={() => changeSlice(1)} /></th>
                </tr>
            </tfoot>
        </table>
    );
};

export default TableTableContainerFeature;