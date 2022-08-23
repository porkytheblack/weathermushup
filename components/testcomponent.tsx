import { isUndefined } from 'lodash'
import React, { useEffect } from 'react'

function TestComponent() {
    useEffect(()=>{
        if(!isUndefined(window)){
            console.log(window.location.href)
            console.log("Window is defined")
        }
    }, [])
  return (
    <div>testcomponent</div>
  )
}

export default TestComponent