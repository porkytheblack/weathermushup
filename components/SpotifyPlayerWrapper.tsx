import { useAtom } from 'jotai';
import { isEmpty, isNull, isUndefined } from 'lodash';
import { useRouter } from 'next/router';
import React, { ReactNode, useEffect, useState, createContext } from 'react'
import useTracks from '../hooks/useTracks';
import { authToken, CurrentDeviceAtom, player_state_atom, script_count_atom, tick_up } from '../jotai/state';

export const SpotifyWrapperContext = createContext<{
    player: Spotify.Player | null,
    current_device: string | null,
    state: string | null,
    paused: boolean,
    track: Spotify.Track | null,
    active: boolean,
    seek?: (val: number) => void,
    prevTrack?: () => void,
    nextTrack?: () => void,
    toggle_play_pause?: () => void,
    position: number,
    duration: number,
    isModalOpen: boolean,
    openModal?: () => void,
    closeModal?: () => void,
    track_active_tab: string,
    set_track_active_tab?: (tab: "Artists" | "Track") => void,

}>({
    player: null,
    current_device: null,
    state: null,
    paused: false,
    track: null,
    active: false,
    position: 0,
    duration: 0,
    isModalOpen: false,
    track_active_tab: "Track"
})



function SpotifyPlayerWrapper({children}: {children:  ReactNode | ReactNode[]}) {
    const [access_token, ] = useAtom(authToken)
    const [player, set_player] = React.useState<Spotify.Player | null>(null)
    const [current_device, set_current_device] = useAtom(CurrentDeviceAtom)
    const [state, set_player_state] = useAtom(player_state_atom)
    const [, up] = useAtom(tick_up)
    const [paused, set_paused] = useState<boolean>(true)
    const [track, set_track] = useState<null | Spotify.Track>(null)
    const [active, set_active] = useState<boolean>(false)
    const {fetch_next} = useTracks()
    const [duration, set_duration] = useState<number>(0)
    const [position, set_position] = useState<number>(0)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [track_active_tab, set_track_active_tab]  = useState<"Artists"| "Track">("Track")

    const [script_count, set_script_count] = useAtom(script_count_atom)
    const {events} = useRouter()

    const openModal = () => {
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }


    useEffect(()=>{
        const interval_ref = setInterval(()=>{
            player?.getCurrentState().then((state)=>{
                if(!isNull(state) && !isUndefined(state)){
                    set_paused(state?.paused)
                }
            })
        }, 100)

        return ()=>{
            clearInterval(interval_ref)
        }
    }, [, player])

    useEffect(()=>{
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.id = isNull(access_token) ? "spotiy-player" :  access_token;
            script.className = "spotify-player"

            document.body.append(script)

            window.onSpotifyWebPlaybackSDKReady = () =>{
                console.log("Spotify Web Playback SDK Ready")

                const player = new window.Spotify.Player({
                    name: "Web Playback SDK",
                    getOAuthToken: (cb) => {cb(isNull(access_token) ? "" : access_token)},
                    volume: 0.5
                })
                set_player(player)

                player.addListener("ready", (data)=>{
                    set_current_device(data.device_id)
                    set_player_state("ready")
                    up()
                })

                player.addListener("initialization_error", (err)=>{
                    console.log(err)
                    set_player_state("intialization_error")
                    up()

                })

                player.addListener("authentication_error", (err)=>{
                    set_player_state("authentication_error")
                })

                player.addListener("autoplay_failed", ()=>{
                    set_player_state("autoplay_failed")
                })

                player.addListener("player_state_changed", (state)=>{
                    if(!isEmpty(state)){
                        set_track(state.track_window.current_track)
                        // set_paused(state.paused)
                        set_duration(state.duration)
                        set_position((state.position/ state.duration) * 100)
                    
                    }   
                })

                player.connect().then((success)=>{
                    if(success){
                    set_active(true)
                    }else{
                        set_active(false)
                    }
                }).catch((e)=>{ 
                    console.log(e)
                })

            }
            
            events.on("routeChangeStart", (url, {shallow})=>{
                if(url.includes("setup")){
                    player?.disconnect()
                    script.remove()
                    document.getElementsByTagName("iframe")[0]?.remove()
                }
            })
            

            window.addEventListener("beforeunload", ()=>{
                player?.disconnect()
                script.remove()
                document.getElementsByTagName("iframe")[0]?.remove()
            })


        return ()=>{
            window.removeEventListener("beforeunload", ()=>{
                
            })
            // document.getElementById(isNull(access_token) ? "spotiy-player" :  access_token)?.remove()
            // document.getElementsByTagName("iframe")[0]?.remove()
            // set_script_count(0)
        }   
    }, [])


    const toggle_play_pause = () =>{
        if(paused){
            player?.resume().then(()=>{
                set_paused(false)
            }).catch((e)=>{
                console.log(e)
            })
        }else if(!paused){
            player?.pause().then(()=>{
                set_paused(true)
            }).catch((e)=>{
                console.log(e)
            })
        }
    }     

    const nextTrack = () =>{
        if(!isNull(player) )
        player?.getCurrentState().then((state)=>{
            if(!isNull(state) && !isUndefined(state)){
                if(state.track_window.next_tracks.length == 0){
                    fetch_next()
                }else{
                    if(!isNull(player))
                    player.nextTrack().then(()=>console.log("Next track")).catch((e)=>console.error(e))
                }
            }
        })
     } 
    const prevTrack = () =>{
        if(isNull(player)) return console.log("Player null")
        if(isUndefined(player)) return console.log("Player is undefined")
        if(!isNull(player))
        player?.previousTrack().then(()=>console.log("Previous track")).catch((e)=>console.error(e))
    }

    const seek = (val: number) =>{
        if(!isNull(player))
        player?.seek((val * duration)/100).then(()=>console.log("Seeking "+ val)).catch((e)=>console.log(e))
    }


  return (
    <SpotifyWrapperContext.Provider value={{
        player,
        current_device,
        state,
        paused,
        track,
        active,
        seek,
        prevTrack,
        nextTrack,
        toggle_play_pause,
        position,
        duration,
        isModalOpen,
        closeModal,
        openModal,
        track_active_tab,
        set_track_active_tab
    }} >
        {
            children
        }
    </SpotifyWrapperContext.Provider>
  )
}

export default React.memo(SpotifyPlayerWrapper)