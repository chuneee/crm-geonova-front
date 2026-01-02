import { User, MessageSquare, Clock, AlertCircle } from 'lucide-react';
import type { Ticket } from '../../pages/Tickets';

interface TicketListProps {
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

const statusConfig = {
  new: { label: 'Nuevo', color: '#3B82F6', bg: '#DBEAFE' },
  open: { label: 'Abierto', color: '#F59E0B', bg: '#FEF3C7' },
  pending: { label: 'Pendiente', color: '#8B5CF6', bg: '#EDE9FE' },
  resolved: { label: 'Resuelto', color: '#10B981', bg: '#D1FAE5' },
  closed: { label: 'Cerrado', color: '#64748B', bg: '#F1F5F9' },
};

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

export function TicketList({ tickets, onTicketClick }: TicketListProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      year: 'numeric',
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
    <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Ticket
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Asunto
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Cliente
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Categoría
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Estado
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Prioridad
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Asignado
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Actualizado
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {tickets.map((ticket) => {
              const status = statusConfig[ticket.status];
              const priority = priorityConfig[ticket.priority];
              const category = categoryConfig[ticket.category];
              const overdue = isOverdue(ticket);

              return (
                <tr
                  key={ticket.id}
                  onClick={() => onTicketClick(ticket)}
                  className={`hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                    overdue ? 'bg-[#FEF2F2]' : ''
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-[#1E293B]">{ticket.ticketNumber}</span>
                      {ticket.responses.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-[#64748B]">
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{ticket.responses.length}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="max-w-md">
                      <p className="text-sm text-[#1E293B] line-clamp-1">{ticket.subject}</p>
                      {ticket.equipment && (
                        <p className="text-xs text-[#64748B] truncate">{ticket.equipment.name}</p>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded flex items-center justify-center text-white text-xs flex-shrink-0">
                        {ticket.client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-[#1E293B]">{ticket.client.name}</p>
                        <p className="text-xs text-[#64748B]">{ticket.client.contact}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{category.icon}</span>
                      <span className="text-sm text-[#64748B]">{category.label}</span>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: status.bg, color: status.color }}
                    >
                      {status.label}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: priority.bg, color: priority.color }}
                    >
                      {priority.label}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {ticket.assignedTo ? (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-[#64748B]" />
                        <span className="text-sm text-[#64748B]">{ticket.assignedTo.name}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-[#94A3B8] italic">Sin asignar</span>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {overdue && (
                        <AlertCircle className="w-4 h-4 text-[#EF4444]" />
                      )}
                      <div>
                        <p className="text-sm text-[#1E293B]">{formatDate(ticket.updatedAt)}</p>
                        {ticket.dueDate && (
                          <p className={`text-xs ${overdue ? 'text-[#EF4444]' : 'text-[#64748B]'}`}>
                            Vence: {formatDate(ticket.dueDate)}
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {tickets.length === 0 && (
        <div className="p-12 text-center">
          <p className="text-sm text-[#64748B]">No se encontraron tickets</p>
        </div>
      )}
    </div>
  );
}
