import { CloseIcon } from '@chakra-ui/icons'
import { Button, Divider, Flex, Grid, GridItem, HStack, IconButton, Text, VStack } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { isEmpty, isNull } from 'lodash'
import Image from 'next/image'
import React, { useContext } from 'react'
import { setup_atom } from '../../jotai/state'
import { FlexColCenterCenter, FlexColCenterStart, FlexColStartCenter, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd, FlexRowCenterStart } from '../../utils/FlexConfigs'
import SideMenu, { sideMenuNavAtom } from '../molecules/SideMenu'
import ArtistsInfo from '../organization/ArtistsInfo'
import TrackInfo from '../organization/TrackInfo'
import { SpotifyWrapperContext } from '../SpotifyPlayerWrapper'

function DataModal() {
    const {track} = useContext(SpotifyWrapperContext)
    const {closeModal} = useContext(SpotifyWrapperContext)
    const {track_active_tab} = useContext(SpotifyWrapperContext)

  return (
    <Flex
        w="100vw"
        h="100vh"
        backdropFilter="auto"
        backdropBlur={"16px"}
        bg="transparent"
        position={"fixed"}
        top="0px"
        left="0px"
        zIndex={999}
        {
            ...FlexColCenterCenter
        }
    >
        <HStack w="80%" h="80%" bg="whiteAlpha.400" rounded="lg" >
            <SideMenu/>
            <VStack 
                w="100%"
                h="100%"
            >
                <Flex
                    w="100%"
                    {
                        ...FlexRowCenterBetween
                    }
                >
                    <Flex w="80%" {...FlexRowCenterCenter} >
                        <Text color="blackAlpha.900" fontSize="md" fontWeight="semibold" >
                            {
                                track?.name
                            }
                        </Text>
                    </Flex> 
                    <IconButton onClick={closeModal} aria-label="close" >
                       <CloseIcon />
                    </IconButton>
                </Flex>
                <Divider w="100%"  />
                <VStack w="100%" h="100%"  overflowY="scroll" overflowX="hidden" >
                    { track_active_tab === "Track" && <TrackInfo/>}
                    { track_active_tab === "Artists" && <ArtistsInfo/>}
                </VStack>   
            </VStack>
        </HStack>
    </Flex>
  )
}

export default DataModal