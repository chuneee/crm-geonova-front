import { Search, Calendar, Phone, Users, Mail, FileText, CheckSquare, X } from 'lucide-react';

interface ActivityFiltersProps {
  filters: {
    search: string;
    dateRange: string;
    type: string[];
    assignedTo: string[];
    relatedTo: string;
  };
  onChange: (filters: any) => void;
}

const activityTypes = [
  { id: 'call', label: 'Llamadas', icon: Phone, color: '#3B82F6' },
  { id: 'meeting', label: 'Reuniones', icon: Users, color: '#8B5CF6' },
  { id: 'task', label: 'Tareas', icon: CheckSquare, color: '#F59E0B' },
  { id: 'email', label: 'Emails', icon: Mail, color: '#10B981' },
  { id: 'follow-up', label: 'Seguimientos', icon: FileText, color: '#EF4444' },
];

export function ActivityFilters({ filters, onChange }: ActivityFiltersProps) {
  const toggleType = (type: string) => {
    const newTypes = filters.type.includes(type)
      ? filters.type.filter(t => t !== type)
      : [...filters.type, type];
    onChange({ ...filters, type: newTypes });
  };

  const clearFilters = () => {
    onChange({
      search: '',
      dateRange: 'all',
      type: [],
      assignedTo: [],
      relatedTo: '',
    });
  };

  const activeFiltersCount = filters.type.length + filters.assignedTo.length + (filters.relatedTo ? 1 : 0);

  return (
    <div className="bg-[#F8FAFC] px-8 py-4 border-b border-[#E2E8F0]">
      {/* Top Row */}
      <div className="flex items-center gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
          <input
            type="text"
            placeholder="Buscar actividades..."
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
          <option value="tomorrow">Mañana</option>
          <option value="week">Esta semana</option>
          <option value="month">Este mes</option>
          <option value="overdue">Vencidas</option>
        </select>

        {/* Assigned To */}
        <select
          value={filters.assignedTo[0] || ''}
          onChange={(e) => onChange({ ...filters, assignedTo: e.target.value ? [e.target.value] : [] })}
          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
        >
          <option value="">Todos los usuarios</option>
          <option value="u1">María González</option>
          <option value="u2">Carlos Ramírez</option>
          <option value="u3">Luis Mendoza</option>
          <option value="u4">Ana Torres</option>
        </select>

        {/* Related To */}
        <select
          value={filters.relatedTo}
          onChange={(e) => onChange({ ...filters, relatedTo: e.target.value })}
          className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
        >
          <option value="">Todos los registros</option>
          <option value="leads">Solo Leads</option>
          <option value="opportunities">Solo Oportunidades</option>
          <option value="clients">Solo Clientes</option>
        </select>
      </div>

      {/* Bottom Row - Activity Type Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#64748B] mr-2">Tipo:</span>
          {activityTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => toggleType(type.id)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs transition-all ${
                filters.type.includes(type.id)
                  ? 'text-white shadow-sm'
                  : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:border-[#3B82F6]'
              }`}
              style={{
                backgroundColor: filters.type.includes(type.id) ? type.color : undefined,
              }}
            >
              <type.icon className="w-3.5 h-3.5" />
              <span>{type.label}</span>
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
