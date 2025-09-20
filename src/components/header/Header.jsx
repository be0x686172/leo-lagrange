import './style.scss';
import Link from '../link/Link';

const Header = () => {
    return (
        <div className='component cd-Header'>
            <div className='top'>
                <div className='d-title'>
                    <div className='d-avatar'></div>
                    <h1>Léo Lagrange</h1>
                </div>
                <nav>
                    <Link name="Tableau de bord" to="/dashboard" />
                    <Link name="Statistiques" to="/statistics" />
                    <Link name="Utilisateurs" to="/users" />
                    <Link name="Paramètres" to="/settings" />
                </nav>
            </div>
            <Link name="Déconnexion" />
        </div>
    );
};

export default Header;