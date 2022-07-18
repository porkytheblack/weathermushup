/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, chakra, IconButton, Icon } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons"
import Image from 'next/image'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FlexColCenterBetween, FlexColCenterCenter, FlexColCenterEnd, FlexColCenterStart, FlexRowCenterAround, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd } from '../utils/FlexConfigs'
import { PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { SpotifyAuthContext } from '../Layout'
import { useAtom } from 'jotai'
import { authToken, player_state_atom, state_tick } from '../jotai/state'
import usePlayer from '../hooks/usePlayer'
const NewPlayer = dynamic(import("../components/NewPlayer"), {
    ssr: false
})
import dynamic from 'next/dynamic'
import { isNull, isUndefined } from 'lodash'
import LocationButton from '../components/LocationButton'

function Player({access_token}: {access_token: string | null}) {
    const {user, logout} = useAuth0()
    const [spotify_token, set_spotify_token] = useState<string>("")
    const [, set_access_token] = useAtom(authToken)
    const [track, set_track] = useState<Spotify.Track| null>(null)
    const [state, ] = useAtom(player_state_atom)
    const [tick, ]  =useAtom(state_tick)

    
   

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
                set_access_token(id.access_token)
            }).catch((e)=>{
                console.log(e)
            })  
        }
       
     

    }, [,user])

    useEffect(()=>{
        window?.player?.getCurrentState().then((state: Spotify.PlaybackState | null)=>{
            if(state){
                console.log(state.track_window.current_track)
                set_track(state.track_window.current_track)
            }
        }).catch((e)=>{
            console.log("Unable to get current state")
        })
    }, [state,tick])
  return (
    <Flex justify={"flex-start"} alignItems="flex-start" pos="relative" backgroundImage={"/unsplash_images/raining.jpg"} backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw" height="100vh"  >
            <Flex {...FlexColCenterCenter} width="65%" height="100%"  >
                <Flex {...FlexColCenterStart}   width="80%" height="90%" >
                    <Flex {...FlexRowCenterBetween} width="100%" marginBottom={"20px"}  >
                        <IconButton onClick={()=>{logout()}} aria-label='hamburger_icon' bg="none" _active={{background: "none"}} _hover={{background: "none"}} >
                                <HamburgerIcon color="white" fontSize="24px" /> 
                        </IconButton>
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
                           <NewPlayer/>
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
                <LocationButton/>
            </Flex>
            
    </Flex>
  )
}

export default Player


export async function getServerSideProps(context: any ){
    return axios.post("https://dev-1r9889va.us.auth0.com/oauth/token", {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
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
        console.log("Error fetching access token")
        console.log(e)
        return {
            props: {
                access_token: null
            }
        }
    })
    
}