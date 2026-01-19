import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function QuestionCard({ data, onComplete }) {
  const [selectedId, setSelectedId] = useState(null);
  const [isSolved, setIsSolved] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState([]); // Track IDs of wrong guesses

  // Extract data safely (API structure assumption based on typical patterns)
  // Adjust these keys based on actual API response console.log
  const questionText = data.question;
  const options = data.options; // Array of { id, text, isCorrect }

  const handleSelect = (option) => {
    if (isSolved) return; // Prevent changing after correct answer

    setSelectedId(option.id);

    if (option.isCorrect) {
      // Correct Answer Logic
      setIsSolved(true);
    } else {
      // Incorrect Answer Logic [cite: 20]
      if (!wrongAttempts.includes(option.id)) {
        setWrongAttempts(prev => [...prev, option.id]);
      }
    }
  };

  const handleNext = () => {
    // Pass the number of wrong attempts incurred on THIS card back to parent
    onComplete(wrongAttempts.length);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-50/50 border-b pb-4">
        <h2 className="text-lg font-semibold text-slate-800 leading-relaxed">
          {questionText}
        </h2>
      </CardHeader>
      <CardContent className="pt-6 space-y-3">
        {options.map((opt) => {
          const isSelected = selectedId === opt.id;
          const isWrong = wrongAttempts.includes(opt.id);
          const isCorrect = isSolved && opt.isCorrect;

          // Dynamic Styles based on state [cite: 19]
          let baseStyles = "w-full justify-start text-left h-auto py-4 px-4 border-2 hover:bg-slate-50";
          let colorStyles = "border-slate-200 text-slate-700";
          let icon = null;

          if (isCorrect) {
            colorStyles = "border-green-500 bg-green-50 text-green-800 hover:bg-green-50";
            icon = <CheckCircle2 className="ml-auto h-5 w-5 text-green-600" />;
          } else if (isWrong) {
            colorStyles = "border-red-200 bg-red-50 text-red-800 hover:bg-red-50";
            icon = <XCircle className="ml-auto h-5 w-5 text-red-500" />;
          } else if (isSelected) {
            colorStyles = "border-indigo-500 ring-1 ring-indigo-500";
          }

          return (
            <Button
              key={opt.id}
              variant="ghost"
              className={cn(baseStyles, colorStyles)}
              onClick={() => handleSelect(opt)}
              disabled={isSolved && !opt.isCorrect} // Disable other options once solved
            >
              <span className="mr-4 text-slate-400 font-mono text-xs uppercase">
                {String.fromCharCode(65 + options.indexOf(opt))}
              </span>
              <span className="flex-1">{opt.text || opt.answerText}</span>
              {icon}
            </Button>
          );
        })}

        {/* Feedback Area */}
        {wrongAttempts.length > 0 && !isSolved && (
          <p className="text-center text-red-600 text-sm font-medium animate-pulse">
            Incorrect. Please try again. [cite: 20]
          </p>
        )}

        {/* Next Button - Only appears when solved */}
        {isSolved && (
          <div className="pt-4 border-t mt-4 animate-in fade-in slide-in-from-bottom-2">
            <Button
              className="w-full bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
              size="lg"
              onClick={handleNext}
            >
              Next Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}