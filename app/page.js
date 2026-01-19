'use client';

import { useState } from 'react';
import SetupForm from '@/components/quiz/SetupForm';
import QuizBoard from '@/components/quiz/QuizBoard';
import ResultScreen from '@/components/quiz/ResultScreen';

export default function Home() {
  const [gameState, setGameState] = useState('SETUP'); // SETUP | PLAYING | FINISHED
  const [config, setConfig] = useState({ subject: '', limit: 5 });
  const [results, setResults] = useState({ score: 0, incorrectAttempts: 0, total: 0 });

  const startQuiz = (selectedSubject, selectedLimit) => {
    setConfig({ subject: selectedSubject, limit: selectedLimit });
    setGameState('PLAYING');
  };

  const finishQuiz = (finalResults) => {
    setResults(finalResults);
    setGameState('FINISHED');
  };

  const resetQuiz = () => {
    setGameState('SETUP');
    setResults({ score: 0, incorrectAttempts: 0, total: 0 });
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {gameState === 'SETUP' && (
          <SetupForm onStart={startQuiz} />
        )}

        {gameState === 'PLAYING' && (
          <QuizBoard 
            subject={config.subject} 
            limit={config.limit} 
            onFinish={finishQuiz} 
          />
        )}

        {gameState === 'FINISHED' && (
          <ResultScreen 
            results={results} 
            onRestart={resetQuiz} 
          />
        )}
      </div>
    </main>
  );
}