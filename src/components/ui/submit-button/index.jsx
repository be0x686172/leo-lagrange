import './style.scss';

const SubmitButtonUI = ({type, text, className, textSize}) => {
    return (
        <button 
            className={`submit-button-ui ${className}`}
            style={{
                fontSize: textSize === 's' ? '14px' : '12px'
            }}
            type={type}
        >
            {text}
        </button>
    );
};

export default SubmitButtonUI;