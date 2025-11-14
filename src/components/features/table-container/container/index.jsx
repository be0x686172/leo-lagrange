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
      {version === 'users' ? (
        <TableTableContainerFeature 
          clickable={clickable}
          columns={columns}
          data={data}
          version={version}
          lengthData={lengthData}
          slice={slice}
          changeSlice={changeSlice}
        />
      ) : (
        <div>
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
          <ViewInformationsCandidatesTableContainerFeature candidatId={candidatId} />
        </div>
      )}
    </div>
  );
};

export default TableContainerFeature;
