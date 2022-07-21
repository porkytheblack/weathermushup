const match_moods = [
    ["😏 This one","smug or self-confident mood"],
    ["😒 Meh", "unhappy mood"],
    ["😔 Sad", "sad mood"],
    ["👩‍💻 Like Coding", "coding mood"],
    ["📕 Study time", "study mood"],
    ["😡 Woah, what happened?", "angry mood"],
    ["🤩 Feeling like a star", "amazing or awesome mood"],
    ["🥳 Party mood", "party mood"],
    ["🤟 Wild", "wild mood"],
    ["😕 Nah, no feeling, anything will do", ""],
    ["😀 Happy", "happy mood"]
]
 
export const generate_filter = ({
    weather,
    mood,
    artist,
    genre,
    location
}: {
    weather: string | null,
    mood: string | null,
    artist: string | null,
    genre: string | null,
    location: string | null
}): Promise<string> => new Promise((res, rej)=>{
    try{
        var chosen_mood = match_moods.filter(([m, _map])=>m == mood)[0][1]
        var q = `${genre} for a ${chosen_mood} on a ${weather} day by ${artist}`
        res(q)
    }catch(e){
        rej(e)
    }    
})