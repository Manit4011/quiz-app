import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trophy, RotateCcw, XOctagon } from 'lucide-react';

export default function ResultScreen({ results, onRestart }) {
  // Score is calculated as Total Questions since they must answer all correctly to finish
  const { score, incorrectAttempts, total } = results;

  return (
    <Card className="text-center shadow-xl border-t-4 border-green-500">
      <CardHeader className="pt-10 pb-2">
        <div className="mx-auto bg-green-100 p-4 rounded-full mb-4 w-fit">
          <Trophy className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-800">Quiz Completed!</h2>
        <p className="text-slate-500">Here is how you performed</p>
      </CardHeader>
      
      <CardContent className="space-y-8 pb-10">
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <p className="text-slate-500 text-sm font-medium uppercase tracking-wider">Final Score</p>
            <p className="text-3xl font-bold text-indigo-600 mt-1">
              {score} <span className="text-lg text-slate-400">/ {total}</span>
            </p>
          </div>
          
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <p className="text-red-500 text-sm font-medium uppercase tracking-wider flex items-center justify-center gap-1">
               Mistakes <XOctagon className="h-3 w-3" />
            </p>
            <p className="text-3xl font-bold text-red-600 mt-1">
              {incorrectAttempts}
            </p>
          </div>
        </div>

        <Button 
          onClick={onRestart} 
          size="lg" 
          className="w-full bg-slate-900 hover:bg-slate-800 text-amber-50"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reattempt Quiz [cite: 25]
        </Button>
      </CardContent>
    </Card>
  );
}