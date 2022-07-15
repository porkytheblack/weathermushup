import { Button } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { user_location_atom } from '../jotai/state'

function LocationButton() {
    const [,set_location] = useAtom(user_location_atom)
    const get_location = () =>{
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position)=>{
                var lat = position.coords.latitude
                var lon = position.coords.longitude
                console.log(lat, lon)
                set_location({
                    lat,
                    lon
                })
            })
        }
    }
  return (
    <Button onClick={get_location} >
        Get Location
    </Button>
  )
}

export default LocationButton