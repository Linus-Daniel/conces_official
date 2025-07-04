"use client"

import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

function Wrapper(
    {children}:{children:ReactNode}
) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default Wrapper

