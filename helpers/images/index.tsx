import axios from "axios"
import { BASE_URL } from "../CONSTANTS"


export const get_images = () => new Promise((res, rej)=>{
    axios.get(`${BASE_URL}/api/unsplash/weatherimages`).then(({data})=>{
        console.log(data)
        res(data)
    }).catch((e)=>{
        console.log(e.response.data)
        rej(e)
    })
})