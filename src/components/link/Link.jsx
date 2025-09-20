import './style.scss';
import { NavLink } from 'react-router';

const Link = (props) => {
    return (
        <NavLink to={props.to} className={({isActive}) => `component c-Link ${isActive ? 'c-Link-Active' : ''}`}>
            <img src={`/icons/${props.icon}.png`} alt="" />
            <p>{props.name}</p>
        </NavLink>
    );
};

export default Link;