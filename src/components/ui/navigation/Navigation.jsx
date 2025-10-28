import './style.scss';
import { LayoutDashboard, ChartArea, User, Headset, LogOut} from 'lucide-react';
import { NavLink } from 'react-router';

const Navigation = ({name, url, icon}) => {

    const icons = {
        LayoutDashboard: LayoutDashboard,
        ChartArea: ChartArea,
        User: User,
        Headset: Headset,
        LogOut: LogOut
    };

    const IconComponent = icons[icon];

    return (
        <NavLink className='navigation-ui' to={url}>
            <IconComponent size={28}/>
            <p>{name}</p>
        </NavLink>
    );
};

export default Navigation;