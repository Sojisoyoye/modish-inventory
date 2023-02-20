import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/login'
import SignIn from './pages/signin'
import DashboardContent from './pages/dashboard'
import Checkout from './pages/checkout'
import { Sale } from './pages/sales'
import SalesDashboard from './pages/sales-overview'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signin',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <DashboardContent />,
  },
  {
    path: '/checkout',
    element: <Checkout />,
  },
  {
    path: '/sale',
    element: <Sale />,
  },
  {
    path: '/sale-overview',
    element: <SalesDashboard />,
  },
])

export default router
