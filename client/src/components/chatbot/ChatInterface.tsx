
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Send, Bot, User, ArrowDown } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI study assistant. How can I help you with your studies today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sample study-related questions for suggestions
  const suggestedQuestions = [
    "Explain photosynthesis in simple terms",
    "Help me understand the causes of World War II",
    "What's the difference between DNA and RNA?",
    "How do I solve quadratic equations?",
    "Explain the water cycle"
  ];

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Simulate AI response
  const simulateResponse = (question: string) => {
    setIsTyping(true);
    
    // Sample responses based on questions
    const responses: { [key: string]: string } = {
      "Explain photosynthesis in simple terms": 
        "Photosynthesis is the process where plants use sunlight to turn carbon dioxide and water into glucose (sugar) and oxygen. It's like plants making their own food using sunlight as energy! The chlorophyll in plant leaves absorbs sunlight, which provides energy to convert CO₂ and water into glucose and oxygen. This process is vital for all life on Earth since it produces oxygen and is the basis of most food chains.",
      
      "Help me understand the causes of World War II":
        "World War II (1939-1945) had several key causes: 1) The harsh Treaty of Versailles after WWI left Germany economically devastated and resentful. 2) The Great Depression created global economic instability. 3) The rise of fascism and Nazism in Germany, Italy, and Japan brought aggressive, nationalist leaders to power. 4) Policy of appeasement by European powers allowed Hitler to expand unchecked initially. 5) Germany's invasion of Poland in September 1939 finally triggered the declarations of war. These factors combined to create the deadliest conflict in human history.",
      
      "What's the difference between DNA and RNA?":
        "DNA (Deoxyribonucleic Acid) and RNA (Ribonucleic Acid) are both nucleic acids that store genetic information, but they differ in several ways: 1) Structure: DNA is double-stranded helix, while RNA is typically single-stranded. 2) Sugar: DNA has deoxyribose sugar, RNA has ribose sugar. 3) Bases: DNA uses A, T, G, C while RNA uses A, U, G, C (Uracil instead of Thymine). 4) Function: DNA stores genetic information long-term, while RNA has multiple roles including protein synthesis (mRNA), structure (rRNA), and transfer (tRNA). 5) Location: DNA primarily stays in the nucleus, while RNA can move throughout the cell.",
      
      "How do I solve quadratic equations?":
        "To solve quadratic equations (ax² + bx + c = 0), you have three main methods:\n\n1) Factoring: Rewrite as (px + q)(rx + s) = 0, then find values where either factor equals zero.\n\n2) Completing the square: Rearrange to get x² terms on one side, then add/subtract to create a perfect square pattern.\n\n3) Quadratic formula: x = (-b ± √(b² - 4ac)) / 2a which works for any quadratic equation.\n\nThe discriminant (b² - 4ac) tells you how many real solutions exist: if positive, there are 2 solutions; if zero, there's 1 solution; if negative, there are 2 complex solutions.",

      "Explain the water cycle":
        "The water cycle (hydrologic cycle) is the continuous movement of water on, above, and below Earth's surface. It has several key stages: 1) Evaporation: Heat from the sun turns liquid water from oceans, lakes, and rivers into water vapor. 2) Transpiration: Plants release water vapor from their leaves. 3) Condensation: Water vapor cools and forms clouds. 4) Precipitation: Water falls from clouds as rain, snow, sleet, or hail. 5) Collection: Precipitation is collected in oceans, lakes, rivers, and groundwater, and the cycle repeats. This endless cycle helps maintain Earth's water supply and regulates climate patterns."
    };

    // Default response for questions not in our sample set
    const defaultResponse = "That's an interesting question about " + question.split(" ").slice(0, 3).join(" ") + 
      "... Let me help you understand this topic better. To provide a comprehensive answer, I'd analyze relevant academic sources and explain the concept in clear, easy-to-understand terms with proper examples.";

    setTimeout(() => {
      const response = responses[question] || defaultResponse;
      
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        text: response,
        sender: 'ai',
        timestamp: new Date()
      }]);
      
      setIsTyping(false);
    }, 1500);
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
    
    // Simulate AI response
    simulateResponse(inputMessage);
  };

  const handleSuggestionClick = (question: string) => {
    // Add user message
    const newMessage = {
      id: messages.length + 1,
      text: question,
      sender: 'user' as const,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Simulate AI response
    simulateResponse(question);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center">
            <Bot className="mr-2 h-5 w-5 text-study-primary" />
            AI Study Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {/* Messages Container */}
          <div className="flex flex-col h-[60vh] md:h-[70vh]">
            <div className="flex-grow overflow-y-auto p-4">
              {messages.map((message) => (
                <div key={message.id} className={`flex ${message.sender === 'ai' ? 'justify-start' : 'justify-end'} mb-4`}>
                  <div className={`flex ${message.sender === 'ai' ? 'flex-row' : 'flex-row-reverse'} items-start gap-2 max-w-[90%]`}>
                    <Avatar className={`h-8 w-8 ${message.sender === 'ai' ? 'bg-study-primary' : 'bg-study-secondary'}`}>
                      {message.sender === 'ai' ? <Bot className="h-5 w-5" /> : <User className="h-5 w-5" />}
                    </Avatar>
                    <div>
                      <div className={message.sender === 'ai' ? 'ai-message' : 'user-message'}>
                        <p className="whitespace-pre-line">{message.text}</p>
                      </div>
                      <div className={`text-xs text-muted-foreground ${message.sender === 'ai' ? 'text-left' : 'text-right'}`}>
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start mb-4">
                  <div className="flex items-start gap-2">
                    <Avatar className="h-8 w-8 bg-study-primary">
                      <Bot className="h-5 w-5" />
                    </Avatar>
                    <div className="ai-message">
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

            {/* Suggested Questions */}
            {messages.length < 3 && (
              <div className="p-4 border-t">
                <p className="text-sm font-medium mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs"
                      onClick={() => handleSuggestionClick(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Message Input */}
            <div className="border-t p-4 mt-auto">
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  placeholder="Type your study question..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  className="flex-grow"
                />
                <Button type="submit" size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>

            {/* Scroll to bottom button - shows when not at bottom */}
            {messages.length > 5 && (
              <Button
                variant="outline"
                size="icon"
                className="absolute bottom-20 right-8 rounded-full"
                onClick={scrollToBottom}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatInterface;
