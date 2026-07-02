import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectsPage from "./pages/ProjectsPage";
import JourneyPage from "./pages/JourneyPage";
import Arena from "./pages/Arena";
import ScrollToTop from "@/components/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SpeedInsights } from '@vercel/speed-insights/react';
import SEOHead from "@/components/SEOHead";
import FloatingBackToTop from "@/components/FloatingBackToTop";
import { ReactLenis } from "@studio-freight/react-lenis";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <ReactLenis root options={{ lerp: 0.1, duration: 1.2, smoothTouch: false }}>
        <SEOHead />
        <SpeedInsights />
        <TooltipProvider>
          <Toaster />
          <Sonner
            position="top-center"
            closeButton
            duration={5000}
            theme="dark"
          />
          <BrowserRouter>
            <ScrollToTop />
            <FloatingBackToTop />
            <Analytics />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/journey" element={<JourneyPage />} />
              <Route path="/arena" element={<Arena />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ReactLenis>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
