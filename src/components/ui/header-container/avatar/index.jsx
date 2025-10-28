import './style.scss';

const index = ({ openHeader }) => {
    return (
        <div className='avatar-ui'>
            <div><p><span>M</span><span>B</span></p></div>
            {openHeader ? <p><span>Mouad</span> <br /> <span>Behar</span></p> : ''}
        </div>
    );
};

export default index;