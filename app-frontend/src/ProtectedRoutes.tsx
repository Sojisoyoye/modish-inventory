import React, { Fragment } from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const token = sessionStorage.getItem('auth_token')

  return (
    <Fragment>
      {!token ? <Navigate to="/login" replace /> : <Outlet />}
    </Fragment>
  )
}

export default ProtectedRoute
