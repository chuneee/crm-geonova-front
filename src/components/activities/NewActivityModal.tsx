import { X, Phone, Users, Mail, FileText, CheckSquare, Calendar, Clock, MapPin, AlertTriangle, Bell, Search } from 'lucide-react';
import { useState } from 'react';
import type { Activity } from '../../pages/Activities';

interface NewActivityModalProps {
  onClose: () => void;
  onSave: (activity: Activity) => void;
}

const activityTypes = [
  { id: 'call' as const, label: 'Llamada', icon: Phone, color: '#3B82F6' },
  { id: 'meeting' as const, label: 'Reunión', icon: Users, color: '#8B5CF6' },
  { id: 'task' as const, label: 'Tarea', icon: CheckSquare, color: '#F59E0B' },
  { id: 'email' as const, label: 'Email', icon: Mail, color: '#10B981' },
  { id: 'follow-up' as const, label: 'Seguimiento', icon: FileText, color: '#EF4444' },
];

export function NewActivityModal({ onClose, onSave }: NewActivityModalProps) {
  const [selectedType, setSelectedType] = useState<Activity['type']>('call');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Activity['priority'],
    dueDate: '',
    dueTime: '',
    assignedTo: 'u1',
    relatedTo: '',
    relatedType: 'opportunity' as 'lead' | 'opportunity' | 'client',
    location: '',
    reminder: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newActivity: Activity = {
      id: Date.now().toString(),
      type: selectedType,
      title: formData.title,
      description: formData.description,
      status: 'pending',
      priority: formData.priority,
      dueDate: formData.dueDate,
      dueTime: formData.dueTime,
      assignedTo: {
        id: formData.assignedTo,
        name: 'Usuario Actual',
      },
      relatedTo: formData.relatedTo ? {
        type: formData.relatedType,
        id: 'rel1',
        name: formData.relatedTo,
      } : undefined,
      location: formData.location,
      reminder: formData.reminder,
      createdAt: new Date().toISOString(),
    };

    onSave(newActivity);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl text-[#1E293B]">Nueva Actividad</h2>
            <p className="text-sm text-[#64748B]">Programa una nueva actividad para gestionar tu pipeline</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Activity Type Selection */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-3">
              Tipo de Actividad <span className="text-[#EF4444]">*</span>
            </label>
            <div className="grid grid-cols-5 gap-3">
              {activityTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setSelectedType(type.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    selectedType === type.id
                      ? 'border-current shadow-sm'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                  style={{
                    color: selectedType === type.id ? type.color : undefined,
                  }}
                >
                  <type.icon className="w-6 h-6" />
                  <span className="text-xs">{type.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Título <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Llamada de seguimiento con cliente..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Descripción
            </label>
            <textarea
              placeholder="Detalles adicionales de la actividad..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
            />
          </div>

          {/* Date, Time, Priority */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Fecha <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Hora
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="time"
                  value={formData.dueTime}
                  onChange={(e) => setFormData({ ...formData, dueTime: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Prioridad <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as Activity['priority'] })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent appearance-none"
                  required
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>
          </div>

          {/* Related To */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Relacionar con
            </label>
            <div className="grid grid-cols-4 gap-3">
              <select
                value={formData.relatedType}
                onChange={(e) => setFormData({ ...formData, relatedType: e.target.value as any })}
                className="px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="lead">Lead</option>
                <option value="opportunity">Oportunidad</option>
                <option value="client">Cliente</option>
              </select>

              <div className="col-span-3 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder="Buscar registro..."
                  value={formData.relatedTo}
                  onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Location (for meetings) */}
          {(selectedType === 'meeting' || selectedType === 'call') && (
            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Ubicación {selectedType === 'meeting' && <span className="text-[#EF4444]">*</span>}
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="text"
                  placeholder={selectedType === 'meeting' ? 'Dirección o enlace virtual' : 'Número de teléfono'}
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  required={selectedType === 'meeting'}
                />
              </div>
            </div>
          )}

          {/* Assigned To */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Asignado a <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={formData.assignedTo}
              onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              required
            >
              <option value="u1">María González</option>
              <option value="u2">Carlos Ramírez</option>
              <option value="u3">Luis Mendoza</option>
              <option value="u4">Ana Torres</option>
            </select>
          </div>

          {/* Reminder */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.reminder}
                onChange={(e) => setFormData({ ...formData, reminder: e.target.checked })}
                className="w-5 h-5 text-[#3B82F6] border-[#CBD5E1] rounded focus:ring-2 focus:ring-[#3B82F6]"
              />
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-[#F59E0B]" />
                <div>
                  <p className="text-sm text-[#1E293B]">Configurar recordatorio</p>
                  <p className="text-xs text-[#64748B]">Recibe una notificación antes de la actividad</p>
                </div>
              </div>
            </label>
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
              Crear Actividad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
