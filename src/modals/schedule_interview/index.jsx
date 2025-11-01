import './style.scss';
import { X } from 'lucide-react';
import {supabaseGetCandidateById} from '../../services/supabase/supabaseCandidatesDatabase';
import { useEffect, useState } from 'react';
import ButtonUI from '../../components/ui/button';


const ScheduleInterviewModal = ({candidatId, setOpenScheduleInterviewModal}) => {

    const [candidat, setCandidat] = useState({});

    useEffect(() => {
        if (candidatId)
            supabaseGetCandidateById(candidatId).then((data) => {
                if (data) setCandidat({...data[0]});
        })
    }, [candidatId])

    return (
        <div className='schedule-interview-modal'>
            <div>
                <X className='cross' onClick={() => {setOpenScheduleInterviewModal(false)}}/>
                <p>Planifier un rendez-vous pour <span>{candidat.name}</span> <span>{candidat.firstname}</span></p>
                <form>
                    <label>Date et heure du rendez-vous :</label>
                    <div className='datetime-container'>
                        <input type="date" className="date-input" />
                        <input type="time" className="time-input" />
                    </div>
                </form>
                <p>Attention : Si vous confirmez le rendez-vous, un mail automatique sera envoyé au <br />candidat.</p>
                <div>
                    <ButtonUI text={"Annuler"} className={"button-secondary"} action={() => {setOpenScheduleInterviewModal(false)}}/>
                    <ButtonUI text={"Confirmer le rendez-vous"} className={"button-primary"} action={() => {console.log('date save'); setOpenScheduleInterviewModal(false)}}/>
                </div>
            </div>
        </div>
    );
};

export default ScheduleInterviewModal;