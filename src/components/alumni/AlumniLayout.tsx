

import React, { ReactNode } from 'react'
import Wrapper from './LayoutWrapper'
import ProtectedPage from '../ProtectedRoute'

function AlumniLayout(
    {children}:{children:ReactNode}
) {
  return (
    <ProtectedPage expectedRole='alumni'>

    <Wrapper>
        {children}
    </Wrapper>
    </ProtectedPage>
  )
}

export default AlumniLayout