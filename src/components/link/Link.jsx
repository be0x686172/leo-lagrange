import './style.scss';
import { NavLink } from 'react-router';

const Link = (props) => {
    return (
        <NavLink to={props.to} className='component cn-Link'>
            <img src={`/icons/${props.icon}.png`} alt="" />
            <p>{props.name}</p>
        </NavLink>
    );
};

export default Link;