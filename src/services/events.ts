import { supabase } from "@/supabaseClient";

export async function getEvents() {
    const {data, error} = await supabase.from('events').select('*').order("created_at", {ascending: false});
    if(error) throw error;
    return data;
}

export async function insertEvents(values: {
    artist: string;
    description: string;
    image: string;
}) {
    const {data, error} = await supabase.from('events').insert([
        values
    ]).select();
    if(error) throw error;
    return data;
}

export async function editEvent(values: {
    id: string;
    artist: string;
    description: string;
    image: string;
}) {
    
    const {data, error} = await supabase.from('events')
        .update({
            artist: values.artist,
            description: values.description,
            image: values.image
        })
        .eq("id", values.id)
        .select();

        if(error) throw error;
        return data;
}

export async function deleteEvent(id: string) {
    const {error} = await supabase.from('events').delete().eq("id", id).select();

    if(error) throw error;
}