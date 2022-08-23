import { Flex } from '@chakra-ui/react'
import { isEmpty, isUndefined } from 'lodash'
import Image from 'next/image'
import React from 'react'
import { FlexColCenterCenter } from '../../utils/FlexConfigs'

function ArtistImage({
    src,
}: {
    src?:string
}) {
  return (
    <Flex rounded="full" w="200px" h="200px" overflow="hidden" {...FlexColCenterCenter} >
        { (!isEmpty(src) &&  !isUndefined(src) ) &&  <Image src={src}  width="200px" height="200px" alt="artist_image" />}
    </Flex>
  )
}

export default ArtistImage