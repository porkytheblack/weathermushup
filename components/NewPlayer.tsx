import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Flex, Icon, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Spinner } from '@chakra-ui/react'
import { Pause, PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isNull, isString, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { usePlaybackState, usePlayerDevice, WebPlaybackSDK } from 'react-spotify-web-playback-sdk'
import { addPlayer, authToken, SpotifyPlayerInstance } from '../jotai/state'
import { FlexColCenterCenter, FlexRowCenterAround } from '../utils/FlexConfigs'
import useTracks from './../hooks/useTracks'
import TrackComponent from './TrackComponent'



function NewPlayer() {
    const [access_token, ] = useAtom(authToken)
    const {loading_playlists, error_playlists, pl_error, track_uris} = useTracks()

    const  playback_state = usePlaybackState()
    const player = usePlayerDevice()

    useEffect(()=>{
        console.log(playback_state)
    }, [playback_state])

    useEffect(()=>{
        if(loading_playlists ||   !isNull(error_playlists) || !isNull(pl_error) || track_uris.length == 0 ) return ()=>{}
        axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${player?.device_id}`,JSON.stringify({ uris: track_uris }), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`    
                        }
                    }).then((res)=>{
                        console.log("Connected successfully")
                        
                    }).catch((e)=>{
                        console.log(e)    
                        console.log("An error occured while making the request")
                        })
    }, [loading_playlists, error_playlists, pl_error, track_uris])
    

    

      


    if(isNull(playback_state) || isNull(player) ) return <Spinner color="red" size="lg" />


  return (
    
        <TrackComponent position={(playback_state?.position/playback_state?.duration)/100} handleChange={()=>{

        }} />
  )
}

export default NewPlayer