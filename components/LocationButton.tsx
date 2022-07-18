import { Button, Text } from '@chakra-ui/react'
import { LocationOn } from '@mui/icons-material'
import { useAtom } from 'jotai'
import React from 'react'
import { user_location_atom } from '../jotai/state'
import { FlexRowCenterCenter } from '../utils/FlexConfigs'

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
    <Button w="300px" _hover={{background: "#fa175f" }} bg="transparent" onClick={get_location} >
        <LocationOn sx={{color: "white"}} />
        <Text color="white" fontSize="18px" ml="20px" fontWeight={"bold"} >
        Get my location
        </Text>
    </Button>
  )
}

export default LocationButton