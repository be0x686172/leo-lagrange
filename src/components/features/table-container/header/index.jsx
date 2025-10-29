import './style.scss';
import TextInputWithIcon from '../../../ui/text-input-with-icon';

const HeaderTableContainerFeature = ({ version }) => {
    return (
        <div className='header-table-container-feature'>
            <TextInputWithIcon placeholder={version === "users" ? "Rechercher un utilisateur" : "Rechercher un candidatat"} />
        </div>
    );
};

export default HeaderTableContainerFeature;