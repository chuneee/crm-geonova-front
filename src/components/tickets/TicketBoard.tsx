import { Clock, User, Tag, MessageSquare, AlertCircle } from 'lucide-react';
import type { Ticket } from '../../pages/Tickets';

interface TicketBoardProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
  onUpdateTicket: (ticket: Ticket) => void;
}

const columns = [
  { id: 'new', label: 'Nuevos', color: '#3B82F6' },
  { id: 'open', label: 'Abiertos', color: '#F59E0B' },
  { id: 'pending', label: 'Pendientes', color: '#8B5CF6' },
  { id: 'resolved', label: 'Resueltos', color: '#10B981' },
  { id: 'closed', label: 'Cerrados', color: '#64748B' },
];

const priorityConfig = {
  low: { label: 'Baja', color: '#10B981', bg: '#D1FAE5' },
  medium: { label: 'Media', color: '#F59E0B', bg: '#FEF3C7' },
  high: { label: 'Alta', color: '#EF4444', bg: '#FEE2E2' },
  urgent: { label: 'Urgente', color: '#DC2626', bg: '#FEE2E2' },
};

const categoryConfig = {
  technical: { label: 'Técnico', icon: '🔧' },
  installation: { label: 'Instalación', icon: '📦' },
  maintenance: { label: 'Mantenimiento', icon: '⚙️' },
  training: { label: 'Capacitación', icon: '📚' },
  billing: { label: 'Facturación', icon: '💰' },
  general: { label: 'General', icon: '📋' },
};

export function TicketBoard({ tickets, onTicketClick, onUpdateTicket }: TicketBoardProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isOverdue = (ticket: Ticket) => {
    if (!ticket.dueDate || ticket.status === 'closed' || ticket.status === 'resolved') return false;
    return new Date(ticket.dueDate) < new Date();
  };

  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {columns.map((column) => {
        const columnTickets = tickets.filter(t => t.status === column.id);
        
        return (
          <div key={column.id} className="flex-shrink-0 w-80">
            {/* Column Header */}
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: column.color }}
                  />
                  <h3 className="text-sm text-[#1E293B]">{column.label}</h3>
                </div>
                <span className="px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] rounded-full text-xs">
                  {columnTickets.length}
                </span>
              </div>
              <div className="h-1 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: tickets.length > 0 ? `${(columnTickets.length / tickets.length) * 100}%` : '0%',
                    backgroundColor: column.color,
                  }}
                />
              </div>
            </div>

            {/* Tickets */}
            <div className="space-y-3 min-h-[200px]">
              {columnTickets.map((ticket) => {
                const priority = priorityConfig[ticket.priority];
                const category = categoryConfig[ticket.category];
                const overdue = isOverdue(ticket);

                return (
                  <div
                    key={ticket.id}
                    onClick={() => onTicketClick(ticket)}
                    className={`bg-white rounded-lg border-2 p-4 hover:shadow-md transition-all cursor-pointer group ${
                      overdue ? 'border-[#FEE2E2]' : 'border-[#E2E8F0] hover:border-[#3B82F6]'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs text-[#64748B]">{ticket.ticketNumber}</span>
                      <span
                        className="px-2 py-0.5 rounded-full text-xs"
                        style={{ backgroundColor: priority.bg, color: priority.color }}
                      >
                        {priority.label}
                      </span>
                    </div>

                    {/* Subject */}
                    <h4 className="text-sm text-[#1E293B] mb-2 line-clamp-2">
                      {ticket.subject}
                    </h4>

                    {/* Category */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-sm">{category.icon}</span>
                      <span className="text-xs text-[#64748B]">{category.label}</span>
                    </div>

                    {/* Client */}
                    <div className="flex items-center gap-2 mb-3 p-2 bg-[#F8FAFC] rounded">
                      <div className="w-6 h-6 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded flex items-center justify-center text-white text-xs flex-shrink-0">
                        {ticket.client.name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-[#1E293B] truncate">{ticket.client.name}</p>
                        <p className="text-xs text-[#64748B] truncate">{ticket.client.contact}</p>
                      </div>
                    </div>

                    {/* Equipment */}
                    {ticket.equipment && (
                      <div className="mb-3 p-2 bg-[#F8FAFC] rounded">
                        <p className="text-xs text-[#64748B]">Equipo</p>
                        <p className="text-xs text-[#1E293B] truncate">{ticket.equipment.name}</p>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                      <div className="flex items-center gap-3">
                        {ticket.assignedTo && (
                          <div className="flex items-center gap-1 text-xs text-[#64748B]">
                            <User className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[80px]">{ticket.assignedTo.name.split(' ')[0]}</span>
                          </div>
                        )}
                        
                        {ticket.responses.length > 0 && (
                          <div className="flex items-center gap-1 text-xs text-[#64748B]">
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{ticket.responses.length}</span>
                          </div>
                        )}
                      </div>

                      {ticket.dueDate && (
                        <div className={`flex items-center gap-1 text-xs ${overdue ? 'text-[#EF4444]' : 'text-[#64748B]'}`}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>{formatDate(ticket.dueDate)}</span>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    {ticket.tags && ticket.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {ticket.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#F1F5F9] text-[#64748B] rounded text-xs"
                          >
                            <Tag className="w-3 h-3" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Overdue Alert */}
                    {overdue && (
                      <div className="mt-2 flex items-center gap-1.5 p-2 bg-[#FEE2E2] rounded text-xs text-[#EF4444]">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>Vencido</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {columnTickets.length === 0 && (
                <div className="bg-[#F8FAFC] border-2 border-dashed border-[#E2E8F0] rounded-lg p-8 text-center">
                  <p className="text-sm text-[#94A3B8]">Sin tickets</p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
