import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Download, LayoutGrid, List } from 'lucide-react';
import { TicketMetrics } from '../components/tickets/TicketMetrics';
import { TicketFilters } from '../components/tickets/TicketFilters';
import { TicketBoard } from '../components/tickets/TicketBoard';
import { TicketList } from '../components/tickets/TicketList';
import { TicketDetailPanel } from '../components/tickets/TicketDetailPanel';

export interface Ticket {
  id: string;
  ticketNumber: string;
  subject: string;
  description: string;
  status: 'new' | 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'installation' | 'maintenance' | 'training' | 'billing' | 'general';
  client: {
    id: string;
    name: string;
    contact: string;
    email: string;
  };
  assignedTo?: {
    id: string;
    name: string;
  };
  equipment?: {
    id: string;
    name: string;
    serialNumber: string;
  };
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  closedAt?: string;
  dueDate?: string;
  responses: {
    id: string;
    author: {
      id: string;
      name: string;
      role: 'client' | 'agent';
    };
    message: string;
    createdAt: string;
    attachments?: string[];
  }[];
  tags?: string[];
  satisfaction?: 1 | 2 | 3 | 4 | 5;
}

type ViewMode = 'board' | 'list';

// Mock data
const mockTickets: Ticket[] = [
  {
    id: '1',
    ticketNumber: 'TK-2024-001',
    subject: 'Error en calibración de Estación Total',
    description: 'El equipo muestra errores al intentar calibrar. Necesitamos soporte urgente ya que tenemos levantamiento programado.',
    status: 'open',
    priority: 'urgent',
    category: 'technical',
    client: {
      id: 'c1',
      name: 'Constructora ABC',
      contact: 'Juan Pérez',
      email: 'juan@constructoraabc.com',
    },
    assignedTo: {
      id: 'u1',
      name: 'Carlos Ramírez',
    },
    equipment: {
      id: 'e1',
      name: 'Estación Total Leica TS16',
      serialNumber: 'TS16-2023-0045',
    },
    createdAt: '2024-12-19T08:30:00',
    updatedAt: '2024-12-19T09:15:00',
    dueDate: '2024-12-20T18:00:00',
    responses: [
      {
        id: 'r1',
        author: {
          id: 'c1',
          name: 'Juan Pérez',
          role: 'client',
        },
        message: 'El equipo muestra código de error E-102 al intentar iniciar la calibración automática.',
        createdAt: '2024-12-19T08:30:00',
      },
      {
        id: 'r2',
        author: {
          id: 'u1',
          name: 'Carlos Ramírez',
          role: 'agent',
        },
        message: 'Hola Juan, estoy revisando el caso. El error E-102 suele estar relacionado con el sensor. ¿Has intentado reiniciar el equipo completamente?',
        createdAt: '2024-12-19T09:15:00',
      },
    ],
    tags: ['calibración', 'urgente'],
  },
  {
    id: '2',
    ticketNumber: 'TK-2024-002',
    subject: 'Solicitud de capacitación en software Pix4D',
    description: 'Necesitamos capacitación para el equipo sobre el uso avanzado del software de fotogrametría.',
    status: 'pending',
    priority: 'medium',
    category: 'training',
    client: {
      id: 'c2',
      name: 'Minera del Norte',
      contact: 'Ana Torres',
      email: 'atorres@minera.com',
    },
    assignedTo: {
      id: 'u3',
      name: 'Luis Mendoza',
    },
    createdAt: '2024-12-18T10:00:00',
    updatedAt: '2024-12-18T14:30:00',
    responses: [
      {
        id: 'r3',
        author: {
          id: 'c2',
          name: 'Ana Torres',
          role: 'client',
        },
        message: 'Necesitamos programar una capacitación para 5 personas, preferiblemente la próxima semana.',
        createdAt: '2024-12-18T10:00:00',
      },
    ],
    tags: ['capacitación', 'programar'],
  },
  {
    id: '3',
    ticketNumber: 'TK-2024-003',
    subject: 'Instalación de dron DJI Mavic 3',
    description: 'Programar visita para instalación y configuración inicial del equipo.',
    status: 'new',
    priority: 'high',
    category: 'installation',
    client: {
      id: 'c3',
      name: 'Agroindustrias del Sur',
      contact: 'Roberto Sánchez',
      email: 'rsanchez@agrosur.com',
    },
    createdAt: '2024-12-19T11:00:00',
    updatedAt: '2024-12-19T11:00:00',
    dueDate: '2024-12-23T17:00:00',
    responses: [
      {
        id: 'r4',
        author: {
          id: 'c3',
          name: 'Roberto Sánchez',
          role: 'client',
        },
        message: 'El equipo llegó ayer. ¿Cuándo pueden venir a hacer la instalación?',
        createdAt: '2024-12-19T11:00:00',
      },
    ],
  },
  {
    id: '4',
    ticketNumber: 'TK-2024-004',
    subject: 'Batería de GNSS no carga correctamente',
    description: 'El receptor GNSS no carga la batería al 100%, solo llega al 60% y se detiene.',
    status: 'resolved',
    priority: 'medium',
    category: 'maintenance',
    client: {
      id: 'c4',
      name: 'Topografía Moderna',
      contact: 'Laura Méndez',
      email: 'lmendez@topomoderna.com',
    },
    assignedTo: {
      id: 'u2',
      name: 'María González',
    },
    equipment: {
      id: 'e2',
      name: 'GNSS Trimble R12i',
      serialNumber: 'R12i-2023-0089',
    },
    createdAt: '2024-12-15T09:00:00',
    updatedAt: '2024-12-17T16:45:00',
    resolvedAt: '2024-12-17T16:45:00',
    responses: [
      {
        id: 'r5',
        author: {
          id: 'c4',
          name: 'Laura Méndez',
          role: 'client',
        },
        message: 'La batería no carga completamente desde hace 3 días.',
        createdAt: '2024-12-15T09:00:00',
      },
      {
        id: 'r6',
        author: {
          id: 'u2',
          name: 'María González',
          role: 'agent',
        },
        message: 'Hemos identificado que la batería necesita reemplazo. Enviamos una nueva en garantía.',
        createdAt: '2024-12-17T16:45:00',
      },
    ],
    tags: ['batería', 'garantía'],
  },
  {
    id: '5',
    ticketNumber: 'TK-2024-005',
    subject: 'Consulta sobre facturación',
    description: 'Necesito aclaración sobre cargos en la última factura.',
    status: 'closed',
    priority: 'low',
    category: 'billing',
    client: {
      id: 'c5',
      name: 'Desarrollo Urbano XYZ',
      contact: 'Jorge Martínez',
      email: 'jmartinez@desarrollo.com',
    },
    assignedTo: {
      id: 'u4',
      name: 'Ana Torres',
    },
    createdAt: '2024-12-12T14:00:00',
    updatedAt: '2024-12-13T10:30:00',
    resolvedAt: '2024-12-13T10:00:00',
    closedAt: '2024-12-13T10:30:00',
    responses: [
      {
        id: 'r7',
        author: {
          id: 'c5',
          name: 'Jorge Martínez',
          role: 'client',
        },
        message: 'Veo un cargo adicional que no entiendo en la factura.',
        createdAt: '2024-12-12T14:00:00',
      },
      {
        id: 'r8',
        author: {
          id: 'u4',
          name: 'Ana Torres',
          role: 'agent',
        },
        message: 'El cargo corresponde al mantenimiento preventivo programado. Te envío el desglose detallado.',
        createdAt: '2024-12-13T10:00:00',
      },
    ],
    satisfaction: 5,
  },
];

