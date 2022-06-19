import { Flex, chakra, IconButton, Icon } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons"
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { FlexColCenterBetween, FlexColCenterCenter, FlexColCenterEnd, FlexColCenterStart, FlexRowCenterAround, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd } from '../utils/FlexConfigs'
import { PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { SpotifyAuthContext } from '../Layout'
import SpotifyPlayer from '../components/player'

function Player({access_token}: {access_token: string | null}) {
    const {user, logout} = useAuth0()
    const [spotify_token, set_spotify_token] = useState<string>("")
    const [spotify_refresh_token, set_spotify_refresh_token] = useState<string>("")
   

    useEffect(()=>{
        if(typeof user !== "undefined"){
            axios.get(`https://dev-1r9889va.us.auth0.com/api/v2/users/${user?.sub}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            }).then((res)=>{
                const id = res.data.identities[0]
                console.log(id)
                set_spotify_token(id.access_token)
                set_spotify_refresh_token(id.refresh_token)
              
               
            }).catch((e)=>{
                console.log(e)
            })  
        }
       
     

    }, [,user])
  return (
    <Flex justify={"flex-start"} alignItems="flex-start" pos="relative" backgroundImage={"/unsplash_images/raining.jpg"} backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw" height="100vh"  >
            <Flex {...FlexColCenterCenter} width="65%" height="100%"  >
                <Flex {...FlexColCenterStart}   width="80%" height="90%" >
                    <Flex {...FlexRowCenterBetween} width="100%" marginBottom={"20px"}  >
                        <IconButton onClick={()=>{logout()}} aria-label='hamburger_icon' bg="none" _active={{background: "none"}} _hover={{background: "none"}} >
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
                           <SpotifyPlayer auth_token={spotify_token} /> 
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
                    
                </Flex>
                
            </Flex>
            
    </Flex>
  )
}

export default Player


export async function getServerSideProps(context: any ){
    return axios.post("https://dev-1r9889va.us.auth0.com/oauth/token", {
        client_id: "f6Lvhk6x1hMTJCbGD1utLZR0gEocY19o",
        client_secret: "7SdlTy3YpmsgOIGyCslJezAcmPZcP-m0slaVDu54rplx4mOsQ6Vfa7M5EN5c2oXo",
        audience: "https://dev-1r9889va.us.auth0.com/api/v2/",
        grant_type: "client_credentials"
    }, {
        headers: {
            'Content-Type': "application/json"
        }
    } ).then((res)=>{
        return {
            props: {
                access_token: res.data.access_token
            }
        }
    }).catch((e)=>{
        console.log(e)
        return {
            props: {
                access_token: null
            }
        }
    })
    
}