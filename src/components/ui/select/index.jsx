import './style.scss';

const SelectUI = ({ label, name, value, options, action }) => {
    return (
        <div className='select-ui'>
            <label htmlFor={name}>{label}</label>
            <select 
                name={name} 
                id={name}
                value={value || ''}
                onChange={(e) =>
                    action(prev => ({ ...prev, [name]: e.target.value }))
                }
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