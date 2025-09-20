import './style.scss';
import Link from '../link/Link';

const Header = () => {
    return (
        <div className='component c-Header'>
            <div className='top'>
                <div className='d-title'>
                    <div className='d-avatar'></div>
                    <h1>Léo Lagrange</h1>
                </div>
                <nav>
                    <Link name="Tableau de bord" to="/dashboard" icon="dashboard" />
                    <Link name="Statistiques" to="/statistics" icon="chart" />
                    <Link name="Utilisateurs" to="/users" icon="user" />
                    <Link name="Paramètres" to="/settings" icon="settings" />
                </nav>
            </div>
            <Link name="Déconnexion" to="/logout" icon="logout" />
        </div>
    );
};

export default Header;