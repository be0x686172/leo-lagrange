import './style.scss';
import AvatarUI from '../avatar';
import NavigationUI from '../navigation';
import { useState } from 'react';

const HeaderUI = () => {

    const [openHeader, setOpenHeader] = useState(false);

    const handleClick = (e) => {
        // Si le clic est sur un élément NavigationUI, on ne fait rien
        if (e.target.closest('.navigation-ui')) return;

        // Sinon, toggle openHeader
        setOpenHeader(prev => !prev);
    };
    
    return (
        <div className='header-container-ui' onClick={(e) => handleClick(e)}>
            <div>
                <AvatarUI openHeader={openHeader} />
                <nav>
                    <NavigationUI url={"/dashboard/candidates"} name={"Dashboard"} icon={"LayoutDashboard"} openHeader={openHeader}/>
                    <NavigationUI url={"/statistics"} name={"Statistiques"} icon={"ChartArea"} openHeader={openHeader} />
                    <NavigationUI url={"/users"} name={"Utilisateurs"} icon={"User"} openHeader={openHeader} />
                    <NavigationUI url={"/support"} name={"Support"} icon={"Headset"} openHeader={openHeader} />
                </nav>
            </div>
            <NavigationUI url={"/logout"} name={"Déconnexion"} icon={"LogOut"} openHeader={openHeader} />
        </div>
    );
};

export default HeaderUI;