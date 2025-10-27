import './style.scss';
import TextInputUI from '../../components/ui/text-input';
import SubmitButtonUI from '../../components/ui/submit-button';

const index = () => {
    return (
        <div className='login-page'>
            <h1>Léo Lagrange Recrutement</h1>
            <form>
                <TextInputUI label={"Adresse électronique"} name={"email"} type={"email"} placeholder={"Entrez votre adresse électronique"} />
                <TextInputUI label={"Mot de passe"} name={"password"} type={"password"} placeholder={"Entrez votre mot de passe"} />
                <SubmitButtonUI text={"Se connecter"} className={"primary-button-default"} textSize={'s'}/>
            </form>
        </div>
    );
};

export default index;