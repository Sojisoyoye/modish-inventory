import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SignIn } from './pages/signin';
// import { ErrorPage } from './pages/Error/Error';
// import { Dashboard } from './pages/dashboard';
import { Dashboard } from './pages/dashboard';
import { LandingPage } from './pages/landing-page';
import { CreateSale } from './pages/create-sale';
import Layout from './components/layout';
import ProtectedRoute from './ProtectedRoutes';
import { CreateProduct } from './pages/create-product';

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<SignIn />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/product" element={<CreateProduct />} />
          <Route path="/sale" element={<CreateSale />} />
          {/* <Route path="*" element={<ErrorPage />} /> */}
        </Route>
        </Route>

      </Routes>
    </QueryClientProvider>
  );
}

export default App;
