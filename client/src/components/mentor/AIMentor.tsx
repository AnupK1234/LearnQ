
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar } from "@/components/ui/avatar";
import { 
  MessageSquare, 
  Mic, 
  MicOff,
  User, 
  ChevronDown,
  Sparkles, 
  VolumeX, 
  Volume2,
  HelpCircle,
  Settings,
  GraduationCap
} from 'lucide-react';
import { toast } from "sonner";

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'mentor';
  timestamp: Date;
}

interface GreetingMessage {
  text: string;
  tips: string[];
}

const AIMentor = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isMentorTyping, setIsMentorTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState('einstein');
  const [showMentorSelection, setShowMentorSelection] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const mentors = {
    einstein: {
      name: "Albert",
      specialty: "Physics & Mathematics",
      description: "Explains complex concepts with thought experiments and analogies.",
      color: "bg-blue-500",
      greeting: {
        text: "Hello there! I'm Albert, your AI physics and mathematics mentor. I'm here to make complex concepts feel simple and intuitive.",
        tips: [
          "Ask me to explain difficult physics concepts using analogies",
          "I can help with mathematics problem-solving approaches",
          "Try asking me about thought experiments to understand theoretical physics",
          "I can guide you through step-by-step solutions"
        ]
      }
    },
    curie: {
      name: "Marie",
      specialty: "Chemistry & Research",
      description: "Focuses on scientific methodology and chemistry concepts.",
      color: "bg-purple-500",
      greeting: {
        text: "Bonjour! I'm Marie, your AI chemistry and research methodology mentor. I'm passionate about scientific discovery and helping you understand the building blocks of our universe.",
        tips: [
          "Ask me about chemical reactions and elements",
          "I can help you design proper research experiments",
          "Learn about the scientific method and research best practices",
          "I can explain complex chemical processes step by step"
        ]
      }
    },
    turing: {
      name: "Alan",
      specialty: "Computer Science",
      description: "Specialized in computational thinking and problem-solving.",
      color: "bg-green-500",
      greeting: {
        text: "Hello! I'm Alan, your AI computer science mentor. I'm here to help you develop computational thinking and solve complex problems with elegant solutions.",
        tips: [
          "Ask me about algorithms and data structures",
          "I can help you understand programming concepts",
          "Learn about computational complexity and optimization",
          "Ask me to explain logical reasoning approaches to problems"
        ]
      }
    },
    socrates: {
      name: "Sophia",
      specialty: "Philosophy & Critical Thinking",
      description: "Uses Socratic method to develop critical thinking skills.",
      color: "bg-amber-500",
      greeting: {
        text: "Greetings! I'm Sophia, your AI philosophy and critical thinking mentor. I don't just give answers - I help you find them through thoughtful questions and reasoning.",
        tips: [
          "Try engaging in a Socratic dialogue with me about any topic",
          "I can help you develop logical arguments",
          "Ask me to challenge your assumptions about a concept",
          "I can guide you through ethical dilemmas with philosophical frameworks"
        ]
      }
    }
  };
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Add greeting message based on selected mentor
    const selectedMentorData = mentors[selectedMentor as keyof typeof mentors];
    const greeting: GreetingMessage = selectedMentorData.greeting;
    
    setTimeout(() => {
      setMessages([
        {
          id: 1,
          text: greeting.text,
          sender: 'mentor',
          timestamp: new Date()
        }
      ]);
    }, 500);
    
    setTimeout(() => {
      setIsMentorTyping(true);
      
      setTimeout(() => {
        setIsMentorTyping(false);
        setMessages(prev => [
          ...prev,
          {
            id: 2,
            text: "What would you like to learn about today? I'm here to help with your studies.",
            sender: 'mentor',
            timestamp: new Date()
          }
        ]);
      }, 1500);
    }, 2000);
  }, [selectedMentor]);

  // Sample responses
  const sampleResponses: { [key: string]: string } = {
    "Can you help me understand quantum physics?": 
      "Absolutely! Quantum physics can seem strange and counterintuitive at first. Let's start with a simple analogy: while classical physics is like watching a ball move along a definite path, quantum physics is more like knowing the ball is somewhere in a room, but the room is dark and we can only talk about the probability of finding it in different locations.\n\nThe core principles include:\n\n1. Wave-particle duality: Matter and light can behave both as waves and particles\n2. Uncertainty principle: We cannot precisely know both position and momentum simultaneously\n3. Quantum superposition: Particles can exist in multiple states at once until observed\n4. Quantum entanglement: Particles can become 'connected' and affect each other instantly regardless of distance\n\nWould you like me to elaborate on any of these concepts further?",
    
    "How do I write a good research paper?":
      "Writing an excellent research paper is a structured process. Here's my approach:\n\n1. Choose a focused research question that genuinely interests you\n\n2. Conduct thorough literature review to understand existing research\n\n3. Develop a clear thesis statement\n\n4. Create an outline with logical sections (Introduction, Methodology, Results, Discussion, Conclusion)\n\n5. Write a compelling introduction that establishes context and importance\n\n6. Use precise, objective language throughout\n\n7. Support all claims with evidence and proper citations\n\n8. Analyze your findings rather than just reporting them\n\n9. Acknowledge limitations of your study\n\n10. Revise thoroughly for clarity, coherence and accuracy\n\nWhat specific part of the research writing process would you like guidance on?",
    
    "I'm struggling with motivation to study":
      "I understand completely. Maintaining study motivation can be challenging, especially with long-term goals. Let me share some evidence-based strategies:\n\n1. Set specific, achievable micro-goals rather than vague ones\n\n2. Try the Pomodoro Technique: 25 minutes of focused study followed by 5-minute breaks\n\n3. Connect your current studies to your bigger 'why' - how does this help your ultimate goal?\n\n4. Create a dedicated, distraction-free study environment\n\n5. Use active learning techniques like teaching concepts aloud or making connection maps\n\n6. Build a reward system for completing study sessions\n\n7. Find a study buddy or accountability partner\n\nRemember that motivation often follows action, not the other way around. Even starting with 5 minutes of study can build momentum. Which of these approaches would you like to explore further?"
  };

  const handleSelectMentor = (mentorKey: string) => {
    if (mentorKey !== selectedMentor) {
      setMessages([]);
      setSelectedMentor(mentorKey);
      setShowMentorSelection(false);
      toast.success(`You are now speaking with ${mentors[mentorKey as keyof typeof mentors].name}!`);
    } else {
      setShowMentorSelection(false);
    }
  };

  const simulateMentorResponse = (question: string) => {
    setIsMentorTyping(true);
    
    setTimeout(() => {
      let response;
      
      // Check if we have a canned response for this question
      const lowercaseQuestion = question.toLowerCase();
      if (lowercaseQuestion.includes('quantum') || lowercaseQuestion.includes('physics')) {
        response = sampleResponses["Can you help me understand quantum physics?"];
      } else if (lowercaseQuestion.includes('research') || lowercaseQuestion.includes('paper') || lowercaseQuestion.includes('write')) {
        response = sampleResponses["How do I write a good research paper?"];
      } else if (lowercaseQuestion.includes('motivation') || lowercaseQuestion.includes('struggling') || lowercaseQuestion.includes('study')) {
        response = sampleResponses["I'm struggling with motivation to study"];
      } else {
        // Generic response based on the mentor
        const mentorData = mentors[selectedMentor as keyof typeof mentors];
        response = `That's an interesting question about ${question.split(" ").slice(0, 3).join(" ")}. As a specialist in ${mentorData.specialty}, I would approach this by first understanding the fundamental concepts, then building up to more complex ideas. Let me walk you through how I would think about this...`;
      }
      
      setMessages(prev => [
        ...prev,
        {
          id: prev.length + 2,
          text: response,
          sender: 'mentor',
          timestamp: new Date()
        }
      ]);
      
      setIsMentorTyping(false);
      
      // Simulate voice if not muted
      if (!isMuted) {
        toast.info("🔊 AI Mentor is speaking", {
          duration: 2000
        });
      }
    }, 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;
    
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    
    // Simulate mentor response
    simulateMentorResponse(inputMessage);
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      setIsListening(false);
      toast.info("Voice input stopped");
    } else {
      setIsListening(true);
      toast.info("Listening... (Speak clearly)");
      
      // Simulate voice recognition after 5 seconds
      setTimeout(() => {
        const randomQuestions = [
          "Can you help me understand quantum physics?",
          "How do I write a good research paper?",
          "I'm struggling with motivation to study"
        ];
        
        const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
        setInputMessage(randomQuestion);
        setIsListening(false);
        toast.success("Voice input received!");
      }, 5000);
    }
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
    toast.info(isMuted ? "Voice output enabled" : "Voice output disabled");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const currentMentor = mentors[selectedMentor as keyof typeof mentors];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">AI Mentor</h1>
        
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <div className="relative">
                <Avatar className={`h-24 w-24 rounded-xl ${currentMentor.color}`}>
                  <GraduationCap className="h-12 w-12 text-white" />
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1">
                  <div className="h-3 w-3 rounded-full bg-white animate-pulse"></div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="relative inline-block">
                  <Button
                    variant="ghost"
                    className="text-xl font-bold"
                    onClick={() => setShowMentorSelection(!showMentorSelection)}
                  >
                    {currentMentor.name}
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </Button>
                  
                  {showMentorSelection && (
                    <div className="absolute top-full left-0 mt-2 w-64 bg-card rounded-lg shadow-lg border z-10">
                      <div className="p-2">
                        {Object.entries(mentors).map(([key, mentor]) => (
                          <Button
                            key={key}
                            variant={key === selectedMentor ? "secondary" : "ghost"}
                            className="w-full justify-start mb-1 last:mb-0"
                            onClick={() => handleSelectMentor(key)}
                          >
                            <div className={`w-3 h-3 rounded-full ${mentor.color} mr-2`}></div>
                            <span>{mentor.name}</span>
                            <span className="ml-auto text-xs text-muted-foreground">{mentor.specialty.split(' ')[0]}</span>
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-muted-foreground">{currentMentor.specialty}</p>
                <p className="text-sm mt-2 max-w-md">{currentMentor.description}</p>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  onClick={handleMuteToggle}
                  title={isMuted ? "Enable voice" : "Disable voice"}
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  title="Help"
                >
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="rounded-full"
                  title="Settings"
                >
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="chat">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="learn" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              Learning Plan
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="chat" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="flex flex-col h-[50vh] md:h-[60vh]">
                  <div className="flex-grow overflow-y-auto p-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'mentor' ? 'justify-start' : 'justify-end'} mb-4`}
                      >
                        <div className={`flex ${message.sender === 'mentor' ? 'flex-row' : 'flex-row-reverse'} items-start gap-2 max-w-[90%]`}>
                          <Avatar className={`h-8 w-8 ${message.sender === 'mentor' ? currentMentor.color : 'bg-study-secondary'}`}>
                            {message.sender === 'mentor' ? <GraduationCap className="h-5 w-5" /> : <User className="h-5 w-5" />}
                          </Avatar>
                          <div>
                            <div 
                              className={`p-4 rounded-lg ${
                                message.sender === 'mentor' 
                                  ? 'bg-muted text-foreground rounded-tr-lg rounded-bl-lg rounded-br-lg' 
                                  : 'bg-study-primary/90 text-white ml-auto rounded-tl-lg rounded-tr-lg rounded-bl-lg'
                              }`}
                            >
                              <p className="whitespace-pre-line">{message.text}</p>
                            </div>
                            <div 
                              className={`text-xs text-muted-foreground mt-1 ${
                                message.sender === 'mentor' ? 'text-left' : 'text-right'
                              }`}
                            >
                              {formatTime(message.timestamp)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isMentorTyping && (
                      <div className="flex justify-start mb-4">
                        <div className="flex items-start gap-2">
                          <Avatar className={`h-8 w-8 ${currentMentor.color}`}>
                            <GraduationCap className="h-5 w-5" />
                          </Avatar>
                          <div className="bg-muted p-4 rounded-lg rounded-tl-none">
                            <div className="flex space-x-2">
                              <div className="w-2 h-2 rounded-full bg-study-primary/60 animate-pulse"></div>
                              <div className="w-2 h-2 rounded-full bg-study-primary/60 animate-pulse delay-150"></div>
                              <div className="w-2 h-2 rounded-full bg-study-primary/60 animate-pulse delay-300"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                  
                  <div className="border-t p-4 mt-auto">
                    <form onSubmit={handleSend} className="flex gap-2">
                      <Button 
                        type="button"
                        variant="outline"
                        size="icon"
                        className={isListening ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-400 animate-pulse' : ''}
                        onClick={handleVoiceToggle}
                      >
                        {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                      </Button>
                      <Input
                        placeholder={isListening ? "Listening..." : "Ask your AI mentor..."}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-grow"
                        disabled={isListening}
                      />
                      <Button type="submit" disabled={isListening || inputMessage.trim() === ''}>
                        Send
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4">
              <h3 className="text-sm font-medium mb-2">Suggested topics to discuss with your mentor:</h3>
              <div className="flex flex-wrap gap-2">
                {currentMentor.greeting.tips.map((tip, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      setInputMessage(tip);
                    }}
                  >
                    {tip}
                  </Button>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="learn" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Learning Plan</CardTitle>
                <CardDescription>
                  Your AI mentor can create a custom learning path based on your goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-6">
                  <p className="text-muted-foreground mb-4">
                    This feature is coming soon! Chat with your mentor to discuss your learning goals.
                  </p>
                  <Button onClick={() => document.querySelector('button[value="chat"]')?.click()}>
                    Return to Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AIMentor;
