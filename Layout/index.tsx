import React, { ReactNode } from 'react'
import ScrollObserver from '../helpers/scroll-observer'

function Layout({children}:{children: ReactNode}) {
  return (
    <ScrollObserver>
        {children}
    </ScrollObserver>
  )
}

export default Layout