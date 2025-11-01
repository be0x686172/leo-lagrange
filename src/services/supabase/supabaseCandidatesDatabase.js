import { supabase } from "./supabaseClient";

export async function supabaseGetCandidates() {
    let { data: candidates, error } = await supabase.from('candidates').select('*');
    return users;
}

export async function supabaseGetCandidateById(candidateId) {
    let { data: candidate, error } = await supabase.from('candidates').select("*").eq('id', candidateId);
    return user;
}

export async function supabaseUpdateCandidate(candidat) {
    let { data, error } = await supabase.from('candidates')
    .update({ ...candidat })
    .eq('id', candidat.id)
    .select();

    if (error) console.error(error);
    return data;
}