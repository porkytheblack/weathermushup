import axios from "axios";
import { isUndefined } from "lodash";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler   ( 
    req: NextApiRequest,
    res: NextApiResponse
) {
    axios.post(`https://${process.env.domain}/oauth/token`, {
        client_id: process.env.client_id,
        client_secret: process.env.client_secret,
        audience: `https://${process.env.domain}/api/v2/`,
        grant_type: "client_credentials"
    }, {
        headers: {
            'Content-Type': "application/json"
        }
    } ).then(({data})=>{
        res.status(200).send({access_token: data.access_token})
    }).catch((e)=>{
        console.log( isUndefined(e.response) ? e.response : e.response.data)
        res.status(500).send(e)
    })
}

export const config =  {
    api: {
        externalResolver: true
    }
}