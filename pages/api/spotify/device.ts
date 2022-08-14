import axios from "axios";
import { isEmpty, isString } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";


export default function Handler (
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        device_id,
        access_token,
        track_uris
    } = req.body

    if(
        !isEmpty(device_id) && !isEmpty(access_token) && isString(access_token) && isString(device_id) && !isEmpty(track_uris)
    ){
        axios.put(
            `https://api.spotify.com/v1/me/player/play?device_id=${device_id}`,
            JSON.stringify({
                uris: track_uris
            }),
            {
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${access_token}`
                }
            }
        ).then((d)=>{
            res.status(200).send(d)
        }).catch((e)=>{
            res.status(500).send(e)
        })
    }else{
        res.status(400).send({
            Error: "Invalid device or token id"
        })
    }
}

export const config =  {
    api: {
        externalResolver: true
    }
}