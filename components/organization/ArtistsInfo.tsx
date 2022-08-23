import { Button, Flex, Text } from '@chakra-ui/react'
import { ContactPageOutlined } from '@mui/icons-material'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isEmpty, isNull, isUndefined } from 'lodash'
import React, { useContext, useEffect, useMemo } from 'react'
import { ArtistInterface } from '../../globaltypes'
import useTracks from '../../hooks/useTracks'
import { authToken } from '../../jotai/state'
import { FlexColCenterCenter, FlexColStartStart, FlexRowCenterStart, FlexRowStartBetween } from '../../utils/FlexConfigs'
import ArtistImage from '../atoms/ArtistImage'
import ArtistDetails from '../molecules/ArtistDetails'
import { SpotifyWrapperContext } from '../SpotifyPlayerWrapper'

function ArtistsInfo() {
    const {track: t} = useContext(SpotifyWrapperContext)
    const [access_token ,] = useAtom(authToken)
    const {tracks} = useTracks()
    const track = useMemo(()=>{
        return tracks.filter(tr=>tr.uri === t?.uri)[0]
    }, [, t, tracks])
    const artists = useMemo(async()=>{
        var track = tracks.filter(tr=>tr.uri === t?.uri)[0]
        if(!isEmpty(track) && !isUndefined(track)){
            var artist_ids = track?.artists.map((a: any)=>a.id)
            var artist_data  =  await Promise.all(artist_ids?.map(async (id: string)=>{
                return  axios.get(`https://api.spotify.com/v1/artists/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${access_token}`,
                        "Content-Type": "application/json"
                    }
                }).then(({data})=>{
                    console.log(data)
                    return data
                }).catch((e)=>{
                    console.log(e)
                    return null
                })
            })).then((data)=>{
                console.log(data) 
                return 
            }).catch((e)=>{
                console.log(e)
                return null
            })
            return isNull(artist_data) ? [] : artist_data
        }else{
            return []
        }
    }, [, tracks, t, access_token])

    useEffect(()=>{
        console.log(artists)
    }, [,artists])
  return (
    <Flex {
        ...FlexColStartStart
    } w="100%" >
        <Flex {...FlexRowCenterStart} w="100%" >
            <Flex p="20px" h="100%" {
                ...FlexColCenterCenter
            } >
                <ArtistImage />
            </Flex>
            <Flex {...FlexColStartStart}  h="100%" p="10px 20px"   >
                <ArtistDetails artist_name={((artists[0] as ArtistInterface )?.name as string )} />
                <Flex w="100%" p="20px" {...FlexRowCenterStart} >
                    <Button>
                        <Text fontSize="sm" fontWeight="semibold" color="black" >
                            Follow
                        </Text>
                    </Button>
                </Flex>
            </Flex>
        </Flex>
        {
            track?.artists?.length > 1 && <Flex w="100%" {...FlexRowStartBetween} flexWrap="wrap" >
                
            </Flex>
        }

        
    </Flex>
  )
}

export default ArtistsInfo