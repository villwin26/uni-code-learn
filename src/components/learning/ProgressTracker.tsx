import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Clock, Trophy, Target } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface CourseProgress {
  course_id: string;
  course_title: string;
  course_language: string;
  total_lessons: number;
  completed_lessons: number;
  progress_percentage: number;
  time_spent: number;
}

interface ProgressStats {
  total_courses: number;
  completed_courses: number;
  total_lessons_completed: number;
  total_time_spent: number;
  current_streak: number;
}

export function ProgressTracker() {
  const { user } = useAuth();
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProgressData();
    }
  }, [user]);

  const loadProgressData = async () => {
    if (!user) return;

    try {
      // Get course progress
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select(`
          lesson_id,
          completed,
          time_spent,
          lessons!inner(
            course_id,
            courses!inner(
              id,
              title,
              language
            )
          )
        `)
        .eq('user_id', user.id);

      if (progressError) throw progressError;

      // Get all lessons count per course
      const { data: allLessons, error: lessonsError } = await supabase
        .from('lessons')
        .select('id, course_id, courses!inner(id, title, language)');

      if (lessonsError) throw lessonsError;

      // Calculate progress per course
      const courseMap = new Map<string, CourseProgress>();
      
      // Initialize courses
      allLessons?.forEach(lesson => {
        const courseId = lesson.course_id;
        if (!courseMap.has(courseId)) {
          courseMap.set(courseId, {
            course_id: courseId,
            course_title: lesson.courses.title,
            course_language: lesson.courses.language,
            total_lessons: 0,
            completed_lessons: 0,
            progress_percentage: 0,
            time_spent: 0
          });
        }
        courseMap.get(courseId)!.total_lessons++;
      });

      // Add progress data
      progressData?.forEach(progress => {
        const courseId = progress.lessons.course_id;
        const courseProgress = courseMap.get(courseId);
        if (courseProgress) {
          if (progress.completed) {
            courseProgress.completed_lessons++;
          }
          courseProgress.time_spent += progress.time_spent || 0;
        }
      });

      // Calculate percentages
      const courseProgressArray = Array.from(courseMap.values()).map(course => ({
        ...course,
        progress_percentage: course.total_lessons > 0 
          ? Math.round((course.completed_lessons / course.total_lessons) * 100)
          : 0
      }));

      setCourseProgress(courseProgressArray);

      // Calculate overall stats
      const totalCourses = courseProgressArray.length;
      const completedCourses = courseProgressArray.filter(c => c.progress_percentage === 100).length;
      const totalLessonsCompleted = courseProgressArray.reduce((sum, c) => sum + c.completed_lessons, 0);
      const totalTimeSpent = courseProgressArray.reduce((sum, c) => sum + c.time_spent, 0);

      setStats({
        total_courses: totalCourses,
        completed_courses: completedCourses,
        total_lessons_completed: totalLessonsCompleted,
        total_time_spent: totalTimeSpent,
        current_streak: 0 // TODO: Calculate streak based on daily activity
      });

    } catch (error) {
      console.error('Error loading progress data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-muted rounded-lg"></div>
          <div className="h-24 bg-muted rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Overall Stats */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Trophy className="h-8 w-8 text-warning mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.completed_courses}</div>
              <div className="text-sm text-muted-foreground">Courses Completed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="h-8 w-8 text-success mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total_lessons_completed}</div>
              <div className="text-sm text-muted-foreground">Lessons Completed</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="h-8 w-8 text-info mx-auto mb-2" />
              <div className="text-2xl font-bold">{Math.round(stats.total_time_spent / 60)}h</div>
              <div className="text-sm text-muted-foreground">Time Spent</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 text-center">
              <Target className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total_courses}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Course Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Course Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {courseProgress.map((course) => (
            <div key={course.course_id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium">{course.course_title}</h4>
                  <Badge variant="secondary">{course.course_language}</Badge>
                </div>
                <div className="text-sm text-muted-foreground">
                  {course.completed_lessons}/{course.total_lessons} lessons
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={course.progress_percentage} className="flex-1" />
                <span className="text-sm font-medium w-12 text-right">
                  {course.progress_percentage}%
                </span>
              </div>
              <div className="text-xs text-muted-foreground">
                Time spent: {Math.round(course.time_spent / 60)} hours
              </div>
            </div>
          ))}
          
          {courseProgress.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Start learning to see your progress here!
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}