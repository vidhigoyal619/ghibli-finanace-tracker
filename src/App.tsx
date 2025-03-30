import { useEffect, useState, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Chart from "./components/Chart";
import WizardCharacter from "./components/WizardCharacter";

const queryClient = new QueryClient();

const App = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const scrollAudioRef = useRef(null);

  useEffect(() => {
    // Handle window resize to update mobile state
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Handle scroll sound
    const handleScroll = () => {
      if (scrollAudioRef.current) {
        scrollAudioRef.current.volume = 0.2;
        scrollAudioRef.current.play().catch((err) => console.log("Scroll sound prevented:", err));
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <audio ref={scrollAudioRef} src="/scroll-sound.mp3" preload="auto" />
        <BrowserRouter>
          {/* Wizard will be hidden on mobile */}
          <div className={isMobile ? "hide-wizard" : ""}>
            <WizardCharacter />
          </div>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
