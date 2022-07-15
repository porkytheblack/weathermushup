import axios from "axios"
import { isEmpty, isNull } from "lodash"

export const is_track_last = (track: string, track_uris: string[]) => track_uris.indexOf(track) == track_uris.length -1

export const go_to_next = (track: string, access_token: string | null, device: string) => new Promise((res, rej)=>{
    if(isNull(access_token)) return rej(false)
    if(isEmpty(access_token) || isEmpty(track) || isEmpty(device) ) return rej(false)
    axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${device}`,JSON.stringify({ uris: [track] }), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`    
        }
    }).then(()=>{
        res(true)
    }).catch((e)=>{
        rej(false)})
})