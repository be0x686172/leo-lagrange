import './style.scss';

const SelectUI = ({ label, name, value, options, action, onValueChange, className = '', compact = false }) => {
    const handleChange = (e) => {
        const val = e.target.value;
        if (typeof onValueChange === 'function') return onValueChange(val);
        if (typeof action === 'function') return action(prev => ({ ...prev, [name]: val }));
    };

    return (
        <div className={`select-ui ${className} ${compact ? 'compact' : ''}`}>
            {label ? <label htmlFor={name}>{label}</label> : null}
            <select 
                name={name} 
                id={name}
                value={value || ''}
                onChange={handleChange}
                aria-label={label || name}
            >
                {options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default SelectUI;