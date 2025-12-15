import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Historial from "./pages/Historial";
import DevocionalDetalle from "./pages/DevocionalDetalle";
import Rutas from "./pages/Rutas";
import RutaDetalle from "./pages/RutaDetalle";
import Perfil from "./pages/Perfil";
import Configuracion from "./pages/Configuracion";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/devocional/:id" element={<DevocionalDetalle />} />
            <Route path="/rutas" element={<Rutas />} />
            <Route path="/ruta/:id" element={<RutaDetalle />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/configuracion" element={<Configuracion />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
