import './style.scss';
import  HeaderTableContainerFeature from '../header';
import TableTableContainerFeature from '../table';
import ViewInformationsCandidatesTableContainerFeature from '../view-informations-candidates';

const TableContainerFeature = ({ clickable, version, columns, data, lengthData }) => {
    return (
        <div className='table-container-feature'>
            <HeaderTableContainerFeature version={version} />
            {version === 'users' ? <TableTableContainerFeature clickable={clickable} columns={columns} data={data} version={version} lengthData={lengthData}/> : (
                <div>
                    <TableTableContainerFeature clickable={clickable} columns={columns} data={data} version={version} lengthData={lengthData}/>
                    <ViewInformationsCandidatesTableContainerFeature />
                </div>
            )}
        </div>
    );
};

export default TableContainerFeature;