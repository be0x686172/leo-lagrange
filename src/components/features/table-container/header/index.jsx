import './style.scss';
import TextInputWithIcon from '../../../ui/text-input-with-icon';
import ButtonWithIconUI from '../../../ui/button-with-icon';

const HeaderTableContainerFeature = ({ version }) => {
    return (
        <div className='header-table-container-feature'>
            <TextInputWithIcon placeholder={version === "users" ? "Rechercher un utilisateur" : "Rechercher un candidatat"} />
            <ButtonWithIconUI icon={"ListFilter"} text={"Filtres"} className={"button-with-icon-1"} />
        </div>
    );
};

export default HeaderTableContainerFeature;