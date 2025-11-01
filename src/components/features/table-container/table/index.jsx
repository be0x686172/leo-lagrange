import './style.scss';

const TableTableContainerFeature = ({ clickable, version, columns, data, lengthData, setCandidatId }) => {
    return (
        <table className='table-table-container-feature'>
            <thead>
                <tr>
                    {columns.map((column, i) => (
                        <th className={version != "users" ? 'little-first' : ''} key={i}>{column}</th>
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
                </tr>
            </tfoot>
        </table>
    );
};

export default TableTableContainerFeature;