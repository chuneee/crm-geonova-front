import { Mail, Paperclip, Bell, Calendar } from 'lucide-react';

export function PostGenerationSection() {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Acciones Post-Generación</h3>

      <div className="space-y-3">
        <label className="flex items-start gap-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="w-4 h-4 text-[#64748B]" />
              <span className="text-sm text-[#1E293B]">Enviar por email al cliente</span>
            </div>
            <p className="text-xs text-[#64748B]">Se enviará automáticamente al generar</p>
          </div>
        </label>

        <label className="flex items-start gap-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Paperclip className="w-4 h-4 text-[#64748B]" />
              <span className="text-sm text-[#1E293B]">Adjuntar documentos adicionales</span>
            </div>
            <button className="text-xs text-[#3B82F6] hover:underline">Seleccionar archivos</button>
          </div>
        </label>

        <label className="flex items-start gap-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="w-4 h-4 text-[#64748B]" />
              <span className="text-sm text-[#1E293B]">Programar seguimiento</span>
            </div>
            <input
              type="date"
              className="w-full mt-2 px-2 py-1 text-xs border border-[#E2E8F0] rounded"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </label>

        <label className="flex items-start gap-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
          <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#64748B]" />
              <span className="text-sm text-[#1E293B]">Notificar a equipo</span>
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
