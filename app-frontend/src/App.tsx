import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SignIn } from "./pages/signin";
import { ErrorPage } from "./pages/Error/Error";
import { Dashboard } from "./pages/dashboard";
import { SalesOverview } from "./pages/sales-overview";
import { LandingPage } from "./pages/landing-page";
import { Sale } from "./pages/sales";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
       <Route path="/" element={<LandingPage />} />
        <Route path="/login" index element={<SignIn />} />
        <Route path="/dashboard" element={<SalesOverview />} />
        <Route path="/sale" element={<Sale />} />
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
    </QueryClientProvider>
  );
}

export default App;