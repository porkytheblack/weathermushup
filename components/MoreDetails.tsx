import { Flex } from '@chakra-ui/react'
import React from 'react'
import { FlexRowCenterCenter, FlexRowStartStart } from '../utils/FlexConfigs'

function MoreDetails() {
  return (
    <Flex  
        {
            ...FlexRowCenterCenter
        }
        w="100vw"
        h="100vh"
        bg="transparent" 
        backdropBlur="12px"
        backdropFilter="auto"
        zIndex={999}
        pos="fixed"
        top="0px"
    >
        <Flex 
        {
            ...FlexRowStartStart
        }
        w="80%" 
        h="80%" 
        bg="blackAlpha.300" 
        borderColor={"ActiveBorder"} 
        borderRadius="10px" >
            
        </Flex>

    </Flex>
  )
}

export default MoreDetails