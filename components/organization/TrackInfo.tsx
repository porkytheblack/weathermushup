import { WarningIcon } from '@chakra-ui/icons'
import { Flex, Text } from '@chakra-ui/react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { isEmpty } from 'lodash'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import useTracks from '../../hooks/useTracks'
import { authToken } from '../../jotai/state'
import { FlexColStartStart, FlexRowCenterCenter, FlexRowCenterStart } from '../../utils/FlexConfigs'
import SmallTrackDetails from '../molecules/SmallTrackDetails'
import TrackDetails from '../molecules/TrackDetails'
import { SpotifyWrapperContext } from '../SpotifyPlayerWrapper'

function TrackInfo() {
    const {tracks} = useTracks()
    const {track: mt} = useContext(SpotifyWrapperContext)
    const track = useMemo(()=>{
        console.log(tracks.filter(t=>t.uri === mt?.uri)[0])
        return tracks.filter(t=>t.uri === mt?.uri)[0]
    }, [, mt, tracks])
    const [access_token, ] = useAtom(authToken)
    const [likeTracks, setLikeTracks] = useState<{
        track_image: string,
        track_name: string,
        track_year: string
    }[]>([])
    
    useEffect(()=>{
            const a_id = (track as any)?.artists[0]?.id
        
        console.log(a_id)
        if(!isEmpty(a_id)){
            axios.get(`https://api.spotify.com/v1/artists/${a_id}/top-tracks?market=US`,{
                headers: {
                    "Authorization": `Bearer ${access_token}`
                }
            }).then(({data})=>{
                console.log(data)
                var _tracks = data?.tracks 
                if(!isEmpty(_tracks)){
                    var _ts = _tracks.map((_track: any)=>{
                        return {
                            track_image: _track?.album?.images[1]?.url,
                            track_name: _track?.name,
                            track_year: new Date(_track?.album?.release_date).getFullYear()
                        }
                    })
                    setLikeTracks(_ts)

                }
            }).catch((e)=>{
                console.log(e)
            })
        }
    }, [, track])
  return (
    <Flex w="100%" {
        ...FlexColStartStart
    }  p="20px"  >
        <TrackDetails album_type={(track as any)?.album?.album_type} no_songs={(track as any)?.album?.total_tracks} track_name={track?.name} artists={track?.artists.map((s)=> s.name)} track_year={new Date((track as any)?.album?.release_date).getFullYear().toString()} src={ track?.album?.images[0]?.url } />
        <Flex 
            w="100%"
            {
                ...FlexColStartStart
            }
            pt="10px"
        >
            <Text fontSize="lg" mb="10px" textTransform="uppercase" fontWeight="bold" textDecor={"underline"} textAlign={"left"} w="100%" color="white" >
                More by {track?.artists[0]?.name}
            </Text>
            <Flex w="100%" h="100%" {
                ...FlexRowCenterStart
            } overflowY="scroll" flexWrap={"wrap"} overflowX="hidden" >
                { likeTracks.length > 0 && 
                    (likeTracks.splice(0, 3)).map((likeTrack, index)=>{
                        return (
                            <SmallTrackDetails 
                                key={index}
                                track_image={likeTrack.track_image}
                                track_name={likeTrack.track_name}
                                track_year={likeTrack.track_year.toString()}
                            />
                        )
                    })
                }
                {
                    likeTracks.length === 0 && <Flex w="100%" h="100%" {...FlexRowCenterCenter} >
                        <WarningIcon color="white" fontSize="lg" ml="20px" />
                        <Text fontSize="lg" fontWeight="semibold" color="white" >
                            No tracks found
                        </Text>
                    </Flex>
                }
            </Flex>
        </Flex>
    </Flex>
  )
}

export default TrackInfo
                