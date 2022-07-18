import { Flex } from '@chakra-ui/react'
import React, { ReactNode, useEffect } from 'react'
import { FlexColCenterCenter } from '../../utils/FlexConfigs'

function StateModal({children}:{children: ReactNode | ReactNode[]}) {

  useEffect(()=>{
    const parent = document.getElementById("base")
    const modal = document.getElementById("modal")
    parent?.addEventListener("click", (e)=>{
      // if(e.composedPath().includes(modal.)
    })
  }, [])
    
  return ( 
    <Flex id="base" pos="fixed" zIndex={999} top="0px" left="0px" {...FlexColCenterCenter}  w="100vw" h="100vh" bg="transparent" backdropFilter={"auto"} backdropBlur="4px" >
      <Flex id="modal" {...FlexColCenterCenter} borderRadius="10px" w="50%" h="50%" border="2px solid" borderColor="Highlight" bg="blackAlpha.900"  >

      </Flex>
    </Flex>
  )
}

export default StateModal