import { Check, Building2, FileText, Receipt, Users, Settings } from 'lucide-react';

interface StepIndicatorProps {
  currentStep: number;
}

const steps = [
  { id: 1, label: 'Tipo de Cliente', icon: Building2 },
  { id: 2, label: 'Información Básica', icon: FileText },
  { id: 3, label: 'Información Fiscal', icon: Receipt },
  { id: 4, label: 'Contactos', icon: Users },
  { id: 5, label: 'Configuración', icon: Settings },
];

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] py-6">
      <div className="max-w-6xl mx-auto px-8">
        {/* Steps */}
        <div className="flex items-center justify-between mb-4">
          {steps.map((step, index) => {
            const isCompleted = currentStep > step.id;
            const isActive = currentStep === step.id;
            const isPending = currentStep < step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="flex items-center flex-1">
                {/* Step Circle */}
                <div className="flex flex-col items-center">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                      isCompleted
                        ? 'bg-[#10B981] text-white'
                        : isActive
                        ? 'bg-[#3B82F6] text-white'
                        : 'bg-white border-2 border-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="w-6 h-6" />
                    ) : (
                      <Icon className="w-6 h-6" />
                    )}
                  </div>
                  <span
                    className={`mt-2 text-xs text-center max-w-[120px] ${
                      isActive ? 'text-[#3B82F6]' : isPending ? 'text-[#94A3B8]' : 'text-[#1E293B]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="flex-1 h-0.5 mx-4 -mt-6">
                    <div
                      className={`h-full transition-all ${
                        currentStep > step.id ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'
                      }`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-[#E2E8F0] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#3B82F6] rounded-full transition-all duration-300"
            style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}