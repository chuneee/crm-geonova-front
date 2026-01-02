import { Calendar, Clock, DollarSign, Tag, Target, Users, Mail } from 'lucide-react';
import type { ClientFormData } from '../../pages/NewClient';

interface Step5ConfigurationProps {
  formData: ClientFormData;
  onChange: (data: Partial<ClientFormData>) => void;
}

const salesReps = [
  { id: '1', name: 'María López', avatar: 'ML', available: true },
  { id: '2', name: 'Carlos Ruiz', avatar: 'CR', available: true },
  { id: '3', name: 'Ana Martínez', avatar: 'AM', available: false },
  { id: '4', name: 'Luis Hernández', avatar: 'LH', available: true },
];

const territories = ['Norte', 'Sur', 'Centro', 'Occidente', 'Oriente', 'Pacífico'];

const sources = [
  'Referido',
  'Sitio Web',
  'Llamada en frío',
  'Evento',
  'Marketing Digital',
  'Redes Sociales',
  'Otro'
];

const suggestedTags = [
  'VIP',
  'Alta prioridad',
  'Tecnología',
  'Construcción',
  'Gobierno',
  'Internacional'
];

export function Step5Configuration({ formData, onChange }: Step5ConfigurationProps) {
  const toggleChannel = (channel: string) => {
    const channels = formData.communicationChannels.includes(channel)
      ? formData.communicationChannels.filter(c => c !== channel)
      : [...formData.communicationChannels, channel];
    onChange({ communicationChannels: channels });
  };

  const toggleClassification = (classification: string) => {
    const classifications = formData.specialClassifications.includes(classification)
      ? formData.specialClassifications.filter(c => c !== classification)
      : [...formData.specialClassifications, classification];
    onChange({ specialClassifications: classifications });
  };

  const addTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      onChange({ tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tag: string) => {
    onChange({ tags: formData.tags.filter(t => t !== tag) });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Preferencias del Cliente */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <h3 className="text-sm text-[#1E293B] mb-4">Preferencias del Cliente</h3>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Preferred Language */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Idioma preferido</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onChange({ preferredLanguage: 'es' })}
                className={`flex-1 h-12 px-4 rounded-lg border-2 transition-all ${
                  formData.preferredLanguage === 'es'
                    ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]'
                    : 'border-[#E2E8F0] bg-white text-[#64748B]'
                }`}
              >
                Español
              </button>
              <button
                type="button"
                onClick={() => onChange({ preferredLanguage: 'en' })}
                className={`flex-1 h-12 px-4 rounded-lg border-2 transition-all ${
                  formData.preferredLanguage === 'en'
                    ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]'
                    : 'border-[#E2E8F0] bg-white text-[#64748B]'
                }`}
              >
                English
              </button>
            </div>
          </div>

          {/* Timezone */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Zona horaria</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <select
                value={formData.timezone}
                onChange={(e) => onChange({ timezone: e.target.value })}
                className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
              >
                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                <option value="America/Cancun">Cancún (GMT-5)</option>
                <option value="America/Monterrey">Monterrey (GMT-6)</option>
                <option value="America/Los_Angeles">Los Ángeles (GMT-8)</option>
              </select>
            </div>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Moneda preferida</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <select
                value={formData.currency}
                onChange={(e) => onChange({ currency: e.target.value })}
                className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
              >
                <option value="MXN">MXN - Peso Mexicano</option>
                <option value="USD">USD - Dólar</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
          </div>

          {/* Communication Channels */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Canal de comunicación preferido</label>
            <div className="space-y-2">
              {['Email', 'WhatsApp', 'Teléfono', 'SMS'].map((channel) => (
                <label key={channel} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.communicationChannels.includes(channel)}
                    onChange={() => toggleChannel(channel)}
                    className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
                  />
                  <span className="text-sm text-[#64748B]">{channel}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Asignación y Territorio */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <h3 className="text-sm text-[#1E293B] mb-4">Asignación y Territorio</h3>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Assigned Sales */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">
              Vendedor asignado <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <select
                value={formData.assignedSales}
                onChange={(e) => onChange({ assignedSales: e.target.value })}
                className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
              >
                <option value="">Selecciona un vendedor</option>
                {salesReps.map((rep) => (
                  <option key={rep.id} value={rep.id}>
                    {rep.name} {rep.available ? '✓' : '(No disponible)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Territory */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">
              Territorio/Región <span className="text-[#EF4444]">*</span>
            </label>
            <div className="relative">
              <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <select
                value={formData.territory}
                onChange={(e) => onChange({ territory: e.target.value })}
                className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
              >
                <option value="">Selecciona un territorio</option>
                {territories.map((territory) => (
                  <option key={territory} value={territory}>{territory}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Source */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">
              Origen del cliente <span className="text-[#EF4444]">*</span>
            </label>
            <select
              value={formData.source}
              onChange={(e) => onChange({ source: e.target.value })}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
            >
              <option value="">Selecciona origen</option>
              {sources.map((source) => (
                <option key={source} value={source}>{source}</option>
              ))}
            </select>
          </div>

          {/* Campaign */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Campaña</label>
            <input
              type="text"
              value={formData.campaign}
              onChange={(e) => onChange({ campaign: e.target.value })}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
              placeholder="Si aplica"
            />
          </div>
        </div>
      </div>

      {/* Etiquetas y Categorías */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <h3 className="text-sm text-[#1E293B] mb-4">Etiquetas y Categorías</h3>
        
        <div className="mb-4">
          <label className="block text-xs text-[#1E293B] mb-2">Etiquetas personalizadas</label>
          <div className="flex flex-wrap gap-2 mb-3">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[#EFF6FF] text-[#3B82F6] text-xs rounded-full flex items-center gap-2"
              >
                {tag}
                <button
                  onClick={() => removeTag(tag)}
                  className="text-[#3B82F6] hover:text-[#EF4444]"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedTags.filter(t => !formData.tags.includes(t)).map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="px-3 py-1 border border-[#E2E8F0] text-[#64748B] text-xs rounded-full hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors"
              >
                + {tag}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs text-[#1E293B] mb-2">Clasificación especial</label>
          <div className="space-y-2">
            {[
              'Cliente VIP',
              'Requiere atención especial',
              'Alto valor',
              'Potencial de crecimiento'
            ].map((classification) => (
              <label key={classification} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.specialClassifications.includes(classification)}
                  onChange={() => toggleClassification(classification)}
                  className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
                />
                <span className="text-sm text-[#64748B]">{classification}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Configuración Inicial */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <h3 className="text-sm text-[#1E293B] mb-4">Configuración Inicial</h3>
        
        <div className="space-y-6">
          {/* Initial Status */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">
              Estado inicial <span className="text-[#EF4444]">*</span>
            </label>
            <div className="flex gap-2">
              {[
                { value: 'active', label: 'Activo', color: 'border-[#10B981] bg-[#D1FAE5] text-[#065F46]' },
                { value: 'prospect', label: 'Prospecto', color: 'border-[#3B82F6] bg-[#EFF6FF] text-[#1E3A8A]' },
                { value: 'inactive', label: 'Inactivo', color: 'border-[#94A3B8] bg-[#F1F5F9] text-[#475569]' },
              ].map((status) => (
                <button
                  key={status.value}
                  type="button"
                  onClick={() => onChange({ initialStatus: status.value as any })}
                  className={`flex-1 h-12 px-4 rounded-lg border-2 transition-all text-sm ${
                    formData.initialStatus === status.value
                      ? status.color
                      : 'border-[#E2E8F0] bg-white text-[#64748B]'
                  }`}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          {/* Create Opportunity */}
          <div className="border border-[#E2E8F0] rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={formData.createOpportunity}
                onChange={(e) => onChange({ createOpportunity: e.target.checked })}
                className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
              />
              <span className="text-sm text-[#1E293B]">Crear oportunidad inicial de venta</span>
            </label>
            
            {formData.createOpportunity && (
              <div className="space-y-3 pl-6">
                <input
                  type="text"
                  value={formData.opportunityName}
                  onChange={(e) => onChange({ opportunityName: e.target.value })}
                  className="w-full h-10 px-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                  placeholder="Nombre de la oportunidad"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={formData.opportunityAmount}
                    onChange={(e) => onChange({ opportunityAmount: e.target.value })}
                    className="w-full h-10 px-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                    placeholder="Monto estimado"
                  />
                  <input
                    type="date"
                    value={formData.opportunityCloseDate}
                    onChange={(e) => onChange({ opportunityCloseDate: e.target.value })}
                    className="w-full h-10 px-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Schedule Onboarding */}
          <div className="border border-[#E2E8F0] rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer mb-3">
              <input
                type="checkbox"
                checked={formData.scheduleOnboarding}
                onChange={(e) => onChange({ scheduleOnboarding: e.target.checked })}
                className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
              />
              <span className="text-sm text-[#1E293B]">Agendar llamada de bienvenida</span>
            </label>
            
            {formData.scheduleOnboarding && (
              <div className="pl-6">
                <input
                  type="datetime-local"
                  value={formData.onboardingDate}
                  onChange={(e) => onChange({ onboardingDate: e.target.value })}
                  className="w-full h-10 px-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                />
              </div>
            )}
          </div>

          {/* Send Welcome Email */}
          <div className="border border-[#E2E8F0] rounded-lg p-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.sendWelcomeEmail}
                onChange={(e) => onChange({ sendWelcomeEmail: e.target.checked })}
                className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
              />
              <span className="text-sm text-[#1E293B]">Enviar email de bienvenida</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
