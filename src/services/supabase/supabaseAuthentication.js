import { supabase } from './supabaseClient';

// Sign in a user
export async function supabaseSignIn(credentials, setError) {
    const {email, password} = credentials;

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error && error.message == "Invalid login credentials") setError("Les informations entrées sont incorrectes !");

    return data;
}