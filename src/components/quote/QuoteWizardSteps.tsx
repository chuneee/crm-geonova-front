import { CheckCircle, Circle } from 'lucide-react';

interface Step {
  id: string;
  label: string;
  status: 'completed' | 'active' | 'pending';
}

interface QuoteWizardStepsProps {
  steps: Step[];
  currentStep: string;
  onStepChange: (stepId: any) => void;
}

const statusColors = {
  completed: { bg: 'bg-[#10B981]', text: 'text-[#10B981]', line: 'bg-[#10B981]' },
  active: { bg: 'bg-[#3B82F6]', text: 'text-[#3B82F6]', line: 'bg-[#E2E8F0]' },
  pending: { bg: 'bg-[#E2E8F0]', text: 'text-[#64748B]', line: 'bg-[#E2E8F0]' }
};

export function QuoteWizardSteps({ steps, currentStep, onStepChange }: QuoteWizardStepsProps) {
  return (
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]" style={{ height: '64px' }}>
      <div className="h-full px-8 flex items-center justify-center">
        <div className="flex items-center gap-0">
          {steps.map((step, index) => {
            const colors = statusColors[step.status];
            const isClickable = step.status === 'completed' || step.status === 'active';
            
            return (
              <div key={step.id} className="flex items-center">
                {/* Step */}
                <button
                  onClick={() => isClickable && onStepChange(step.id)}
                  disabled={!isClickable}
                  className={`flex items-center gap-3 px-6 py-2 rounded-lg transition-colors ${
                    isClickable ? 'hover:bg-white cursor-pointer' : 'cursor-default'
                  }`}
                >
                  {/* Circle */}
                  <div className={`w-8 h-8 rounded-full ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="w-5 h-5 text-white" />
                    ) : (
                      <span className="text-sm text-white">{index + 1}</span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="flex flex-col items-start">
                    <span className={`text-xs ${step.status === 'pending' ? 'text-[#94A3B8]' : 'text-[#64748B]'}`}>
                      Paso {index + 1}
                    </span>
                    <span className={`text-sm ${colors.text}`}>
                      {step.label}
                    </span>
                  </div>
                </button>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-24 ${colors.line}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
