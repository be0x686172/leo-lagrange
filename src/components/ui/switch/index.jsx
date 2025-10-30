import './style.scss';

const SwitchUI = ({id, value, handleToggle}) => {
    return (
        <>
            <input
                onChange={handleToggle ? handleToggle : () => {}}
                checked={value}
                className="react-switch-checkbox"
                id={id}
                type="checkbox"
            />
            <label
                style={{ background: value ? '#06D6A0' : '#D4D4D4' }}
                className="react-switch-label"
                htmlFor={id}
            >
                <span className={`react-switch-button`} />
            </label>
        </>
    );
};

export default SwitchUI;