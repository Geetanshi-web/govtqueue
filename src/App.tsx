import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { TokenProvider } from "@/context/TokenContext";
import { AdminProvider } from "@/context/AdminContext";
import Index from "./pages/Index";
import OfficeList from "./pages/OfficeList";
import OfficeDetails from "./pages/OfficeDetails";
import MyToken from "./pages/MyToken";
import Feedback from "./pages/Feedback";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <TokenProvider>
        <AdminProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/offices" element={<OfficeList />} />
              <Route path="/office/:id" element={<OfficeDetails />} />
              <Route path="/my-token" element={<MyToken />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AdminProvider>
      </TokenProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
