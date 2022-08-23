import { Box, useRadio, useRadioGroup, VStack } from '@chakra-ui/react'
import { atom, useAtom } from 'jotai'
import { isUndefined } from 'lodash'
import React, { useContext } from 'react'
import { SpotifyWrapperContext } from '../SpotifyPlayerWrapper'

export const sideMenuNavAtom = atom<"artists"|"about">("about")


const RadioButton = (props: any) =>{
    const {getInputProps, getCheckboxProps} = useRadio(props)
    const input = getInputProps()
    const checkbox = getCheckboxProps()

    return (
        <Box w="100%"   as='label'>
            <input {...input} />
            <Box
                {...checkbox}
                cursor='pointer'
                borderWidth='1px'
                borderRadius='md'
                boxShadow='md'
                _checked={{
                bg: 'teal.600',
                color: 'white',
                borderColor: 'teal.600',
                }}
                _focus={{
                boxShadow: 'outline',
                }}
                px={5}
                py={3}
            >
                {props.children}
            </Box>
            </Box>
    )
}

function SideMenu() {
    const [, setNav]  = useAtom(sideMenuNavAtom)
    const {set_track_active_tab} = useContext(SpotifyWrapperContext)

    const options : ("Track"| "Artists")[] = [ 
        "Track",
        "Artists",
    ]

    const { getRootProps, getRadioProps } = useRadioGroup({
        name: 'option',
        defaultValue: 'Track',
        onChange: (val: "Track" | "Artists")=>{
                if(!isUndefined(set_track_active_tab)){
                    set_track_active_tab(val)
                }
        },
      })
    
      const group = getRootProps()


  return (
    <VStack h="100%" w="200px" bg="whiteAlpha.200" rounded="lg" {
        ...group
    } >
        {
            options.map((val)=>{
                const radio = getRadioProps({value: val})
                return (
                    <RadioButton mb="20px" key={val} {...radio}>
                        {
                            val 
                        }
                    </RadioButton>
                )
            })
        }
    </VStack>
  )
}

export default SideMenu