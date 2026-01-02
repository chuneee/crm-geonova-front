import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuoteFooterProps {
  currentStep: string;
  onPrevious: () => void;
  onNext: () => void;
  onCancel: () => void;
}

const stepLabels: Record<string, string> = {
  client: 'Cliente y Oportunidad',
  products: 'Productos y Servicios',
  terms: 'Términos y Condiciones',
  review: 'Revisión y Envío'
};

const nextStepLabels: Record<string, string> = {
  client: 'Siguiente: Productos',
  products: 'Siguiente: Términos',
  terms: 'Siguiente: Revisión',
  review: 'Generar cotización'
};

export function QuoteFooter({ currentStep, onPrevious, onNext, onCancel }: QuoteFooterProps) {
  const isFirstStep = currentStep === 'client';
  const isLastStep = currentStep === 'review';

  return (
    <div className="sticky bottom-0 bg-[#F8FAFC] border-t border-[#E2E8F0] px-8 py-4 h-[72px] flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button 
          onClick={onCancel}
          className="px-4 py-2 text-[#64748B] hover:bg-white rounded-lg transition-colors"
        >
          Cancelar
        </button>
        <button 
          onClick={onCancel}
          className="px-4 py-2 text-[#64748B] hover:bg-white rounded-lg transition-colors"
        >
          Guardar y cerrar
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={onPrevious}
          disabled={isFirstStep}
          className={`px-4 py-2 border border-[#E2E8F0] rounded-lg transition-colors flex items-center gap-2 ${
            isFirstStep 
              ? 'text-[#94A3B8] bg-[#F8FAFC] cursor-not-allowed' 
              : 'text-[#64748B] hover:bg-white'
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Anterior
        </button>
        <button 
          onClick={onNext}
          className="px-6 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-2"
        >
          {nextStepLabels[currentStep]}
          {!isLastStep && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
