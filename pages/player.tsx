/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isEmpty, isNull, isUndefined } from 'lodash'
import { NextPageContext } from 'next'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import PagePlayerComponent from '../components/Pages/Player'
import SpotifyPlayerWrapper, { SpotifyWrapperContext } from '../components/SpotifyPlayerWrapper'
import DataModal from '../components/StateModals/DataModal'
import { ImageInfo } from '../globaltypes'
import { BASE_URL } from '../helpers/CONSTANTS'
import { get_images } from '../helpers/images'
import { authToken } from '../jotai/state'


function Player({access_token, images}: {access_token: string | null, images: ImageInfo[]}) {
    const {user, logout} = useAuth0()
    const [spotify_token, set_spotify_token] = useState<string>("")
    const [, set_access_token] = useAtom(authToken)
    const [track, set_track] = useState<Spotify.Track| null>(null)
    const [r, set_r] = useState<number>(0)

    useEffect(()=>{
        set_r(r+1)
    }, [])

    useEffect(()=>{
        console.log(`Rerender ${r}`)
    }, [r])

    const { push, events } = useRouter()

    const get_random = (len: number) => Math.floor(Math.random() * len)
    // const memo_image = useMemo(()=>images[get_random(images?.length)], [
    //     track
    // ])

    useEffect(()=>{
        console.log("New Rerender")
    }, [])
    // const {player} = useContext(SpotifyWrapperContext)


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
        
     

    }, [])

    // useEffect(()=>{
    //     events.on("routeChangeStart", (url)=>{
    //         if(url?.includes("setup")){
    //             console.log("Going to setup")
    //             if(!isUndefined(player) && !isNull(player)) {
    //                 player.disconnect()
    //             }
    //         }
    //     })
    // }, [])
   

    

  return (
    <SpotifyPlayerWrapper>
        <PagePlayerComponent images={images}  />
    </SpotifyPlayerWrapper>
  )
}

export default React.memo(Player)


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