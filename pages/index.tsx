import { Flex, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import { FlexColCenterCenter } from '../utils/FlexConfigs'

const Home: NextPage = () => {
  return (
    <Flex width="100vw" height="100vh" {...FlexColCenterCenter}  >
          <Text fontSize={"20px"} fontWeight="400px" >
            Wassup 👋
          </Text>
    </Flex>
  )
}

export default Home
