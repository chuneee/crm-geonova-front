import { ArrowRight, FileText, Send, Calendar, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuickActionsSectionProps {
  stage: string;
}

const stageColors: Record<string, string> = {
  prospeccion: 'bg-[#94A3B8] hover:bg-[#64748B]',
  calificacion: 'bg-[#3B82F6] hover:bg-[#2563EB]',
  propuesta: 'bg-[#8B5CF6] hover:bg-[#7C3AED]',
  negociacion: 'bg-[#F59E0B] hover:bg-[#D97706]',
  ganado: 'bg-[#10B981] hover:bg-[#059669]',
  perdido: 'bg-[#EF4444] hover:bg-[#DC2626]'
};

export function QuickActionsSection({ stage }: QuickActionsSectionProps) {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Acciones Rápidas</h3>
      
      <div className="space-y-3">
        <button className={`w-full h-12 ${stageColors[stage]} text-white rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm`}>
          <ArrowRight className="w-5 h-5" />
          <span>Mover a siguiente etapa</span>
        </button>
        
        <button 
          onClick={() => navigate('/quote/new')}
          className="w-full h-12 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2"
        >
          <FileText className="w-5 h-5" />
          <span>Generar cotización</span>
        </button>
        
        <button className="w-full h-12 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2">
          <Send className="w-5 h-5" />
          <span>Enviar propuesta</span>
        </button>
        
        <button className="w-full h-12 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2">
          <Calendar className="w-5 h-5" />
          <span>Agendar reunión</span>
        </button>
        
        <button className="w-full h-12 bg-white border border-[#E2E8F0] text-[#1E293B] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Registrar actividad</span>
        </button>
      </div>
    </div>
  );
}