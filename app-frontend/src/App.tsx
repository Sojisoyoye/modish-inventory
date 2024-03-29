import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SignIn } from './pages/signin'
// import { Dashboard } from './pages/dashboard';
import { Dashboard } from './pages/dashboard'
import { LandingPage } from './pages/landing-page'
import Layout from './components/layout'
import ProtectedRoute from './ProtectedRoutes'
import { CreateProduct } from './pages/create-product'
import { ProductsPage } from './pages/products-page'
import { ErrorPage } from './pages/Error/error'
import { AuthProvider } from './hooks/useAuth'
import { SalesForm } from './components/sales-form'
import SaleReview from './components/sale-review'
import { StepperProvider } from './hooks/useStepper'

function App() {
  const queryClient = new QueryClient()
  return (
    <AuthProvider>
      <StepperProvider>
        <QueryClientProvider client={queryClient}>
          <Routes>
            <Route index element={<LandingPage />} />
            <Route path="/login" element={<SignIn />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Layout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product" element={<CreateProduct />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/sale" element={<SalesForm />} />
                <Route path="/sale-review" element={<SaleReview />} />
                <Route path="*" element={<ErrorPage />} />
              </Route>
            </Route>
          </Routes>
        </QueryClientProvider>
      </StepperProvider>
    </AuthProvider>
  )
}

export default App
