import './style.scss';

const ScheduleInterviewModal = () => {
    return (
        <div className='schedule-interview-modal'>
            <div>
                <X className='cross' onClick={() => {setOpenEditUserModal(false)}}/>
                <h1>Planifier un entretien</h1>
            </div>
        </div>
    );
};

export default ScheduleInterviewModal;