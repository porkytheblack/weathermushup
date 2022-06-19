import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const access_token = req.body.auth_token
    console.log(access_token)
    const current_weather = req.body.current_weather
    axios.get(`https://api.spotify.com/v1/search?q=${current_weather}&type=track`, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        }
    }).then((_res)=>{ 
        console.log(_res.data)
        res.status(200).send(_res.data)
    }).catch((e)=>{
        console.log("An error occured")
        res.status(500).send(e)
        
    })
}