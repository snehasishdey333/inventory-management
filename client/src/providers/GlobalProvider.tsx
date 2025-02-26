"use client"
import { Authenticator } from '@aws-amplify/ui-react'
import React from 'react'
import Auth from './authProvider'

const GlobalProvider = ({children}:{children:React.ReactNode}) => {
  return (
    <Authenticator.Provider>
        <Auth>
        {children}
        </Auth>
    </Authenticator.Provider>
  )
}

export default GlobalProvider