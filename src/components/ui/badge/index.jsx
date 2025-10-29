import './style.scss';

const BadgeUI = ({text, className}) => {
    return (
        <div className={`badge-ui ${className}`}>
            <p>{text}</p>
        </div>
    );
};

export default BadgeUI;