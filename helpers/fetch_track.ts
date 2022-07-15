export const fetch_track = () =>{
    axios.put(`https://api.spotify.com/v1/me/player/play?device_id=${current_device}`,JSON.stringify({ uris: track_uris }), {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${access_token}`    
                        }
                    }).then((res)=>{
                        console.log("Connected successfully")
                        window.player.resume()
                    }).catch((e)=>{
                        console.log(e)    
                        console.log("An error occured while making the request")
                        })
}