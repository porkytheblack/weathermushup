import axios from 'axios'
import { useAtom } from 'jotai'
import React from 'react'
import { useQuery } from 'react-query'
import { BASE_SPOTIFY_URL } from '../helpers/CONSTANTS'
import { authToken } from '../jotai/state'

function useGenres() {
    const [access_token, ] = useAtom(authToken)
    const genre_query = useQuery(["fetch_genre_recommendations"], ()=> axios.get(
        `${BASE_SPOTIFY_URL}/recommendations/available-genre-seeds`, {
            headers: {
                "Authorization": `Bearer ${access_token}`
            }
        }
    ).then(({data})=>data), {
        initialData: {
            genres: [
                
            ]
        }
    })

  return (
    {
        genres: genre_query.data?.genres,
        loading: genre_query.isLoading,
        error: genre_query.isError
    }
  )
}

export default useGenres