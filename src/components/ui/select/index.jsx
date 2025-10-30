import './style.scss';

const SelectUI = ({ label, name, value, action }) => {
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
                    <option value="Coordinateur">Coordinateur</option>
                    <option value="Assitant RH">Assistant RH</option>
                    <option value="Administrateur">Administrateur</option>
            </select>
        </div>
    );
};

export default SelectUI;