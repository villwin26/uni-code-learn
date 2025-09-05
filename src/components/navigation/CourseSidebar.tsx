import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, BookOpen, Play, CheckCircle } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';

interface Course {
  id: string;
  title: string;
  language: string;
  icon: string;
  color: string;
  order_index: number;
}

interface Lesson {
  id: string;
  course_id: string;
  title: string;
  slug: string;
  parent_id: string | null;
  order_index: number;
  difficulty: string;
  estimated_time: number;
}

interface UserProgress {
  lesson_id: string;
  completed: boolean;
}

export function CourseSidebar() {
  const { state } = useSidebar();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const collapsed = state === 'collapsed';
  
  const [courses, setCourses] = useState<Course[]>([]);
  const [lessons, setLessons] = useState<Record<string, Lesson[]>>({});
  const [progress, setProgress] = useState<Record<string, UserProgress>>({});
  const [expandedCourses, setExpandedCourses] = useState<Record<string, boolean>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCoursesAndLessons();
    if (user) {
      loadUserProgress();
    }
  }, [user]);

  const loadCoursesAndLessons = async () => {
    try {
      // Load courses
      const { data: coursesData, error: coursesError } = await supabase
        .from('courses')
        .select('*')
        .order('order_index');

      if (coursesError) throw coursesError;

      setCourses(coursesData || []);

      // Load lessons for all courses
      const { data: lessonsData, error: lessonsError } = await supabase
        .from('lessons')
        .select('*')
        .order('order_index');

      if (lessonsError) throw lessonsError;

      // Group lessons by course
      const lessonsByCourse: Record<string, Lesson[]> = {};
      lessonsData?.forEach((lesson) => {
        if (!lessonsByCourse[lesson.course_id]) {
          lessonsByCourse[lesson.course_id] = [];
        }
        lessonsByCourse[lesson.course_id].push(lesson);
      });

      setLessons(lessonsByCourse);
      
      // Auto-expand first course
      if (coursesData && coursesData.length > 0) {
        setExpandedCourses({ [coursesData[0].id]: true });
      }
    } catch (error) {
      console.error('Error loading courses and lessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id, completed')
        .eq('user_id', user.id);

      if (error) throw error;

      const progressMap: Record<string, UserProgress> = {};
      data?.forEach((p) => {
        progressMap[p.lesson_id] = p;
      });

      setProgress(progressMap);
    } catch (error) {
      console.error('Error loading user progress:', error);
    }
  };

  const toggleCourse = (courseId: string) => {
    setExpandedCourses(prev => ({
      ...prev,
      [courseId]: !prev[courseId]
    }));
  };

  const navigateToLesson = (courseId: string, lessonSlug: string) => {
    navigate(`/course/${courseId}/lesson/${lessonSlug}`);
  };

  const isLessonActive = (courseId: string, lessonSlug: string) => {
    return location.pathname === `/course/${courseId}/lesson/${lessonSlug}`;
  };

  const getLessonIcon = (lessonId: string) => {
    const userProgress = progress[lessonId];
    if (userProgress?.completed) {
      return <CheckCircle className="h-4 w-4 text-success" />;
    }
    return <Play className="h-4 w-4 text-muted-foreground" />;
  };

  if (loading) {
    return (
      <Sidebar className="border-r">
        <SidebarContent>
          <div className="p-4">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar className="border-r">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Programming Courses</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {courses.map((course) => (
                <Collapsible
                  key={course.id}
                  open={expandedCourses[course.id]}
                  onOpenChange={() => toggleCourse(course.id)}
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton className="w-full">
                        <div className="flex items-center gap-2 flex-1">
                          <BookOpen className="h-4 w-4" style={{ color: course.color }} />
                          {!collapsed && (
                            <>
                              <span className="font-medium">{course.title}</span>
                              <div className="ml-auto">
                                {expandedCourses[course.id] ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </div>
                            </>
                          )}
                        </div>
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {lessons[course.id]?.map((lesson) => (
                          <SidebarMenuSubItem key={lesson.id}>
                            <SidebarMenuSubButton
                              onClick={() => navigateToLesson(course.id, lesson.slug)}
                              isActive={isLessonActive(course.id, lesson.slug)}
                              className="flex items-center gap-2"
                            >
                              {getLessonIcon(lesson.id)}
                              {!collapsed && (
                                <>
                                  <span className="flex-1 text-sm">{lesson.title}</span>
                                  <span className="text-xs text-muted-foreground">
                                    {lesson.estimated_time}m
                                  </span>
                                </>
                              )}
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}