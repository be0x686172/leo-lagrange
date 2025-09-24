import './style.scss';

const InputText = ({label, name}) => {
    return (
        <div className='component c-InputText'>
            <label>{label}</label>
            <input className={'i-'+name} type="text" />
        </div>
    );
};

export default InputText;