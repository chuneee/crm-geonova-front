import { Pin, Lock, Users, Send } from 'lucide-react';

interface InternalNotesSectionProps {
  opportunityId: string;
}

const notes = [
  {
    id: '1',
    author: { name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    content: 'Cliente muy interesado en expandir a todas sus sucursales después del piloto inicial. Mencionó presupuesto adicional de $800k para Q2.',
    timestamp: 'Hace 3 horas',
    pinned: true,
    private: false
  },
  {
    id: '2',
    author: { name: 'María García', avatar: 'MG', color: 'from-purple-500 to-purple-600' },
    content: 'Llamada con CFO confirmada para el jueves 20. Necesitamos preparar análisis de ROI detallado.',
    timestamp: 'Hace 1 día',
    pinned: false,
    private: true
  }
];

export function InternalNotesSection({ opportunityId }: InternalNotesSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Notas Internas</h3>

      {/* Editor */}
      <div className="mb-6">
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <div className="flex items-center gap-2 px-3 py-2 bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <button className="p-1.5 hover:bg-white rounded transition-colors" title="Negrita">
              <span className="text-sm">B</span>
            </button>
            <button className="p-1.5 hover:bg-white rounded transition-colors" title="Cursiva">
              <span className="text-sm italic">I</span>
            </button>
            <div className="w-px h-4 bg-[#E2E8F0]" />
            <button className="p-1.5 hover:bg-white rounded transition-colors" title="Lista">
              <span className="text-sm">≡</span>
            </button>
            <button className="p-1.5 hover:bg-white rounded transition-colors" title="Enlace">
              <span className="text-sm">🔗</span>
            </button>
            <button className="p-1.5 hover:bg-white rounded transition-colors" title="Mencionar">
              <span className="text-sm">@</span>
            </button>
          </div>
          <textarea 
            className="w-full p-3 text-sm text-[#1E293B] resize-none outline-none"
            rows={3}
            placeholder="Escribe una nota interna..."
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
              <Lock className="w-4 h-4" />
              Privada
            </button>
            <button className="px-3 py-1.5 text-sm text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
              <Users className="w-4 h-4" />
              Equipo
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-4 py-1.5 text-sm text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors">
              Guardar borrador
            </button>
            <button className="px-4 py-1.5 text-sm text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors flex items-center gap-2">
              <Send className="w-4 h-4" />
              Publicar
            </button>
          </div>
        </div>
      </div>

      {/* Notes Thread */}
      <div className="space-y-4">
        {notes.map((note) => (
          <div key={note.id} className={`p-4 rounded-lg ${note.pinned ? 'bg-[#FEF3C7] border border-[#F59E0B]' : 'bg-[#F8FAFC]'}`}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${note.author.color} flex items-center justify-center text-white text-xs`}>
                  {note.author.avatar}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#1E293B]">{note.author.name}</span>
                    {note.private && (
                      <span className="px-2 py-0.5 bg-[#64748B] text-white text-xs rounded">Privada</span>
                    )}
                    {note.pinned && (
                      <Pin className="w-4 h-4 text-[#F59E0B]" />
                    )}
                  </div>
                  <div className="text-xs text-[#64748B]">{note.timestamp}</div>
                </div>
              </div>
            </div>
            <p className="text-sm text-[#1E293B] leading-relaxed">
              {note.content}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
