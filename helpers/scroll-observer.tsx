import React, { useCallback, useEffect, useState } from 'react'

interface scrollValue {
    scrollY: number
}

export const ScrollContext = React.createContext<scrollValue>({
    scrollY: 0
})


function ScrollObserver({children}: {children: React.ReactNode}) {
    const [scrollY, setScrollY] = useState<number>(0)

    const handleScroll = useCallback(
      () => {
        setScrollY(window.scrollY)
      },
      [],
    )

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }
    , [handleScroll])
    

  return (
    <ScrollContext.Provider value={{scrollY}} >
        {children}
    </ScrollContext.Provider>
    
  )
}

export default ScrollObserver