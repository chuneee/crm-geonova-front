import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Map, Download, Printer, LayoutGrid, Calendar, List } from 'lucide-react';
import { MetricsBar } from '../components/service-orders/MetricsBar';
import { FilterBar } from '../components/service-orders/FilterBar';
import { KanbanColumn } from '../components/service-orders/KanbanColumn';
import { TechnicianPanel } from '../components/service-orders/TechnicianPanel';
import { OrderDetailPanel } from '../components/service-orders/OrderDetailPanel';

export interface ServiceOrder {
  id: string;
  orderNumber: string;
  status: 'pending' | 'scheduled' | 'in-progress' | 'completed' | 'cancelled' | 'rescheduled';
  priority: 'high' | 'medium' | 'low';
  client: {
    name: string;
    logo?: string;
    contact: string;
    phone: string;
    hasWhatsApp: boolean;
  };
  service: {
    type: 'installation' | 'maintenance' | 'repair' | 'training';
    description: string;
    icon: string;
  };
  location: {
    address: string;
    distance?: number;
  };
  schedule?: {
    date: string;
    time: string;
    duration: string;
    isOverdue?: boolean;
  };
  technician?: {
    id: string;
    name: string;
    avatar?: string;
    online: boolean;
    phone: string;
    skillsMatch: number;
  };
  progress?: {
    completed: number;
    total: number;
    timeElapsed?: string;
  };
  createdAt: string;
  urgency?: boolean;
  notesCount?: number;
  satisfaction?: number;
  cancellationReason?: string;
  rescheduleReason?: string;
  previousDates?: string[];
}

type ViewMode = 'kanban' | 'calendar' | 'list';

// Mock data
const mockOrders: ServiceOrder[] = [
  {
    id: '1',
    orderNumber: 'OS-2847',
    status: 'pending',
    priority: 'high',
    client: {
      name: 'Constructora ABC',
      contact: 'Juan Pérez',
      phone: '+52 55 1234 5678',
      hasWhatsApp: true,
    },
    service: {
      type: 'installation',
      description: 'Instalación de Drone DJI Mavic 3',
      icon: '🚁',
    },
    location: {
      address: 'Av. Insurgentes Sur 1234, CDMX',
      distance: 12,
    },
    createdAt: '2024-12-16T08:00:00',
    urgency: true,
    notesCount: 3,
  },
  {
    id: '2',
    orderNumber: 'OS-2848',
    status: 'scheduled',
    priority: 'medium',
    client: {
      name: 'Agroindustrias del Norte',
      contact: 'María González',
      phone: '+52 81 9876 5432',
      hasWhatsApp: true,
    },
    service: {
      type: 'maintenance',
      description: 'Mantenimiento preventivo DJI Agras T30',
      icon: '🔧',
    },
    location: {
      address: 'Carretera a Laredo Km 45, Monterrey',
      distance: 28,
    },
    schedule: {
      date: '2024-12-17',
      time: '09:00',
      duration: '2-3 horas',
    },
    technician: {
      id: 't1',
      name: 'Carlos Ramírez',
      online: true,
      phone: '+52 55 8888 9999',
      skillsMatch: 5,
    },
    createdAt: '2024-12-15T14:30:00',
  },
  {
    id: '3',
    orderNumber: 'OS-2849',
    status: 'in-progress',
    priority: 'high',
    client: {
      name: 'Topografía Moderna',
      contact: 'Roberto Sánchez',
      phone: '+52 33 5555 4444',
      hasWhatsApp: false,
    },
    service: {
      type: 'installation',
      description: 'Instalación Estación Total Leica TS16',
      icon: '📐',
    },
    location: {
      address: 'Periférico Sur 3456, Guadalajara',
      distance: 8,
    },
    schedule: {
      date: '2024-12-16',
      time: '10:00',
      duration: '3-4 horas',
    },
    technician: {
      id: 't2',
      name: 'Luis Mendoza',
      online: true,
      phone: '+52 33 7777 8888',
      skillsMatch: 5,
    },
    progress: {
      completed: 5,
      total: 8,
      timeElapsed: '1h 23min',
    },
    createdAt: '2024-12-16T09:00:00',
  },
  {
    id: '4',
    orderNumber: 'OS-2850',
    status: 'completed',
    priority: 'low',
    client: {
      name: 'Minera del Pacífico',
      contact: 'Ana Torres',
      phone: '+52 662 3333 2222',
      hasWhatsApp: true,
    },
    service: {
      type: 'training',
      description: 'Capacitación Software Pix4D',
      icon: '🎓',
    },
    location: {
      address: 'Blvd. Luis Encinas 789, Hermosillo',
    },
    schedule: {
      date: '2024-12-16',
      time: '08:00',
      duration: '4 horas',
    },
    technician: {
      id: 't3',
      name: 'Patricia Ruiz',
      online: false,
      phone: '+52 55 4444 3333',
      skillsMatch: 5,
    },
    satisfaction: 4.8,
    createdAt: '2024-12-15T10:00:00',
  },
  {
    id: '5',
    orderNumber: 'OS-2846',
    status: 'rescheduled',
    priority: 'medium',
    client: {
      name: 'Desarrollo Urbano XYZ',
      contact: 'Jorge Martínez',
      phone: '+52 55 2222 1111',
      hasWhatsApp: true,
    },
    service: {
      type: 'repair',
      description: 'Reparación Drone Phantom 4 RTK',
      icon: '🔨',
    },
    location: {
      address: 'Av. Santa Fe 1234, CDMX',
      distance: 15,
    },
    rescheduleReason: 'Cliente no disponible',
    previousDates: ['2024-12-15'],
    createdAt: '2024-12-14T11:00:00',
  },
];

