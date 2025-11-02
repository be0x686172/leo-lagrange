import { supabase } from "./supabaseClient";

export async function supabaseGetCandidates() {
    let { data: candidates, error } = await supabase.from('candidates').select('*');
    return candidates;
}

export async function supabaseGetCandidateById(candidateId) {
    let { data: candidate, error } = await supabase.from('candidates').select("*").eq('id', candidateId);
    return candidate;
}

export async function supabaseUpdateCandidate(candidat) {
    let { data, error } = await supabase.from('candidates')
    .update({ ...candidat })
    .eq('id', candidat.id)
    .select();

    if (error) console.error(error);
    return data;
}

export async function supabaseUpdateInterviewDateTimeCandidate(candidatId, interview_date, interview_time) {
    const { data, error } = await supabase
    .from('candidates')
    .update({
        interview_date: interview_date,
        interview_time: interview_time
    })
    .eq('id', candidatId)
    .select();
}