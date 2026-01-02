import { ArrowLeft, ArrowRight, Save } from 'lucide-react';

interface FormFooterProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  lastSaved: Date | null;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
  onSaveDraft: () => void;
  onFinish: () => void;
}

const stepNames = [
  'Tipo de Cliente',
  'Información Básica',
  'Información Fiscal',
  'Contactos',
  'Configuración'
];

export function FormFooter({
  currentStep,
  totalSteps,
  canProceed,
  lastSaved,
  onPrevious,
  onNext,
  onCancel,
  onSaveDraft,
  onFinish
}: FormFooterProps) {
  const isLastStep = currentStep === totalSteps;
  const nextStepName = currentStep < totalSteps ? stepNames[currentStep] : '';

  const getLastSavedText = () => {
    if (!lastSaved) return '';
    
    const seconds = Math.floor((Date.now() - lastSaved.getTime()) / 1000);
    if (seconds < 60) return 'Guardado hace unos segundos';
    
    const minutes = Math.floor(seconds / 60);
    if (minutes === 1) return 'Guardado hace 1 min';
    if (minutes < 60) return `Guardado hace ${minutes} min`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return 'Guardado hace 1 hora';
    return `Guardado hace ${hours} horas`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-20 bg-[#F8FAFC] border-t border-[#E2E8F0] z-20">
      <div className="max-w-6xl mx-auto px-8 h-full flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          <button
            onClick={onSaveDraft}
            className="flex items-center gap-2 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
          >
            <Save className="w-4 h-4" />
            Guardar como borrador
          </button>
          
          {lastSaved && (
            <span className="text-xs text-[#94A3B8]">
              {getLastSavedText()}
            </span>
          )}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 text-sm text-[#64748B] hover:text-[#1E293B] transition-colors"
          >
            Cancelar
          </button>
          
          <button
            onClick={onPrevious}
            disabled={currentStep === 1}
            className={`flex items-center gap-2 px-6 py-2.5 border border-[#E2E8F0] rounded-lg text-sm transition-colors ${
              currentStep === 1
                ? 'text-[#CBD5E1] cursor-not-allowed'
                : 'text-[#64748B] hover:bg-[#F8FAFC] hover:border-[#CBD5E1]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Anterior
          </button>
          
          {isLastStep ? (
            <button
              onClick={onFinish}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm transition-colors ${
                canProceed
                  ? 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                  : 'bg-[#CBD5E1] text-[#94A3B8] cursor-not-allowed'
              }`}
            >
              Finalizar y crear cliente
            </button>
          ) : (
            <button
              onClick={onNext}
              disabled={!canProceed}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm transition-colors ${
                canProceed
                  ? 'bg-[#3B82F6] text-white hover:bg-[#2563EB]'
                  : 'bg-[#CBD5E1] text-[#94A3B8] cursor-not-allowed'
              }`}
            >
              <span>Siguiente: {nextStepName}</span>
              <ArrowRight className="w-4 h-4" />
              <span className="text-xs opacity-60 ml-1">↵</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}