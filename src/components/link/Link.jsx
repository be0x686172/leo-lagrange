import './style.scss';
import { NavLink } from 'react-router';

const Link = (props) => {
    return (
        <NavLink to={props.to} className='component cd-Links'>
            <p>{props.name}</p>
        </NavLink>
    );
};

export default Link;