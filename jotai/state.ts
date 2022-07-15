import { atom } from "jotai"
import {atomWithStorage} from "jotai/utils"

export const authToken = atomWithStorage<string | null>("access_token",null)

export const SpotifyPlayerInstance = atomWithStorage<Spotify.Player | null>("player",null)


export const playerNo = atomWithStorage<number>("players ::", 0)

export const addPlayer = atom(null, (get, set, _)=>{
    set(playerNo, get(playerNo) + 1)
})


export const CurrentDeviceAtom = atomWithStorage<string>("current_device_id", "")

export const player_state_atom = atomWithStorage<"ready"| "not_ready">("state", "not_ready")

export const state_tick  = atom<number>(0)
export const tick_up = atom(null, (get, set, _)=>{
    set(state_tick, get(state_tick)+1 )
})

