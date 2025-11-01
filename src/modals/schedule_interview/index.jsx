import './style.scss';
import { X } from 'lucide-react';


const ScheduleInterviewModal = ({candidatId, setOpenScheduleInterviewModal}) => {
    return (
        <div className='schedule-interview-modal'>
            <div>
                <X className='cross' onClick={() => {setOpenScheduleInterviewModal(false)}}/>
                <h1>Planifier un entretien</h1>
            </div>
        </div>
    );
};

export default ScheduleInterviewModal;