/* eslint-disable react-hooks/exhaustive-deps */
import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { isNull, isUndefined } from 'lodash'
import React, { useContext, useEffect, useRef, useState } from 'react'
import useTracks from '../hooks/useTracks'
import { state_tick } from '../jotai/state'
import { SpotifyWrapperContext } from './SpotifyPlayerWrapper'

function TrackComponent() {
    const {fetch_next} = useTracks()
    const [tick,] = useAtom(state_tick)
    const [pos, set_pos] = useState<number>(0)
    const interval_ref = useRef<any>(null)
    const {position, seek, player} = useContext(SpotifyWrapperContext)

    useEffect(()=>{

        interval_ref.current = setInterval(()=>{
            if(!isNull(player) && !isUndefined(player)){
                player?.getCurrentState().then((state)=>{
                    // console.log(state)
                    if(!isNull(state) && !isUndefined(state)){
                        set_pos((state.position*100)/state.duration)
                        if(state.duration - state.position <= 10){
                            if(state?.track_window?.next_tracks?.length == 0){
                                fetch_next()
                            }
                        }
                    }
                })
            }
        }, 500)
        return ()=>{
            clearInterval(interval_ref.current)
        }
    }, [tick])

    
    
  return (
    <RangeSlider onChange={(val)=>{
        // console.log(val)
        if(!isUndefined(seek)){
            seek(val[0])
        }
    // eslint-disable-next-line jsx-a11y/aria-proptypes
    }} min={0} max={100} width="100%" value={[pos]} aria-label={['playback']} defaultValue={[0]}   >
        <RangeSliderTrack> 
            <RangeSliderFilledTrack/>
        </RangeSliderTrack>
        <RangeSliderThumb transition="all" transitionTimingFunction={"linear"}  index={0} />
    </RangeSlider>
  )
}

export default TrackComponent