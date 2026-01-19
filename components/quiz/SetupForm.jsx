import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const SUBJECTS = [
  "Class 10 - English",
  "Class 10 - Mathematics",
  "Class 10 - Science",
  "Class 10 - Social Science"
];

const COUNTS = [5, 10, 15];

export default function SetupForm({ onStart }) {
  const [subject, setSubject] = useState('');
  const [count, setCount] = useState('');

  return (
    <Card className="w-full shadow-lg border-t-4 border-indigo-600">
      <CardHeader>
        <h1 className="text-2xl font-bold text-center text-slate-800">Welcome to Edzy Quiz</h1>
        <p className="text-center text-slate-500">Configure your session to begin</p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Subject Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Select Subject</label>
          <select 
            className="flex h-10 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="" disabled>Choose a subject...</option>
            {SUBJECTS.map((sub) => (
              <option key={sub} value={sub}>{sub}</option>
            ))}
          </select>
        </div>

        {/* Count Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Number of Questions</label>
          <div className="flex gap-4">
            {COUNTS.map((num) => (
              <button
                key={num}
                onClick={() => setCount(num)}
                className={`flex-1 py-3 rounded-lg border text-sm font-medium transition-all
                  ${count === num 
                    ? 'border-indigo-600 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-600' 
                    : 'border-slate-200 hover:border-indigo-300 text-slate-600'
                  }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 mt-4" 
          size="lg"
          disabled={!subject || !count}
          onClick={() => onStart(subject, count)}
        >
          Start Quiz
        </Button>
      </CardContent>
    </Card>
  );
}