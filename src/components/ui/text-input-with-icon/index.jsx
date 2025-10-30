import './style.scss';
import { Search } from 'lucide-react';

const TextInputWithIconUI = ({ placeholder }) => {
    return (
        <div className='text-input-with-icon'>
            <Search size={18} color='#737373' />
            <input placeholder={placeholder}/>
        </div>
    );
};

export default TextInputWithIconUI;