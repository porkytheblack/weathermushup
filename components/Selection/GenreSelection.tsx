import { CloseIcon } from '@chakra-ui/icons'
import { Box, Flex, Spinner, Text, useRadio, useRadioGroup, UseRadioProps } from '@chakra-ui/react'
import { isNull, isUndefined } from 'lodash'
import React, { ReactNode } from 'react'
import useGenres from '../../hooks/useGenres'
import { FlexColCenterCenter, FlexRowCenterBetween } from '../../utils/FlexConfigs'

interface n extends UseRadioProps{
    children: ReactNode | ReactNode[]
}

function GenreCard(props: n){
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

function GenreSelection({onChange}:{onChange: (val: string)=>void}) {

    const {genres, loading, error} = useGenres()

    const {getRootProps, getRadioProps} = useRadioGroup({
        name: "genres",
        defaultValue: genres[0],
        onChange: onChange
    })

    const group = getRootProps()


  return (
    <Flex {...group} {...FlexRowCenterBetween} h="300px" overflowY={"scroll"} flexWrap="wrap" p="10px 5px" w="90%" >
        {(isNull(genres) || isUndefined(genres) || loading || error) ?
            loading ?  <Flex w="100%" {...FlexColCenterCenter}>
                <Spinner size="lg" />
            </Flex> : error ? <Flex w="100%" {...FlexColCenterCenter}>
                <CloseIcon fontSize={24} color="white"  />
                <Text color="white" fontWeight="semibold" >
                    An error occured
                </Text>
            </Flex> :  <Flex w="100%" {...FlexColCenterCenter}>
                <Text color="white" fontWeight="semibold" >
                    Hang On ... 🤖
                </Text>
            </Flex>  :  genres.map((genre: string)=>{
                const radio = getRadioProps()
                return (
                    <GenreCard key={genre} {...radio} >
                        <Text color="white" fontSize="20px" >
                            {
                                genre
                            }
                        </Text>
                    </GenreCard>
                )
            })
        }
    </Flex>
  )
}

export default GenreSelection