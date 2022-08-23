import { Flex } from '@chakra-ui/react'
import { isEmpty, isUndefined } from 'lodash'
import Image from 'next/image'
import React from 'react'

function TrackImage({ src }: { src?: string }) {
  return (
    <Flex w="200px" h="200px" rounded="lg" overflow="hidden"   >
        { !isUndefined(src) && <Image width={200} height={200} src={src} alt={src} />}
    </Flex>
  )
}

export default TrackImage