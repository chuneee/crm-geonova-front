import { FileText, File, Paperclip, ArrowRight } from 'lucide-react';

interface RecentDocumentsSectionProps {
  documents: any[];
}

const documentIcons: Record<string, any> = {
  pdf: FileText,
  docx: File,
  default: File
};

export function RecentDocumentsSection({ documents }: RecentDocumentsSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Documentos Recientes</h3>
      
      <div className="space-y-3">
        {documents.map((doc) => {
          const Icon = documentIcons[doc.type] || documentIcons.default;
          
          return (
            <div key={doc.id} className="flex items-start gap-3 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-[#3B82F6]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[#1E293B] truncate">{doc.name}</div>
                <div className="text-xs text-[#64748B]">
                  {doc.size} • {doc.date}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#3B82F6] hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-2">
        <Paperclip className="w-4 h-4" />
        Adjuntar archivo
      </button>

      <button className="w-full mt-2 px-4 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors flex items-center justify-center gap-2">
        Ver todos
        <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
