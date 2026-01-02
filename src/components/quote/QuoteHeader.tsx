import { ChevronRight, Eye, Save, FileDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface QuoteHeaderProps {
  status: string;
  autoSaveTime: string;
  onBack: () => void;
}

export function QuoteHeader({ status, autoSaveTime, onBack }: QuoteHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E2E8F0] shadow-sm" style={{ height: '80px' }}>
      <div className="h-full px-8 flex items-center justify-between">
        <div className="flex flex-col gap-2">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#64748B]">
            <button onClick={onBack} className="hover:text-[#3B82F6] transition-colors">
              Pipeline
            </button>
            <ChevronRight className="w-4 h-4" />
            <button onClick={onBack} className="hover:text-[#3B82F6] transition-colors">
              Oportunidad
            </button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#1E293B]">Nueva Cotización</span>
          </div>

          {/* Title */}
          <div className="flex items-center gap-3">
            <h1 className="text-2xl text-[#1E293B]">Nueva Cotización</h1>
            <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-sm rounded-full">
              Borrador
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Auto-save indicator */}
          <span className="text-sm text-[#64748B]">
            Guardado hace {autoSaveTime}
          </span>

          {/* Actions */}
          <button className="px-4 py-2 text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            <Eye className="w-5 h-5" />
            Vista previa
          </button>
          <button className="px-4 py-2 text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            <Save className="w-5 h-5" />
            Guardar borrador
          </button>
          <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-2">
            <FileDown className="w-5 h-5" />
            Generar PDF
          </button>
        </div>
      </div>
    </div>
  );
}
