import { Global } from '@emotion/react'
import React from 'react'

function GlobalStylesConfig() {
  return (
    <Global styles={`
        *{
            box-sizing: border-box;
        }
        html, body{
            overflow-x:hidden;
        }
    `} />
  )
}

export default GlobalStylesConfig