export function ServiceOrders() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('kanban');
  const [selectedOrder, setSelectedOrder] = useState<ServiceOrder | null>(null);
  const [showTechnicianPanel, setShowTechnicianPanel] = useState(true);
  const [orders, setOrders] = useState<ServiceOrder[]>(mockOrders);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: 'today',
    technician: [],
    priority: [],
    serviceType: [],
  });

  const handleDragStart = (e: React.DragEvent, order: ServiceOrder) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('orderId', order.id);
  };

  const handleDrop = (e: React.DragEvent, newStatus: ServiceOrder['status']) => {
    e.preventDefault();
    const orderId = e.dataTransfer.getData('orderId');
    
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const ordersByStatus = {
    pending: orders.filter(o => o.status === 'pending'),
    scheduled: orders.filter(o => o.status === 'scheduled'),
    'in-progress': orders.filter(o => o.status === 'in-progress'),
    completed: orders.filter(o => o.status === 'completed'),
    cancelled: orders.filter(o => o.status === 'cancelled'),
    rescheduled: orders.filter(o => o.status === 'rescheduled'),
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-[#1E293B]">Órdenes de Servicio</h1>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <div className="flex bg-[#F1F5F9] rounded-lg p-1">
              <button
                onClick={() => setViewMode('kanban')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'kanban' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span className="text-sm">Kanban</span>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'calendar' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span className="text-sm">Calendario</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                  viewMode === 'list' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                <List className="w-4 h-4" />
                <span className="text-sm">Lista</span>
              </button>
            </div>
            
            <button
              onClick={() => navigate('/ordenes/nuevo')}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Orden</span>
            </button>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span>Dashboard</span>
          <span>/</span>
          <span>Post-Venta</span>
          <span>/</span>
          <span className="text-[#1E293B]">Órdenes</span>
        </div>
      </div>

      {/* Metrics Bar */}
      <MetricsBar />

      {/* Filter Bar */}
      <FilterBar filters={filters} onChange={setFilters} />

      {/* Kanban Board */}
      {viewMode === 'kanban' && (
        <div className="px-8 mt-6">
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
            <KanbanColumn
              title="Pendientes"
              color="#F59E0B"
              icon="⏱️"
              count={ordersByStatus.pending.length}
              orders={ordersByStatus.pending}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'pending')}
              onDragStart={handleDragStart}
              onCardClick={setSelectedOrder}
            />
            
            <KanbanColumn
              title="Programadas"
              color="#3B82F6"
              icon="📅"
              count={ordersByStatus.scheduled.length}
              orders={ordersByStatus.scheduled}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'scheduled')}
              onDragStart={handleDragStart}
              onCardClick={setSelectedOrder}
            />
            
            <KanbanColumn
              title="En Proceso"
              color="#8B5CF6"
              icon="🔧"
              count={ordersByStatus['in-progress'].length}
              orders={ordersByStatus['in-progress']}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'in-progress')}
              onDragStart={handleDragStart}
              onCardClick={setSelectedOrder}
            />
            
            <KanbanColumn
              title="Completadas"
              color="#10B981"
              icon="✅"
              count={ordersByStatus.completed.length}
              orders={ordersByStatus.completed}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'completed')}
              onDragStart={handleDragStart}
              onCardClick={setSelectedOrder}
            />
            
            <KanbanColumn
              title="Canceladas"
              color="#EF4444"
              icon="❌"
              count={ordersByStatus.cancelled.length}
              orders={ordersByStatus.cancelled}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'cancelled')}
              onDragStart={handleDragStart}
              onCardClick={setSelectedOrder}
            />
            
            <KanbanColumn
              title="Reprogramadas"
              color="#F97316"
              icon="🔄"
              count={ordersByStatus.rescheduled.length}
              orders={ordersByStatus.rescheduled}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'rescheduled')}
              onDragStart={handleDragStart}
              onCardClick={setSelectedOrder}
            />
          </div>
        </div>
      )}

      {/* Board Footer */}
      <div className="fixed bottom-0 left-0 right-0 lg:left-[240px] h-16 bg-white border-t border-[#E2E8F0] px-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#64748B]">
            Mostrando <span className="text-[#1E293B]">{orders.length} órdenes</span>
          </span>
          <div className="h-4 w-px bg-[#E2E8F0]" />
          <span className="text-sm text-[#64748B]">
            Técnicos: <span className="text-[#10B981]">8/12 disponibles</span>
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] rounded-lg transition-colors">
            <Download className="w-4 h-4" />
            <span>Exportar</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm text-[#64748B] hover:text-[#1E293B] hover:bg-[#F8FAFC] rounded-lg transition-colors">
            <Printer className="w-4 h-4" />
            <span>Imprimir</span>
          </button>
        </div>
      </div>

      {/* Floating Map Button */}
      <button className="fixed bottom-24 right-8 w-16 h-16 bg-[#3B82F6] rounded-full shadow-lg flex items-center justify-center text-white hover:bg-[#2563EB] transition-all hover:scale-110 z-20">
        <Map className="w-6 h-6" />
        <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#EF4444] rounded-full flex items-center justify-center text-xs">
          {ordersByStatus['in-progress'].length}
        </span>
      </button>

      {/* Modals */}
      {selectedOrder && (
        <OrderDetailPanel
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {/* Technician Panel */}
      {showTechnicianPanel && (
        <TechnicianPanel onClose={() => setShowTechnicianPanel(false)} />
      )}
    </div>
  );
}