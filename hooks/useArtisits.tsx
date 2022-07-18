import axios from 'axios'
import { useAtom } from 'jotai'
import { isNull, isUndefined } from 'lodash'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { BASE_SPOTIFY_URL, ME_SPOTIFY_URL } from '../helpers/CONSTANTS'
import { authToken } from '../jotai/state'

interface extendedArtist extends Spotify.Artist {
    external_urls : {
        spotify : string
      },
      followers : {
        href : null | string,
        total : number
      },
      genres : string[],
      href : string,
      id : string,
      images :  {
        height : number,
        url : string,
        width : number
      } [],
      name : string,
      popularity : number,
      type : string,
      uri : string
}

function useArtisits() {
    const [access_token, ] = useAtom(authToken)
    const [artisits, set_artisits] = useState<extendedArtist[]>([])
    const {data, isLoading, isError, error} = useQuery(["artists_query"], ()=>axios.get(
        `${ME_SPOTIFY_URL}/following?type=artist&offset=0&limit=30`, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/json"
            }
        }
    ).then((res)=>res.data),
    {
        enabled: !isNull(access_token)
    }
    )
    
    useEffect(()=>{
        if(isNull(data) || isUndefined(data) || isLoading || isError|| !isNull(error)) return ()=>{}
        set_artisits(data.artists.items)
        console.log(data.artists.items)
        
    }, [data, isLoading, isError, error])
    return (
        {
            artisits,
            loading: isLoading,
            error,
            isError
        }
    )
}

export default useArtisits