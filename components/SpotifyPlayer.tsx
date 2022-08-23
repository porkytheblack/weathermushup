/* eslint-disable jsx-a11y/aria-proptypes */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react'
import {Button, chakra, Flex, Icon, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text} from "@chakra-ui/react"
import { FlexColCenterCenter, FlexRowCenterAround, FlexRowCenterCenter } from '../utils/FlexConfigs'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Pause, PlayArrow, SyncOutlined } from '@mui/icons-material'
import useTracks from '../hooks/useTracks'
import { useAtom } from 'jotai'
import { authToken, CurrentDeviceAtom, next_uri_atom, state_tick } from '../jotai/state'
import axios from 'axios'
import TrackComponent from './TrackComponent'
import { SpotifyWrapperContext } from './SpotifyPlayerWrapper'
import { isUndefined } from 'lodash'

function SpotifyPlayerComponent() {
  const {
    seek,
    toggle_play_pause,
    nextTrack,
    prevTrack,
    position,
    paused,
    duration,
    track
  } = useContext(SpotifyWrapperContext)
  const {try_refetch, start_player} = useTracks()
  const [current_device, ] = useAtom(CurrentDeviceAtom)
  const [tick,] = useAtom(state_tick)

  useEffect(()=>{
    // start_player(current_device)
  }, [,current_device,tick])
    
  return (
    <Flex width="100%" {...FlexColCenterCenter}  >
            <TrackComponent  />       
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
                    <Flex {...FlexRowCenterCenter} >
                      <IconButton onClick={()=>start_player(current_device)}  borderRadius={"1000px"} _hover={{background: "#fa175f"}} bg="none" aria-label='prev'  >
                                <Icon as={SyncOutlined} color="white" w={8} h={8}  />
                        </IconButton>
                        <Text ml="10px" >
                          Try again
                        </Text>
                    </Flex>
    </Flex>     
  )
}

export default SpotifyPlayerComponent