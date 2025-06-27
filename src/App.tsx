import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import { useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [language, setLanguage] = useState<'en' | 'so'>('so');
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Layout language={language} setLanguage={setLanguage}>
            <Routes>
              <Route path="/" element={<Home language={language} />} />
              <Route path="/about" element={<About language={language} />} />
              <Route path="/products" element={<Products language={language} />} />
              <Route path="/product/:productId" element={<ProductDetail language={language} />} />
              <Route path="/contact" element={<Contact language={language} />} />
              <Route path="/admin" element={<Admin language={language} />} />
              <Route path="/admin/login" element={<Login language={language} />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound language={language} />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
