import { ZoomIn, ZoomOut, Maximize2, Minimize2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

export function PreviewSection() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 sticky top-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#1E293B]">Vista Previa</h3>
        <div className="flex items-center gap-1">
          {isExpanded && (
            <>
              <button className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors">
                <ZoomOut className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors">
                <ZoomIn className="w-4 h-4" />
              </button>
            </>
          )}
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
            title={isExpanded ? "Minimizar" : "Expandir"}
          >
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <>
          {/* Preview Canvas */}
          <div className="border border-[#E2E8F0] rounded-lg overflow-hidden mb-4" style={{ width: '230px', height: '320px' }}>
            <div className="w-full h-full bg-white p-4 overflow-auto">
              {/* Miniature PDF Preview */}
              <div className="space-y-2 text-xs">
                <div className="h-4 bg-[#3B82F6] rounded"></div>
                <div className="h-3 bg-[#E2E8F0] rounded w-3/4"></div>
                <div className="h-3 bg-[#E2E8F0] rounded w-1/2"></div>
                <div className="mt-4 space-y-1">
                  <div className="h-2 bg-[#F1F5F9] rounded"></div>
                  <div className="h-2 bg-[#F1F5F9] rounded"></div>
                  <div className="h-2 bg-[#F1F5F9] rounded w-4/5"></div>
                </div>
                <div className="mt-4 p-2 bg-[#F8FAFC] rounded">
                  <div className="h-2 bg-[#E2E8F0] rounded mb-1"></div>
                  <div className="h-2 bg-[#E2E8F0] rounded w-3/4"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-[#64748B]">Página 1 de 2</span>
            <button className="text-sm text-[#3B82F6] hover:underline flex items-center gap-1">
              <Maximize2 className="w-4 h-4" />
              Ver completa
            </button>
          </div>
        </>
      )}
    </div>
  );
}