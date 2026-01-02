import { Calendar, X } from 'lucide-react';
import type { ReportFilters as Filters } from '../../pages/Reports';

interface ReportFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const dateRangeOptions = [
  { id: 'week', label: 'Última semana' },
  { id: 'month', label: 'Último mes' },
  { id: 'quarter', label: 'Último trimestre' },
  { id: 'year', label: 'Último año' },
  { id: 'custom', label: 'Personalizado' },
];

export function ReportFilters({ filters, onChange }: ReportFiltersProps) {
  const clearFilters = () => {
    onChange({
      dateRange: 'month',
      startDate: '',
      endDate: '',
      teamMember: '',
      category: '',
    });
  };

  const activeFiltersCount = 
    (filters.teamMember ? 1 : 0) +
    (filters.category ? 1 : 0);

  return (
    <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Date Range */}
          <div className="flex bg-[#F1F5F9] rounded-lg p-1">
            {dateRangeOptions.map((option) => (
              <button
                key={option.id}
                onClick={() => onChange({ ...filters, dateRange: option.id as any })}
                className={`px-4 py-2 rounded text-sm transition-colors ${
                  filters.dateRange === option.id
                    ? 'bg-white text-[#3B82F6] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Custom Date Range */}
          {filters.dateRange === 'custom' && (
            <div className="flex items-center gap-2">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="date"
                  value={filters.startDate}
                  onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
                  className="pl-9 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
              <span className="text-[#64748B]">-</span>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="date"
                  value={filters.endDate}
                  onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
                  className="pl-9 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Team Member Filter */}
          <select
            value={filters.teamMember}
            onChange={(e) => onChange({ ...filters, teamMember: e.target.value })}
            className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          >
            <option value="">Todos los miembros</option>
            <option value="u1">Carlos Ramírez</option>
            <option value="u2">María González</option>
            <option value="u3">Luis Mendoza</option>
            <option value="u4">Ana Torres</option>
          </select>

          {/* Category Filter */}
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="px-4 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          >
            <option value="">Todas las categorías</option>
            <option value="drones">Drones</option>
            <option value="topografia">Topografía</option>
            <option value="software">Software</option>
            <option value="accesorios">Accesorios</option>
          </select>

          {activeFiltersCount > 0 && (
            <>
              <div className="h-6 w-px bg-[#E2E8F0]" />
              <span className="text-xs text-[#64748B]">
                {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} adicional{activeFiltersCount > 1 ? 'es' : ''}
              </span>
            </>
          )}
        </div>

        {activeFiltersCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-xs text-[#3B82F6] hover:text-[#2563EB] hover:underline transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Limpiar filtros</span>
          </button>
        )}
      </div>
    </div>
  );
}
