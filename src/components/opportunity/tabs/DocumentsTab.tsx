import { FileText, File, Upload } from 'lucide-react';

interface DocumentsTabProps {
  documents: any[];
}

const documentIcons: Record<string, any> = {
  pdf: FileText,
  docx: File,
  default: File
};

export function DocumentsTab({ documents }: DocumentsTabProps) {
  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[#1E293B]">Documentos</h3>
            <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Subir documento
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc) => {
              const Icon = documentIcons[doc.type] || documentIcons.default;
              
              return (
                <div 
                  key={doc.id} 
                  className="p-4 border border-[#E2E8F0] rounded-lg hover:border-[#3B82F6] hover:shadow-sm transition-all cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-[#1E293B] truncate mb-1">{doc.name}</div>
                      <div className="text-xs text-[#64748B]">{doc.size}</div>
                      <div className="text-xs text-[#64748B]">{doc.date}</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
