import './style.scss';
import TextInputWithIcon from '../../../ui/text-input-with-icon';
import ButtonUI from '../../../ui/button';

const HeaderTableContainerFeature = ({ version }) => {
    return (
        <div className='header-table-container-feature'>
            <TextInputWithIcon placeholder={version === "users" ? "Rechercher un utilisateur" : "Rechercher un candidatat"} />
            <ButtonUI icon={"ListFilter"} text={"Filtres"} className={"button-tertiary"} />
            <ButtonUI text={"Réinitialiser"} className={"button-tertiary"} />
            {version == "users" ? <ButtonUI icon={"CirclePlus"} text={"Ajouter un utilisateur"} className={"button-secondary"} /> : ''}
        </div>
    );
};

export default HeaderTableContainerFeature;