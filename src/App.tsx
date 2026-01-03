import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { AppProvider } from "./context/AppContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Welcome from "./pages/Welcome";
import Dashboard from "./pages/Dashboard";
import Historial from "./pages/Historial";
import DevocionalDetalle from "./pages/DevocionalDetalle";
import Rutas from "./pages/Rutas";
import RutaDetalle from "./pages/RutaDetalle";
import Perfil from "./pages/Perfil";
import Configuracion from "./pages/Configuracion";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import AppPage from "./pages/AppPage";
import LanguageSelection from "./pages/LanguageSelection";

// Wrapper component to handle language redirect
function LanguageGate({ children }: { children: React.ReactNode }) {
  const { hasSelectedLanguage } = useLanguage();
  
  if (!hasSelectedLanguage) {
    return <Navigate to="/select-language" replace />;
  }
  
  return <>{children}</>;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <AuthProvider>
          <AppProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/select-language" element={<LanguageSelection />} />
                <Route path="/" element={
                  <LanguageGate>
                    <Welcome />
                  </LanguageGate>
                } />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/app" element={<AppPage />} />
                <Route path="/auth" element={
                  <LanguageGate>
                    <Auth />
                  </LanguageGate>
                } />
                <Route path="/dashboard" element={
                  <LanguageGate>
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  </LanguageGate>
                } />
                <Route path="/historial" element={
                  <LanguageGate>
                    <ProtectedRoute>
                      <Historial />
                    </ProtectedRoute>
                  </LanguageGate>
                } />
                <Route path="/devocional/:id" element={
                  <LanguageGate>
                    <ProtectedRoute>
                      <DevocionalDetalle />
                    </ProtectedRoute>
                  </LanguageGate>
                } />
                <Route path="/rutas" element={
                  <LanguageGate>
                    <ProtectedRoute>
                      <Rutas />
                    </ProtectedRoute>
                  </LanguageGate>
                } />
                <Route path="/ruta/:id" element={
                  <LanguageGate>
                    <ProtectedRoute>
                      <RutaDetalle />
                    </ProtectedRoute>
                  </LanguageGate>
                } />
                <Route path="/perfil" element={
                  <LanguageGate>
                    <ProtectedRoute>
                      <Perfil />
                    </ProtectedRoute>
                  </LanguageGate>
                } />
                <Route path="/configuracion" element={
                  <LanguageGate>
                    <ProtectedRoute>
                      <Configuracion />
                    </ProtectedRoute>
                  </LanguageGate>
                } />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
