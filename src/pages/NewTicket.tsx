import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, AlertCircle, Package, User, Mail } from 'lucide-react';

export function NewTicket() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    description: '',
    priority: 'medium',
    category: 'technical',
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
    console.log('Creating ticket:', formData);
    navigate('/tickets');
  };

  const categoryOptions = [
    { id: 'technical', label: 'Técnico', icon: '🔧', description: 'Problemas técnicos con equipos' },
    { id: 'installation', label: 'Instalación', icon: '📦', description: 'Instalación de nuevos equipos' },
    { id: 'maintenance', label: 'Mantenimiento', icon: '⚙️', description: 'Mantenimiento preventivo/correctivo' },
    { id: 'training', label: 'Capacitación', icon: '📚', description: 'Entrenamiento y capacitación' },
    { id: 'billing', label: 'Facturación', icon: '💰', description: 'Consultas sobre facturación' },
    { id: 'general', label: 'General', icon: '📋', description: 'Otros temas' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-6 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/tickets')}
              className="p-2 hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-[#64748B]" />
            </button>
            <div>
              <h1 className="text-2xl text-[#1E293B]">Nuevo Ticket de Soporte</h1>
              <p className="text-sm text-[#64748B]">Registra un nuevo caso de soporte técnico</p>
            </div>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B] ml-14">
          <span>Dashboard</span>
          <span>/</span>
          <span>Tickets de Soporte</span>
          <span>/</span>
          <span className="text-[#1E293B]">Nuevo Ticket</span>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-5xl mx-auto px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">
              Categoría <span className="text-[#EF4444]">*</span>
            </h2>
            <div className="grid grid-cols-3 gap-4">
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

          {/* Subject & Description */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Detalles del Problema</h2>
            <div className="space-y-4">
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

              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Descripción <span className="text-[#EF4444]">*</span>
                </label>
                <textarea
                  placeholder="Describe el problema o solicitud en detalle..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* Priority & Due Date */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Prioridad y Plazo</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Prioridad <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
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
          </div>

          {/* Client Info */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Información del Cliente</h2>
            <div className="space-y-4">
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
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                    <input
                      type="text"
                      placeholder="Nombre del contacto"
                      value={formData.clientContact}
                      onChange={(e) => setFormData({ ...formData, clientContact: e.target.value })}
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Email <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="email"
                    placeholder="email@empresa.com"
                    value={formData.clientEmail}
                    onChange={(e) => setFormData({ ...formData, clientEmail: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Equipment Info */}
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <h2 className="text-lg text-[#1E293B] mb-4">Equipo Relacionado (Opcional)</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#1E293B] mb-2">
                  Nombre del Equipo
                </label>
                <div className="relative">
                  <Package className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8]" />
                  <input
                    type="text"
                    placeholder="Ej: Estación Total Leica TS16"
                    value={formData.equipmentName}
                    onChange={(e) => setFormData({ ...formData, equipmentName: e.target.value })}
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                  />
                </div>
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
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/tickets')}
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
                  Crear Ticket
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
