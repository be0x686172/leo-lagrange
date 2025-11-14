import './style.scss';
import { useState } from 'react';
import TextInputWithIconUI from '../../../ui/text-input-with-icon';
import ButtonUI from '../../../ui/button';
import AddUserModal from '../../../../modals/add-user';
import FiltersModal from '../../../../modals/filters';

const HeaderTableContainerFeature = ({ version, searchTerm, onSearchChange, filters, onFiltersChange }) => {
    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const [openFiltersModal, setOpenFiltersModal] = useState(false);

    return (
        <div className='header-table-container-feature'>
            <TextInputWithIconUI 
                placeholder={version === "users" ? "Rechercher un utilisateur" : version === "candidates" ? "Rechercher un candidat" : "Rechercher un entretien"} 
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
            />
            {(version === 'candidates' || version === 'interviews') && (
                <ButtonUI icon={"ListFilter"} text={"Filtres"} className={"button-tertiary"} action={() => setOpenFiltersModal(true)} />
            )}
            {version == "users" ? <ButtonUI icon={"CirclePlus"} text={"Ajouter un utilisateur"} className={"button-secondary"} action={() => setOpenAddUserModal(true)} /> : ''}
            {openAddUserModal && <AddUserModal setOpenAddUserModal={setOpenAddUserModal} />}
            <FiltersModal 
                version={version}
                isOpen={openFiltersModal}
                onClose={() => setOpenFiltersModal(false)}
                filters={filters}
                onFiltersChange={onFiltersChange}
            />
        </div>
    );
};

export default HeaderTableContainerFeature;