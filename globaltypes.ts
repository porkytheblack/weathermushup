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


export interface ArtistInterface {
    external_urls: {
        spotify: string
    },
    followers: {
        href: string | null,
        total: number
    },
    genres:string,
    href: string,
    id: string,
    images: {
        height: number,
        url: string,
        width: number
    } [],
    name: string,
    popularity: number,
    type: string,
    uri: string
}