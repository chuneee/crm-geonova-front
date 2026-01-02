import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Calendar, MapPin, User, AlertTriangle, FileText, Clock, Package } from 'lucide-react';

export function NewServiceOrder() {
  const navigate = useNavigate();
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
    navigate('/ordenes');
  };

  const serviceTypes = [
    { id: 'installation', label: 'Instalación', icon: '📦', description: 'Instalación de nuevos equipos' },
    { id: 'maintenance', label: 'Mantenimiento', icon: '⚙️', description: 'Mantenimiento preventivo/correctivo' },
    { id: 'repair', label: 'Reparación', icon: '🔧', description: 'Reparación de equipos' },
    { id: 'calibration', label: 'Calibración', icon: '📐', description: 'Calibración de instrumentos' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/ordenes')}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#64748B]" />
            </button>
            <div>
              <h1 className="text-2xl text-[#1E293B]">Nueva Orden de Servicio</h1>
              <p className="text-sm text-[#64748B]">Registra una nueva orden para instalación o servicio</p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B] ml-14">
          <span>Dashboard</span>
          <span>/</span>
          <span>Órdenes de Servicio</span>
          <span>/</span>
          <span className="text-[#1E293B]">Nueva Orden</span>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Type Selection */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Tipo de Servicio</h2>
            <div className="grid grid-cols-4 gap-4">
              {serviceTypes.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, serviceType: type.id })}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all ${
                    formData.serviceType === type.id
                      ? 'border-[#3B82F6] bg-[#F0F9FF]'
                      : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                  }`}
                >
                  <span className="text-3xl">{type.icon}</span>
                  <div className="text-center">
                    <p className="text-sm text-[#1E293B]">{type.label}</p>
                    <p className="text-xs text-[#64748B] mt-1">{type.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Client & Opportunity */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Cliente y Oportunidad</h2>
            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Oportunidad relacionada
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Buscar oportunidad..."
                    value={formData.opportunity}
                    onChange={(e) => setFormData({ ...formData, opportunity: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Detalles del Servicio</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Producto/Equipo <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Ej: Estación Total Leica TS16"
                    value={formData.product}
                    onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[#1E293B] mb-2">
                    Prioridad <span className="text-[#EF4444]">*</span>
                  </label>
                  <div className="relative">
                    <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
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
                    Fecha <span className="text-[#EF4444]">*</span>
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
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="time"
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location & Technician */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Ubicación y Asignación</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Ubicación <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Dirección completa del servicio"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Técnico asignado
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <select
                    value={formData.technician}
                    onChange={(e) => setFormData({ ...formData, technician: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent appearance-none"
                  >
                    <option value="">Seleccionar técnico...</option>
                    <option value="tech1">Juan Pérez - Instalaciones</option>
                    <option value="tech2">María González - Mantenimiento</option>
                    <option value="tech3">Carlos Ramírez - Reparaciones</option>
                    <option value="tech4">Ana Torres - Calibración</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Instrucciones Especiales</h2>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-[#94A3B8]" />
              <textarea
                placeholder="Agrega cualquier instrucción especial o nota importante para el técnico..."
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                rows={4}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/ordenes')}
                className="px-6 py-2.5 text-sm text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="px-6 py-2.5 text-sm text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors"
                >
                  Guardar Borrador
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors"
                >
                  Crear Orden
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
