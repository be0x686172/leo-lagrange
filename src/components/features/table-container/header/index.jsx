import './style.scss';
import { useState } from 'react';
import TextInputWithIconUI from '../../../ui/text-input-with-icon';
import ButtonUI from '../../../ui/button';
import AddUserModal from '../../../../modals/add-user';

const HeaderTableContainerFeature = ({ version }) => {
    const [openAddUserModal, setOpenAddUserModal] = useState(false);

    return (
        <div className='header-table-container-feature'>
            <TextInputWithIconUI placeholder={version === "users" ? "Rechercher un utilisateur" : "Rechercher un candidat"} />
            {/* <ButtonUI icon={"ListFilter"} text={"Filtres"} className={"button-tertiary"} /> */}
            <ButtonUI text={"Réinitialiser"} className={"button-tertiary"} />
            {version == "users" ? <ButtonUI icon={"CirclePlus"} text={"Ajouter un utilisateur"} className={"button-secondary"} action={() => setOpenAddUserModal(true)} /> : ''}
            {openAddUserModal && <AddUserModal setOpenAddUserModal={setOpenAddUserModal} />}
        </div>
    );
};

export default HeaderTableContainerFeature;