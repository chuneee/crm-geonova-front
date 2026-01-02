import { Search, Calendar, User, AlertTriangle, Filter, X } from 'lucide-react';

interface FilterBarProps {
  filters: {
    search: string;
    dateRange: string;
    technician: string[];
    priority: string[];
    serviceType: string[];
  };
  onChange: (filters: any) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
  const activeFiltersCount = 
    (filters.technician.length > 0 ? 1 : 0) +
    (filters.priority.length > 0 ? 1 : 0) +
    (filters.serviceType.length > 0 ? 1 : 0);

  const clearFilters = () => {
    onChange({
      search: '',
      dateRange: 'today',
      technician: [],
      priority: [],
      serviceType: [],
    });
  };

  return (
    <div className="bg-[#F8FAFC] px-8 py-4 border-b border-[#E2E8F0]">
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar por # orden, cliente, producto, técnico..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>

        {/* Date Range */}
        <select
          value={filters.dateRange}
          onChange={(e) => onChange({ ...filters, dateRange: e.target.value })}
          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
        >
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="custom">Personalizado</option>
        </select>

        {/* Technician Filter */}
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] hover:border-[#3B82F6] transition-colors">
            <User className="w-4 h-4" />
            <span>Técnico</span>
            {filters.technician.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#3B82F6] text-white rounded text-xs">
                {filters.technician.length}
              </span>
            )}
          </button>
        </div>

        {/* Priority Filter */}
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] hover:border-[#3B82F6] transition-colors">
            <AlertTriangle className="w-4 h-4" />
            <span>Prioridad</span>
            {filters.priority.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#3B82F6] text-white rounded text-xs">
                {filters.priority.length}
              </span>
            )}
          </button>
        </div>

        {/* Service Type Filter */}
        <div className="relative">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] hover:border-[#3B82F6] transition-colors">
            <Filter className="w-4 h-4" />
            <span>Tipo de servicio</span>
            {filters.serviceType.length > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-[#3B82F6] text-white rounded text-xs">
                {filters.serviceType.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {/* Quick Filters */}
          <button className="px-3 py-1.5 bg-[#3B82F6] text-white rounded-full text-xs hover:bg-[#2563EB] transition-colors">
            Todas
          </button>
          <button className="px-3 py-1.5 bg-white text-[#64748B] border border-[#E2E8F0] rounded-full text-xs hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
            Urgentes
          </button>
          <button className="px-3 py-1.5 bg-white text-[#64748B] border border-[#E2E8F0] rounded-full text-xs hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
            Atrasadas
          </button>
          <button className="px-3 py-1.5 bg-white text-[#64748B] border border-[#E2E8F0] rounded-full text-xs hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
            Completadas hoy
          </button>

          {/* Active Filters */}
          {activeFiltersCount > 0 && (
            <>
              <div className="h-4 w-px bg-[#E2E8F0] mx-2" />
              <div className="flex items-center gap-2">
                {filters.priority.map((priority) => (
                  <span key={priority} className="flex items-center gap-1.5 px-2.5 py-1 bg-white border border-[#E2E8F0] rounded-md text-xs text-[#64748B]">
                    Prioridad: {priority}
                    <button
                      onClick={() => onChange({
                        ...filters,
                        priority: filters.priority.filter(p => p !== priority)
                      })}
                      className="hover:text-[#EF4444]"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="text-xs text-[#3B82F6] hover:text-[#2563EB] hover:underline transition-colors"
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
}
