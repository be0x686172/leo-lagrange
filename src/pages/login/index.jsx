import './style.scss';
import TextInputUI from '../../components/ui/text-input';
import SubmitButtonUI from '../../components/ui/submit-button';
import { useEffect, useState } from 'react';
import { supabaseSignIn, supabaseGetSession } from '../../services/supabase/supabaseAuthentication';
import { useNavigate } from 'react-router';

const LoginPage = () => {

    const [{email, password}, setDataForm] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    let navigate = useNavigate();

    useEffect(() => {
        supabaseGetSession()
        .then((data) => {
            if (data.session)
                navigate('/dashboard');
        });
    }, []);

    const handleForm = async (event) => {
        event.preventDefault();
        
        const data = await supabaseSignIn({email, password}, setError);

        if (data && data.user) {
            setError("");
            navigate('/dashboard');
        }
    }

    return (
        <div className='login-page'>
            <h1>Léo Lagrange Recrutement</h1>
            <form onSubmit={(event) => handleForm(event)}>
                <TextInputUI label={"Adresse électronique"} name={"email"} type={"email"} placeholder={"Entrez votre adresse électronique"} action={setDataForm} />
                <TextInputUI label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Entrez votre mot de passe"} action={setDataForm} />
                <SubmitButtonUI type="submit" text={"Se connecter"} className={"primary-button-default"} textSize={'s'} />
            </form>
            {error ? <p>{error}</p> : ''}
        </div>
    );
};

export default LoginPage;