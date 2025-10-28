import './style.scss';
import AvatarUI from '../avatar';
import NavigationUI from '../navigation/Navigation';

const index = () => {
    return (
        <div className='header-ui'>
            <div>
                <AvatarUI />
                <nav>
                    <NavigationUI />
                </nav>
            </div>
        </div>
    );
};

export default index;