export interface WeatherInfo {
    location: {
        country: string,
        localtime: Date,
        name: string,
        region: string
    },
    weather_text: string,
    temp: number
}