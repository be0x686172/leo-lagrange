import './style.scss';
import { ListFilter } from 'lucide-react';

const ButtonWithIconUI = ({ icon, text, className }) => {

    const icons = {
        ListFilter: ListFilter
    };

    const IconComponent = icons[icon];

    return (
        <div className={`button-with-icon ${className}`}>
            {icon ? <IconComponent size={13} /> : ''}
            <p>{text}</p>
        </div>
    );
};

export default ButtonWithIconUI;