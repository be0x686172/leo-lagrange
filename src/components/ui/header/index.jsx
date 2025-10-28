import './style.scss';
import AvatarUI from '../avatar';
import NavigationUI from '../navigation/Navigation';

const index = () => {
    return (
        <div className='header-ui'>
            <div>
                <AvatarUI />
                <nav>
                    <NavigationUI url={"/dashboard"} name={"Dashboard"} icon={"LayoutDashboard"}/>
                    <NavigationUI url={"/statistics"} name={"Statistiques"} icon={"ChartArea"}/>
                    <NavigationUI url={"/users"} name={"Utilisateurs"} icon={"User"}/>
                    <NavigationUI url={"/support"} name={"Support"} icon={"Headset"}/>
                </nav>
            </div>
            <NavigationUI url={"/logout"} name={"Déconnexion"} icon={"LogOut"}/>
        </div>
    );
};

export default index;