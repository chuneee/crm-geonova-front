import { useState } from 'react';
import { X, Building2, DollarSign, Calendar, User, Briefcase, TrendingUp, FileText, Tag, Mail, Phone } from 'lucide-react';

interface NewOpportunityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (opportunity: any) => void;
}

export function NewOpportunityModal({ isOpen, onClose, onSubmit }: NewOpportunityModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    value: '',
    stage: 'prospeccion',
    probability: '30',
    closeDate: '',
    assignedTo: '1',
    source: '',
    industry: '',
    description: '',
    tags: [] as string[],
  });

  const [currentTag, setCurrentTag] = useState('');

  const teamMembers = [
    { id: '1', name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    { id: '2', name: 'María García', avatar: 'MG', color: 'from-purple-500 to-purple-600' },
    { id: '3', name: 'Juan Pérez', avatar: 'JP', color: 'from-green-500 to-green-600' },
    { id: '4', name: 'Ana Martínez', avatar: 'AM', color: 'from-pink-500 to-pink-600' },
  ];

  const stages = [
    { value: 'prospeccion', label: 'Prospección', probability: 30 },
    { value: 'calificacion', label: 'Calificación', probability: 50 },
    { value: 'propuesta', label: 'Propuesta', probability: 70 },
    { value: 'negociacion', label: 'Negociación', probability: 85 },
  ];

  const sources = [
    'Referido',
    'Web',
    'LinkedIn',
    'Evento',
    'Llamada en frío',
    'Email marketing',
    'Redes sociales',
    'Otro',
  ];

  const industries = [
    'Tecnología',
    'Manufactura',
    'Retail',
    'Salud',
    'Educación',
    'Finanzas',
    'Inmobiliaria',
    'Logística',
    'Otro',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const selectedMember = teamMembers.find(m => m.id === formData.assignedTo);
    
    const newOpportunity = {
      id: Date.now().toString(),
      title: formData.title,
      company: formData.company,
      value: parseFloat(formData.value),
      stage: formData.stage,
      assignedTo: selectedMember,
      closeDate: formData.closeDate,
      probability: parseInt(formData.probability),
      progress: 0,
      contactName: formData.contactName,
      contactEmail: formData.contactEmail,
      contactPhone: formData.contactPhone,
      source: formData.source,
      industry: formData.industry,
      description: formData.description,
      tags: formData.tags,
    };

    onSubmit(newOpportunity);
    handleClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      company: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      value: '',
      stage: 'prospeccion',
      probability: '30',
      closeDate: '',
      assignedTo: '1',
      source: '',
      industry: '',
      description: '',
      tags: [],
    });
    setCurrentTag('');
    onClose();
  };

  const handleStageChange = (stageValue: string) => {
    const stage = stages.find(s => s.value === stageValue);
    setFormData({
      ...formData,
      stage: stageValue,
      probability: stage ? stage.probability.toString() : formData.probability,
    });
  };

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl text-white">Nueva Oportunidad</h2>
            <p className="text-sm text-blue-100 mt-1">Agrega una nueva oportunidad al pipeline de ventas</p>
          </div>
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="p-8 space-y-6">
            
            {/* Información Básica */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-4 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#3B82F6]" />
                <span>Información Básica</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm text-[#64748B] mb-2">
                    Nombre de la Oportunidad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ej: Implementación CRM Enterprise"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-2">
                    <Building2 className="w-4 h-4" />
                    Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Nombre de la empresa"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Industria
                  </label>
                  <select
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  >
                    <option value="">Seleccionar industria</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>
                        {industry}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Contacto */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-4 flex items-center gap-2">
                <User className="w-4 h-4 text-[#3B82F6]" />
                <span>Información de Contacto</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Nombre del Contacto
                  </label>
                  <input
                    type="text"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    placeholder="Nombre completo"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                    placeholder="email@empresa.com"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={formData.contactPhone}
                    onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                    placeholder="+1 234 567 8900"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Detalles de la Oportunidad */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-4 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#3B82F6]" />
                <span>Detalles de la Oportunidad</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Valor Estimado *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    step="0.01"
                    value={formData.value}
                    onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                    placeholder="0.00"
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Fecha Estimada de Cierre *
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.closeDate}
                    onChange={(e) => setFormData({ ...formData, closeDate: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Etapa *
                  </label>
                  <select
                    required
                    value={formData.stage}
                    onChange={(e) => handleStageChange(e.target.value)}
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  >
                    {stages.map((stage) => (
                      <option key={stage.value} value={stage.value}>
                        {stage.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Probabilidad de Cierre *
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      required
                      min="0"
                      max="100"
                      value={formData.probability}
                      onChange={(e) => setFormData({ ...formData, probability: e.target.value })}
                      className="w-full h-11 px-4 pr-10 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Asignado a *
                  </label>
                  <select
                    required
                    value={formData.assignedTo}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  >
                    {teamMembers.map((member) => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#64748B] mb-2">
                    Origen del Lead
                  </label>
                  <select
                    value={formData.source}
                    onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                    className="w-full h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                  >
                    <option value="">Seleccionar origen</option>
                    {sources.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Descripción */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#3B82F6]" />
                <span>Descripción y Notas</span>
              </h3>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe los detalles de la oportunidad, necesidades del cliente, puntos clave..."
                rows={4}
                className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all resize-none"
              />
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-4 flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#3B82F6]" />
                <span>Etiquetas</span>
              </h3>
              <div className="flex gap-2 mb-3">
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  placeholder="Agregar etiqueta..."
                  className="flex-1 h-11 px-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] transition-all"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-4 h-11 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#3B82F6] hover:bg-[#EFF6FF] transition-colors"
                >
                  Agregar
                </button>
              </div>
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EFF6FF] text-[#3B82F6] rounded-lg text-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="hover:text-[#2563EB]"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Footer */}
          <div className="px-8 py-6 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 h-11 bg-white border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 h-11 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] hover:from-[#2563EB] hover:to-[#1D4ED8] text-white rounded-lg text-sm transition-all shadow-lg shadow-blue-500/25"
            >
              Crear Oportunidad
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
