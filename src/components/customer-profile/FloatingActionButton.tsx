import { Plus, FileText, DollarSign, Calendar, Mail, Activity } from 'lucide-react';
import { useState } from 'react';

export function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Speed Dial Options */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 flex flex-col items-end gap-3 mb-3">
          <button className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-5 py-3 hover:shadow-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#3B82F6] flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-[#1E293B] whitespace-nowrap">Nueva oportunidad</span>
          </button>

          <button className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-5 py-3 hover:shadow-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#10B981] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-[#1E293B] whitespace-nowrap">Nueva cotización</span>
          </button>

          <button className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-5 py-3 hover:shadow-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#F59E0B] flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-[#1E293B] whitespace-nowrap">Registrar actividad</span>
          </button>

          <button className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-5 py-3 hover:shadow-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#8B5CF6] flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-[#1E293B] whitespace-nowrap">Agendar reunión</span>
          </button>

          <button className="flex items-center gap-3 bg-white shadow-lg rounded-full pl-4 pr-5 py-3 hover:shadow-xl transition-all group">
            <div className="w-10 h-10 rounded-full bg-[#06B6D4] flex items-center justify-center">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm text-[#1E293B] whitespace-nowrap">Enviar mensaje</span>
          </button>
        </div>
      )}

      {/* Main Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 bg-[#3B82F6] text-white rounded-full shadow-lg hover:shadow-xl hover:bg-[#2563EB] transition-all flex items-center justify-center ${
          isOpen ? 'rotate-45' : ''
        }`}
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Quick Note Button */}
      <button
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 bg-white border border-[#E2E8F0] text-[#64748B] rounded-full shadow-lg hover:shadow-xl hover:bg-[#F8FAFC] transition-all flex items-center justify-center"
        title="Nota rápida"
      >
        <FileText className="w-5 h-5" />
      </button>
    </div>
  );
}
