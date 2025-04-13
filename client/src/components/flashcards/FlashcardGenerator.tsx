
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  FileText, 
  BookOpen,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Sparkle,
  Brain,
  Loader2,
  Download,
  Copy,
  Save,
  X
} from 'lucide-react';
import { toast } from "sonner";
import axios from "../../lib/axiosInstance"

interface Flashcard {
  id: number;
  front: string;
  back: string;
}

const FlashcardGenerator = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [topic, setTopic] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [mode, setMode] = useState<'learn' | 'master'>('learn');
  const [isGenerating, setIsGenerating] = useState(false);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isStudying, setIsStudying] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setUploadedFile(file);
      toast.success("File uploaded successfully.");
    }
  };

  const handleGenerateFlashcards = async () => {
    if (!topic && !uploadedFile) {
      toast.error("Please enter a topic or upload a file to generate flashcards.");
      return;
    }

    setIsGenerating(true);

    const res = await axios.post("/flashcards", {topic, additionalInfo})
    const generatedFlashcards = res.data
    
    const modifiedFlashcards = generatedFlashcards && generatedFlashcards?.map(card => ({
      ...card,
      back: mode === 'learn' 
        ? card.back.split('.')[0] + '.' // Just first sentence for "Learn Fast" mode
        : card.back // Full content for "Master" mode
    }));
    setFlashcards(modifiedFlashcards);
    setIsGenerating(false);
    setIsStudying(true);

  };

  const handleNext = () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentFlashcardIndex > 0) {
      setCurrentFlashcardIndex(currentFlashcardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    setIsStudying(false);
    setFlashcards([]);
    setCurrentFlashcardIndex(0);
    setIsFlipped(false);
    setTopic('');
    setAdditionalInfo('');
    setUploadedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Flashcard Generator</h1>
        
        {!isStudying ? (
          <Card>
            <CardHeader>
              <CardTitle>Create AI-powered Flashcards</CardTitle>
              <CardDescription>
                Enter a topic or upload study material to generate interactive flashcards
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="topic">
                <TabsList className="grid grid-cols-2 mb-4">
                  <TabsTrigger value="topic">Enter Topic</TabsTrigger>
                  <TabsTrigger value="upload">Upload Material</TabsTrigger>
                </TabsList>
                <TabsContent value="topic" className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="topic">Study Topic</Label>
                    <Input 
                      id="topic" 
                      placeholder="e.g., Photosynthesis, World War II, Calculus" 
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="info">Additional Information (Optional)</Label>
                    <Textarea 
                      id="info" 
                      placeholder="Add any specific concepts you want to focus on..."
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="upload" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <div className="rounded-full bg-muted p-3">
                        <Upload className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Drag & drop your study material or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports PDF, Word documents, and text files (max 10MB)
                        </p>
                      </div>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          className="hidden"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                        />
                        <Button variant="secondary" type="button">
                          Browse Files
                        </Button>
                      </label>
                    </div>
                  </div>
                  
                  {uploadedFile && (
                    <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-5 w-5 text-study-primary" />
                        <span className="font-medium">{uploadedFile.name}</span>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => {
                          setUploadedFile(null);
                          if (fileInputRef.current) {
                            fileInputRef.current.value = '';
                          }
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
              
              <div className="mt-8 space-y-4">
                <div>
                  <p className="font-medium mb-3">Learning Mode</p>
                  <div className="flex space-x-4">
                    <div 
                      className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all ${mode === 'learn' ? 'border-study-primary bg-study-primary/10' : 'border-muted'}`}
                      onClick={() => setMode('learn')}
                    >
                      <div className="rounded-full bg-study-accent/20 p-2 mb-2">
                        <Sparkle className="h-5 w-5 text-study-accent" />
                      </div>
                      <h3 className="font-medium">Learn Fast</h3>
                      <p className="text-xs text-center text-muted-foreground mt-1">
                        Short, concise information for quick learning
                      </p>
                    </div>
                    
                    <div 
                      className={`flex flex-col items-center p-4 rounded-lg border cursor-pointer transition-all ${mode === 'master' ? 'border-study-primary bg-study-primary/10' : 'border-muted'}`}
                      onClick={() => setMode('master')}
                    >
                      <div className="rounded-full bg-study-secondary/20 p-2 mb-2">
                        <Brain className="h-5 w-5 text-study-secondary" />
                      </div>
                      <h3 className="font-medium">Master</h3>
                      <p className="text-xs text-center text-muted-foreground mt-1">
                        Detailed information for comprehensive understanding
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                className="w-full"
                onClick={handleGenerateFlashcards}
                disabled={(!topic && !uploadedFile) || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Flashcards...
                  </>
                ) : (
                  <>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Generate Flashcards
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Flashcard UI */}
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">
                {topic || uploadedFile?.name || 'Your Flashcards'}
              </h2>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="bg-study-accent/10 text-study-accent">
                  {mode === 'learn' ? 'Learn Fast Mode' : 'Master Mode'}
                </Badge>
                <Badge variant="outline">
                  {currentFlashcardIndex + 1} of {flashcards.length}
                </Badge>
              </div>
            </div>
            
            {/* Flashcard */}
            <div 
              className="flashcard aspect-[3/2] max-h-[450px] w-full cursor-pointer"
              onClick={handleFlip}
            >
              <div 
                className={`h-full w-full rounded-xl shadow-lg transition duration-500 relative ${isFlipped ? 'rotate-y-180' : ''}`}
              >
                {/* Front */}
                <div 
                  className={`absolute inset-0 flex flex-col p-8 rounded-xl bg-gradient-to-br ${isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'} from-study-primary/20 to-white dark:from-study-primary/30 dark:to-card transition-opacity duration-500`}
                >
                  <div className="flex justify-between">
                    <Badge variant="outline" className="mb-4">Front</Badge>
                    <span className="text-sm text-muted-foreground">Click to flip</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center">
                    <h2 className="text-2xl font-bold text-center">
                      {flashcards[currentFlashcardIndex]?.front}
                    </h2>
                  </div>
                </div>
                
                {/* Back */}
                <div 
                  className={`absolute inset-0 flex flex-col p-8 rounded-xl bg-gradient-to-br ${!isFlipped ? 'opacity-0 rotate-y-180' : 'opacity-100'} from-study-secondary/20 to-white dark:from-study-secondary/30 dark:to-card transition-opacity duration-500`}
                >
                  <div className="flex justify-between">
                    <Badge variant="outline" className="mb-4">Back</Badge>
                    <span className="text-sm text-muted-foreground">Click to flip</span>
                  </div>
                  <div className="flex-1 flex items-center justify-center overflow-auto">
                    <p className="text-center">
                      {flashcards[currentFlashcardIndex]?.back}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Controls */}
            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentFlashcardIndex === 0}
                className="flex items-center"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="outline" onClick={handleReset} className="flex items-center">
                  <X className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Save className="mr-2 h-4 w-4" />
                  Save Set
                </Button>
                <Button variant="outline" className="flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
              
              <Button 
                variant="outline" 
                onClick={handleNext}
                disabled={currentFlashcardIndex === flashcards.length - 1}
                className="flex items-center"
              >
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlashcardGenerator;
