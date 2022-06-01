import React from 'react'
import {Navigate} from 'react-router-dom'

export default function PrivateRoute({isAuthenticated, component: Component, ...rest}) {
  return (
    isAuthenticated ? Component : <Navigate to="/" />
  )
}
