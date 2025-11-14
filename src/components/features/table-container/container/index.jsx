import './style.scss';
import HeaderTableContainerFeature from '../header';
import TableTableContainerFeature from '../table';
import ViewInformationsCandidatesTableContainerFeature from '../view-informations-candidates';
import { useState } from 'react';

const TableContainerFeature = ({ clickable, version, columns, data, lengthData, slice, changeSlice, searchTerm, onSearchChange, onReset, filters, onFiltersChange }) => {
  const [candidatId, setCandidatId] = useState(null);

  return (
    <div className='table-container-feature'>
      <HeaderTableContainerFeature
        version={version}
        searchTerm={searchTerm}
        onSearchChange={onSearchChange}
        onReset={onReset}
        filters={filters}
        onFiltersChange={onFiltersChange}
      />
      <div className="table-section">
      {version === 'users' ? (
        <div className="table-responsive">
          <TableTableContainerFeature 
            clickable={clickable}
            columns={columns}
            data={data}
            version={version}
            lengthData={lengthData}
            slice={slice}
            changeSlice={changeSlice}
          />
        </div>
      ) : (
        <div className="table-and-detail">
          <div className="table-responsive">
            <TableTableContainerFeature 
              clickable={clickable}
              columns={columns}
              data={data}
              version={version}
              lengthData={lengthData}
              setCandidatId={setCandidatId}
              slice={slice}
              changeSlice={changeSlice}
            />
          </div>
          <ViewInformationsCandidatesTableContainerFeature candidatId={candidatId} />
        </div>
      )}
      </div>
    </div>
  );
};

export default TableContainerFeature;
