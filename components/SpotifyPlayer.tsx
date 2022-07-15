/* eslint-disable jsx-a11y/aria-proptypes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import usePlayer from '../hooks/usePlayer'
import {Button, chakra, Flex, Icon, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack} from "@chakra-ui/react"
import { FlexColCenterCenter, FlexRowCenterAround } from '../utils/FlexConfigs'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Pause, PlayArrow } from '@mui/icons-material'
import useTracks from '../hooks/useTracks'
import { useAtom } from 'jotai'
import { authToken, CurrentDeviceAtom } from '../jotai/state'
import axios from 'axios'
import dynamic from 'next/dynamic'
import TrackComponent from './TrackComponent'

function SpotifyPlayerComponent({seek,player, position, duration, paused, toggle_play_pause, prevTrack, player_state, nextTrack, current_device}:{player: Spotify.Player | null, position: number, duration: number, paused: boolean, toggle_play_pause: ()=>void, prevTrack: ()=>void, player_state: "ready" | "not_ready", nextTrack: ()=>void, current_device: string, seek: (val: number)=>void }) {
    
    const [access_token, ] = useAtom(authToken)
    const {loading_playlists, error_playlists, pl_error, track_uris} = useTracks()
    useEffect(()=>{
        console.log("Here is the player state 👉 ", player_state)
        console.log("We are in 👉 mode", paused)
    }, [player_state, paused])  

    useEffect(()=>{
        if(track_uris.length == 0 || loading_playlists || error_playlists || pl_error !== null) return ()=>{}
        if(current_device.length == 0) return ()=>{}
        if(player_state == "not_ready") return console.log("Player not ready")


        axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${current_device}`,JSON.stringify({ uris: track_uris }), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`    
                }
            }).then((res)=>{
                console.log("Connected successfully")
                player?.resume()
            }).catch((e)=>{
                console.log(e) 
                console.log("An error occured while making the request")
                })
    }, [loading_playlists, error_playlists, pl_error, track_uris, player_state,])


    
  return (
    <Flex width="100%" {...FlexColCenterCenter}  >
                {/* <Button onClick={()=>{
                        toggle_play()
                }} >
                    Play or Pause
                </Button> */}
            <TrackComponent position={position} handleChange={(val)=>{
                seek(val)
            }} />
            <Flex w="100%" marginTop={"30px"} {...FlexRowCenterAround}  >
                        <IconButton onClick={prevTrack}  borderRadius={"1000px"} _hover={{background: "#fa175f"}} bg="none" aria-label='prev'  >
                                <ChevronLeftIcon color="white" w={8} h={8}  />
                        </IconButton>
                        {paused && <IconButton onClick={toggle_play_pause} borderRadius={"1000px"} bg="transparent"   _hover={{background: "#fa175f" }} aria-label='playButton'>
                               
                                 <Icon as={PlayArrow} w={8} h={8} color="white" />
                        </IconButton>}
                        {!paused && <IconButton onClick={toggle_play_pause} borderRadius={"1000px"} bg="transparent"   _hover={{background: "#fa175f" }} aria-label='playButton'>
                            <Icon as={Pause} w={8} h={8} color="white" />
                        </IconButton> }
                        <IconButton onClick={nextTrack}  bg="none" borderRadius={"1000px"} _hover={{background: "#fa175f"}} aria-label='prev'  >
                                <ChevronRightIcon color="white" w={8} h={8}  />
                        </IconButton>
                    </Flex>
    </Flex>     
  )
}

export default SpotifyPlayerComponent