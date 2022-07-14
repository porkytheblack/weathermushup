import React from 'react'
import usePlayer from '../hooks/usePlayer'
import {Button, chakra, Flex, Icon, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack} from "@chakra-ui/react"
import { FlexColCenterCenter, FlexRowCenterAround } from '../utils/FlexConfigs'
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons'
import { Pause, PlayArrow } from '@mui/icons-material'

function SpotifyPlayer() {
    const {player, position, duration, paused, toggle_play_pause: toggle_play, prevTrack, nextTrack} = usePlayer()
    
  return (
    <Flex width="100%" {...FlexColCenterCenter}  >
                <Button onClick={()=>{
                        toggle_play()
                }} >
                    Play or Pause
                </Button>
            {false &&<> <RangeSlider onChange={(val)=>{
                console.log(val)
            }} min={0} max={100} width="100%" value={[position]} aria-label={['playback']} defaultValue={[0]}   >
                <RangeSliderTrack> 
                    <RangeSliderFilledTrack/>
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
            </RangeSlider>
            <Flex w="100%" marginTop={"30px"} {...FlexRowCenterAround}  >
                        <IconButton onClick={prevTrack}  borderRadius={"1000px"} _hover={{background: "#fa175f"}} bg="none" aria-label='prev'  >
                                <ChevronLeftIcon color="white" w={8} h={8}  />
                        </IconButton>
                        {paused && <IconButton onClick={toggle_play} borderRadius={"1000px"} bg="transparent"   _hover={{background: "#fa175f" }} aria-label='playButton'>
                               
                                 <Icon as={PlayArrow} w={8} h={8} color="white" />
                        </IconButton>}
                        {!paused && <IconButton onClick={toggle_play} borderRadius={"1000px"} bg="transparent"   _hover={{background: "#fa175f" }} aria-label='playButton'>
                            <Icon as={Pause} w={8} h={8} color="white" />
                        </IconButton> }
                        <IconButton onClick={nextTrack}  bg="none" borderRadius={"1000px"} _hover={{background: "#fa175f"}} aria-label='prev'  >
                                <ChevronRightIcon color="white" w={8} h={8}  />
                        </IconButton>
                    </Flex></>}
    </Flex>     
  )
}

export default SpotifyPlayer