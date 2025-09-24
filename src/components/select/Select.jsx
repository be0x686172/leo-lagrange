import './style.scss';

const Select = ({ label, name, choices }) => {
    return (
        <div className='component c-Select'>
            <label>{label}</label>
            <select className={'s-'+name} name={name}>
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