import axios from 'axios'
import { useAtom } from 'jotai'
import { isNull, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { authToken, CurrentDeviceAtom, SpotifyPlayerInstance } from '../jotai/state'
import useTracks from './useTracks'

function usePlayer() {
    const [current_device, set_current_device] = useAtom(CurrentDeviceAtom)
    const [access_token, ] = useAtom(authToken)
    const [SpotifyPlayer, set_player] = useAtom(SpotifyPlayerInstance)
    const [player_state, set_player_state] = useState<"ready" | "not_ready"> ("not_ready")
    const [initialization_error, set_initialization_error] = useState<boolean>(false)
    const [track, set_track]  = useState<Spotify.Track| null>(null)
    const [paused, set_paused] = useState<boolean>(true)
    const [duration, set_duration] = useState<number>(0)
    const [position, set_position] = useState<number>(0)
    const [active, set_active] = useState<boolean>(false)

    const {track_uris, loading_playlists, error_playlists, pl_error} = useTracks()

    useEffect(()=>{
        if(access_token == null) return ()=>{}
        if(!isNull(SpotifyPlayer)) return ()=>{}
        const script = document.createElement("script")
            script.src = "https://sdk.scdn.co/spotify-player.js"
            script.async = true             
            document.body.appendChild(script)
           
            window.onSpotifyWebPlaybackSDKReady  = () =>{
                    const player = new window.Spotify.Player({   
                        name: "Web Playback SDK",
                        getOAuthToken: (cb) => {cb(access_token)},
                        volume: 1
                    }) 
                    console.log("New Player 🥸🥸")
                    if(typeof player == "undefined") return ()=>{}
                    player.addListener('ready', (data)=>{
                        set_player(player)
                        set_player_state("ready")
                        if(current_device == "") {
                            set_current_device(data.device_id)
                        }
                    })
 
                    player.addListener('not_ready', (data: any)=>{
                        console.log("The player is not ready")
                        set_player_state("not_ready") 

                    })

                    player.addListener("initialization_error", ()=>{
                        console.log("An error occured during initialization")
                        set_initialization_error(true)
                    })

                    player.addListener("authentication_error", (err)=>{
                        console.log(err)
                        console.log("Failed to authenticate user")
                    })

                    player.addListener("autoplay_failed", ()=>{
                        console.log("Auto play error")
                        
                    })

                    player.addListener('player_state_changed', ((state) => {
                            if(!state){
                                set_active(false)
                                return
                            }
                            console.log(state)
                            set_active(true)
                            set_track(state.track_window.current_track)
                            set_paused(state.paused)

                            set_duration(state.duration)
                            set_position((state.position * 100)/state.duration)
                            
                    }))
                    
                    player.connect()

                    set_player(player)
            }

            return ()=>{
                console.log("unmounting")
                set_player(null)
            }
    }, [access_token])

    

    

    const toggle_play_pause = () =>{
        console.log("Ok I get it")
        console.log(SpotifyPlayer)
        if( isNull(SpotifyPlayer)) return console.log("Player is undefined")
        console.log("Not undefined")

        if(paused) SpotifyPlayer.resume().then(()=>{
            set_paused(false)
            console.log("Resumed the player")
        }).catch((e)=>console.error(e))
        if(!paused) SpotifyPlayer.pause().then(()=>{
            set_paused(true)
            console.log("Paused the player")
        }).catch((e)=>console.error(e))
    }

    const nextTrack = () =>{
        if(isNull(SpotifyPlayer)) return console.log("player is undefined")
        SpotifyPlayer.nextTrack().then(()=>console.log("Next track")).catch((e)=>console.error(e))
     }
    const prevTrack = () =>{
        if(isNull(SpotifyPlayer)) return console.log("Player is undefined")
        SpotifyPlayer.previousTrack().then(()=>console.log("Previous track")).catch((e)=>console.error(e))
    }



  return (
    {
        player: SpotifyPlayer,
        isError: initialization_error,
        track,
        paused,
        duration,
        position,
        active,
        current_device,
        player_state,
        toggle_play_pause,
        nextTrack,
        prevTrack
    }
  )
}

export default usePlayer