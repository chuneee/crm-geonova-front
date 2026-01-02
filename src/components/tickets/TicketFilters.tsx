import { Search, X } from 'lucide-react';

interface TicketFiltersProps {
  filters: {
    search: string;
    status: string[];
    priority: string[];
    category: string[];
    assignedTo: string;
  };
  onChange: (filters: any) => void;
}

const statusOptions = [
  { id: 'new', label: 'Nuevo', color: '#3B82F6' },
  { id: 'open', label: 'Abierto', color: '#F59E0B' },
  { id: 'pending', label: 'Pendiente', color: '#8B5CF6' },
  { id: 'resolved', label: 'Resuelto', color: '#10B981' },
  { id: 'closed', label: 'Cerrado', color: '#64748B' },
];

const priorityOptions = [
  { id: 'low', label: 'Baja', color: '#10B981' },
  { id: 'medium', label: 'Media', color: '#F59E0B' },
  { id: 'high', label: 'Alta', color: '#EF4444' },
  { id: 'urgent', label: 'Urgente', color: '#DC2626' },
];

const categoryOptions = [
  { id: 'technical', label: 'Técnico' },
  { id: 'installation', label: 'Instalación' },
  { id: 'maintenance', label: 'Mantenimiento' },
  { id: 'training', label: 'Capacitación' },
  { id: 'billing', label: 'Facturación' },
  { id: 'general', label: 'General' },
];

export function TicketFilters({ filters, onChange }: TicketFiltersProps) {
  const toggleFilter = (type: 'status' | 'priority' | 'category', value: string) => {
    const current = filters[type];
    const updated = current.includes(value)
      ? current.filter((v: string) => v !== value)
      : [...current, value];
    onChange({ ...filters, [type]: updated });
  };

  const clearFilters = () => {
    onChange({
      search: '',
      status: [],
      priority: [],
      category: [],
      assignedTo: '',
    });
  };

  const activeFiltersCount = 
    filters.status.length + 
    filters.priority.length + 
    filters.category.length +
    (filters.assignedTo ? 1 : 0);

  return (
    <div className="bg-[#F8FAFC] px-8 py-4 border-b border-[#E2E8F0]">
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar tickets..."
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>

        {/* Assigned To */}
        <select
          value={filters.assignedTo}
          onChange={(e) => onChange({ ...filters, assignedTo: e.target.value })}
          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
        >
          <option value="">Todos los agentes</option>
          <option value="u1">Carlos Ramírez</option>
          <option value="u2">María González</option>
          <option value="u3">Luis Mendoza</option>
          <option value="u4">Ana Torres</option>
        </select>

        {/* Category Filter */}
        <select
          value={filters.category[0] || ''}
          onChange={(e) => onChange({ ...filters, category: e.target.value ? [e.target.value] : [] })}
          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
        >
          <option value="">Todas las categorías</option>
          {categoryOptions.map((cat) => (
            <option key={cat.id} value={cat.id}>{cat.label}</option>
          ))}
        </select>
      </div>

      {/* Status & Priority Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] mr-1">Estado:</span>
            {statusOptions.map((status) => (
              <button
                key={status.id}
                onClick={() => toggleFilter('status', status.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  filters.status.includes(status.id)
                    ? 'text-white shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-current'
                }`}
                style={{
                  backgroundColor: filters.status.includes(status.id) ? status.color : undefined,
                }}
              >
                {status.label}
              </button>
            ))}
          </div>

          <div className="h-6 w-px bg-[#E2E8F0]" />

          {/* Priority */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#64748B] mr-1">Prioridad:</span>
            {priorityOptions.map((priority) => (
              <button
                key={priority.id}
                onClick={() => toggleFilter('priority', priority.id)}
                className={`px-3 py-1.5 rounded-full text-xs transition-all ${
                  filters.priority.includes(priority.id)
                    ? 'text-white shadow-sm'
                    : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-current'
                }`}
                style={{
                  backgroundColor: filters.priority.includes(priority.id) ? priority.color : undefined,
                }}
              >
                {priority.label}
              </button>
            ))}
          </div>

          {activeFiltersCount > 0 && (
            <>
              <div className="h-6 w-px bg-[#E2E8F0]" />
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
