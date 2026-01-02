import { X, User, Clock, MessageSquare, Send, CheckCircle, XCircle, Edit2, Trash2, AlertCircle, Tag } from 'lucide-react';
import { useState } from 'react';
import type { Ticket } from '../../pages/Tickets';

interface TicketDetailPanelProps {
  ticket: Ticket;
  onClose: () => void;
  onUpdate: (ticket: Ticket) => void;
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

export function TicketDetailPanel({ ticket, onClose, onUpdate }: TicketDetailPanelProps) {
  const [newMessage, setNewMessage] = useState('');
  const [activeTab, setActiveTab] = useState<'conversation' | 'details'>('conversation');

  const status = statusConfig[ticket.status];
  const priority = priorityConfig[ticket.priority];
  const category = categoryConfig[ticket.category];

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const updatedTicket = {
      ...ticket,
      responses: [
        ...ticket.responses,
        {
          id: Date.now().toString(),
          author: {
            id: 'agent1',
            name: 'Agente de Soporte',
            role: 'agent' as const,
          },
          message: newMessage,
          createdAt: new Date().toISOString(),
        },
      ],
      updatedAt: new Date().toISOString(),
    };

    onUpdate(updatedTicket);
    setNewMessage('');
  };

  const handleStatusChange = (newStatus: Ticket['status']) => {
    const updates: any = { status: newStatus, updatedAt: new Date().toISOString() };
    
    if (newStatus === 'resolved') {
      updates.resolvedAt = new Date().toISOString();
    } else if (newStatus === 'closed') {
      updates.closedAt = new Date().toISOString();
    }

    onUpdate({ ...ticket, ...updates });
  };

  const isOverdue = () => {
    if (!ticket.dueDate || ticket.status === 'closed' || ticket.status === 'resolved') return false;
    return new Date(ticket.dueDate) < new Date();
  };

