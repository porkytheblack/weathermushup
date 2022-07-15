/* eslint-disable react-hooks/exhaustive-deps */
import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { isNull, isUndefined } from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import useTracks from '../hooks/useTracks'
import { state_tick } from '../jotai/state'

function TrackComponent({position, handleChange}: {position: number, handleChange: (val: number)=>void}) {
    const {fetch_next} = useTracks()
    const [tick,] = useAtom(state_tick)
    const [pos, set_pos] = useState<number>(0)
    const interval_ref = useRef<any>(null)

    useEffect(()=>{

        interval_ref.current = setInterval(()=>{
            if(!isNull(window.player) && !isUndefined(window.player)){
                window.player.getCurrentState().then((state)=>{
                    if(!isNull(state) && !isUndefined(state)){
                        set_pos((state.position*100)/state.duration)
                        if(state.duration - state.position <= 10){
                            if(state.track_window.next_tracks.length == 0){
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
        console.log(val)
        handleChange(val[0])
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