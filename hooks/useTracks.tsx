import axios from 'axios'
import { useAtom } from 'jotai'
import { isEmpty, isNull, isNumber, isString, isUndefined } from 'lodash'
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { authToken, CurrentDeviceAtom, current_filter, current_track_atom, next_uri_atom, player_state_atom, tick_up_device } from '../jotai/state'

function useTracks() {
    const [access_token, ] = useAtom(authToken)
    const [offset_filter, set_offset_filter] = useState<string>("&offset=0&limit=2")
    const [current_playlist, set_current_playlist] = useState<string>("")
    const [current_query, set_current_query] = useState<string>("Running up the hill by kate bush")
    const [next_uri, set_next_uri] = useAtom(next_uri_atom)
    const [current_device, set_it] = useAtom(CurrentDeviceAtom)
    const [fetch_limit, ] = useState(20)
    const [, up_device] = useAtom(tick_up_device)
    const [filter, ] = useAtom(current_filter)
    const [player_state, ] = useAtom(player_state_atom)
    // const [current_track, set_track ] = useAtom(current_track_atom)
    
    const playlists_query  = useQuery([current_playlist, access_token, offset_filter, filter],()=> axios.get(`https://api.spotify.com/v1/search?q=${filter}&type=track${offset_filter}`, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"   
        }
    }).then((res)=>res.data), {
        enabled: !isNull(access_token)
    })              


    const player_query = useQuery(["player", current_device, access_token, player_state], ()=>axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${current_device}`,JSON.stringify({ uris: track_uris }), {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`    
        }
    }).then((res)=>{   
        console.log("Done fetching")
        if(!isNull(window.player) && !isUndefined(window.player)){
            window.player?.resume().then(()=>console.log("Resumed Player")).catch((e)=>console.log("Unable to resume player"))
        }else{
            console.log("Player is Null or Undefined")
        }
    }).catch((e)=>{
        console.log(e) 
        up_device()
        set_it("")
        window.player = null
        }), {
            enabled: false
        })


    const [track_uris, set_track_uris] = useState<string[]>([])

    useEffect(()=>{    
        console.log("Access token", access_token)
        const {isLoading, isError, data} = playlists_query
        if(isLoading || isError || data == null || typeof data == "undefined" ) return ()=>{}
        var uris = playlists_query.data.tracks.items.map((item: any)=>item.uri)
        set_track_uris(uris) 
        set_next_uri(playlists_query.data.tracks.next)
    }, [,playlists_query.isError, playlists_query.isLoading, playlists_query.data])

    

    useEffect(()=>{
        if(!isEmpty(playlists_query.data) && !isEmpty(current_device)){
            player_query.refetch()
        }
    }, [current_device, playlists_query.data])

    const fetch_next = (prev?: boolean) =>{
        const parsed = parseUrl(next_uri)
        if(isUndefined(prev) || (!isUndefined(prev) && !prev)){
            var offset = `&offset=${parsed.query.offset}&limit=${fetch_limit}`
            set_offset_filter(offset)
        }else{
            if(isString(parsed.query.offset)  && isString(parsed.query.limit)){
                var n = parseInt(parsed.query.offset)
                var m = parseInt(parsed.query.limit)
                if(isNumber(n*m)){
                    if(n !== 0){
                        var off = `&offset=${n-1}&limit=${1}`
                        set_offset_filter(off)
                    }
                }
            }
            
        }
        
        
    }



    

  return (
    {
        loading_playlists: playlists_query.isLoading,
        error_playlists: playlists_query.isError,
        pl_error: playlists_query.error,
        track_uris,
        fetch_next,
        offset_filter,
        try_refetch: player_query.refetch
    }
  )
}

export default useTracks