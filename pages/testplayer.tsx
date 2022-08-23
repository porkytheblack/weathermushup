import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
import NoSSR from "react-no-ssr"

const Testo = dynamic(() => import('../components/testcomponent'), {ssr: false})

const isClient   = ()=> typeof window !== 'undefined'

function TestPlayer() {
  return (
    <div>
        <NoSSR>
            <Testo />
        </NoSSR>
    </div>
  )
}

export default TestPlayer