import { useState } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation?: string;
}

interface Quiz {
  id: string;
  title: string;
  questions: Question[];
}

interface QuizComponentProps {
  quiz: Quiz;
  onComplete?: () => void;
}

export function QuizComponent({ quiz, onComplete }: QuizComponentProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (showResults) return;
    
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      finishQuiz();
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const finishQuiz = async () => {
    const correctAnswers = quiz.questions.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        return acc + 1;
      }
      return acc;
    }, 0);

    const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(finalScore);
    setShowResults(true);
    setQuizCompleted(true);

    // Save quiz attempt
    if (user) {
      try {
        await supabase.from('quiz_attempts').insert({
          user_id: user.id,
          quiz_id: quiz.id,
          score: finalScore,
          total_questions: quiz.questions.length,
          answers: selectedAnswers,
        });

        if (finalScore >= 70 && onComplete) {
          onComplete();
        }
      } catch (error) {
        console.error('Error saving quiz attempt:', error);
      }
    }

    toast({
      title: finalScore >= 70 ? "Quiz Passed!" : "Quiz Completed",
      description: `You scored ${finalScore}%. ${finalScore >= 70 ? 'Great job!' : 'Try again to improve your score.'}`,
      variant: finalScore >= 70 ? "default" : "destructive",
    });
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setShowResults(false);
    setQuizCompleted(false);
    setScore(0);
  };

  const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;
  const question = quiz.questions[currentQuestion];

  if (!question) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No questions available for this quiz.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">
            Question {currentQuestion + 1} of {quiz.questions.length}
          </span>
          <span className="text-sm text-muted-foreground">
            {Math.round(progress)}% Complete
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question Card */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
          
          <RadioGroup
            value={selectedAnswers[currentQuestion]?.toString()}
            onValueChange={(value) => handleAnswerSelect(currentQuestion, parseInt(value))}
            disabled={showResults}
          >
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswers[currentQuestion] === index;
                const isCorrect = index === question.correct_answer;
                const showCorrectAnswer = showResults && isCorrect;
                const showIncorrectAnswer = showResults && isSelected && !isCorrect;

                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-colors ${
                      showCorrectAnswer
                        ? 'bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800'
                        : showIncorrectAnswer
                        ? 'bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800'
                        : isSelected
                        ? 'bg-primary-50 border-primary-200 dark:bg-primary-950 dark:border-primary-800'
                        : 'border-input hover:bg-accent'
                    }`}
                  >
                    <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer flex items-center justify-between"
                    >
                      <span>{option}</span>
                      {showResults && (
                        <>
                          {isCorrect && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {showIncorrectAnswer && <XCircle className="h-5 w-5 text-red-600" />}
                        </>
                      )}
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>

          {/* Explanation */}
          {showResults && question.explanation && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Explanation:</h4>
              <p className="text-sm text-muted-foreground">{question.explanation}</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          onClick={previousQuestion}
          disabled={currentQuestion === 0 || quizCompleted}
        >
          Previous
        </Button>

        <div className="flex gap-2">
          {quizCompleted ? (
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{score}%</div>
                <div className="text-sm text-muted-foreground">Score</div>
              </div>
              <Button onClick={resetQuiz} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake Quiz
              </Button>
            </div>
          ) : (
            <Button
              onClick={nextQuestion}
              disabled={selectedAnswers[currentQuestion] === undefined}
              className="primary-gradient"
            >
              {currentQuestion === quiz.questions.length - 1 ? 'Finish Quiz' : 'Next'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}