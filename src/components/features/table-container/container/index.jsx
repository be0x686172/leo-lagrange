import './style.scss';
import  HeaderTableContainerFeature from '../header';
import TableTableContainerFeature from '../table';
import ViewInformationsCandidatesTableContainerFeature from '../view-informations-candidates';

const TableContainerFeature = ({ version }) => {
    return (
        <div className='table-container-feature'>
            <HeaderTableContainerFeature version={version} />
            {version === 'users' ? <TableTableContainerFeature /> : (
                <div>
                    <TableTableContainerFeature />
                    <ViewInformationsCandidatesTableContainerFeature />
                </div>
            )}
        </div>
    );
};

export default TableContainerFeature;