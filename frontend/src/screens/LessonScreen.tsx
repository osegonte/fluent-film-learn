
import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, BookOpen, Check, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lesson, QuizQuestion } from '../types/api';
import { apiService } from '../services/api';
import { Button } from '../components/ui/button';

const LessonScreen = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<'video' | 'vocabulary' | 'quiz'>('video');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLesson = async () => {
      if (!lessonId) return;
      
      try {
        const lessonData = await apiService.getLesson(lessonId);
        setLesson(lessonData);
      } catch (error) {
        console.error('Failed to fetch lesson:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!lesson || !selectedAnswer) return;

    const currentQuestion = lesson.quiz[currentQuizIndex];
    const correct = selectedAnswer === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!lesson) return;

    if (currentQuizIndex < lesson.quiz.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer('');
      setShowResult(false);
    } else {
      // Quiz completed
      handleLessonComplete();
    }
  };

  const handleLessonComplete = async () => {
    if (!lesson) return;

    try {
      await apiService.updateProgress({
        lessonId: lesson.id,
        completed: true,
        score: Math.round((score / lesson.quiz.length) * 100),
        timeSpent: 0, // You could track this
        vocabularyMastered: lesson.vocabulary.map(v => v.word),
      });
      
      navigate('/');
    } catch (error) {
      console.error('Failed to update progress:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-canvas">
        <div className="text-primary">Loading lesson...</div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="flex items-center justify-center h-screen bg-canvas">
        <div className="text-primary">Lesson not found</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-canvas">
      {/* Header */}
      <div className="bg-card border-b border-default px-6 py-4">
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="text-secondary hover:text-primary"
          >
            ← Back
          </button>
          <h1 className="font-semibold text-primary">{lesson.title}</h1>
          <div className="text-sm text-secondary">
            {currentPhase === 'quiz' && `${currentQuizIndex + 1}/${lesson.quiz.length}`}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Video Phase */}
        {currentPhase === 'video' && (
          <div className="p-6">
            {/* Video Player Mock */}
            <div className="bg-navy-900 rounded-xl aspect-video mb-6 flex items-center justify-center">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-16 h-16 bg-royalBlue-500 rounded-full flex items-center justify-center text-white"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
            </div>

            {/* Subtitle */}
            <div className="bg-card rounded-xl p-6 border border-default mb-6">
              <div className="text-center">
                <p className="text-xl font-medium text-primary mb-2">"{lesson.subtitle}"</p>
                <p className="text-secondary italic">{lesson.translation}</p>
              </div>
            </div>

            {/* Audio Controls */}
            <div className="bg-card rounded-xl p-4 border border-default mb-6">
              <div className="flex items-center justify-between">
                <button className="p-3 bg-slate-800 dark:bg-slate-600 rounded-lg">
                  <Volume2 size={20} className="text-secondary" />
                </button>
                <div className="flex-1 mx-4 h-1 bg-slate-800 dark:bg-slate-600 rounded-full">
                  <div className="w-1/3 h-full progress-gradient rounded-full"></div>
                </div>
                <button className="p-3 bg-slate-800 dark:bg-slate-600 rounded-lg">
                  <RotateCcw size={20} className="text-secondary" />
                </button>
              </div>
            </div>

            <Button
              onClick={() => setCurrentPhase('vocabulary')}
              className="w-full btn-primary"
            >
              Continue to Vocabulary
            </Button>
          </div>
        )}

        {/* Vocabulary Phase */}
        {currentPhase === 'vocabulary' && (
          <div className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen size={24} className="text-royalBlue-500" />
              <h2 className="text-xl font-semibold text-primary">Key Vocabulary</h2>
            </div>

            <div className="space-y-4 mb-8">
              {lesson.vocabulary.map((item, index) => (
                <div key={index} className="bg-card rounded-xl p-4 border border-default">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-primary">{item.word}</h3>
                    <span className="text-sm text-secondary">{item.pronunciation}</span>
                  </div>
                  <p className="text-secondary mb-2">{item.translation}</p>
                  <p className="text-sm text-secondary italic">"{item.example}"</p>
                </div>
              ))}
            </div>

            <Button
              onClick={() => setCurrentPhase('quiz')}
              className="w-full btn-primary"
            >
              Start Quiz
            </Button>
          </div>
        )}

        {/* Quiz Phase */}
        {currentPhase === 'quiz' && (
          <div className="p-6">
            <div className="mb-6">
              <div className="w-full bg-slate-800 dark:bg-slate-600 rounded-full h-2 mb-4">
                <div 
                  className="progress-gradient h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / lesson.quiz.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-default mb-6">
              <h3 className="text-lg font-semibold text-primary mb-4">
                {lesson.quiz[currentQuizIndex].question}
              </h3>

              <div className="space-y-3">
                {lesson.quiz[currentQuizIndex].options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-xl border text-left transition-colors ${
                      selectedAnswer === option
                        ? showResult
                          ? isCorrect
                            ? 'border-spruce-500 bg-spruce-500 bg-opacity-10 text-spruce-500'
                            : 'border-persimmon-500 bg-persimmon-500 bg-opacity-10 text-persimmon-500'
                          : 'border-royalBlue-500 bg-royalBlue-500 bg-opacity-10'
                        : showResult && option === lesson.quiz[currentQuizIndex].correctAnswer
                          ? 'border-spruce-500 bg-spruce-500 bg-opacity-10 text-spruce-500'
                          : 'border-default hover:border-royalBlue-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-primary">{option}</span>
                      {showResult && selectedAnswer === option && (
                        isCorrect ? <Check size={20} className="text-spruce-500" /> : <X size={20} className="text-persimmon-500" />
                      )}
                      {showResult && option === lesson.quiz[currentQuizIndex].correctAnswer && selectedAnswer !== option && (
                        <Check size={20} className="text-spruce-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {showResult && lesson.quiz[currentQuizIndex].explanation && (
                <div className="mt-4 p-3 bg-slate-800 dark:bg-slate-600 rounded-lg">
                  <p className="text-sm text-secondary">{lesson.quiz[currentQuizIndex].explanation}</p>
                </div>
              )}
            </div>

            {!showResult ? (
              <Button
                onClick={handleSubmitAnswer}
                disabled={!selectedAnswer}
                className="w-full btn-primary"
              >
                Submit Answer
              </Button>
            ) : (
              <Button
                onClick={handleNextQuestion}
                className="w-full btn-primary"
              >
                {currentQuizIndex < lesson.quiz.length - 1 ? 'Next Question' : 'Complete Lesson'}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LessonScreen;
