import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, Icon, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { Pause, PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isNull, isUndefined } from 'lodash'
import React, { ReactNode, useEffect, useState } from 'react'
import { addPlayer, authToken, SpotifyPlayerInstance } from '../jotai/state'
import { FlexColCenterCenter, FlexRowCenterAround } from '../utils/FlexConfigs'
import useTracks from './../hooks/useTracks'


function NewPlayer({children, get_player}:{children: ReactNode | ReactNode[], get_player: (pl: Spotify.Player)=> void}) {
    const [access_token, ] = useAtom(authToken)
    const [SpotifyPlayer, set_player] = useState<null | Spotify.Player>(null)
    const [player_state, set_player_state] = useState<"ready" | "not_ready"> ("not_ready")
    const [current_device, set_current_device  ] = useState<string>("")
    const [initialization_error, set_initialization_error] = useState<boolean>(false)
    const [track, set_track]  = useState<Spotify.Track| null>(null)
    const [paused, set_paused] = useState<boolean>(true)
    const [duration, set_duration] = useState<number>(0)
    const [position, set_position] = useState<number>(0)
    const [active, set_active] = useState<boolean>(false)
    const [, add_player] = useAtom(addPlayer)

    useEffect(()=>{
        
        if(access_token == null) return ()=>{}
        const script = document.createElement("script")
            script.src = "https://sdk.scdn.co/spotify-player.js"
            script.async = true             
            document.body.appendChild(script)
           
            window.onSpotifyWebPlaybackSDKReady  = () =>{
                    const player = new window.Spotify.Player({
                        name: "Web Playback SDK",
                        getOAuthToken: (cb) => {cb(access_token)},
                        volume: 0.5
                    }) 
                    add_player()
                    player.addListener('ready', (data)=>{
                        set_player(player)
                        set_player_state("ready")
                        set_current_device(data.device_id)
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
                                return  null  
                            }
                            console.log(state)
                            set_active(true)
                            set_track(state.track_window.current_track)
                            set_paused(state.paused)

                            set_duration(state.duration)
                            set_position((state.position * 100)/state.duration)
                            
                    }))
                   
                    player.connect()
                    get_player(player)
                      
            }

            return ()=>{
                
                
            }
    },[access_token])

    // useEffect(()=>{
    //     if(isNull(SpotifyPlayer)) return ()=>{}
    //     if(track_uris.length == 0 || loading_playlists || error_playlists || pl_error !== null) return ()=>{}
    //     if(current_device.length == 0) return ()=>{}
    //     axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${current_device}`,JSON.stringify({ uris: track_uris }), {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${access_token}`    
    //         }
    //     }).then((res)=>{
    //         console.log("Connected successfully")
    //         window.player.resume()
    //     }).catch((e)=>{
    //         console.log(e)    
    //         console.log("An error occured while making the request")
    //         })
        
    // }, [SpotifyPlayer, track_uris,current_device,loading_playlists,error_playlists,pl_error])

    

    const toggle_play_pause = () =>{
        console.log("Ok I get it")
        console.log(SpotifyPlayer)
        if( isNull(SpotifyPlayer)) return console.log("Player is null")
        console.log("Not null")
        if(isNull(SpotifyPlayer)) return console.log("Player null")
        if(paused) return window.player.resume().then(()=>{
            set_paused(false)
            console.log("Resumed the player")   
        }).catch((e)=>console.error(e))
        if(!paused) return window.player.pause().then(()=>{
            set_paused(true)
            console.log("Paused the player")
        }).catch((e)=>console.error(e))
    }     

    const nextTrack = () =>{
        if(isNull(SpotifyPlayer)) return console.log("Player null")
        if(isUndefined(SpotifyPlayer)) return console.log("player is undefined")
        window.player.nextTrack().then(()=>console.log("Next track")).catch((e)=>console.error(e))
     }
    const prevTrack = () =>{
        if(isNull(SpotifyPlayer)) return console.log("Player null")
        if(isUndefined(SpotifyPlayer)) return console.log("Player is undefined")
        window.player.previousTrack().then(()=>console.log("Previous track")).catch((e)=>console.error(e))
    }

    const seek = (val: number) =>{
        if(isNull(SpotifyPlayer)) return console.log("player is null")
        window.player.seek((val * duration)/100).then(()=>console.log("Seeking "+ val)).catch((e)=>console.log(e))
    }



  return (
    <Flex width="100%" {...FlexColCenterCenter}  >
        {children}
    </Flex>        
  )
}

export default NewPlayer