
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MessageSquare, FileUp, FlaskConical, GraduationCap, Award, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();

  // Sample data
  const learningProgress = 68;
  const badges = [
    { id: 1, name: "Quick Learner", color: "bg-badge-beginner", count: 2 },
    { id: 2, name: "Quiz Master", color: "bg-badge-intermediate", count: 1 },
    { id: 3, name: "Knowledge Seeker", color: "bg-badge-advanced", count: 3 },
  ];
  
  const recentActivity = [
    { id: 1, type: "Quiz", title: "Biology Fundamentals", score: "8/10", date: "2 days ago" },
    { id: 2, type: "Flashcards", title: "Chemistry Terms", cards: 20, date: "3 days ago" },
    { id: 3, type: "Assignment", title: "History Essay", summary: true, date: "5 days ago" },
  ];

  const featureCards = [
    {
      title: "AI Chatbot",
      description: "Get instant answers to your study questions",
      icon: <MessageSquare className="h-12 w-12 text-study-primary" />,
      path: "/chat"
    },
    {
      title: "Assignment Upload",
      description: "Upload assignments for AI-powered summaries",
      icon: <FileUp className="h-12 w-12 text-study-secondary" />,
      path: "/upload"
    },
    {
      title: "Flashcard Generator",
      description: "Create interactive flashcards from your materials",
      icon: <FlaskConical className="h-12 w-12 text-study-accent" />,
      path: "/flashcards"
    },
    {
      title: "AI Mentor",
      description: "Get personalized study guidance from an AI mentor",
      icon: <GraduationCap className="h-12 w-12 text-badge-master" />,
      path: "/mentor"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
            <p className="text-muted-foreground mt-1">Continue your learning journey where you left off.</p>
          </div>
          
          {/* Learning Progress */}
          <Card className="w-full md:w-auto min-w-[250px]">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Learning Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <Progress value={learningProgress} className="h-2" />
                <span className="text-sm font-medium ml-4">{learningProgress}%</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureCards.map((feature, index) => (
            <Card key={index} className="dashboard-card">
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{feature.description}</p>
                <Button onClick={() => navigate(feature.path)} className="mt-auto">
                  Start Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Badges Section */}
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5 text-badge-master" />
                Your Badges
              </CardTitle>
              <CardDescription>Achievements you've earned</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="flex flex-col items-center">
                    <div className={`badge-icon ${badge.color}`}>
                      <span className="font-bold">{badge.count}</span>
                    </div>
                    <span className="text-xs text-center">{badge.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View All Badges
              </Button>
            </CardFooter>
          </Card>

          {/* Recent Activity */}
          <Card className="dashboard-card lg:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest learning sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between border-b pb-2 last:border-0">
                    <div>
                      <p className="font-medium">{activity.title}</p>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <span>{activity.type}</span>
                        {activity.score && <span className="ml-2 text-badge-intermediate">{activity.score}</span>}
                        {activity.cards && <span className="ml-2">{activity.cards} cards</span>}
                        {activity.summary && <span className="ml-2 text-badge-beginner">Summary generated</span>}
                      </div>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.date}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className="w-full">
                View Complete History
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
