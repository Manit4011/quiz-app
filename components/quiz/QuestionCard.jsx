import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuestionCard({ data, onComplete }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState([]);
  const [shakeId, setShakeId] = useState(null); // For animation trigger

  // Clean data structure from our new api.js
  const questionText = data.question; 
  const options = data.options; 

  // Reset state when data changes (new question)
  useEffect(() => {
    setSelectedId(null);
    setIsSolved(false);
    setWrongAttempts([]);
    setShakeId(null);
  }, [data]);

  const handleSelect = (option) => {
    if (isSolved) return; 

    setSelectedId(option.id);

    if (option.isCorrect) {
      setIsSolved(true);
      // Auto-advance after a brief delay for better UX
      setTimeout(() => {
         onComplete(wrongAttempts.length);
      }, 1200);
    } else {
      // Trigger Shake Animation
      setShakeId(option.id);
      setTimeout(() => setShakeId(null), 500); // Reset animation

      if (!wrongAttempts.includes(option.id)) {
        setWrongAttempts(prev => [...prev, option.id]);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto animate-pop">
      <Card className="glass-card border-0 rounded-3xl overflow-hidden shadow-2xl">
        {/* Question Header */}
        <div className="bg-white/50 p-8 border-b border-white/20">
          <h2 className="text-2xl font-bold text-slate-800 leading-snug">
            {questionText}
          </h2>
        </div>

        <CardContent className="p-8 space-y-4 bg-slate-50/50">
          {options.map((opt, index) => {
            const isSelected = selectedId === opt.id;
            const isWrong = wrongAttempts.includes(opt.id);
            const isCorrect = isSolved && opt.isCorrect;
            const shouldShake = shakeId === opt.id;

            let cardStyles = "border-2 border-white bg-white hover:border-indigo-200 hover:shadow-md hover:-translate-y-1";
            let icon = null;

            if (isCorrect) {
              cardStyles = "border-green-500 bg-green-50 text-green-900 ring-4 ring-green-100 scale-[1.02] z-10";
              icon = <CheckCircle className="h-6 w-6 text-green-600 animate-in zoom-in spin-in-90 duration-300" />;
            } else if (isWrong) {
              cardStyles = "border-red-300 bg-red-50 text-red-900 opacity-70";
              icon = <XCircle className="h-6 w-6 text-red-500" />;
            } else if (isSelected) {
               // Temporary selected state before validation
               cardStyles = "border-indigo-500 bg-indigo-50";
            }

            return (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                disabled={isSolved || isWrong}
                className={cn(
                  "relative w-full p-5 rounded-2xl flex items-center text-left transition-all duration-200 group",
                  cardStyles,
                  shouldShake && "animate-shake border-red-500"
                )}
              >
                {/* Option Letter Bubble */}
                <div className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-lg mr-5 text-sm font-bold transition-colors",
                  isCorrect ? "bg-green-200 text-green-800" : 
                  isWrong ? "bg-red-200 text-red-800" :
                  "bg-slate-100 text-slate-500 group-hover:bg-indigo-100 group-hover:text-indigo-600"
                )}>
                  {String.fromCharCode(65 + index)}
                </div>

                <span className="flex-1 text-lg font-medium">{opt.text}</span>
                {icon}
              </button>
            );
          })}
        </CardContent>
        
        {/* Footer Message */}
        <div className="h-12 flex items-center justify-center pb-4 text-sm font-medium">
          {isSolved ? (
            <span className="text-green-600 animate-in fade-in slide-in-from-bottom-2">
              🎉 Excellent! Proceeding to next question...
            </span>
          ) : wrongAttempts.length > 0 ? (
             <span className="text-red-500 animate-pulse">
               Try again! That wasn't quite right.
             </span>
          ) : (
             <span className="text-slate-400">Select the correct option</span>
          )}
        </div>
      </Card>
    </div>
  );
}