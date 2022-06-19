import { useAuth0 } from '@auth0/auth0-react'
import { Flex, Text, chakra } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Image from 'next/image'
import { FlexColCenterCenter, FlexRowCenterCenter } from '../utils/FlexConfigs'

const Home: NextPage = () => {
  const {loginWithPopup} = useAuth0()
  return (
    <Flex width="100vw" backgroundImage={"/unsplash_images/music_waves.png"} backgroundSize="cover" backgroundRepeat={"no-repeat"}  height="100vh" {...FlexColCenterCenter}  >
          <Flex width="80%" height={"80%"} borderRadius="8px" backdropFilter={"auto"} background="transparent" backdropBlur={"24px"} overflow="hidden" >
            <Flex w="50%" h="100%" alignItems={"center"} {...FlexColCenterCenter} >
              <Image src="/illustrations/happy_music.svg" width="300px" height="300px" />
              <chakra.p textAlign={"center"} >
                  If it raining outside, get <br /> under a blanket and listen in
              </chakra.p>
            </Flex>
            <Flex {...FlexColCenterCenter} w="50%" h="100%"  >
                <chakra.button borderRadius={"999px"} onClick={loginWithPopup}  overflow="hidden" display={"flex"} flexDir="row" alignItems="center" justifyContent={"space-between"} bg="none"  _active={{border: "1px solid white", scale: "0.95"}} _pressed={{outline: "1px solid white", scale: "0.95"}} padding="5px 10px"  >
                        <Image src="/icons/spotify.svg" height="50px"  width="50px"  />
                        <chakra.p marginLeft={"20px"} >
                          Sign In
                        </chakra.p>
                </chakra.button>
            </Flex>
          </Flex>      
    </Flex>
  )
}

export default Home