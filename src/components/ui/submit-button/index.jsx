import './style.scss';

const index = ({text, className, textSize}) => {
    return (
        <button 
            className={`submit-button ${className}`}
            style={{
                fontSize: textSize === 's' ? '14px' : '12px'
            }}
        >
            {text}
        </button>
    );
};

export default index;