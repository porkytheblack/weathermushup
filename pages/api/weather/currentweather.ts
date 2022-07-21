import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";



export default function handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const location = req.query.location
    axios.get(
        `${process.env.WEATHER_BASEURL}`,
        {
            headers: {
                "X-RapidAPI-Key": process.env.X_RAPIDAPI_KEY,
                "X-RapidAPI-Host": process.env.X_RAPIDAPI_HOST
            },
            params: {
                q: location
            }
        }
    ).then(({data})=>{
        res.status(200).send(data)
    }).catch((e)=>{
        res.status(500).send(e)
    })
}

export const config =  {
    api: {
        externalResolver: true
    }
}