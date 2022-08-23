import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";



export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
){
    const { current_weather, access_token} = req.query
    if(typeof access_token == "undefined" || typeof current_weather == "undefined" || access_token?.length == 0) return res.status(400).send({Error: "Invalid request"})
    axios.get(`https://api.spotify.com/v1/search?q=${current_weather}&type=track`, {
        headers: {
            "Authorization": `Bearer ${access_token}`,
            "Content-Type": "application/json"
        }
    }).then((_res)=>{ 
        res.status(200).send(_res.data)
    }).catch((e)=>{
        console.log("An error occured")
        res.status(500).send(e)
        
    })
}

export const config =  {
    api: {
        externalResolver: true
    }
}