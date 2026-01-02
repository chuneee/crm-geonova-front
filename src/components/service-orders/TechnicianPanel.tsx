import { X, MapPin, AlertCircle } from 'lucide-react';

interface Technician {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location: string;
  currentAssignment?: string;
  skills: string[];
  capacity: { current: number; max: number };
  avatar?: string;
}

interface TechnicianPanelProps {
  onClose: () => void;
}

const mockTechnicians: Technician[] = [
  {
    id: 't1',
    name: 'Carlos Ramírez',
    status: 'busy',
    location: 'Monterrey, NL',
    currentAssignment: 'OS-2848',
    skills: ['Drones', 'Instalación'],
    capacity: { current: 2, max: 4 },
  },
  {
    id: 't2',
    name: 'Luis Mendoza',
    status: 'busy',
    location: 'Guadalajara, JAL',
    currentAssignment: 'OS-2849',
    skills: ['Topografía', 'Leica'],
    capacity: { current: 1, max: 4 },
  },
  {
    id: 't3',
    name: 'Patricia Ruiz',
    status: 'available',
    location: 'CDMX',
    skills: ['Software', 'Capacitación'],
    capacity: { current: 0, max: 3 },
  },
  {
    id: 't4',
    name: 'Miguel Torres',
    status: 'available',
    location: 'CDMX',
    skills: ['Drones', 'Reparación'],
    capacity: { current: 1, max: 4 },
  },
  {
    id: 't5',
    name: 'Ana Sánchez',
    status: 'offline',
    location: 'Puebla, PUE',
    skills: ['Instalación', 'Mantenimiento'],
    capacity: { current: 0, max: 4 },
  },
];

const mockUrgentOrders = [
  {
    orderNumber: 'OS-2847',
    client: 'Constructora ABC',
    reason: 'Cliente requiere instalación urgente',
    overdue: '2h',
  },
  {
    orderNumber: 'OS-2842',
    client: 'Minera del Sur',
    reason: 'Equipo fuera de servicio',
    overdue: '4h',
  },
];

export function TechnicianPanel({ onClose }: TechnicianPanelProps) {
  const statusColors = {
    available: '#10B981',
    busy: '#EF4444',
    offline: '#94A3B8',
  };

  const statusLabels = {
    available: 'Disponible',
    busy: 'Ocupado',
    offline: 'Fuera de línea',
  };

  return (
    <div className="fixed right-0 top-[72px] bottom-0 w-80 bg-white border-l border-[#E2E8F0] shadow-lg z-30 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-4 py-3 flex items-center justify-between z-10">
        <h3 className="text-sm text-[#1E293B]">Panel de Técnicos</h3>
        <button
          onClick={onClose}
          className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Urgent Orders Section */}
      <div className="p-4 border-b border-[#E2E8F0] bg-[#FEF2F2]">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="w-4 h-4 text-[#EF4444]" />
          <h4 className="text-sm text-[#EF4444]">Órdenes Urgentes</h4>
          <span className="ml-auto text-xs bg-[#EF4444] text-white px-2 py-0.5 rounded-full">
            {mockUrgentOrders.length}
          </span>
        </div>

        <div className="space-y-2">
          {mockUrgentOrders.map((order) => (
            <div
              key={order.orderNumber}
              className="bg-white p-3 rounded-lg border border-[#FEE2E2]"
            >
              <div className="flex items-start justify-between mb-1">
                <p className="text-xs text-[#1E293B]">{order.orderNumber}</p>
                <span className="text-xs text-[#EF4444]">-{order.overdue}</span>
              </div>
              <p className="text-xs text-[#64748B] mb-1">{order.client}</p>
              <p className="text-xs text-[#64748B] mb-2">{order.reason}</p>
              <button className="w-full px-3 py-1.5 bg-[#EF4444] text-white text-xs rounded hover:bg-[#DC2626] transition-colors">
                Asignar ahora
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Technicians Section */}
      <div className="p-4">
        <h4 className="text-sm text-[#64748B] mb-3">Técnicos Disponibles</h4>
        
        <div className="space-y-3">
          {mockTechnicians.map((tech) => (
            <div
              key={tech.id}
              className="p-3 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-sm">
                    {tech.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 border-2 border-white rounded-full"
                    style={{ backgroundColor: statusColors[tech.status] }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1E293B] mb-0.5">{tech.name}</p>
                  <p className="text-xs" style={{ color: statusColors[tech.status] }}>
                    {statusLabels[tech.status]}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 mb-2 text-xs text-[#64748B]">
                <MapPin className="w-3 h-3" />
                <span>{tech.location}</span>
              </div>

              {tech.currentAssignment && (
                <div className="mb-2 p-2 bg-white rounded border border-[#E2E8F0]">
                  <p className="text-xs text-[#64748B] mb-0.5">Asignación actual:</p>
                  <p className="text-xs text-[#1E293B]">{tech.currentAssignment}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-1 mb-2">
                {tech.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-0.5 bg-white text-[#3B82F6] text-xs rounded-full border border-[#DBEAFE]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-[#64748B]">Capacidad</span>
                    <span className="text-xs text-[#1E293B]">
                      {tech.capacity.current}/{tech.capacity.max}
                    </span>
                  </div>
                  <div className="h-1.5 bg-white rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#3B82F6] rounded-full transition-all"
                      style={{
                        width: `${(tech.capacity.current / tech.capacity.max) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Heat Map Section */}
      <div className="p-4 border-t border-[#E2E8F0]">
        <h4 className="text-sm text-[#64748B] mb-3">Mapa de Calor</h4>
        <div className="bg-[#F8FAFC] rounded-lg p-4">
          <div className="grid grid-cols-3 gap-2">
            {['Norte', 'Centro', 'Sur', 'Oriente', 'Poniente', 'Periferia'].map((zone, i) => (
              <div
                key={zone}
                className="p-2 rounded text-center"
                style={{
                  backgroundColor: i % 3 === 0 ? '#FEE2E2' : i % 3 === 1 ? '#FEF3C7' : '#DBEAFE',
                }}
              >
                <p className="text-xs text-[#1E293B] mb-0.5">{zone}</p>
                <p className="text-xs text-[#64748B]">{Math.floor(Math.random() * 10)} órdenes</p>
              </div>
            ))}
          </div>
          <button className="w-full mt-3 px-3 py-2 bg-[#3B82F6] text-white text-xs rounded hover:bg-[#2563EB] transition-colors">
            Ver mapa completo
          </button>
        </div>
      </div>
    </div>
  );
}
