import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Spinner, Text, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react'
import { isArray, isNull, isUndefined } from 'lodash'
import Image from 'next/image'
import React, { ReactNode, useState } from 'react'
import useArtisits from '../../hooks/useArtisits'
import useGenres from '../../hooks/useGenres'
import { FlexColCenterCenter, FlexRowCenterBetween } from '../../utils/FlexConfigs'

interface n extends UseRadioProps{
    children: ReactNode | ReactNode[]
}

function ArtisitCard(props: n){
    const {getInputProps, getCheckboxProps} = useRadio(props)
    const input = getInputProps()
    const checkbox = getCheckboxProps()
    

    return (
        <Box bg="whiteAlpha.500" mb="10px" as='label'>
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

function ArtisitSelection({onChange}:{onChange: (val:string)=>void}) {

    const {artisits, loading, error} = useArtisits()

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "artisits",
        defaultValue: isArray(artisits) ? artisits[0]?.name : "",
        onChange: onChange
    })

    const group = getRootProps()


  return (
    <Flex {...group} {...FlexRowCenterBetween} h="300px" overflowY={"scroll"} flexWrap="wrap" p="10px 5px" w="90%" >
        {(isNull(artisits) || isUndefined(artisits) || loading || error) ?
            loading ?  <Flex w="100%" {...FlexColCenterCenter}>
                <Spinner size="lg" color="green" />
            </Flex> : error ? <Flex w="100%" {...FlexColCenterCenter}>
                <CloseIcon fontSize={24} color="white"  />
                <Text color="white" fontWeight="semibold" >
                    An error occured
                </Text>
            </Flex> :  <Flex w="100%" {...FlexColCenterCenter}>
                <Text color="white" fontWeight="semibold" >
                    Hang On ... 🤖
                </Text>
            </Flex>  :  artisits?.map((artist)=>{
                const radio = getRadioProps({value: artist.name})
                return (
                    <ArtisitCard key={artist.name} {...radio} >
                        <Text color="white" >
                            {artist.name}
                        </Text>
                    </ArtisitCard>
                )
            })
        }
    </Flex>
  )
}

export default ArtisitSelection