import { Box, Flex, Text, Tooltip, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { FlexRowStartBetween, FlexRowStartStart } from '../../utils/FlexConfigs'

interface n extends UseRadioProps{
    children: ReactNode | ReactNode[]
}

function MoodCard(props: n){
    const {getInputProps, getCheckboxProps} = useRadio(props)
    const input = getInputProps()
    const checkbox = getCheckboxProps()
    return (
        <Box bg="whiteAlpha.300" mb="10px" as='label'>
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
 
function MoodSelection({onChange}: {onChange: (val: string)=>void}) {

    const options = [
        "😀 Happy",
        "😕 Meh",
        "😔 Sad",
        "👩‍💻 Like Coding",
        "📕 Study time",
        "😏 This one",
        "😡 Woah, what happened?",
        "🤩 Feeling like a star",
        "🥳 Party mood",
        "🤟 Wild",
        "Nah, no feeling, anything will do"
    ]

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "mood",
        defaultValue: "😀 Happy",
        onChange: onChange
    })

    const group = getRootProps()

  return (
    <Flex {...group} {...FlexRowStartBetween} flexWrap="wrap"  >
        {
            options.map((val)=>{
                const radio = getRadioProps({value: val})
                return (
                        <MoodCard key={val} {...radio}>
                            <Text color="white" >
                            {val}
                            </Text>
                           
                        </MoodCard>
                )})
        }
    </Flex>
  )
}

export default MoodSelection