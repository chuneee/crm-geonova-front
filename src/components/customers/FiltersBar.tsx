import { Search, ChevronDown, X, DollarSign, Calendar, Users } from 'lucide-react';
import { useState } from 'react';

export function FiltersBar() {
  const [appliedFilters, setAppliedFilters] = useState<string[]>([]);

  const removeFilter = (filter: string) => {
    setAppliedFilters(prev => prev.filter(f => f !== filter));
  };

  return (
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]" style={{ minHeight: '80px' }}>
      <div className="px-8 py-3">
        {/* Top Row */}
        <div className="flex items-center gap-3 mb-3">
          {/* Search */}
          <div className="relative" style={{ width: '360px' }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Buscar por nombre, email, empresa, teléfono..."
              className="w-full h-10 pl-10 pr-4 border border-[#E2E8F0] rounded-lg bg-white text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
          </div>

          {/* Segment Filter */}
          <button className="h-10 px-4 border border-[#E2E8F0] bg-white rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 whitespace-nowrap">
            Segmento
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Industry Filter */}
          <button className="h-10 px-4 border border-[#E2E8F0] bg-white rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 whitespace-nowrap">
            Industria
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Location Filter */}
          <button className="h-10 px-4 border border-[#E2E8F0] bg-white rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 whitespace-nowrap">
            Ubicación
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Tags Filter */}
          <button className="h-10 px-4 border border-[#E2E8F0] bg-white rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2 whitespace-nowrap">
            Etiquetas
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Value Range */}
            <div className="flex items-center gap-2 px-3 h-9 border border-[#E2E8F0] bg-white rounded-lg">
              <DollarSign className="w-4 h-4 text-[#64748B]" />
              <span className="text-sm text-[#64748B]">Valor de vida:</span>
              <input
                type="range"
                min="0"
                max="100000"
                className="w-32 h-1 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
              <span className="text-sm text-[#1E293B]">$0 - $100K+</span>
            </div>

            {/* Last Activity Filter */}
            <button className="h-9 px-3 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Última actividad
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Assigned To */}
            <button className="h-9 px-3 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
              <Users className="w-4 h-4" />
              Asignado a
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Applied Filters as Chips */}
            {appliedFilters.length > 0 && (
              <>
                <div className="h-6 w-px bg-[#E2E8F0]" />
                {appliedFilters.map((filter) => (
                  <span
                    key={filter}
                    className="px-3 py-1 bg-[#3B82F6] text-white text-xs rounded-full flex items-center gap-1.5"
                  >
                    {filter}
                    <button
                      onClick={() => removeFilter(filter)}
                      className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </>
            )}
          </div>

          {/* Clear Filters */}
          <button className="text-sm text-[#3B82F6] hover:underline">
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
}