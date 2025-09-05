import { MainLayout } from '@/components/layout/MainLayout';
import { ProgressTracker } from '@/components/learning/ProgressTracker';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Code, TrendingUp, Play } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface RecentLesson {
  id: string;
  title: string;
  slug: string;
  course_id: string;
  course_title: string;
  course_language: string;
  estimated_time: number;
}

interface Course {
  id: string;
  title: string;
  description: string;
  language: string;
  color: string;
  lesson_count: number;
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [recentLessons, setRecentLessons] = useState<RecentLesson[]>([]);
  const [availableCourses, setAvailableCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    try {
      // Load recent lessons (incomplete lessons from user's progress)
      const { data: progressData } = await supabase
        .from('user_progress')
        .select(`
          lesson_id,
          completed,
          lessons!inner(
            id,
            title,
            slug,
            course_id,
            estimated_time,
            courses!inner(
              id,
              title,
              language
            )
          )
        `)
        .eq('user_id', user!.id)
        .eq('completed', false)
        .limit(3);

      const recentLessonsData: RecentLesson[] = progressData?.map(p => ({
        id: p.lessons.id,
        title: p.lessons.title,
        slug: p.lessons.slug,
        course_id: p.lessons.course_id,
        course_title: p.lessons.courses.title,
        course_language: p.lessons.courses.language,
        estimated_time: p.lessons.estimated_time || 5
      })) || [];

      setRecentLessons(recentLessonsData);

      // Load available courses with lesson counts
      const { data: coursesData } = await supabase
        .from('courses')
        .select(`
          id,
          title,
          description,
          language,
          color,
          lessons(count)
        `)
        .order('order_index');

      const coursesWithCounts: Course[] = coursesData?.map(course => ({
        id: course.id,
        title: course.title,
        description: course.description || '',
        language: course.language,
        color: course.color || '#3B82F6',
        lesson_count: course.lessons?.[0]?.count || 0
      })) || [];

      setAvailableCourses(coursesWithCounts);

    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const startCourse = (courseId: string) => {
    // Navigate to first lesson of the course
    supabase
      .from('lessons')
      .select('slug')
      .eq('course_id', courseId)
      .order('order_index')
      .limit(1)
      .single()
      .then(({ data }) => {
        if (data) {
          navigate(`/course/${courseId}/lesson/${data.slug}`);
        }
      });
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-muted rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Welcome Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <p className="text-xl text-muted-foreground">Continue your programming journey</p>
        </div>

        {/* Continue Learning Section */}
        {recentLessons.length > 0 && (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Continue Learning</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentLessons.map((lesson) => (
                <Card key={lesson.id} className="lesson-card cursor-pointer" onClick={() => navigate(`/course/${lesson.course_id}/lesson/${lesson.slug}`)}>
                  <CardHeader>
                    <div className="flex items-center gap-2 mb-2">
                      <Play className="h-4 w-4 text-primary" />
                      <span className="text-sm text-muted-foreground">{lesson.course_language}</span>
                    </div>
                    <CardTitle className="text-lg">{lesson.title}</CardTitle>
                    <CardDescription>
                      {lesson.course_title} • {lesson.estimated_time} min
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full primary-gradient">Continue</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Available Courses */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Available Courses</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableCourses.map((course) => (
              <Card key={course.id} className="lesson-card">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: course.color }}
                    ></div>
                    <span className="text-sm font-medium">{course.language}</span>
                  </div>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>
                    {course.description}
                  </CardDescription>
                  <div className="text-sm text-muted-foreground">
                    {course.lesson_count} lessons
                  </div>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full" 
                    onClick={() => startCourse(course.id)}
                  >
                    Start Course
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Progress Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Your Progress</h2>
          <ProgressTracker />
        </section>
      </div>
    </MainLayout>
  );
}