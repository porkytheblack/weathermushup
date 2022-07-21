import { Box, Flex, Tooltip, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react'
import Image from 'next/image'
import React, { ReactNode } from 'react'
import { FlexRowStartBetween, FlexRowStartStart } from '../../utils/FlexConfigs'

interface n extends UseRadioProps{
    children: ReactNode | ReactNode[]
}

function WeatherCard(props: n){
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
 
function ChooseWeather({onChange}:{onChange: (val: string)=>void}) {

    const options = [
        "cloudy",
        "rainy",
        "sunny",
        "snowy",
        "windy"
    ]

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "weather",
        defaultValue: "sunny",
        onChange:onChange
    })

    const group = getRootProps()

  return (
    <Flex {...group} {...FlexRowStartBetween} flexWrap="wrap"  >
        {
            options.map((val, key)=>{
                const radio = getRadioProps({value: val})
                return (
                        <WeatherCard key={val} {...radio}>
                            <Image src={`/illustrations/${val}.svg`} width={100} height={150} alt="weather" />
                        </WeatherCard>
                )})
        }
    </Flex>
  )
}

export default ChooseWeather