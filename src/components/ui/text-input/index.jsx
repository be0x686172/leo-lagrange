import './style.scss';

const index = ({label, name, type, placeholder}) => {
    return (
        <div className='text-input'>
            {label ? <label htmlFor={name}>{label}</label> : ''}
            <input 
                type={type} 
                placeholder={placeholder}
            />
        </div>
    );
};

export default index;