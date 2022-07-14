import { useAuth0 } from '@auth0/auth0-react'
import { isUndefined } from '@chakra-ui/utils'
import { isNull } from 'lodash'
import { useRouter } from 'next/router'
import React, { createContext, ReactNode, useEffect, useState } from 'react'
import ScrollObserver from '../helpers/scroll-observer'

export interface player_interface  {
    paused: boolean,
    auth_erro: boolean,
    init_error: boolean,
    current_time: number,
    duration: number
}

export interface SpotifyAuthContextInterface {
  spotify_refres_token: string,
  spotify_token: string,
  get_spotify_auth?: ({token, refresh}:{token: string, refresh: string})=>void,
}

export const SpotifyAuthContext = createContext<SpotifyAuthContextInterface>({spotify_refres_token: "", spotify_token: ""})

function Layout({children}:{children: ReactNode}) {

  const {user, isLoading, isAuthenticated, error} = useAuth0()
  const {push} = useRouter()

  useEffect(()=>{
      if(!isNull(user) && !isUndefined(user) && isAuthenticated && !isLoading && isNull(error)){
        push("/player")
      } 
  }, [,user, error, isLoading, isAuthenticated, push])

  const [spotify_refres_token, set_spotify_refresh_token] = useState<string>("")
  const [spotify_token, set_spotify_token] = useState<string>("")
  const get_auth = ( {token, refresh} : {token: string, refresh: string})=>{
    set_spotify_refresh_token(refresh)
    set_spotify_token(token)
  } 

  return (
    <SpotifyAuthContext.Provider value={{spotify_refres_token, spotify_token}}  >
 
    <ScrollObserver>
        {children}
    </ScrollObserver>
         
    </SpotifyAuthContext.Provider>
  )
}

export default Layout