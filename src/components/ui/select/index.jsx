import './style.scss';

const SelectUI = ({ label, name }) => {
    return (
        <div className='select-ui'>
            <label htmlFor={name}>{label}</label>
            <select name={name} id={name}>
                <option value="">Coordinateur</option>
                <option value="">Assistant RH</option>
                <option value="">Administrateur</option>
            </select>
        </div>
    );
};

export default SelectUI;