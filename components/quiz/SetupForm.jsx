import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Calculator, FlaskConical, Globe, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const SUBJECTS = [
  { id: "Class 10 - English", label: "English", icon: BookOpen, color: "bg-blue-100 text-blue-600 border-blue-200" },
  { id: "Class 10 - Mathematics", label: "Mathematics", icon: Calculator, color: "bg-indigo-100 text-indigo-600 border-indigo-200" },
  { id: "Class 10 - Science", label: "Science", icon: FlaskConical, color: "bg-emerald-100 text-emerald-600 border-emerald-200" },
  { id: "Class 10 - Social Science", label: "Social Sci.", icon: Globe, color: "bg-amber-100 text-amber-600 border-amber-200" }
];

const COUNTS = [5, 10, 15];

export default function SetupForm({ onStart }) {
  const [subject, setSubject] = useState('');
  const [count, setCount] = useState(5);

  return (
    <Card className="w-full max-w-2xl glass-card border-0 rounded-2xl overflow-hidden animate-pop">
      <div className="bg-slate-900 p-8 text-center text-white">
        <h1 className="text-3xl font-extrabold tracking-tight">Edzy Quiz Mode</h1>
        <p className="text-slate-400 mt-2">Master your Class 10 subjects</p>
      </div>

      <CardContent className="p-8 space-y-8">
        {/* Subject Grid */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Choose Subject</label>
          <div className="grid grid-cols-2 gap-4">
            {SUBJECTS.map((sub) => {
              const Icon = sub.icon;
              const isSelected = subject === sub.id;
              
              return (
                <button
                  key={sub.id}
                  onClick={() => setSubject(sub.id)}
                  className={cn(
                    "relative flex items-center p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md",
                    isSelected 
                      ? `border-slate-800 ring-1 ring-slate-800 bg-slate-50` 
                      : "border-slate-100 bg-white hover:border-slate-300"
                  )}
                >
                  <div className={cn("p-3 rounded-lg mr-4", sub.color)}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-800 block">{sub.label}</span>
                    <span className="text-xs text-slate-500">Class 10</span>
                  </div>
                  {isSelected && (
                    <div className="absolute top-2 right-2 text-slate-900">
                      <CheckCircle2 className="h-5 w-5 fill-slate-900 text-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Count Selection */}
        <div className="space-y-3">
          <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Number of Questions</label>
          <div className="flex gap-4">
            {COUNTS.map((num) => (
              <button
                key={num}
                onClick={() => setCount(num)}
                className={cn(
                  "flex-1 py-4 rounded-xl border-2 font-bold text-lg transition-all",
                  count === num 
                    ? "border-slate-900 bg-slate-900 text-white shadow-lg transform scale-105" 
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                )}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <Button 
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-lg h-14 rounded-xl shadow-indigo-200 shadow-xl transition-transform active:scale-95" 
          onClick={() => onStart(subject, count)}
          disabled={!subject}
        >
          Start Quiz Challenge
        </Button>
      </CardContent>
    </Card>
  );
}