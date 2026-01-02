import { Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface ProbabilitySectionProps {
  probability: number;
  aiSuggestion: any;
}

export function ProbabilitySection({ probability: initialProbability, aiSuggestion }: ProbabilitySectionProps) {
  const [probability, setProbability] = useState(initialProbability);
  
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (probability / 100) * circumference;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Probabilidad de Cierre</h3>
      
      {/* Circular Progress */}
      <div className="flex justify-center mb-4">
        <div className="relative" style={{ width: '120px', height: '120px' }}>
          <svg className="transform -rotate-90" width="120" height="120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#E2E8F0"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#3B82F6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              className="transition-all duration-300"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl text-[#1E293B]">{probability}%</span>
          </div>
        </div>
      </div>

      {/* Slider */}
      <div className="mb-4">
        <input
          type="range"
          min="0"
          max="100"
          value={probability}
          onChange={(e) => setProbability(Number(e.target.value))}
          className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
        />
        <div className="flex justify-between text-xs text-[#64748B] mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* AI Suggestion */}
      <div className="p-3 bg-[#EFF6FF] rounded-lg mb-4 flex items-center gap-2">
        <Info className="w-4 h-4 text-[#3B82F6] flex-shrink-0" />
        <div className="flex-1">
          <span className="text-sm text-[#1E293B]">
            Sugerido por IA: <span className="text-[#3B82F6]">{aiSuggestion.probability}%</span>
          </span>
        </div>
      </div>

      {/* Factors */}
      <div className="space-y-2">
        <h4 className="text-sm text-[#64748B] mb-3">Factores clave:</h4>
        {aiSuggestion.factors.map((factor: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            {factor.status === 'positive' ? (
              <CheckCircle className="w-4 h-4 text-[#10B981] flex-shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-[#F59E0B] flex-shrink-0" />
            )}
            <span className={factor.status === 'positive' ? 'text-[#10B981]' : 'text-[#F59E0B]'}>
              {factor.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
