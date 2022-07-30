import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";


export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {weather} = req.query 
    console.log(weather)
    axios.get(`https://api.unsplash.com/search/photos?query=${weather}`, {
        headers: {
            "Authorization": `Client-ID ${process.env.UNSPLASH_API_KEY}`
        }
    }).then(({data})=>{
        const images = data.results.map(({width, height, user, color, description, urls, links}: any)=>{
            return({
                width,
                height,
                description,
                color,
                user: {
                    username: user.username,
                    link: user.links.self,
                    profileimages: Object.values(user.profile_image)
                },
                link: links.download,
                urls: Object.values(urls)
            })
        })
        // console.log(images)
        res.status(200).send(images)
    }).catch((e)=>{
        res.status(500).send(e.response.data)
    })
}

export const config = {
    api: {
        externalResolver: true
    }
}