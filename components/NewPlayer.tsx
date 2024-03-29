/* eslint-disable react-hooks/exhaustive-deps */
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, Icon, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { Pause, PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isEmpty, isNull, isString, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { addPlayer, authToken, CurrentDeviceAtom, playerNo, player_state_atom, script_count_atom, SpotifyPlayerInstance, state_tick_device, tick_up } from '../jotai/state'
import { FlexColCenterCenter, FlexRowCenterAround } from '../utils/FlexConfigs'
import useTracks from './../hooks/useTracks'
import SpotifyPlayerComponent from './SpotifyPlayer'
import TrackComponent from './TrackComponent'

declare global {
    interface Window {
        player: Spotify.Player | null
    }
}

function NewPlayer() {
    const [access_token, ] = useAtom(authToken)
    const [, set_state] = useAtom(player_state_atom)
    const [SpotifyPlayer, set_player] = useState<null | Spotify.Player>(null)
    const [player_state, set_player_state] = useState<"ready" | "not_ready"> ("not_ready")
    const [current_device, set_current_device  ] = useAtom(CurrentDeviceAtom)
    const [initialization_error, set_initialization_error] = useState<boolean>(false)
    const [track, set_track]  = useState<Spotify.Track| null>(null)
    const [paused, set_paused] = useState<boolean>(true)
    const [duration, set_duration] = useState<number>(0)
    const [position, set_position] = useState<number>(0)
    const [active, set_active] = useState<boolean>(false)
    const [player_no, ] = useAtom(playerNo)
    const [, add_player] = useAtom(addPlayer)
    const [, up] = useAtom(tick_up)
    const [tick, ] = useAtom(state_tick_device)
    const [toggle, set_toggle] = useState<()=>Promise<void> | null>()
    const [script_count, set_script_count]  = useAtom(script_count_atom)



    const {track_uris, loading_playlists, error_playlists, pl_error, fetch_next, start_player} = useTracks()


    useEffect(()=>{

        const sc = document.getElementById( isNull(access_token) ? "spotify-player" : access_token )
        let current_device_id = "";
        console.log(sc)
        console.log(isEmpty(sc))   
        console.log(isEmpty(sc) && player_no === 0)           
        if(isEmpty(sc) && player_no === 0 ){
                if(script_count == 0 ){
                    const script = document.createElement('script');
                    script.src = "https://sdk.scdn.co/spotify-player.js";
                    script.async = true;
                    script.id = isString(access_token) ? access_token : "spotify-player"
                    document.body.appendChild(script);    
                    set_script_count(1)   
                }
                
                        
                        window.onSpotifyWebPlaybackSDKReady  = () =>{
                            console.log("Spotify Web Playback SDK Ready")
                            const player = new window.Spotify.Player({
                                name: "Web Playback SDK",
                                getOAuthToken: (cb) => {cb(isString(access_token) ?access_token : "")},
                                volume: 0.5
                            }) 
                            window.player = player
                            player.addListener('ready', (data)=>{
                                console.log("player is ready") 
                                set_state("ready")
                                set_player(player)
                                set_player_state("ready")
                                current_device_id = data.device_id
                                set_current_device(data.device_id)
                                console.log(data.device_id)
                                up()
                            })  
                            player.addListener('not_ready', (data: any)=>{
                                set_state("not_ready")
                                console.log("The player is not ready")
                                set_player_state("not_ready") 
                                up()
                            })
                            player.addListener("initialization_error", ()=>{
                                console.log("An error occured during initialization")
                                set_initialization_error(true)
                                up()
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
                                        return  null  
                                    }
                                    console.log(state)
                                    up()
                                    set_active(true)
                                    set_track(state.track_window.current_track)
                                    set_paused(state.paused)
                                    set_duration(state.duration)
                                    set_position((state.position * 100)/state.duration)
                            }))
                            
                            player.connect().then((success)=>{
                                if(success){
                                    console.log("Connected successfully")

                                    start_player(current_device_id)
                                }else{
                                    console.log('Unable to connect new player')
                                }
                                console.log("Connected to Spotify")
                            }).catch((e)=>{
                                console.log("Unable ti connect to Spotify")
                                console.log(e)
                            })
                            

                            add_player()
                    }
            
                }



                
           


            return ()=>{
                
                    if(!isEmpty(sc)){
                        console.log("Removing already present elements")
                        console.log(sc)
                        document.removeChild(sc as Node)
                    }
            }
    },[])



    

    const toggle_play_pause = () =>{
        if(!isEmpty(window.player?.togglePlay)){
            window.player?.togglePlay()
        }
    }     

    const nextTrack = () =>{
        if(!isNull(window.player) )
        window?.player?.getCurrentState().then((state)=>{
            if(!isNull(state) && !isUndefined(state)){
                if(state.track_window.next_tracks.length == 0){
                    fetch_next()
                }else{
                    if(!isNull(window.player))
                    window.player.nextTrack().then(()=>console.log("Next track")).catch((e)=>console.error(e))
                }
            }
        })
     } 
    const prevTrack = () =>{
        if(isNull(SpotifyPlayer)) return console.log("Player null")
        if(isUndefined(SpotifyPlayer)) return console.log("Player is undefined")
        if(!isNull(window.player))
        window.player.previousTrack().then(()=>console.log("Previous track")).catch((e)=>console.error(e))
    }

    const seek = (val: number) =>{
        if(!isNull(window.player))
        window.player.seek((val * duration)/100).then(()=>console.log("Seeking "+ val)).catch((e)=>console.log(e))
    }



  return (
    <></>
  )
}

export default React.memo(NewPlayer)