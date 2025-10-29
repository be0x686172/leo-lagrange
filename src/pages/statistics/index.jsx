import './style.scss';
import { ChartBar, ChartNoAxesColumn, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router';
import { supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useEffect } from 'react';

const StatisticsPage = () => {

    let navigate = useNavigate();
    
    useEffect(() => {
        supabaseGetSession()
        .then((data) => {
            if (!data.session)
                navigate('/login');
        });
    }, []);

    return (
        <div className='page statistics-page'>
            <div>
                <ChartBar size={100}/>
                <ChartNoAxesColumn size={100}/>
                <TrendingUp size={100}/>
            </div>
            <p>Cette section est en cours de création et sera bientôt disponible. </p>
        </div>
    );
};

export default StatisticsPage;