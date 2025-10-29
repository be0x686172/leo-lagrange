import './style.scss';

const TableTableContainerFeature = ({ version, columns, data, lengthData }) => {
    return (
        <table className='table-table-container-feature'>
            <thead>
                <tr>
                    {columns.map((column, i) => (
                        <th key={i}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row, i) => (
                    <tr key={row.id}>
                        {Object.entries(row).filter(([key]) => key !== "id").map(([key, cell], j) => (
                            <td key={j}>{cell}</td>
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