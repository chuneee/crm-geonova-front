import { ChevronLeft, ChevronRight } from 'lucide-react';

export function TableFooter() {
  return (
    <div className="px-4 md:px-8 py-5 border-t border-[#E2E8F0] flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white">
      {/* Left - Row count */}
      <div className="text-sm text-[#64748B] text-center md:text-left">
        Mostrando 1-25 de 247 leads
      </div>

      {/* Center - Pagination */}
      <div className="flex items-center justify-center gap-1">
        <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] hover:bg-[#F8FAFC] disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
          <ChevronLeft className="w-4 h-4 text-[#64748B]" />
        </button>
        
        <button className="w-8 h-8 flex items-center justify-center rounded bg-[#3B82F6] text-white text-sm">
          1
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm text-gray-700 transition-colors">
          2
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm text-gray-700 transition-colors">
          3
        </button>
        <span className="px-2 text-sm text-[#64748B]">...</span>
        <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] hover:bg-[#F8FAFC] text-sm text-gray-700 transition-colors">
          10
        </button>
        
        <button className="w-8 h-8 flex items-center justify-center rounded border border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors">
          <ChevronRight className="w-4 h-4 text-[#64748B]" />
        </button>
      </div>

      {/* Right - Rows per page */}
      <div className="flex items-center justify-center md:justify-end gap-2">
        <span className="text-sm text-[#64748B]">Filas por página:</span>
        <select className="h-8 px-2 bg-white border border-[#E2E8F0] rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]">
          <option>25</option>
          <option>50</option>
          <option>100</option>
        </select>
      </div>
    </div>
  );
}