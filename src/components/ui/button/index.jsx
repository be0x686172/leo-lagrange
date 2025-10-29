import './style.scss';
import { ListFilter, CirclePlus } from 'lucide-react';

const ButtonUI = ({ icon, text, className, action }) => {

    const icons = {
        ListFilter: ListFilter,
        CirclePlus: CirclePlus
    };

    const IconComponent = icons[icon];

    return (
        <button className={`button-ui ${className}`} onClick={action ? action : () => {}}>
            {icon ? <IconComponent size={13} /> : ''}
            <p>{text}</p>
        </button>
    );
};

export default ButtonUI;