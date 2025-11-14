import './style.scss';

const BadgeUI = ({ text, className = '', style: styleProp = {}, color }) => {
    const inlineStyle = color
        ? {
              backgroundColor: color.background,
              color: color.color,
              borderColor: color.border || 'transparent',
              ...styleProp,
          }
        : styleProp;

    return (
        <button type="button" className={`badge-ui ${className}`} style={inlineStyle} aria-label={`poste ${text}`}>
            <p>{text}</p>
        </button>
    );
};

export default BadgeUI;