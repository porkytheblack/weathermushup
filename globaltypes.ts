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

export interface ImageInfo {
    width: number,
                height: number,
                description: string,
                color: string,
                user: {
                    username: string,
                    link: string,
                    profileimages: string[]
                },
                link: string,
                urls:string[]
            }