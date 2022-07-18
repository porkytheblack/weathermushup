import { useAuth0 } from '@auth0/auth0-react'
import { Button, Divider, Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isNull } from 'lodash'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ChooseWeather from '../components/Selection/ChooseWeather'
import GenreSelection from '../components/Selection/GenreSelection'
import LocationButton from '../components/LocationButton'
import { authToken, setup_atom, user_location_atom } from '../jotai/state'
import { FlexColCenterCenter, FlexColCenterStart, FlexRowCenterBetween, FlexRowCenterCenter } from '../utils/FlexConfigs'
import ArtisitSelection from '../components/Selection/ArtisitSelection'
import MoodSelection from '../components/Selection/MoodSelection'
import StateModal from '../components/StateModals'

function Setup({access_token}: {access_token: string | null}) {
    const [question, set_question] = useState<"location"| "mood" | "artist" | "genre" | "weather">("location")
    const [user_loc, set_loc] = useAtom(user_location_atom)
    const [, set_access_token] = useAtom(authToken)
    const {user, logout} = useAuth0()
    const {push} = useRouter()
    const [prev_setup, set_setup] = useAtom(setup_atom)
    



    useEffect(()=>{

        if(isNull(user)){
            push("/")
        }

        if(typeof user !== "undefined"){
            axios.get(`https://dev-1r9889va.us.auth0.com/api/v2/users/${user?.sub}`, {
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            }).then((res)=>{
                const id = res.data.identities[0]
                set_access_token(id.access_token)
            }).catch((e)=>{
                console.log(e)
            })  
        }
    }, [,user])


    const next_question = (dir: "next" | "back") =>{
        if(dir == "next"){
            if(question == "location"){
                if(user_loc == null) return set_question("weather")
                set_question("mood")
            } 
            if(question == "weather") return set_question("mood")
            if(question == "mood") return set_question("artist")
            if(question == "artist") return set_question("genre")
        }else if(dir == "back"){
            if(question == "genre") return set_question("artist")
            if(question == "artist") return set_question("mood")
            if(question == "mood") return set_question("location")
        }
    }

    const out = () =>{
        Promise.all([logout()]).then(()=>{
            push("/")
        }).catch((e)=>{
            push("/")
        })
    }
  return (
    <Flex pos="relative" backgroundImage={"/unsplash_images/listening_from.jpg"} bgSize="cover" bgRepeat={"no-repeat"} {...FlexRowCenterBetween}  w='100vw' h='100vh' overflow="hidden" >
        <StateModal>

        </StateModal>
        <Flex width="100%" height="100%"  {...FlexRowCenterBetween}  backdropFilter={"auto"} backdropBlur="12px"  >

            <Flex order={["location", "artist"].includes(question) ? 1 : 2} pos="relative" w='50%' h='100vh' {...FlexColCenterCenter}  >
                    {question == "location" &&<>
                        <Text color="white" mb="10px" textAlign={"center"} fontSize="24px" fontWeight="semibold" >
                            Where are you listenting from ?
                        </Text>
                        <Text  color="white" fontSize="18px" fontWeight={"semibold"} >
                            Letting us know, lets you enjoy the full experience
                        </Text>
                    </>}

                    {
                        question == "weather" && <Flex w="100%" {...FlexColCenterStart} >
                            <Text color="white" mb="10px" textAlign={"center"} fontSize="24px" fontWeight="semibold" >
                                Choose your weather
                            </Text>
                            <Text mb="20px"  color="white" fontSize="18px" fontWeight={"semibold"} >
                                We usually use your location to determine this, but...
                            </Text>
                            <ChooseWeather onChange={(weather)=>{
                                set_setup({
                                    ...prev_setup,
                                    weather
                                })
                            }}/>
                        </Flex>
                    }
                    {
                        question == "genre" && <Flex w="100%" {...FlexColCenterStart} >
                        <Text color="white" mb="10px" textAlign={"center"} fontSize="24px" fontWeight="semibold" >
                            What kinda music do you feel like now 😎
                        </Text>
                        <Text mb="20px"  color="white" fontSize="18px" fontWeight={"semibold"} >
                            To make your playlist better tell us exactly what you need
                        </Text>
                        <GenreSelection onChange={(genre)=>{
                            set_setup({
                                ...prev_setup,
                                genre
                            })
                        }} />
                    </Flex>
                    }
                    {
                        question == "artist" && <Flex w="100%" {...FlexColCenterStart} >
                        <Text color="white" mb="10px" textAlign={"center"} fontSize="24px" fontWeight="semibold" >
                            We know you like them all, but choose one 😁
                        </Text>
                        <Text mb="20px"  color="white" fontSize="18px" fontWeight={"semibold"} >
                            To make your playlist better tell us exactly who you want to hear
                        </Text>
                        <ArtisitSelection onChange={(artist)=>{
                            set_setup({
                                ...prev_setup,
                                artist
                            })
                        }} />
                    </Flex>
                    }
                    {
                        question == "mood" && <Flex w="100%" {...FlexColCenterStart} >
                        <Text color="white" mb="10px" textAlign={"center"} fontSize="24px" fontWeight="semibold" >
                            How are you feeling ?
                        </Text>
                        <Text mb="20px"  color="white" fontSize="18px" fontWeight={"semibold"} >
                        It's one of these..., right 😁
                        </Text>
                        <MoodSelection onChange={(mood)=>{
                            set_setup({
                                ...prev_setup,
                                mood
                            })
                        }} />
                    </Flex> 
                    }
                    
                    <Flex {...FlexColCenterCenter} w="100%" mt="20px" >
                        {["weather", "location"].includes(question) && <>
                        {question == "location" &&  <LocationButton/>  }
                        <Flex {...FlexRowCenterCenter} w="100%" padding="10px"  >
                            <Text  color="white" fontSize="18px" fontWeight={"semibold"} >
                                Or
                            </Text>
                        </Flex>
                        </>}
                        <Button w="300px" onClick={()=>next_question("next")} >
                            Continue
                        </Button>
                    </Flex>
            </Flex>
            <Flex order={["location", "artist"].includes(question) ? 2 : 1} w="50%" h="100vh" {...FlexColCenterCenter}  >
                <Image src={`/illustrations/${question == "location" ? "location" : question == "mood" ? "mood" : question == "artist" ? "musician" : question == "genre" ? "dance" : "sunny"}.svg`} width="500px"   height="500px" alt="Location" />
            </Flex>
            <Flex pos="absolute" bottom="10px" {...FlexColCenterCenter} w="100%" >
                {!["location", "weather"].includes(question) && <Button disabled={question == "location" || question == "weather"} onClick={()=>{
                    next_question("back")
                }} >
                <Text  fontSize="18px" color="black" fontWeight={"medium"} >
                    👈  Forgot to add something, go back
                </Text>
                </Button>}
                {
                    ["location", "weather"].includes(question) && <Button onClick={out} >
                        <Text  fontSize="18px" color="black" fontWeight={"medium"} >
                            👈  Back to Login
                        </Text>
                    </Button>
                }
                <Text fontSize="18px" color="white" fontWeight={"medium"} >  
                    {
                        question !== "genre" ?
                        (
                            `Only ${question == "location" || question == "weather" ? 3 : question == "mood" ? 2 : 1 } left 👉`
                        ): "This is the last one, promise 😉"
                    }
                </Text>
                
            </Flex>
        </Flex>
        
    </Flex>
  )
}

export default Setup



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