import './style.scss';
import { supabase } from '../../services/supabaseClient';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router";

const Login = () => {

    let navigate = useNavigate();
    const [error, setError] = useState(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session)
                navigate("/dashboard");
        })
    }, [navigate])

    async function handleLogin(e)
    {
        e.preventDefault();

        const email = document.querySelector('.i-email').value;
        const password = document.querySelector('.i-password').value;

        // Ici on attend la réponse de Supabase
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        
        if (error) 
            setError("Votre adresse électronique ou mot de passe est incorrect.");
        else 
        {
            setError(null);
            navigate('/dashboard');
        }
    }

    return (
        <div className="p-Login">
            <h1>Bienvenue sur l'interface de <br />connexion Léo Lagrange recrutement</h1>
            <div className='d-container-form'>
                <div></div>
                <form>
                    <label>Adresse électronique</label>
                    <input type="text" className="i-email" placeholder="Entrez votre adresse électronique"/>
                    <label>Mot de passe</label>
                    <input type="password" className="i-password" placeholder="Entrez votre mot de passe"/>
                    <button onClick={(e) => handleLogin(e)}>Se connecter</button>
                    <a href='#'>Mot de passe oublié ?</a>
                    {error && <p className='error'>{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;