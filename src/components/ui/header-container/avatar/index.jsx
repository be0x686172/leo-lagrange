import './style.scss';
import { supabaseGetSession } from '../../../../services/supabase/supabaseAuthentication';
import { useEffect, useState } from 'react';
import { supabaseGetUserById } from '../../../../services/supabase/supabaseUsersDatabase';

const AvatarUI = ({ openHeader }) => {

    const [user, setUser] = useState({});

    useEffect(() => {
        supabaseGetSession().then((success) => {
            const userId = success.session.user.id;

            supabaseGetUserById(userId).then((data) => {
                if (data) {
                    setUser({...data[0]})
                }
            });
        })
    }, [user])

    return (
        <div className='avatar-ui'>
            <div><p><span>{user.firstname ? user.firstname[0] : ''}</span><span>{user.name ? user.name[0] : ''}</span></p></div>
            {openHeader ? <p><span>{user.firstname ? user.firstname : ''}</span> <br /> <span>{user.name ? user.name : ''}</span></p> : ''}
        </div>
    );
};

export default AvatarUI;