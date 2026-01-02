import { X, Search, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import type { Ticket } from '../../pages/Tickets';

interface NewTicketModalProps {
  onClose: () => void;
  onSave: (ticket: Ticket) => void;
}

const categoryOptions = [
  { id: 'technical' as const, label: 'Técnico', icon: '🔧', description: 'Problemas técnicos con equipos' },
  { id: 'installation' as const, label: 'Instalación', icon: '📦', description: 'Instalación de nuevos equipos' },
  { id: 'maintenance' as const, label: 'Mantenimiento', icon: '⚙️', description: 'Mantenimiento preventivo/correctivo' },
  { id: 'training' as const, label: 'Capacitación', icon: '📚', description: 'Entrenamiento y capacitación' },
  { id: 'billing' as const, label: 'Facturación', icon: '💰', description: 'Consultas sobre facturación' },
  { id: 'general' as const, label: 'General', icon: '📋', description: 'Otros temas' },
];

export function NewTicketModal({ onClose, onSave }: NewTicketModalProps) {
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium' as Ticket['priority'],
    category: 'technical' as Ticket['category'],
    clientId: '',
    clientName: '',
    clientContact: '',
    clientEmail: '',
    equipmentName: '',
    equipmentSerial: '',
    dueDate: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTicket: Ticket = {
      id: Date.now().toString(),
      ticketNumber: `TK-2024-${String(Date.now()).slice(-3)}`,
      subject: formData.subject,
      description: formData.description,
      status: 'new',
      priority: formData.priority,
      category: formData.category,
      client: {
        id: formData.clientId || 'new',
        name: formData.clientName,
        contact: formData.clientContact,
        email: formData.clientEmail,
      },
      equipment: formData.equipmentName ? {
        id: 'eq-' + Date.now(),
        name: formData.equipmentName,
        serialNumber: formData.equipmentSerial,
      } : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: formData.dueDate || undefined,
      responses: [],
    };

    onSave(newTicket);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl text-[#1E293B]">Nuevo Ticket de Soporte</h2>
            <p className="text-sm text-[#64748B]">Registra un nuevo caso de soporte técnico</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-3">
              Categoría <span className="text-[#EF4444]">*</span>
            </label>
            <div className="grid grid-cols-3 gap-3">
              {categoryOptions.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  className={`flex flex-col items-start gap-2 p-4 rounded-lg border-2 transition-all text-left ${
                    formData.category === category.id
                      ? 'border-[#3B82F6] bg-[#F0F9FF]'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <p className="text-sm text-[#1E293B]">{category.label}</p>
                    <p className="text-xs text-[#64748B] mt-1">{category.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Asunto <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Error al calibrar equipo..."
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Descripción <span className="text-[#EF4444]">*</span>
            </label>
            <textarea
              placeholder="Describe el problema o solicitud en detalle..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
              required
            />
          </div>

          {/* Priority & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Prioridad <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Ticket['priority'] })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent appearance-none"
                  required
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Fecha límite
              </label>
              <input
                type="datetime-local"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>

          {/* Client Info */}
          <div className="border-t border-[#E2E8F0] pt-6">
            <h3 className="text-sm text-[#1E293B] mb-4">Información del Cliente</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Empresa <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Contacto <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Nombre del contacto"
                  value={formData.clientContact}
                  onChange={(e) => setFormData({ ...formData, clientContact: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  required
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm text-[#1E293B] mb-2">
                  Email <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="email"
                  placeholder="email@empresa.com"
                  value={formData.clientEmail}
                  onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  required
                />
              </div>
            </div>
          </div>

          {/* Equipment Info (Optional) */}
          <div className="border-t border-[#E2E8F0] pt-6">
            <h3 className="text-sm text-[#1E293B] mb-4">Equipo Relacionado (Opcional)</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Nombre del Equipo
                </label>
                <input
                  type="text"
                  placeholder="Ej: Estación Total Leica TS16"
                  value={formData.equipmentName}
                  onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Número de Serie
                </label>
                <input
                  type="text"
                  placeholder="Ej: TS16-2023-0045"
                  value={formData.equipmentSerial}
                  onChange={(e) => setFormData({ ...formData, equipmentSerial: e.target.value })}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#E2E8F0]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Crear Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
