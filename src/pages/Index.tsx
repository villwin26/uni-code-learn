import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Code, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen hero-gradient flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h1 className="text-5xl font-bold text-white mb-6">
              Welcome to LearnIN.ai
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Master programming languages with interactive lessons, quizzes, and personalized progress tracking.
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/auth')}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/auth')}
                className="border-white text-white hover:bg-white/10"
              >
                Sign In
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Welcome back!</h1>
            <p className="text-xl text-muted-foreground">Continue your programming journey</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="lesson-card">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Python Course</CardTitle>
                <CardDescription>Learn Python from basics to advanced</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Continue Learning</Button>
              </CardContent>
            </Card>

            <Card className="lesson-card">
              <CardHeader>
                <Code className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>JavaScript Course</CardTitle>
                <CardDescription>Master modern JavaScript development</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Course</Button>
              </CardContent>
            </Card>

            <Card className="lesson-card">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-info mb-4" />
                <CardTitle>Your Progress</CardTitle>
                <CardDescription>Track your learning journey</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">View Progress</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
