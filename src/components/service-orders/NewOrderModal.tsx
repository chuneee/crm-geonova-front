import { X, Search, Calendar, MapPin, User, AlertTriangle, FileText } from 'lucide-react';
import { useState } from 'react';

interface NewOrderModalProps {
  onClose: () => void;
}

export function NewOrderModal({ onClose }: NewOrderModalProps) {
  const [formData, setFormData] = useState({
    client: '',
    opportunity: '',
    serviceType: '',
    product: '',
    priority: 'medium',
    date: '',
    time: '',
    location: '',
    instructions: '',
    technician: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating order:', formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl text-[#1E293B]">Nueva Orden de Servicio</h2>
            <p className="text-sm text-[#64748B]">Registra una nueva orden para instalación o servicio</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Client Selection */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Cliente <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Buscar cliente..."
                value={formData.client}
                onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Opportunity Link */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Vincular con Oportunidad
            </label>
            <select
              value={formData.opportunity}
              onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            >
              <option value="">Seleccionar oportunidad (opcional)</option>
              <option value="opp1">OPP-2847 - Constructora ABC</option>
              <option value="opp2">OPP-2848 - Agroindustrias del Norte</option>
            </select>
          </div>

          {/* Service Type & Product */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Tipo de Servicio <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={formData.serviceType}
                onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                required
              >
                <option value="">Seleccionar...</option>
                <option value="installation">🚁 Instalación</option>
                <option value="maintenance">🔧 Mantenimiento</option>
                <option value="repair">🔨 Reparación</option>
                <option value="training">🎓 Capacitación</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Prioridad <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                required
              >
                <option value="low">🟢 Baja</option>
                <option value="medium">🟡 Media</option>
                <option value="high">🔴 Alta</option>
              </select>
            </div>
          </div>

          {/* Product/Service Details */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Producto/Servicio <span className="text-[#EF4444]">*</span>
            </label>
            <input
              type="text"
              placeholder="Ej: Instalación de Drone DJI Mavic 3"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              required
            />
          </div>

          {/* Schedule */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Fecha Preferida <span className="text-[#EF4444]">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#1E293B] mb-2">
                Hora <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Ubicación <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-[#94A3B8]" />
              <textarea
                placeholder="Dirección completa del servicio..."
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                rows={2}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
                required
              />
            </div>
            <button
              type="button"
              className="mt-2 text-xs text-[#3B82F6] hover:underline"
            >
              📍 Seleccionar en mapa
            </button>
          </div>

          {/* Technician Assignment */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Asignar Técnico
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
              <select
                value={formData.technician}
                onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="">Asignación automática (recomendado)</option>
                <option value="t1">Carlos Ramírez - Disponible</option>
                <option value="t2">Patricia Ruiz - Disponible</option>
                <option value="t3">Luis Mendoza - Ocupado (2/4)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-[#64748B]">
              💡 La asignación automática selecciona el mejor técnico según ubicación y habilidades
            </p>
          </div>

          {/* Special Instructions */}
          <div>
            <label className="block text-sm text-[#1E293B] mb-2">
              Instrucciones Especiales
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-[#94A3B8]" />
              <textarea
                placeholder="Detalles adicionales, requisitos especiales, contacto en sitio, etc..."
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={3}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
              />
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
              Crear y Asignar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
