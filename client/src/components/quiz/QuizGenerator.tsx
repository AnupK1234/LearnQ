
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, ArrowRight, Award, BarChart3, Clock, ArrowLeft, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import BadgeDisplay from '../common/BadgeDisplay';

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer?: number;
}

const QuizGenerator = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState<string | null>(null);
  const navigate = useNavigate();

  // Sample quiz questions
  const sampleQuestions: Question[] = [
    {
      id: 1,
      text: "What is the primary function of photosynthesis in plants?",
      options: [
        "To produce oxygen only",
        "To convert light energy into chemical energy",
        "To break down glucose molecules",
        "To release carbon dioxide into the atmosphere"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      text: "Which of these is NOT a byproduct of cellular respiration?",
      options: [
        "Carbon dioxide",
        "Water",
        "ATP (energy)",
        "Glucose"
      ],
      correctAnswer: 3
    },
    {
      id: 3,
      text: "What is the function of mitochondria in a cell?",
      options: [
        "Protein synthesis",
        "Energy production",
        "Waste disposal",
        "Cell division"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      text: "During DNA replication, which of the following occurs?",
      options: [
        "The DNA molecule splits into two single strands",
        "RNA polymerase creates a complementary DNA strand",
        "DNA polymerase creates complementary RNA strands",
        "The entire cell divides"
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      text: "Which of the following best describes natural selection?",
      options: [
        "Organisms choosing their best traits",
        "Random mutations creating new species instantly",
        "Survival and reproduction of organisms with advantageous traits",
        "The extinction of all disadvantageous traits"
      ],
      correctAnswer: 2
    },
    {
      id: 6,
      text: "Which cellular process directly uses glucose to produce ATP?",
      options: [
        "Photosynthesis",
        "Mitosis",
        "Cellular respiration",
        "DNA replication"
      ],
      correctAnswer: 2
    },
    {
      id: 7,
      text: "What is the building block of proteins?",
      options: [
        "Fatty acids",
        "Nucleotides",
        "Glucose",
        "Amino acids"
      ],
      correctAnswer: 3
    },
    {
      id: 8,
      text: "Which organelle is responsible for processing and packaging proteins?",
      options: [
        "Nucleus",
        "Golgi apparatus",
        "Lysosome",
        "Mitochondria"
      ],
      correctAnswer: 1
    },
    {
      id: 9,
      text: "What is the main function of RNA in a cell?",
      options: [
        "Energy storage",
        "Cell structure",
        "Information transfer and protein synthesis",
        "Cell division"
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      text: "Which of the following is NOT a component of a nucleotide?",
      options: [
        "Sugar",
        "Phosphate group",
        "Amino acid",
        "Nitrogenous base"
      ],
      correctAnswer: 2
    }
  ];

  useEffect(() => {
    // Simulate API call to generate quiz questions
    setTimeout(() => {
      setQuestions(sampleQuestions);
      setIsLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (quizStarted && !quizCompleted) {
      timer = setInterval(() => {
        setTimeElapsed(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [quizStarted, quizCompleted]);

  const handleStartQuiz = () => {
    setQuizStarted(true);
    toast.success("Quiz started! Good luck!");
  };

  const handleSelectAnswer = (optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex].selectedAnswer = optionIndex;
    setQuestions(updatedQuestions);
  };

  const handleNextQuestion = () => {
    if (questions[currentQuestionIndex].selectedAnswer === undefined) {
      toast.error("Please select an answer before proceeding.");
      return;
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Calculate final score
      const correctAnswers = questions.filter(q => 
        q.selectedAnswer === q.correctAnswer
      ).length;
      
      const finalScore = Math.round((correctAnswers / questions.length) * 100);
      setScore(finalScore);
      setQuizCompleted(true);
      
      // Assign badge based on score
      if (finalScore >= 90) {
        setEarnedBadge("quiz-master");
        toast.success("You've earned the Quiz Master badge!");
      } else if (finalScore >= 70) {
        setEarnedBadge("knowledge-seeker");
        toast.success("You've earned the Knowledge Seeker badge!");
      } else if (finalScore >= 50) {
        setEarnedBadge("quick-learner");
        toast.success("You've earned the Quick Learner badge!");
      }
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Quiz Generator</h1>

        {isLoading ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center p-8">
              <div className="animate-pulse space-y-4 w-full max-w-md">
                <div className="h-6 bg-muted rounded w-3/4 mx-auto"></div>
                <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                <div className="space-y-2 mt-8">
                  <div className="h-10 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded"></div>
                  <div className="h-10 bg-muted rounded"></div>
                </div>
                <div className="h-10 bg-muted rounded w-1/3 mx-auto mt-4"></div>
              </div>
              <p className="mt-6 text-muted-foreground">Generating your quiz questions...</p>
            </CardContent>
          </Card>
        ) : !quizStarted ? (
          <Card>
            <CardHeader>
              <CardTitle>Biology Quiz</CardTitle>
              <CardDescription>
                Test your knowledge on fundamental biology concepts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg bg-muted/30 p-4 space-y-2">
                <p className="font-medium">Quiz Details:</p>
                <ul className="text-sm space-y-1">
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 mr-2 rounded-full bg-study-primary"></span>
                    Total Questions: {questions.length}
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 mr-2 rounded-full bg-study-secondary"></span>
                    Estimated Time: 5-10 minutes
                  </li>
                  <li className="flex items-center">
                    <span className="inline-block w-4 h-4 mr-2 rounded-full bg-study-accent"></span>
                    Topics: Cell Biology, Genetics, Ecology
                  </li>
                </ul>
              </div>
              
              <p className="text-center text-muted-foreground">
                You'll earn achievement badges based on your performance!
              </p>
            </CardContent>
            <CardFooter>
              <Button onClick={handleStartQuiz} className="w-full">
                Start Quiz
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ) : !quizCompleted ? (
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <Badge variant="outline">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <Badge variant="outline" className="flex items-center">
                  <Clock className="mr-1 h-3 w-3" /> 
                  {formatTime(timeElapsed)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-2">
              <Progress 
                value={((currentQuestionIndex + 1) / questions.length) * 100} 
                className="h-2 mb-6" 
              />
              
              <h3 className="text-lg font-medium mb-6">
                {questions[currentQuestionIndex].text}
              </h3>
              
              <RadioGroup 
                value={questions[currentQuestionIndex].selectedAnswer?.toString()}
                onValueChange={(value) => handleSelectAnswer(parseInt(value))}
              >
                <div className="space-y-4">
                  {questions[currentQuestionIndex].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem 
                        value={index.toString()} 
                        id={`option-${index}`} 
                        className="peer"
                      />
                      <Label 
                        htmlFor={`option-${index}`}
                        className="flex-grow p-3 rounded-md border border-muted peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5 transition-all"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={handlePrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>
              <Button onClick={handleNextQuestion}>
                {currentQuestionIndex < questions.length - 1 ? (
                  <>
                    Next
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Complete Quiz"
                )}
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card className="border-4 border-study-primary/30">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
                <CardDescription>
                  You've completed the Biology Quiz
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="flex flex-col items-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-study-primary/20 to-study-light/20 animate-pulse-light"></div>
                    <div className="absolute inset-4 flex items-center justify-center rounded-full bg-white dark:bg-card shadow-inner">
                      <div className="text-center">
                        <span className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-study-primary to-study-secondary">
                          {score}%
                        </span>
                        <p className="text-sm text-muted-foreground mt-1">Score</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 text-center space-y-1">
                    {score >= 70 ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-green-500 mx-auto" />
                        <p className="font-medium text-lg">Great job!</p>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-6 w-6 text-amber-500 mx-auto" />
                        <p className="font-medium text-lg">Keep practicing!</p>
                      </>
                    )}
                    <p className="text-sm text-muted-foreground">
                      You answered {Math.round((score / 100) * questions.length)} out of {questions.length} questions correctly
                    </p>
                  </div>
                </div>
                
                {earnedBadge && (
                  <div className="bg-muted/30 rounded-lg p-4 flex flex-col items-center">
                    <h3 className="font-medium flex items-center">
                      <Award className="mr-2 h-4 w-4 text-study-primary" />
                      Badge Earned!
                    </h3>
                    <div className="mt-4">
                      <BadgeDisplay type={earnedBadge} size="large" />
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full" onClick={() => {
                    setQuizStarted(false);
                    setQuizCompleted(false);
                    setCurrentQuestionIndex(0);
                    setTimeElapsed(0);
                    setQuestions(questions.map(q => ({ ...q, selectedAnswer: undefined })));
                  }}>
                    Try Again
                  </Button>
                  <Button className="w-full" onClick={() => navigate('/dashboard')}>
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="mr-2 h-5 w-5 text-study-accent" />
                  Answer Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {questions.map((question, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="flex items-start gap-2">
                        <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-white ${question.selectedAnswer === question.correctAnswer ? 'bg-green-500' : 'bg-red-500'}`}>
                          {question.selectedAnswer === question.correctAnswer ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            <AlertCircle className="h-3 w-3" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{question.text}</p>
                          <div className="mt-2 text-sm">
                            <p className={`${question.selectedAnswer === question.correctAnswer ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              You answered: {question.selectedAnswer !== undefined ? question.options[question.selectedAnswer] : 'No answer'}
                            </p>
                            {question.selectedAnswer !== question.correctAnswer && (
                              <p className="text-green-600 dark:text-green-400 mt-1">
                                Correct answer: {question.options[question.correctAnswer]}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizGenerator;
