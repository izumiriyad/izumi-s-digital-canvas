import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./hooks/use-theme";
import Index from "./pages/Index";
import ProjectDetail from "./pages/ProjectDetail";
import CVEs from "./pages/CVEs";
import WhoAmI from "./pages/WhoAmI";
import Compare from "./pages/Compare";
import NotFound from "./pages/NotFound";
import CommandPalette from "./components/CommandPalette";
import KonamiRedTeam from "./components/KonamiRedTeam";
import SoundToggle from "./components/SoundToggle";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <CommandPalette />
          <KonamiRedTeam />
          <SoundToggle />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/cve" element={<CVEs />} />
            <Route path="/whoami" element={<WhoAmI />} />
            <Route path="/compare" element={<Compare />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
