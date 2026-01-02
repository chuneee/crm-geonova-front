import { Search, Filter, X, DollarSign } from 'lucide-react';

interface QuoteFiltersProps {
  filters: {
    search: string;
    status: string[];
    dateRange: string;
    client: string;
    minAmount: string;
    maxAmount: string;
  };
  onChange: (filters: any) => void;
}

const statusOptions = [
  { id: 'draft', label: 'Borrador', color: '#64748B' },
  { id: 'sent', label: 'Enviada', color: '#3B82F6' },
  { id: 'viewed', label: 'Vista', color: '#8B5CF6' },
  { id: 'approved', label: 'Aprobada', color: '#10B981' },
  { id: 'rejected', label: 'Rechazada', color: '#EF4444' },
  { id: 'expired', label: 'Expirada', color: '#F59E0B' },
];

export function QuoteFilters({ filters, onChange }: QuoteFiltersProps) {
  const toggleStatus = (status: string) => {
    const newStatus = filters.status.includes(status)
      ? filters.status.filter(s => s !== status)
      : [...filters.status, status];
    onChange({ ...filters, status: newStatus });
  };

  const clearFilters = () => {
    onChange({
      search: '',
      status: [],
      dateRange: 'all',
      client: '',
      minAmount: '',
      maxAmount: '',
    });
  };

  const activeFiltersCount = 
    filters.status.length +
    (filters.minAmount ? 1 : 0) +
    (filters.maxAmount ? 1 : 0);

  return (
    <div className="bg-[#F8FAFC] px-8 py-4 border-b border-[#E2E8F0]">
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar por # cotización, cliente..."
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
          <option value="all">Todas las fechas</option>
          <option value="today">Hoy</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="quarter">Este trimestre</option>
          <option value="year">Este año</option>
        </select>

        {/* Amount Range */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="number"
              placeholder="Min"
              value={filters.minAmount}
              onChange={(e) => onChange({ ...filters, minAmount: e.target.value })}
              className="w-32 pl-9 pr-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
          <span className="text-[#64748B]">-</span>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxAmount}
              onChange={(e) => onChange({ ...filters, maxAmount: e.target.value })}
              className="w-32 pl-9 pr-3 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Bottom Row - Status Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B] mr-2">Estado:</span>
          {statusOptions.map((status) => (
            <button
              key={status.id}
              onClick={() => toggleStatus(status.id)}
              className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                filters.status.includes(status.id)
                  ? 'text-white shadow-sm'
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-current'
              }`}
              style={{
                backgroundColor: filters.status.includes(status.id) ? status.color : undefined,
                borderColor: filters.status.includes(status.id) ? status.color : undefined,
              }}
            >
              {status.label}
            </button>
          ))}

          {activeFiltersCount > 0 && (
            <>
              <div className="h-4 w-px bg-[#E2E8F0] mx-2" />
              <span className="text-xs text-[#64748B]">
                {activeFiltersCount} filtro{activeFiltersCount > 1 ? 's' : ''} activo{activeFiltersCount > 1 ? 's' : ''}
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
