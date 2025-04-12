
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./components/dashboard/Dashboard";
import ChatInterface from "./components/chatbot/ChatInterface";
import AssignmentUpload from "./components/upload/AssignmentUpload";
import FlashcardGenerator from "./components/flashcards/FlashcardGenerator";
import QuizGenerator from "./components/quiz/QuizGenerator";
import AIMentor from "./components/mentor/AIMentor";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<ChatInterface />} />
          <Route path="/upload" element={<AssignmentUpload />} />
          <Route path="/flashcards" element={<FlashcardGenerator />} />
          <Route path="/quiz" element={<QuizGenerator />} />
          <Route path="/mentor" element={<AIMentor />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
