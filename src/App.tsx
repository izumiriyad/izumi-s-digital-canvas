import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect } from "react";
import { trackPageView } from "./lib/gtag";
import { ThemeProvider } from "./hooks/use-theme";
import { AuthProvider } from "./hooks/use-auth";
import RequireAuth from "./components/RequireAuth";
import Index from "./pages/Index";
import CommandPalette from "./components/CommandPalette";
import KonamiRedTeam from "./components/KonamiRedTeam";
import SoundToggle from "./components/SoundToggle";

const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const CVEs = lazy(() => import("./pages/CVEs"));
const WhoAmI = lazy(() => import("./pages/WhoAmI"));
const Compare = lazy(() => import("./pages/Compare"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const SampleReport = lazy(() => import("./pages/SampleReport"));
const Auth = lazy(() => import("./pages/Auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const Portal = lazy(() => import("./pages/Portal"));
const AdminPortal = lazy(() => import("./pages/AdminPortal"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();


const RouteFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <span className="font-mono text-sm text-muted-foreground animate-pulse">loading module…</span>
  </div>
);

const RouteTracker = () => {
  const location = useLocation();
  useEffect(() => {
    trackPageView(location.pathname + location.search + location.hash);
  }, [location]);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteTracker />
          <AuthProvider>
            <CommandPalette />
            <KonamiRedTeam />
            <SoundToggle />
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/projects/:slug" element={<ProjectDetail />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/:slug" element={<ServiceDetail />} />
                <Route path="/report" element={<SampleReport />} />
                <Route path="/cve" element={<CVEs />} />
                <Route path="/whoami" element={<WhoAmI />} />
                <Route path="/compare" element={<Compare />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route
                  path="/portal"
                  element={
                    <RequireAuth>
                      <Portal />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/portal/admin"
                  element={
                    <RequireAuth adminOnly>
                      <AdminPortal />
                    </RequireAuth>
                  }
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>

      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
