import { atom } from "jotai"
import {atomWithStorage} from "jotai/utils"

export const authToken = atomWithStorage<string | null>("access_token",null)

export const SpotifyPlayerInstance = atomWithStorage<Spotify.Player | null>("player",null)


export const playerNo = atomWithStorage<number>("players ::", 0)

export const addPlayer = atom(null, (get, set, _)=>{
    set(playerNo, get(playerNo) + 1)
})