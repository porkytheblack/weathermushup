import axios from "axios"
import { WeatherInfo } from "../../globaltypes"

export const get_weather = (location: string): Promise<WeatherInfo> => new Promise(async (res, rej)=>{
   await axios.get(`/api/weather/currentweather`, {
        params: {
            location
        }
    }).then(({data})=>{
        const {
            country,
            name,
            region,
            localtime
        } = data.location
        const {
            text
        } = data.current.condition
        
        res({
            location: {
                country,
                region,
                name,
                localtime
            },
            weather_text: text,
            temp: data.current.feelslike_c
        })
    }).catch((e)=>{
        rej(e)
    })
})