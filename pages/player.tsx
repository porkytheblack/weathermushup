import { Flex, chakra, IconButton, Icon } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons"
import Image from 'next/image'
import React, { useEffect } from 'react'
import { FlexColCenterBetween, FlexColCenterCenter, FlexColCenterEnd, FlexColCenterStart, FlexRowCenterAround, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd } from '../utils/FlexConfigs'
import { PlayArrow } from '@mui/icons-material'
import axios from 'axios'

function Player() {
    useEffect(()=>{
       
    }, [])
  return (
    <Flex justify={"flex-start"} alignItems="flex-start" pos="relative" backgroundImage={"/unsplash_images/raining.jpg"} backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw" height="100vh"  >
            <Flex {...FlexColCenterCenter} width="65%" height="100%"  >
                <Flex {...FlexColCenterStart}   width="80%" height="90%" >
                    <Flex {...FlexRowCenterBetween} width="100%" marginBottom={"20px"}  >
                        <IconButton aria-label='hamburger_icon' bg="none" _active={{background: "none"}} _hover={{background: "none"}} >
                                <HamburgerIcon color="white" fontSize="24px" /> 
                        </IconButton>
                        <chakra.p fontSize="24px" textTransform={"uppercase"} fontWeight={"semibold"} >
                                Muziki
                        </chakra.p>
                    </Flex>
                    <Flex {...FlexColCenterCenter}  w="50%" h="50%"   >
                        <chakra.h3 fontWeight={"semibold"} marginBottom="10px" fontSize="36px"  >
                            The Nights
                        </chakra.h3>
                        <chakra.p fontWeight={"normal"} fontSize="16px" >
                            AVICII
                        </chakra.p>
                    </Flex>
                    <Flex {...FlexColCenterEnd} w="50%" h="30%"   className="w-full" >
                            
                    </Flex>
                </Flex>
            </Flex>
            <Flex {...FlexColCenterCenter} width="35%" height="100%" bg="transparent" backdropFilter={"auto"} backdropBlur={"12px"}  >
                <Flex {...FlexColCenterStart} width="80%"   >
                    <Flex width="300PX" height="300px" borderRadius={"10px"} marginBottom="20px" overflow="hidden" >
                            <Image src={"/unsplash_images/you.jpg" } width={300} height={300}  />
                    </Flex>
                    <chakra.p width="100%" display={"flex"} {...FlexRowCenterCenter} fontSize={"20px"} >
                            The Nights
                    </chakra.p>
                    <chakra.p width="100%" color="rgba(255,255,255,0.4)" display={"flex"} {...FlexRowCenterCenter} marginTop="5px" fontSize={"16px"} >
                            AVICCI
                    </chakra.p>
                    <Flex w="100%" marginTop={"30px"} {...FlexRowCenterAround}  >
                        <IconButton _hover={{background: "#fa175f"}} bg="none" aria-label='prev'  >
                                <ChevronLeftIcon color="white" w={8} h={8}  />
                        </IconButton>
                        <IconButton  bg="#fa175f" _hover={{background: "#d90e18"}} aria-label='playButton' padding={"10px"} >
                                <Icon as={PlayArrow} w={8} h={8} color="white" />
                        </IconButton>
                        <IconButton bg="none" _hover={{background: "#fa175f"}} aria-label='prev'  >
                                <ChevronRightIcon color="white" w={8} h={8}  />
                        </IconButton>
                    </Flex>
                </Flex>
                
            </Flex>
            
    </Flex>
  )
}

export default Player