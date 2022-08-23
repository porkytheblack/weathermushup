/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, chakra, IconButton, Icon, Button, Text } from '@chakra-ui/react'
import Image from 'next/image'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FlexColCenterBetween, FlexColCenterCenter, FlexColCenterEnd, FlexColCenterStart, FlexRowCenterAround, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd } from '../../utils/FlexConfigs'
import { isEmpty, isNull, isNumber, isUndefined } from 'lodash'
import { useRouter } from 'next/router'
import { ImageInfo } from '../../globaltypes'
import { SpotifyWrapperContext } from '../SpotifyPlayerWrapper'
import SpotifyPlayerComponent from '../SpotifyPlayer'
import PlayerActions from '../molecules/PlayerActions'
import DataModal from '../StateModals/DataModal'

function PagePlayerComponent({images}: {images: ImageInfo[]}) {

    const {
        track,
        player,
        isModalOpen
    } = useContext(SpotifyWrapperContext)

    const {push} = useRouter()
    const get_random = (len: number) => isUndefined(len) ? 0 : Math.floor(Math.random() * len)
    const memo_image = useMemo(()=> isUndefined(images) ? {
        color: "black",
        urls: [""]
    } : images[isNumber(images?.length) ? get_random(images?.length) : 0 ], [
        track?.id,
        images
    ])


    

    useEffect(()=>{
        if(!isEmpty(player) && !isUndefined(player)){
            player?.getCurrentState().then((state: Spotify.PlaybackState | null)=>{
                if(state){
                    console.log(state.track_window.current_track)
                    // set_track(state.track_window.current_track)
                }
            }).catch((e)=>{
                console.log("Unable to get current state")
            })
        }
    }, [])

  return (
    <Flex justify={"flex-start"} alignItems="flex-start" pos="relative" bg={memo_image.color} backgroundImage={memo_image.urls[0]} backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw" height="100vh"  >
            {isModalOpen && <DataModal/>}
            
            <Flex {...FlexColCenterCenter} width="65%" height="100%"  >
                <Flex {...FlexColCenterStart}   width="80%" height="90%" >
                    <Flex {...FlexRowCenterBetween} width="100%" marginBottom={"20px"}  >
                        <Button onClick={()=>{
                            window.player?.disconnect()
                            
                            push("/setup")
                            
                        }} >
                            <Text color="black" fontWeight="semibold" >
                                👈 doesn&apos;t sound right?
                            </Text>
                        </Button>
                        <chakra.p fontSize="24px" textTransform={"uppercase"} fontWeight={"semibold"} >
                                weathermushup
                        </chakra.p>
                    </Flex>
                    <Flex {...FlexColCenterCenter}  w="50%" h="50%"   >
                        <chakra.h3 fontWeight={"semibold"} marginBottom="10px" fontSize="36px"  >
                            {
                                track?.name
                            }
                        </chakra.h3>
                        <Flex>
                                {
                                    track?.artists.map(({name})=><chakra.p key={name} fontWeight={"normal"} fontSize="16px" ml="10px" >
                                        {name}
                                    </chakra.p>)
                                }
                        </Flex>
                        
                    </Flex>
                    <Flex {...FlexColCenterEnd} w="50%" h="30%"   className="w-full" >
                        <SpotifyPlayerComponent  />
                    </Flex>
                </Flex>
            </Flex>
            <Flex {...FlexColCenterCenter} width="35%" height="100%" bg="transparent" backdropFilter={"auto"} backdropBlur={"12px"}  >
                <Flex {...FlexColCenterStart} width="80%"   >
                    <Flex width="300PX" height="300px" borderRadius={"10px"} marginBottom="20px" overflow="hidden" >
                            { isNull(track) && <Image alt="track_image" src={ "/unsplash_images/you.jpg"} width={300} height={300}  />}
                            {!isNull(track) && <Image alt="track" src={track.album.images[0].url} width={300} height={300} />  }
                    </Flex>
                    <chakra.p width="100%" display={"flex"} {...FlexRowCenterCenter} fontSize={"20px"} >
                            {
                                track?.name
                            }
                    </chakra.p>
                    <chakra.p href="" width="100%" color="rgba(255,255,255,0.4)" display={"flex"} {...FlexRowCenterCenter} marginTop="5px" fontSize={"16px"} >
                            {
                                track?.artists[0].name
                            }  
                    </chakra.p>
                    
                </Flex>
                <PlayerActions/>
            </Flex>
            
    </Flex>
  )
}

export default PagePlayerComponent
