import { Button, Text } from '@chakra-ui/react'
import { LocationOn } from '@mui/icons-material'
import { useAtom } from 'jotai'
import React, { useState } from 'react'
import { get_weather } from '../helpers/weather'
import { current_weather, user_location_atom } from '../jotai/state'
import { FlexRowCenterCenter } from '../utils/FlexConfigs'

function LocationButton({onChange}:{onChange: (val: string, location: string)=>void}) {
    const [,set_location] = useAtom(user_location_atom)
    const [, set_weather] = useAtom(current_weather)
    const [loading, set_loading] = useState<boolean>(false)
    const [done, set_done] = useState<boolean>(false)
    const get_location = () =>{

        if(navigator.geolocation){
            set_loading(true)
            navigator.geolocation.getCurrentPosition((position)=>{
                var lat = position.coords.latitude
                var lon = position.coords.longitude
                console.log(lat, lon)
                set_location({
                    lat,
                    lon
                })
                get_weather(`${lat}, ${lon}`).then((data)=>{
                    set_weather(data)
                    onChange(data.weather_text, data.location.name)
                    set_loading(false)
                    set_done(true)
                }).catch((e)=>{
                    console.log(e)
                    set_loading(false)
                })
            })
        }
    }
  return (
    <Button disabled={done}  isLoading={loading} loadingText="Just a sec ⏳" _loading={{
        backgroundColor: "#fa175f" ,
        color: "white",
        fontSize: "18px"
    }} w="300px"  _hover={{background: "#fa175f" }} bg="transparent" onClick={get_location} >
        <LocationOn sx={{color: "white"}} />
        <Text color="white" fontSize="18px" ml="20px" fontWeight={"bold"} >
        Get my location
        </Text>
    </Button>
  )
}

export default LocationButton