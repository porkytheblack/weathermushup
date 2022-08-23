import { Flex, Text } from '@chakra-ui/react'
import React from 'react'
import { FlexColCenterCenter, FlexColStartEnd, FlexRowCenterStart } from '../../utils/FlexConfigs'
import TrackImage from '../atoms/TrackImage'

function TrackDetails({src, artists, track_name, track_year, album_type, no_songs }: {src?: string, artists?: string[], track_name?: string, track_year?: string, album_type?: string, no_songs?: string | number}) {
  return (
    <Flex 
    {
        ...FlexRowCenterStart
    }
    w="100%"
    p="20px 0px"
    >
        <Flex h="100%" {
            ...FlexColCenterCenter
        } >
            <TrackImage src={src} />
        </Flex>
        <Flex
            h="100%"
            p="10px 20px"
            {
                ...FlexColStartEnd
            }
        >
            <Text fontSize={"sm"} mb="10px" textTransform="uppercase" fontWeight="semibold" textAlign={"left"} w="100%" color="white" >
                {
                    album_type
                }
            </Text>
            <Text fontSize="2xl" mb="20px" textTransform={"capitalize"} fontWeight={"bold"} color="white" >
                {
                    track_name
                }
            </Text>

            <Text fontSize="sm" mb="10px" display="flex" flexDirection={"row"} fontWeight="semibold" color="white" textTransform={"capitalize"} >
                {
                    artists?.join(", ")
                }<Text fontSize="sm" fontWeight={"normal"} color="whiteAlpha.400" ml="20px" >
                    {
                        track_year
                    }
                </Text>
            </Text>

            <Text fontSize={"sm"} fontWeight="semibold" color="white" >
                {
                    no_songs
                }
                {
                    no_songs === 1 ? " song" : " songs"
                }
            </Text>
            
        </Flex>
    </Flex>
  )
}

export default TrackDetails