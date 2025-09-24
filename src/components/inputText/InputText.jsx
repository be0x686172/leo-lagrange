import './style.scss';

const InputText = ({label, name, value, onChange}) => {
    return (
        <div className='component c-InputText'>
            <label>{label}</label>
            <input className={'i-'+name} type="text" value={value} onChange={onChange} />
        </div>
    );
};

export default InputText;