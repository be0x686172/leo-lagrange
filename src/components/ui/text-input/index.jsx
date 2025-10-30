import './style.scss';

const TextInputUI = ({label, name, type, placeholder, value, action}) => {
    return (
        <div className='text-input-ui'>
            {label ? <label htmlFor={name}>{label}</label> : ''}
            <input 
                type={type}
                name={name}
                placeholder={placeholder}
                value={value || ''}
                onChange={action ? e => action(prev => ({...prev, [name]: e.target.value})) : () => {}}
            />
        </div>
    );
};

export default TextInputUI;