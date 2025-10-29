import './style.scss';
import TextInputWithIcon from '../../../ui/text-input-with-icon';
import ButtonWithIconUI from '../../../ui/button-with-icon';

const HeaderTableContainerFeature = ({ version }) => {
    return (
        <div className='header-table-container-feature'>
            <TextInputWithIcon placeholder={version === "users" ? "Rechercher un utilisateur" : "Rechercher un candidatat"} />
            <ButtonWithIconUI icon={"ListFilter"} text={"Filtres"} className={"button-tertiary"} />
            <ButtonWithIconUI text={"Réinitialiser"} className={"button-tertiary"} />
            {version == "users" ? <ButtonWithIconUI icon={"CirclePlus"} text={"Ajouter un utilisateur"} className={"button-secondary"} /> : ''}
        </div>
    );
};

export default HeaderTableContainerFeature;