import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, chakra, RangeSlider, RangeSliderThumb, RangeSliderTrack, RangeSliderFilledTrack, IconButton, Icon, Text } from '@chakra-ui/react'
import { Pause, PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { FlexColCenterCenter, FlexRowCenterAround, FlexRowCenterCenter } from '../utils/FlexConfigs'

function SpotifyPlayer({auth_token} : {auth_token: string}) {
    const [player, set_player] = useState<null|Spotify.Player >(null)
    const [current_device, set_current_device  ] = useState<string>("")
    const [duration, set_duration] = useState<number>(0)
    const [position, set_position] = useState<number>(0)
    const [track, set_track]  = useState<Spotify.Track| null>(null)
    const [paused, set_paused] = useState<boolean>(true)
    const [active, set_active] = useState<boolean>(false)
    const [player_state, set_player_state] = useState<"ready" | "not_ready"> ("not_ready")
    const [initialization_error, set_initialization_error] = useState<boolean>(false)
    const ref = useRef<null | HTMLDivElement>(null)

    const [playlist_urls, set_playlist_urls] = useState<string[]>([])
    const [next_playlist, set_next_playlist] = useState<string>("")
    const [previous_playlist, set_previous_playlist] = useState<string>("")
    const [current_playlist, set_current_playlist]= useState<string>("")
    const [current_weather, set_current_weather] = useState<string>("rainy")

    //react query
    const playlists_query  = useQuery([current_playlist, auth_token],()=> axios.post("/api/spotify/weathertracks", {auth_token, current_weather}).then((res)=>res.data))

    

    const get_playlist = (weather: string) =>{
        const w = "cloudy"
        
    }

    const toggle_play = () =>{
        if(player){
            player.togglePlay()
        }
    }

    const handleChange = (num: number) => {
        set_position(num)
         player?.seek((num*duration)/100)
    }

    const nextTrack = () =>{
        if(player){
            player.nextTrack()
        }
    }

    const prevTrack = () =>{
        if(player){
            player.previousTrack()
        }
    }
    
    useEffect(()=>{
        

        if(auth_token.length > 0){

            if(typeof playlists_query.data !== "undefined"){
                if(playlists_query.data !== null){
                    var ls = playlists_query.data.tracks.items.map((item: any)=>item.uri)
                    set_playlist_urls(ls)
                    console.log(ls)
                }
            }

            const script = document.createElement("script")
            script.src = "https://sdk.scdn.co/spotify-player.js"
            script.async = true 

             
            
            document.body.appendChild(script)

            console.log(window)

            window.onSpotifyWebPlaybackSDKReady  = () =>{
                    const player = new window.Spotify.Player({
                        name: "Web Playback SDK",
                        getOAuthToken: (cb) => {cb(auth_token)},
                        volume: 1
                    })

                    

                    set_player(player)

                    player.resume()

                    player.addListener('ready', (data)=>{
                        console.log("The player is ready")
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
                            console.log(state)
                            if(!state){
                                return
                            }
                            set_track(state.track_window.current_track)
                            set_paused(state.paused)

                            set_duration(state.duration)
                            set_position((state.position * 100)/state.duration)

                            player.getCurrentState().then((state: any) =>{
                                (!state) ? set_active(false) : set_active(true)
                            })  
                    }))
                    player.connect()
            }

        }

        return ()=>{
            ["ready", "not_ready", "initialization_error", "authentication_error", "autoplay_failed", "player_state_changed"].forEach((item)=>{
                player?.removeListener(item as any )
            })
        }
    }, [, auth_token, playlists_query.isLoading])


    useEffect(()=>{
        if(player_state == "ready" && current_device.length > 0 ){
            axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${current_device}`,JSON.stringify({ uris: playlist_urls }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth_token}`
                }
            }).then((res)=>{
                console.log("Connected successfully")
                console.log(res.data)
            }).catch((e)=>{
                console.log(e)
                console.log("An erro occured whilw making the request")
                })
        }
    }, [current_device, player_state])


    if(playlists_query.isLoading){
        return (
            <Text color="white" > 
                Loading
            </Text>
        )
    }

    if(playlists_query.isError){
        return (
            <Text color="white" >
                An Error Occured
            </Text>
        )
    }

  return (
    <Flex width="100%" {...FlexColCenterCenter} ref={ref} >

            <RangeSlider onChange={(val)=>{
                console.log(val)
                handleChange(val[0])
            }} min={0} max={100} width="100%" value={[position]} aria-label={['playback']} defaultValue={[0]}   >
                <RangeSliderTrack> 
                    <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
            </RangeSlider>
            <Flex w="100%" marginTop={"30px"} {...FlexRowCenterAround}  >
                        <IconButton onClick={prevTrack} borderRadius={"1000px"} _hover={{background: "#fa175f"}} bg="none" aria-label='prev'  >
                                <ChevronLeftIcon color="white" w={8} h={8}  />
                        </IconButton>
                        {paused && <IconButton onClick={toggle_play} borderRadius={"1000px"} bg="transparent"   _hover={{background: "#fa175f" }} aria-label='playButton'>
                               
                                 <Icon as={PlayArrow} w={8} h={8} color="white" />
                        </IconButton>}
                        {!paused && <IconButton onClick={toggle_play} borderRadius={"1000px"} bg="transparent"   _hover={{background: "#fa175f" }} aria-label='playButton'>
                            <Icon as={Pause} w={8} h={8} color="white" />
                        </IconButton> }
                        <IconButton onClick={nextTrack} bg="none" borderRadius={"1000px"} _hover={{background: "#fa175f"}} aria-label='prev'  >
                                <ChevronRightIcon color="white" w={8} h={8}  />
                        </IconButton>
                    </Flex>
    </Flex>             
  )
}

export default SpotifyPlayer