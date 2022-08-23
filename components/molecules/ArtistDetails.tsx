import { Flex, Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { FlexColStartEnd, FlexRowCenterStart } from '../../utils/FlexConfigs'

function ArtistDetails({artist_name, followers, genres, image}:{artist_name?: string, followers?: number, genres?: string[], image?: string }) {
  return (
    <Flex {
        ...FlexColStartEnd
    } w="100%" h="100%" p="10px 20px" >
        <Text fontSize="md" mb="10px" textTransform={"uppercase"} fontWeight={"bold"} color="white" >
            Profie
        </Text>
        <Text fontSize="2xl" mb="20px" textTransform={"capitalize"} fontWeight={"bold"} color="white" >
            {
                artist_name
            }
        </Text>
        <Flex w="100%" {...FlexRowCenterStart} >
            {/* <Text fontSize="sm" fontWeight="semibold" color="white" >
                4 public playlists
            </Text> */}
            <Text fontSize="sm" fontWeight="semibold" color="white" ml="20px" >
                {followers} followers
            </Text>
            {/* <Text fontSize={"sm"} fontWeight="semibold" color="white" ml="20px" >
                12 following
            </Text> */}
        </Flex>
        <Flex w="100%" {...FlexRowCenterStart} mt="20px" >
            {
                genres?.map((genre, index)=>(
                    <Tag key={index} size="sm" mr="10px" >
                        {
                            genre
                        }
                    </Tag>
                ))
            }
            
        </Flex>
    </Flex>
  )
}

export default ArtistDetails