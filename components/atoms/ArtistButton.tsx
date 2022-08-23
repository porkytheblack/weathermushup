import { Avatar, Button, Tag, Text } from '@chakra-ui/react'
import React from 'react'

function ArtistButton() {
  return (
    <Button width="300px" size="lg"  >
        <Avatar size="sm" src={""} mr="10px" />
        <Text fontWeight="semibold" fontSize="md" color="black" >
            Artisit Name
        </Text> 
    </Button>
  )
}

export default ArtistButton