import './style.scss';

const SwitchUI = ({id, isOn, handleToggle}) => {
    return (
        <>
            <input
                onClick={handleToggle ? handleToggle : () => {}}
                className="react-switch-checkbox"
                id={id}
                type="checkbox"
            />
            <label
                style={{ background: isOn ? '#06D6A0' : '#D4D4D4' }}
                className="react-switch-label"
                htmlFor={id}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default SwitchUI;