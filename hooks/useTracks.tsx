import axios from 'axios'
import { useAtom } from 'jotai'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { authToken } from '../jotai/state'

function useTracks() {
    const [access_token, ] = useAtom(authToken)
    const [current_playlist, set_current_playlist] = useState<string>("")
    
    const playlists_query  = useQuery([current_playlist, access_token],()=> axios.get("/api/spotify/weathertracks", {
        params: {   
            access_token: access_token,              
            current_weather: "imagine dragons"
        }   
    }).then((res)=>res.data))              
    const [track_uris, set_track_uris] = useState<string[]>([])

    useEffect(()=>{    
        console.log("Access token", access_token)
        const {isLoading, isError, data} = playlists_query
        if(isLoading || isError || data == null || typeof data == "undefined" ) return ()=>{}
        var uris = playlists_query.data.tracks.items.map((item: any)=>item.uri)
        set_track_uris(uris)
    }, [,playlists_query.isError, playlists_query.isLoading])

  return (
    {
        loading_playlists: playlists_query.isLoading,
        error_playlists: playlists_query.isError,
        pl_error: playlists_query.error,
        track_uris
    }
  )
}

export default useTracks