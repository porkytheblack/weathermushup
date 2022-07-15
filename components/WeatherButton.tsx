import { Button } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import React from 'react'
import { user_location_atom } from '../jotai/state'

function WeatherButton() {
    const [loc, ] = useAtom(user_location_atom)
  return (
    <Button>
        Get Weather
    </Button>
  )
}

export default WeatherButton