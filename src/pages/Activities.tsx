import { useState } from 'react';
import { Plus, Calendar, Phone, Users, Mail, FileText, CheckCircle, Clock, AlertCircle, Filter, Search } from 'lucide-react';
import { ActivityMetrics } from '../components/activities/ActivityMetrics';
import { ActivityFilters } from '../components/activities/ActivityFilters';
import { ActivityTimeline } from '../components/activities/ActivityTimeline';
import { CalendarWidget } from '../components/activities/CalendarWidget';
import { NewActivityModal } from '../components/activities/NewActivityModal';
import { ActivityDetailPanel } from '../components/activities/ActivityDetailPanel';

export interface Activity {
  id: string;
  type: 'call' | 'meeting' | 'task' | 'email' | 'follow-up';
  title: string;
  description?: string;
  status: 'pending' | 'completed' | 'overdue' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  dueTime?: string;
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
  };
  relatedTo?: {
    type: 'lead' | 'opportunity' | 'client';
    id: string;
    name: string;
  };
  createdAt: string;
  completedAt?: string;
  notes?: string;
  reminder?: boolean;
  location?: string;
  attendees?: string[];
}

type ViewTab = 'all' | 'pending' | 'completed' | 'overdue';

// Mock data
const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'call',
    title: 'Llamada de seguimiento - Constructora ABC',
    description: 'Revisar avance del proyecto y siguiente fase',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-12-19',
    dueTime: '10:00',
    assignedTo: {
      id: 'u1',
      name: 'María González',
    },
    relatedTo: {
      type: 'opportunity',
      id: 'opp1',
      name: 'Constructora ABC - Drones',
    },
    createdAt: '2024-12-18T14:00:00',
    reminder: true,
  },
  {
    id: '2',
    type: 'meeting',
    title: 'Reunión de cierre - Minera del Norte',
    description: 'Presentación final y firma de contrato',
    status: 'pending',
    priority: 'high',
    dueDate: '2024-12-19',
    dueTime: '15:00',
    location: 'Oficinas cliente - Monterrey',
    assignedTo: {
      id: 'u2',
      name: 'Carlos Ramírez',
    },
    relatedTo: {
      type: 'opportunity',
      id: 'opp2',
      name: 'Minera del Norte - Estación Total',
    },
    createdAt: '2024-12-17T09:00:00',
    reminder: true,
    attendees: ['Carlos Ramírez', 'Director Técnico', 'Gerente Compras'],
  },
  {
    id: '3',
    type: 'task',
    title: 'Preparar propuesta técnica para licitación',
    description: 'Especificaciones detalladas para proyecto gubernamental',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-20',
    assignedTo: {
      id: 'u3',
      name: 'Luis Mendoza',
    },
    relatedTo: {
      type: 'opportunity',
      id: 'opp3',
      name: 'Gobierno Municipal - Drones',
    },
    createdAt: '2024-12-16T11:00:00',
  },
  {
    id: '4',
    type: 'email',
    title: 'Enviar cotización actualizada',
    description: 'Incluir descuento del 15% aprobado por gerencia',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-12-18',
    assignedTo: {
      id: 'u1',
      name: 'María González',
    },
    relatedTo: {
      type: 'lead',
      id: 'lead1',
      name: 'Agroindustrias del Sur',
    },
    createdAt: '2024-12-17T08:00:00',
    completedAt: '2024-12-18T10:30:00',
  },
  {
    id: '5',
    type: 'follow-up',
    title: 'Seguimiento post-venta - Topografía Moderna',
    description: 'Verificar satisfacción con instalación',
    status: 'overdue',
    priority: 'high',
    dueDate: '2024-12-17',
    dueTime: '14:00',
    assignedTo: {
      id: 'u4',
      name: 'Ana Torres',
    },
    relatedTo: {
      type: 'client',
      id: 'client1',
      name: 'Topografía Moderna',
    },
    createdAt: '2024-12-15T10:00:00',
  },
  {
    id: '6',
    type: 'call',
    title: 'Llamada inicial - Lead caliente',
    description: 'Primera contacto, calificar necesidad',
    status: 'completed',
    priority: 'medium',
    dueDate: '2024-12-18',
    dueTime: '09:00',
    assignedTo: {
      id: 'u2',
      name: 'Carlos Ramírez',
    },
    relatedTo: {
      type: 'lead',
      id: 'lead2',
      name: 'Desarrollo Urbano XYZ',
    },
    createdAt: '2024-12-17T16:00:00',
    completedAt: '2024-12-18T09:15:00',
    notes: 'Cliente muy interesado, programar demo para próxima semana',
  },
  {
    id: '7',
    type: 'meeting',
    title: 'Demo producto - Software Pix4D',
    description: 'Demostración de software de fotogrametría',
    status: 'pending',
    priority: 'medium',
    dueDate: '2024-12-21',
    dueTime: '11:00',
    location: 'Virtual - Zoom',
    assignedTo: {
      id: 'u3',
      name: 'Luis Mendoza',
    },
    relatedTo: {
      type: 'opportunity',
      id: 'opp4',
      name: 'Constructora del Valle',
    },
    createdAt: '2024-12-18T13:00:00',
    reminder: true,
  },
];

