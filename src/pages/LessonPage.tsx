import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Clock, Award, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { MainLayout } from '@/components/layout/MainLayout';
import { CodeBlock } from '@/components/learning/CodeBlock';
import { QuizComponent } from '@/components/learning/QuizComponent';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Lesson {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  content: string;
  difficulty: string;
  estimated_time: number;
  order_index: number;
}

interface Course {
  id: string;
  title: string;
  language: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: any[];
}

export default function LessonPage() {
  const { courseId, lessonSlug } = useParams<{ courseId: string; lessonSlug: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [course, setCourse] = useState<Course | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nextLesson, setNextLesson] = useState<Lesson | null>(null);
  const [prevLesson, setPrevLesson] = useState<Lesson | null>(null);

  useEffect(() => {
    if (courseId && lessonSlug) {
      loadLessonData();
    }
  }, [courseId, lessonSlug, user]);

  const loadLessonData = async () => {
    try {
      // Load lesson
      const { data: lessonData, error: lessonError } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .eq('slug', lessonSlug)
        .single();

      if (lessonError) throw lessonError;
      setLesson(lessonData);

      // Load course
      const { data: courseData, error: courseError } = await supabase
        .from('courses')
        .select('*')
        .eq('id', courseId)
        .single();

      if (courseError) throw courseError;
      setCourse(courseData);

      // Load quiz for this lesson
      const { data: quizData } = await supabase
        .from('quizzes')
        .select('*')
        .eq('lesson_id', lessonData.id)
        .single();

      if (quizData) {
        setQuiz({
          ...quizData,
          questions: Array.isArray(quizData.questions) ? quizData.questions : []
        });
      }

      // Load navigation lessons
      const { data: allLessons } = await supabase
        .from('lessons')
        .select('*')
        .eq('course_id', courseId)
        .order('order_index');

      if (allLessons) {
        const currentIndex = allLessons.findIndex(l => l.id === lessonData.id);
        if (currentIndex > 0) {
          setPrevLesson(allLessons[currentIndex - 1]);
        }
        if (currentIndex < allLessons.length - 1) {
          setNextLesson(allLessons[currentIndex + 1]);
        }
      }

      // Check if lesson is completed
      if (user) {
        const { data: progressData } = await supabase
          .from('user_progress')
          .select('completed')
          .eq('user_id', user.id)
          .eq('lesson_id', lessonData.id)
          .single();

        setIsCompleted(progressData?.completed || false);
      }
    } catch (error) {
      console.error('Error loading lesson:', error);
      toast({
        title: "Error",
        description: "Failed to load lesson content.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsCompleted = async () => {
    if (!user || !lesson) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lesson.id,
          completed: true,
          completed_at: new Date().toISOString(),
        });

      if (error) throw error;

      setIsCompleted(true);
      toast({
        title: "Lesson Completed!",
        description: "Great job! You've completed this lesson.",
      });
    } catch (error) {
      console.error('Error marking lesson as completed:', error);
      toast({
        title: "Error",
        description: "Failed to save progress.",
        variant: "destructive",
      });
    }
  };

  const renderContent = (content: string) => {
    // Simple markdown-like parsing for code blocks
    const parts = content.split(/(```[\s\S]*?```)/);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).trim();
        const lines = code.split('\n');
        const language = lines[0] || 'javascript';
        const codeContent = lines.slice(1).join('\n') || code;
        
        return (
          <CodeBlock 
            key={index} 
            code={codeContent} 
            language={language.toLowerCase()} 
          />
        );
      }
      return (
        <div key={index} className="prose prose-slate max-w-none">
          {part.split('\n').map((line, lineIndex) => (
            <p key={lineIndex} className="mb-4 leading-relaxed">
              {line}
            </p>
          ))}
        </div>
      );
    });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-1/4"></div>
            <div className="h-8 bg-muted rounded w-1/2"></div>
            <div className="h-64 bg-muted rounded"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!lesson || !course) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Lesson Not Found</h1>
            <p className="text-muted-foreground">The requested lesson could not be found.</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Breadcrumbs */}
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/course/${course.id}`}>{course.title}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{lesson.title}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Lesson Header */}
        <div className="flex items-start justify-between mb-8">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{course.language}</Badge>
              <Badge variant="outline">{lesson.difficulty}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{lesson.estimated_time} minutes</span>
              </div>
              {isCompleted && (
                <div className="flex items-center gap-1 text-success">
                  <CheckCircle className="h-4 w-4" />
                  <span>Completed</span>
                </div>
              )}
            </div>
          </div>
          
          {!isCompleted && (
            <Button onClick={markAsCompleted} className="primary-gradient">
              <Award className="h-4 w-4 mr-2" />
              Mark as Complete
            </Button>
          )}
        </div>

        {/* Lesson Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="space-y-6">
              {renderContent(lesson.content)}
            </div>
          </CardContent>
        </Card>

        {/* Quiz Section */}
        {quiz && (
          <Card className="quiz-card mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                {quiz.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <QuizComponent quiz={quiz} onComplete={markAsCompleted} />
            </CardContent>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between items-center">
          {prevLesson ? (
            <Button
              variant="outline"
              onClick={() => navigate(`/course/${courseId}/lesson/${prevLesson.slug}`)}
              className="flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              {prevLesson.title}
            </Button>
          ) : (
            <div></div>
          )}

          {nextLesson && (
            <Button
              onClick={() => navigate(`/course/${courseId}/lesson/${nextLesson.slug}`)}
              className="flex items-center gap-2 primary-gradient"
            >
              {nextLesson.title}
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}