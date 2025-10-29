import './style.scss';
import { ListFilter, CirclePlus } from 'lucide-react';

const ButtonWithIconUI = ({ icon, text, className, action }) => {

    const icons = {
        ListFilter: ListFilter,
        CirclePlus: CirclePlus
    };

    const IconComponent = icons[icon];

    return (
        <button className={`button-with-icon ${className}`} onClick={action ? action : () => {}}>
            {icon ? <IconComponent size={13} /> : ''}
            <p>{text}</p>
        </button>
    );
};

export default ButtonWithIconUI;