export function Activities() {
  const [activeTab, setActiveTab] = useState<ViewTab>('all');
  const [showNewActivityModal, setShowNewActivityModal] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [filters, setFilters] = useState({
    search: '',
    dateRange: 'all',
    type: [] as string[],
    assignedTo: [] as string[],
    relatedTo: '',
  });

  const filterActivities = (activities: Activity[], tab: ViewTab) => {
    let filtered = activities;

    // Filter by tab
    switch (tab) {
      case 'pending':
        filtered = filtered.filter(a => a.status === 'pending');
        break;
      case 'completed':
        filtered = filtered.filter(a => a.status === 'completed');
        break;
      case 'overdue':
        filtered = filtered.filter(a => a.status === 'overdue');
        break;
    }

    // Filter by search
    if (filters.search) {
      filtered = filtered.filter(a =>
        a.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        a.relatedTo?.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Filter by type
    if (filters.type.length > 0) {
      filtered = filtered.filter(a => filters.type.includes(a.type));
    }

    return filtered;
  };

  const filteredActivities = filterActivities(activities, activeTab);

  const tabs = [
    { id: 'all' as ViewTab, label: 'Todas', count: activities.length, icon: FileText },
    { id: 'pending' as ViewTab, label: 'Pendientes', count: activities.filter(a => a.status === 'pending').length, icon: Clock },
    { id: 'completed' as ViewTab, label: 'Completadas', count: activities.filter(a => a.status === 'completed').length, icon: CheckCircle },
    { id: 'overdue' as ViewTab, label: 'Vencidas', count: activities.filter(a => a.status === 'overdue').length, icon: AlertCircle },
  ];

  const handleCompleteActivity = (activityId: string) => {
    setActivities(prev => prev.map(activity =>
      activity.id === activityId
        ? { ...activity, status: 'completed' as const, completedAt: new Date().toISOString() }
        : activity
    ));
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-[#1E293B]">Actividades</h1>
          
          <button
            onClick={() => setShowNewActivityModal(true)}
            className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors"
          >
            <Plus className="w-5 h-5" />
            <span>Nueva Actividad</span>
          </button>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#1E293B]">Actividades</span>
        </div>
      </div>

      {/* Metrics */}
      <ActivityMetrics activities={activities} />

      {/* Tabs */}
      <div className="bg-white border-b border-[#E2E8F0] px-8">
        <div className="flex gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-[#3B82F6] text-white'
                  : 'bg-[#F1F5F9] text-[#64748B]'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <ActivityFilters filters={filters} onChange={setFilters} />

      {/* Main Content */}
      <div className="px-8 mt-6">
        <div className="flex gap-6">
          {/* Timeline */}
          <div className="flex-1">
            <ActivityTimeline
              activities={filteredActivities}
              onActivityClick={setSelectedActivity}
              onCompleteActivity={handleCompleteActivity}
            />
          </div>

          {/* Calendar Sidebar */}
          <div className="w-80 flex-shrink-0">
            <CalendarWidget activities={activities} onDateSelect={(date) => console.log(date)} />
          </div>
        </div>
      </div>

      {/* Modals */}
      {showNewActivityModal && (
        <NewActivityModal
          onClose={() => setShowNewActivityModal(false)}
          onSave={(activity) => {
            setActivities(prev => [activity, ...prev]);
            setShowNewActivityModal(false);
          }}
        />
      )}

      {selectedActivity && (
        <ActivityDetailPanel
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          onComplete={handleCompleteActivity}
          onUpdate={(updated) => {
            setActivities(prev => prev.map(a => a.id === updated.id ? updated : a));
            setSelectedActivity(updated);
          }}
        />
      )}
    </div>
  );
}
