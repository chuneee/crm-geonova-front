import { Check, ExternalLink } from 'lucide-react';

const integrations = [
  {
    id: 'gmail',
    name: 'Gmail',
    description: 'Sincroniza emails y contactos con Gmail',
    icon: '📧',
    connected: true,
    color: '#EA4335',
  },
  {
    id: 'calendar',
    name: 'Google Calendar',
    description: 'Sincroniza reuniones y eventos',
    icon: '📅',
    connected: true,
    color: '#4285F4',
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp Business',
    description: 'Envía mensajes directamente desde el CRM',
    icon: '💬',
    connected: false,
    color: '#25D366',
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Conecta con miles de aplicaciones',
    icon: '⚡',
    connected: false,
    color: '#FF4A00',
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Recibe notificaciones en tu workspace',
    icon: '💼',
    connected: false,
    color: '#4A154B',
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Sincroniza contactos para campañas de email',
    icon: '🐒',
    connected: false,
    color: '#FFE01B',
  },
];

export function IntegrationSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#1E293B] mb-1">Integraciones</h2>
        <p className="text-sm text-[#64748B]">Conecta tu CRM con tus herramientas favoritas</p>
      </div>

      {/* Connected Integrations */}
      <div>
        <h3 className="text-sm text-[#1E293B] mb-3">Conectadas</h3>
        <div className="grid grid-cols-2 gap-4">
          {integrations.filter(i => i.connected).map((integration) => (
            <div
              key={integration.id}
              className="bg-white rounded-lg border-2 border-[#10B981] p-5 relative overflow-hidden"
            >
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-[#10B981] rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-4xl">{integration.icon}</div>
                <div className="flex-1">
                  <h4 className="text-sm text-[#1E293B] mb-1">{integration.name}</h4>
                  <p className="text-xs text-[#64748B] mb-3">{integration.description}</p>
                  
                  <div className="flex gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#64748B] border border-[#E2E8F0] rounded hover:bg-[#F8FAFC] transition-colors">
                      <ExternalLink className="w-3 h-3" />
                      <span>Configurar</span>
                    </button>
                    <button className="px-3 py-1.5 text-xs text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors">
                      Desconectar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Available Integrations */}
      <div>
        <h3 className="text-sm text-[#1E293B] mb-3">Disponibles</h3>
        <div className="grid grid-cols-2 gap-4">
          {integrations.filter(i => !i.connected).map((integration) => (
            <div
              key={integration.id}
              className="bg-white rounded-lg border border-[#E2E8F0] p-5 hover:border-[#3B82F6] hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <div className="text-4xl">{integration.icon}</div>
                <div className="flex-1">
                  <h4 className="text-sm text-[#1E293B] mb-1">{integration.name}</h4>
                  <p className="text-xs text-[#64748B] mb-3">{integration.description}</p>
                  
                  <button className="px-3 py-1.5 bg-[#3B82F6] text-white text-xs rounded hover:bg-[#2563EB] transition-colors">
                    Conectar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Access */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Acceso API</h3>
        
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs text-[#64748B]">API Key</label>
              <button className="text-xs text-[#3B82F6] hover:underline">Regenerar</button>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value="••••••••••••••••••••••••••••••••"
                readOnly
                className="flex-1 px-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] font-mono"
              />
              <button className="px-3 py-2 bg-[#F1F5F9] text-[#64748B] text-xs rounded-lg hover:bg-[#E2E8F0] transition-colors">
                Copiar
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-[#FEF3C7] border border-[#FDE047] rounded-lg">
            <p className="text-xs text-[#92400E]">
              ⚠️ Mantén tu API key segura. No la compartas públicamente ni la subas a repositorios.
            </p>
          </div>
          
          <a 
            href="#" 
            className="inline-flex items-center gap-1.5 text-xs text-[#3B82F6] hover:underline"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Ver documentación de API</span>
          </a>
        </div>
      </div>
    </div>
  );
}
