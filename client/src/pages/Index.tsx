
import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  FileUp, 
  FlaskConical, 
  GraduationCap,
  ArrowRight,
  CheckCircle,
  Sparkle,
  Brain,
  Star
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI Chatbot",
      description: "Get instant answers to your study questions from our AI-powered assistant.",
      icon: <MessageSquare className="h-8 w-8 text-study-primary" />,
      path: "/chat"
    },
    {
      title: "Assignment Analysis",
      description: "Upload assignments and get AI-generated summaries and insights.",
      icon: <FileUp className="h-8 w-8 text-study-secondary" />,
      path: "/upload"
    },
    {
      title: "Interactive Flashcards",
      description: "Create custom flashcards from your study materials with AI assistance.",
      icon: <FlaskConical className="h-8 w-8 text-study-accent" />,
      path: "/flashcards"
    },
    {
      title: "Quiz Generation",
      description: "Test your knowledge with AI-generated quizzes based on your materials.",
      icon: <Brain className="h-8 w-8 text-badge-intermediate" />,
      path: "/quiz"
    },
    {
      title: "Virtual AI Mentor",
      description: "Get personalized guidance from an AI mentor available 24/7.",
      icon: <GraduationCap className="h-8 w-8 text-badge-master" />,
      path: "/mentor"
    }
  ];

  const testimonials = [
    {
      quote: "LearnQ has completely transformed how I prepare for exams. The flashcards feature is incredible!",
      name: "Alex Johnson",
      role: "Computer Science Student"
    },
    {
      quote: "The AI mentor helped me understand complex physics concepts I was struggling with for weeks.",
      name: "Priya Sharma",
      role: "Physics Major"
    },
    {
      quote: "I can now generate quizzes from my lecture notes and test myself efficiently. My grades have improved significantly.",
      name: "Marcus Chen",
      role: "Medical Student"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-study-primary/10 to-white dark:from-study-primary/20 dark:to-background overflow-hidden bg-hero-pattern">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
                Revolutionize Your Learning with <span className="text-transparent bg-clip-text bg-gradient-to-r from-study-primary to-study-secondary">AI</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                An intelligent study assistant that helps you master concepts, generate quizzes, and get personalized mentorship.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button size="lg" onClick={() => navigate('/dashboard')} className="text-lg">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/chat')} className="text-lg">
                  Try AI Chatbot
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative w-full aspect-square max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-study-primary/30 to-study-accent/30 rounded-full blur-3xl opacity-30"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-white dark:bg-card rounded-full shadow-lg flex items-center justify-center">
                  <GraduationCap className="w-1/2 h-1/2 text-study-primary" />
                </div>
                <div className="absolute top-0 right-0 bg-study-primary rounded-full p-4 shadow-lg animate-float">
                  <BookOpen className="h-8 w-8 text-white" />
                </div>
                <div className="absolute bottom-0 left-0 bg-study-secondary rounded-full p-4 shadow-lg animate-float delay-150">
                  <MessageSquare className="h-8 w-8 text-white" />
                </div>
                <div className="absolute top-1/4 left-0 bg-study-accent rounded-full p-4 shadow-lg animate-float delay-300">
                  <FlaskConical className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Transform Your Study Experience</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our AI-powered tools are designed to make learning more efficient, engaging, and personalized.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-card rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="mb-4 rounded-full bg-muted/50 w-16 h-16 flex items-center justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                <Button 
                  variant="ghost" 
                  className="group"
                  onClick={() => navigate(feature.path)}
                >
                  Explore
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How LearnQ Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A simple process to enhance your learning experience with AI technology
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-study-primary/10 p-6 mb-4">
                <FileUp className="h-10 w-10 text-study-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload or Ask</h3>
              <p className="text-muted-foreground">
                Upload your study materials or ask questions directly to our AI assistants.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-study-secondary/10 p-6 mb-4">
                <Sparkle className="h-10 w-10 text-study-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Processing</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your content and generates personalized learning resources.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="rounded-full bg-study-accent/10 p-6 mb-4">
                <Brain className="h-10 w-10 text-study-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Learn & Improve</h3>
              <p className="text-muted-foreground">
                Study with AI-generated materials and track your progress with quizzes and badges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Students are transforming their learning experience with LearnQ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-card rounded-xl shadow-md p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-study-accent text-study-accent" />
                  ))}
                </div>
                <p className="italic mb-6 text-foreground">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="rounded-full bg-muted w-10 h-10 flex items-center justify-center mr-3">
                    {testimonial.name[0]}
                  </div>
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-study-primary to-study-secondary rounded-2xl p-8 md:p-12 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Learning?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join thousands of students who are using LearnQ to improve their understanding, retention, and academic performance.
            </p>
            <Button 
              size="lg" 
              variant="secondary" 
              onClick={() => navigate('/dashboard')}
              className="bg-white text-study-primary hover:bg-white/90"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-study-primary to-study-secondary flex items-center justify-center mr-2">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-study-primary to-study-secondary">
                LearnQ
              </span>
            </div>
            <div className="text-center md:text-right text-sm text-muted-foreground">
              <p>© 2025 LearnQ. All rights reserved.</p>
              <p>The Future of Learning</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
