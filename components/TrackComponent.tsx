import { RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack } from '@chakra-ui/react'
import React, { useEffect } from 'react'

function TrackComponent({position, handleChange}: {position: number, handleChange: (val: number)=>void}) {

    useEffect(()=>{
        console.log(position)
    }, [position,])
    
  return (
    <RangeSlider onChange={(val)=>{
        console.log(val)
        handleChange(val[0])
    // eslint-disable-next-line jsx-a11y/aria-proptypes
    }} min={0} max={100} width="100%" value={[position]} aria-label={['playback']} defaultValue={[0]}   >
        <RangeSliderTrack> 
            <RangeSliderFilledTrack/>
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
    </RangeSlider>
  )
}

export default TrackComponent