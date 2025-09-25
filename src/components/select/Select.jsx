import './style.scss';

const Select = ({ label, name, choices, value, onChange }) => {
    return (
        <div className='component c-Select'>
            <label>{label}</label>
            <select className={'s-'+name} name={name} value={value} onChange={onChange}>
                {choices.map((choice, index) => (
                    <option key={index} value={choice}>
                        {choice}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Select;