  return (
    <div className="fixed right-0 top-[72px] bottom-0 w-[600px] bg-white border-l border-[#E2E8F0] shadow-2xl z-40 overflow-y-auto flex flex-col">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-[#64748B]">{ticket.ticketNumber}</span>
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: status.bg, color: status.color }}
              >
                {status.label}
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: priority.bg, color: priority.color }}
              >
                {priority.label}
              </span>
            </div>
            <h2 className="text-lg text-[#1E293B] mb-1 line-clamp-2">{ticket.subject}</h2>
            <div className="flex items-center gap-1.5">
              <span className="text-sm">{category.icon}</span>
              <span className="text-sm text-[#64748B]">{category.label}</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Overdue Alert */}
        {isOverdue() && (
          <div className="flex items-center gap-2 p-2 bg-[#FEE2E2] rounded-lg text-sm text-[#EF4444]">
            <AlertCircle className="w-4 h-4" />
            <span>Este ticket está vencido</span>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 mt-3 border-b border-[#E2E8F0] -mb-[1px]">
          <button
            onClick={() => setActiveTab('conversation')}
            className={`flex items-center gap-2 px-4 py-2 text-sm border-b-2 transition-colors ${
              activeTab === 'conversation'
                ? 'border-[#3B82F6] text-[#3B82F6]'
                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Conversación</span>
            <span className="px-2 py-0.5 bg-[#F1F5F9] rounded-full text-xs">
              {ticket.responses.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`px-4 py-2 text-sm border-b-2 transition-colors ${
              activeTab === 'details'
                ? 'border-[#3B82F6] text-[#3B82F6]'
                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            Detalles
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'conversation' ? (
          <div className="p-6 space-y-4">
            {/* Initial Description */}
            <div className="bg-[#F8FAFC] rounded-lg p-4 border-l-4 border-[#3B82F6]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-xs">
                  {ticket.client.name.charAt(0)}
                </div>
                <div>
                  <p className="text-sm text-[#1E293B]">{ticket.client.contact}</p>
                  <p className="text-xs text-[#64748B]">{formatDate(ticket.createdAt)}</p>
                </div>
              </div>
              <p className="text-sm text-[#64748B] whitespace-pre-wrap">{ticket.description}</p>
            </div>

            {/* Responses */}
            {ticket.responses.map((response) => (
              <div
                key={response.id}
                className={`rounded-lg p-4 ${
                  response.author.role === 'agent'
                    ? 'bg-[#EFF6FF] border-l-4 border-[#3B82F6]'
                    : 'bg-white border border-[#E2E8F0]'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${
                    response.author.role === 'agent'
                      ? 'bg-gradient-to-br from-[#10B981] to-[#3B82F6]'
                      : 'bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6]'
                  }`}>
                    {response.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-[#1E293B]">
                      {response.author.name}
                      {response.author.role === 'agent' && (
                        <span className="ml-2 px-2 py-0.5 bg-[#10B981] text-white rounded-full text-xs">
                          Soporte
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-[#64748B]">
                      {new Date(response.createdAt).toLocaleString('es-MX')}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#64748B] whitespace-pre-wrap">{response.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 space-y-6">
            {/* Client Info */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-3">Cliente</h3>
              <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-lg">
                <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                  {ticket.client.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#1E293B] mb-0.5">{ticket.client.name}</p>
                  <p className="text-xs text-[#64748B] mb-0.5">{ticket.client.contact}</p>
                  <p className="text-xs text-[#64748B]">{ticket.client.email}</p>
                </div>
              </div>
            </div>

            {/* Equipment */}
            {ticket.equipment && (
              <div>
                <h3 className="text-sm text-[#1E293B] mb-3">Equipo</h3>
                <div className="p-4 bg-[#F8FAFC] rounded-lg">
                  <p className="text-sm text-[#1E293B] mb-1">{ticket.equipment.name}</p>
                  <p className="text-xs text-[#64748B]">S/N: {ticket.equipment.serialNumber}</p>
                </div>
              </div>
            )}

            {/* Assignment */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-3">Asignado a</h3>
              {ticket.assignedTo ? (
                <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-lg">
                  <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white">
                    {ticket.assignedTo.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm text-[#1E293B]">{ticket.assignedTo.name}</p>
                    <p className="text-xs text-[#64748B]">Agente de soporte</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-[#F8FAFC] rounded-lg text-sm text-[#64748B] italic">
                  Sin asignar
                </div>
              )}
            </div>

            {/* Dates */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-3">Fechas</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded">
                  <span className="text-xs text-[#64748B]">Creado</span>
                  <span className="text-xs text-[#1E293B]">
                    {new Date(ticket.createdAt).toLocaleDateString('es-MX')}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded">
                  <span className="text-xs text-[#64748B]">Última actualización</span>
                  <span className="text-xs text-[#1E293B]">
                    {new Date(ticket.updatedAt).toLocaleDateString('es-MX')}
                  </span>
                </div>
                {ticket.dueDate && (
                  <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded">
                    <span className="text-xs text-[#64748B]">Fecha límite</span>
                    <span className={`text-xs ${isOverdue() ? 'text-[#EF4444]' : 'text-[#1E293B]'}`}>
                      {new Date(ticket.dueDate).toLocaleDateString('es-MX')}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Tags */}
            {ticket.tags && ticket.tags.length > 0 && (
              <div>
                <h3 className="text-sm text-[#1E293B] mb-3">Etiquetas</h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F8FAFC] text-[#64748B] rounded-full text-xs"
                    >
                      <Tag className="w-3 h-3" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Satisfaction */}
            {ticket.satisfaction && (
              <div>
                <h3 className="text-sm text-[#1E293B] mb-3">Satisfacción del Cliente</h3>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-2xl">
                      {star <= ticket.satisfaction! ? '⭐' : '☆'}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] p-6">
        {activeTab === 'conversation' ? (
          <div>
            <textarea
              placeholder="Escribe una respuesta..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none mb-3"
            />
            <div className="flex gap-2">
              <button
                onClick={handleSendMessage}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Respuesta</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
              <>
                <button
                  onClick={() => handleStatusChange('resolved')}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Marcar como Resuelto</span>
                </button>
                
                {ticket.status === 'new' && (
                  <button
                    onClick={() => handleStatusChange('open')}
                    className="w-full px-4 py-2 bg-white text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors"
                  >
                    Abrir Ticket
                  </button>
                )}
              </>
            )}
            
            {ticket.status === 'resolved' && (
              <button
                onClick={() => handleStatusChange('closed')}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#64748B] text-white rounded-lg hover:bg-[#475569] transition-colors"
              >
                <XCircle className="w-4 h-4" />
                <span>Cerrar Ticket</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
