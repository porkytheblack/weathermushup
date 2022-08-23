import { Button, Flex, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FlexColCenterCenter, FlexColStartEnd, FlexRowCenterCenter, FlexRowStartStart } from '../../utils/FlexConfigs'

function SmallTrackDetails({track_image, track_name, track_year}: {track_image: string, track_name: string, track_year: string}) {
  return (
    <Flex 
    {
        ...FlexRowStartStart
    }
    p="10px"
    rounded="lg"
    bg="transparent"
    backdropBlur={"12px"}
    backdropFilter="auto"
    as={"button"}
    borderColor="ButtonHighlight"
    borderWidth="1px"
    w="40%"
    mr="10px"
    mb="10px"
    _hover={{
        bg: "whiteAlpha.300",
    }}
    >
        <Flex w="250px"  h="150px" rounded="lg" overflow="hidden"   >
            <Image width={"250px"} height={"150px"} src={track_image} alt={track_image} />
        </Flex>
        <Flex w="100%" h="150px" p="10px"  {
            ...FlexColStartEnd
        } >
            <Text fontSize="md" textAlign="left" fontWeight="semibold" color="white" >
                {
                    track_name?.slice(0, 20) + ( track_name?.length > 20  ? "..." : "")
                }
            </Text>
            <Text  fontSize="md" textAlign={"left"} fontWeight="sm" color="whiteAlpha.400" >
                {
                    track_year
                }
            </Text>
        </Flex>
    </Flex>
  )
}

export default SmallTrackDetails