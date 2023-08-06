import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Checkout from './pages/checkout';
import { Sale } from './pages/sales';
import { SignIn } from './pages/signin';
import { Dashboard } from './pages/dashboard';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SignIn />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
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
    element: <Dashboard />,
  },
]);

export default router;
