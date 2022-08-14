/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, chakra, IconButton, Icon, Button, Text } from '@chakra-ui/react'
import { ChevronLeftIcon, ChevronRightIcon, HamburgerIcon } from "@chakra-ui/icons"
import Image from 'next/image'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import { FlexColCenterBetween, FlexColCenterCenter, FlexColCenterEnd, FlexColCenterStart, FlexRowCenterAround, FlexRowCenterBetween, FlexRowCenterCenter, FlexRowCenterEnd } from '../utils/FlexConfigs'
import { PlayArrow } from '@mui/icons-material'
import axios from 'axios'
import { useAuth0 } from '@auth0/auth0-react'
import { useAtom } from 'jotai'
import { authToken, CurrentDeviceAtom, playerNo, player_state_atom, state_tick } from '../jotai/state'
import dynamic from 'next/dynamic'
const NewPlayer = dynamic(import("../components/NewPlayer"), {
    ssr: false
})
import { isEmpty, isNull, isUndefined } from 'lodash'
import { get_images } from '../helpers/images'
import { BASE_URL } from '../helpers/CONSTANTS'
import { ImageInfo } from '../globaltypes'
import { useRouter } from 'next/router'
import { NextPageContext } from 'next'

function Player({access_token, images}: {access_token: string | null, images: ImageInfo[]}) {
    const {user, logout} = useAuth0()
    const [spotify_token, set_spotify_token] = useState<string>("")
    const [, set_access_token] = useAtom(authToken)
    const [track, set_track] = useState<Spotify.Track| null>(null)
    const [state, ] = useAtom(player_state_atom)
    const [tick, ]  =useAtom(state_tick)
    const [, set_player_no] = useAtom(playerNo)
    const [, set_current_device] = useAtom(CurrentDeviceAtom)

    const { push, events } = useRouter()

    const get_random = (len: number) => Math.floor(Math.random() * len)
    const memo_image = useMemo(()=>images[get_random(images.length)], [
        track
    ])

    useEffect(()=>{
        events.on("routeChangeStart", (url)=>{
            if(url.includes("setup")){
                console.log("Going to setup")
                if(!isUndefined(window.player) && !isNull(window.player)) {
                    window.player.disconnect()
                    set_player_no(0)
                    set_current_device("")
                }
            }
        })
    })
   

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
        if(!isEmpty(window.player) && !isUndefined(window.player)){
            window?.player?.getCurrentState().then((state: Spotify.PlaybackState | null)=>{
                if(state){
                    console.log(state.track_window.current_track)
                    set_track(state.track_window.current_track)
                }
            }).catch((e)=>{
                console.log("Unable to get current state")
            })
        }
    }, [state,tick])

  return (
    <Flex justify={"flex-start"} alignItems="flex-start" pos="relative" bg={memo_image.color} backgroundImage={memo_image.urls[0]} backgroundSize="cover" backgroundRepeat="no-repeat" width="100vw" height="100vh"  >
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
            </Flex>
            
    </Flex>
  )
}

export default Player


export async function getServerSideProps(context: NextPageContext ){
    return axios.get(`${BASE_URL}/api/auth0/accesstoken`).then(({data})=>{
        console.log(context.query)
        const {weather} = context.query
        console.log(weather)
        return get_images("night").then((d)=>{
            return {
                props: {
                    access_token: data.access_token,
                images: d
                }
            }
        }).catch((e)=>{
            console.log(e)
        })
        
    }).catch((e)=>{
        return {
            props: {
                access_token: null
            }
        }
    })
    
}