import './style.scss';
import { LayoutDashboard, ChartArea, User, Headset, LogOut} from 'lucide-react';
import { NavLink } from 'react-router';

const NavigationUI = ({name, url, icon, openHeader}) => {

    const icons = {
        LayoutDashboard: LayoutDashboard,
        ChartArea: ChartArea,
        User: User,
        Headset: Headset,
        LogOut: LogOut
    };

    const IconComponent = icons[icon];

    return (
        <NavLink 
            to={url}
            className={({ isActive }) =>
                isActive ? "navigation-ui nav-active" : "navigation-ui"
            }
        >
            <IconComponent size={30} />
            {openHeader ? <p>{name}</p> : ''}
        </NavLink>
    );
};

export default NavigationUI;