export function Tickets() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('board');
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: [] as string[],
    priority: [] as string[],
    category: [] as string[],
    assignedTo: '',
  });

  const filterTickets = (tickets: Ticket[]) => {
    let filtered = tickets;

    if (filters.search) {
      filtered = filtered.filter(t =>
        t.ticketNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.subject.toLowerCase().includes(filters.search.toLowerCase()) ||
        t.client.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.status.length > 0) {
      filtered = filtered.filter(t => filters.status.includes(t.status));
    }

    if (filters.priority.length > 0) {
      filtered = filtered.filter(t => filters.priority.includes(t.priority));
    }

    if (filters.category.length > 0) {
      filtered = filtered.filter(t => filters.category.includes(t.category));
    }

    if (filters.assignedTo) {
      filtered = filtered.filter(t => t.assignedTo?.id === filters.assignedTo);
    }

    return filtered;
  };

  const filteredTickets = filterTickets(tickets);

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-[#1E293B]">Tickets de Soporte</h1>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-[#F1F5F9] rounded-lg p-1">
              <button
                onClick={() => setViewMode('board')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'board' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 h-10 text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Exportar</span>
            </button>

            <button
              onClick={() => navigate('/tickets/nuevo')}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nuevo Ticket
            </button>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span>Dashboard</span>
          <span>/</span>
          <span>Soporte</span>
          <span>/</span>
          <span className="text-[#1E293B]">Tickets</span>
        </div>
      </div>

      {/* Metrics */}
      <TicketMetrics tickets={tickets} />

      {/* Filters */}
      <TicketFilters filters={filters} onChange={setFilters} />

      {/* Content */}
      <div className="px-8 mt-6">
        {viewMode === 'board' ? (
          <TicketBoard
            tickets={filteredTickets}
            onTicketClick={setSelectedTicket}
            onUpdateTicket={(updated) => {
              setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
            }}
          />
        ) : (
          <TicketList
            tickets={filteredTickets}
            onTicketClick={setSelectedTicket}
          />
        )}
      </div>

      {/* Modals */}
      {selectedTicket && (
        <TicketDetailPanel
          ticket={selectedTicket}
          onClose={() => setSelectedTicket(null)}
          onUpdate={(updated) => {
            setTickets(prev => prev.map(t => t.id === updated.id ? updated : t));
            setSelectedTicket(updated);
          }}
        />
      )}
    </div>
  );
}