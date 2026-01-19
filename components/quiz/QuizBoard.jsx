'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchQuizQuestions } from '@/lib/api'; // uses the new transformer
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertCircle } from 'lucide-react';
import QuestionCard from './QuestionCard';

export default function QuizBoard({ subject, limit, onFinish }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);
  const [elapsedTime, setElapsedTime] = useState(0);

  const { data: questions = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['quiz', subject, limit],
    queryFn: () => fetchQuizQuestions({ subject, limit }),
    staleTime: Infinity,
    retry: 1,
  });

  // Timer: Resets on every new question index
  useEffect(() => {
    setElapsedTime(0);
    const timer = setInterval(() => setElapsedTime(p => p + 1), 1000);
    return () => clearInterval(timer);
  }, [currentIdx]);

  const handleCorrectAnswer = (missedCount) => {
    setIncorrectAttempts(prev => prev + missedCount);

    if (currentIdx + 1 >= questions.length) {
      onFinish({
        score: questions.length, // Perfect score required to finish
        incorrectAttempts: incorrectAttempts + missedCount,
        total: questions.length
      });
    } else {
      setCurrentIdx(prev => prev + 1);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <Loader2 className="h-10 w-10 animate-spin text-indigo-600" />
        <p className="text-slate-500">Loading your quiz...</p>
      </div>
    );
  }

  if (isError || !questions || questions.length === 0) {
    return (
      <Card className="border-red-200 bg-red-50 text-center p-8">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-700">Quiz Unavailable</h3>
        <p className="text-red-600 mb-6">Could not load questions for this subject.</p>
        <Button onClick={() => refetch()} variant="destructive">Retry</Button>
      </Card>
    );
  }

  const currentQuestion = questions[currentIdx];
  const progress = ((currentIdx + 1) / questions.length) * 100;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm font-medium text-slate-600">
        <span>Question {currentIdx + 1} of {questions.length}</span>
        <span className="font-mono bg-slate-200 px-2 py-1 rounded text-slate-800">
          ⏱ {Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}
        </span>
      </div>

      <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
        <div 
          className="h-full bg-indigo-600 transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <QuestionCard 
        key={currentQuestion.id} // Important: Forces re-render on new question
        data={currentQuestion}
        onComplete={handleCorrectAnswer}
      />
    </div>
  );
}