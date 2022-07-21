import { Flex, Spinner, Text } from '@chakra-ui/react'
import { isNull } from 'lodash'
import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { FlexColCenterCenter, FlexRowCenterCenter } from '../../utils/FlexConfigs'

function StateModal({onClose, promiseAction}:{ onClose: ()=>void, promiseAction: ()=> Promise<any>}) {
  const [execution_state, set_execution_state] = useState<"loading" | "error" | "fullfilled" | "hangon">("hangon")
  const modal_ref = useRef<null|HTMLDivElement>(null)
  useEffect(()=>{
    set_execution_state("loading");
    promiseAction().then(()=>{
      set_execution_state("fullfilled")
      setTimeout(()=>{
        onClose()
      }, 1000)
    }).catch((e)=>{
      console.log(e)
      set_execution_state("error")
    })
  }, [])


  useEffect(()=>{
    const parent = document.getElementById("base")
    const modal = document.getElementById("modal")
    if(isNull(modal) || isNull(parent)) return ()=>{}
    parent?.addEventListener("click", (e)=>{
      if(!e.composedPath().includes(modal)){
        
        setTimeout(()=>{
          onClose()
        }, 1000)
        
      }
    })
  }, [])
    
  return ( 
    <Flex ref={modal_ref} id="base" pos="fixed" zIndex={999} top="0px" left="0px" {...FlexColCenterCenter}  w="100vw" h="100vh" bg="transparent" backdropFilter={"auto"} backdropBlur="4px" >
      <Flex id="modal" {...FlexColCenterCenter} borderRadius="10px" w="50%" h="50%" border="2px solid" borderColor="Highlight" bg="blackAlpha.900"  >
          {
            execution_state == "loading" ? (
              <Flex {...FlexRowCenterCenter}   >
                 <Spinner color="blue" />
                 <Text color="white" fontSize="24px" fontWeight="semibold" ml="5px"  >
                 Working on it...🤖
                 </Text>
              </Flex>
            ) : execution_state == "error" ? (
              <Text color="red" fontSize="24" fontWeight="semibold" >
                That doesn't look good 🤔
              </Text>
            ): execution_state == "fullfilled" ? (
              <Text color="green" fontSize="24" fontWeight="semibold" >
                Good to go 👍
              </Text>
            ): (
              <Text color="yellow" fontSize="24" fontWeight="semibold" >
                in a moment... ⏳
              </Text>
            )
          }
      </Flex>
    </Flex>
  )
}

export default StateModal