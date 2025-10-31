import './style.scss';
import  HeaderTableContainerFeature from '../header';
import TableTableContainerFeature from '../table';
import ViewInformationsCandidatesTableContainerFeature from '../view-informations-candidates';
import { useState } from 'react';

const TableContainerFeature = ({ clickable, version, columns, data, lengthData }) => {
    
    const [candidatId, setCandidatId] = useState(null);

    return (
        <div className='table-container-feature'>
            <HeaderTableContainerFeature version={version} />
            {version === 'users' ? <TableTableContainerFeature clickable={clickable} columns={columns} data={data} version={version} lengthData={lengthData}/> : (
                <div>
                    <TableTableContainerFeature clickable={clickable} columns={columns} data={data} version={version} lengthData={lengthData} setCandidatId={setCandidatId} />
                    <ViewInformationsCandidatesTableContainerFeature candidatId={candidatId} />
                </div>
            )}
        </div>
    );
};

export default TableContainerFeature;