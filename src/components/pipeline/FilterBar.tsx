import { useState } from 'react';
import { ChevronDown, Calendar, DollarSign, Percent, X } from 'lucide-react';

export function FilterBar() {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);
  const [myOpportunitiesOnly, setMyOpportunitiesOnly] = useState(false);

  const removeFilter = (filter: string) => {
    setAppliedFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <div className="border-b border-[#E2E8F0] bg-white flex-shrink-0">
      <div className="h-14 px-4 md:px-8 flex items-center gap-3 overflow-x-auto">
        {/* Vendedor */}
        <div className="relative flex-shrink-0">
          <button className="h-9 px-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm text-[#64748B] hover:bg-white hover:border-[#CBD5E1] transition-colors flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">CR</span>
            </div>
            <span>Vendedor</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Rango de fechas */}
        <div className="relative flex-shrink-0">
          <button className="h-9 px-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm text-[#64748B] hover:bg-white hover:border-[#CBD5E1] transition-colors flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Fecha de cierre</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Monto */}
        <div className="relative flex-shrink-0">
          <button className="h-9 px-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm text-[#64748B] hover:bg-white hover:border-[#CBD5E1] transition-colors flex items-center gap-2">
            <DollarSign className="w-4 h-4" />
            <span>Monto</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Probabilidad */}
        <div className="relative flex-shrink-0">
          <button className="h-9 px-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm text-[#64748B] hover:bg-white hover:border-[#CBD5E1] transition-colors flex items-center gap-2">
            <Percent className="w-4 h-4" />
            <span>Probabilidad</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#E2E8F0] flex-shrink-0" />

        {/* Mis oportunidades toggle */}
        <label className="flex items-center gap-2 cursor-pointer flex-shrink-0">
          <input
            type="checkbox"
            checked={myOpportunitiesOnly}
            onChange={(e) => setMyOpportunitiesOnly(e.target.checked)}
            className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-sm text-[#475569] whitespace-nowrap">Mis oportunidades</span>
        </label>
      </div>

      {/* Applied Filters */}
      {appliedFilters.length > 0 && (
        <div className="px-4 md:px-8 pb-3 flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[#64748B]">Filtros activos:</span>
          {appliedFilters.map((filter) => (
            <span
              key={filter}
              className="inline-flex items-center gap-1 px-2 py-1 bg-[#EFF6FF] text-[#3B82F6] text-xs rounded-full"
            >
              {filter}
              <button
                onClick={() => removeFilter(filter)}
                className="hover:bg-[#3B82F6]/10 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
