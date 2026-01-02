import { Bell, Mail, MessageSquare, Calendar } from 'lucide-react';

interface NotificationSettingsProps {
  onChange: () => void;
}

export function NotificationSettings({ onChange }: NotificationSettingsProps) {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#1E293B] mb-1">Preferencias de Notificaciones</h2>
        <p className="text-sm text-[#64748B]">Configura cómo y cuándo quieres recibir notificaciones</p>
      </div>

      {/* Email Notifications */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
            <Mail className="w-5 h-5 text-[#3B82F6]" />
          </div>
          <div>
            <h3 className="text-sm text-[#1E293B]">Notificaciones por Email</h3>
            <p className="text-xs text-[#64748B]">Recibe actualizaciones por correo electrónico</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <NotificationToggle
            label="Nuevos leads asignados"
            description="Cuando se te asigna un nuevo lead"
            defaultChecked={true}
            onChange={onChange}
          />
          <NotificationToggle
            label="Cambios en oportunidades"
            description="Cuando una oportunidad cambia de etapa"
            defaultChecked={true}
            onChange={onChange}
          />
          <NotificationToggle
            label="Cotizaciones aprobadas"
            description="Cuando un cliente aprueba una cotización"
            defaultChecked={true}
            onChange={onChange}
          />
          <NotificationToggle
            label="Tickets de soporte"
            description="Actualizaciones sobre tickets asignados"
            defaultChecked={false}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Push Notifications */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
            <Bell className="w-5 h-5 text-[#F59E0B]" />
          </div>
          <div>
            <h3 className="text-sm text-[#1E293B]">Notificaciones Push</h3>
            <p className="text-xs text-[#64748B]">Alertas en tiempo real en el navegador</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <NotificationToggle
            label="Mensajes de equipo"
            description="Cuando alguien te menciona o responde"
            defaultChecked={true}
            onChange={onChange}
          />
          <NotificationToggle
            label="Tareas vencidas"
            description="Recordatorios de tareas pendientes"
            defaultChecked={true}
            onChange={onChange}
          />
          <NotificationToggle
            label="Actividades programadas"
            description="15 minutos antes de reuniones o llamadas"
            defaultChecked={true}
            onChange={onChange}
          />
        </div>
      </div>

      {/* Activity Notifications */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#D1FAE5] rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-[#10B981]" />
          </div>
          <div>
            <h3 className="text-sm text-[#1E293B]">Recordatorios de Actividades</h3>
            <p className="text-xs text-[#64748B]">Configuración de recordatorios automáticos</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Recordar reuniones</label>
            <select
              defaultValue="15"
              onChange={onChange}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            >
              <option value="0">Sin recordatorio</option>
              <option value="5">5 minutos antes</option>
              <option value="15">15 minutos antes</option>
              <option value="30">30 minutos antes</option>
              <option value="60">1 hora antes</option>
            </select>
          </div>
          
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Recordar tareas</label>
            <select
              defaultValue="1440"
              onChange={onChange}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            >
              <option value="0">Sin recordatorio</option>
              <option value="60">1 hora antes</option>
              <option value="1440">1 día antes</option>
              <option value="2880">2 días antes</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Horario de No Molestar</h3>
        
        <div className="space-y-4">
          <NotificationToggle
            label="Activar modo silencioso"
            description="Pausar notificaciones durante horas específicas"
            defaultChecked={false}
            onChange={onChange}
          />
          
          <div className="grid grid-cols-2 gap-4 pl-6">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Desde</label>
              <input
                type="time"
                defaultValue="22:00"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Hasta</label>
              <input
                type="time"
                defaultValue="08:00"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({ 
  label, 
  description, 
  defaultChecked,
  onChange 
}: { 
  label: string; 
  description: string;
  defaultChecked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-start justify-between py-3 border-b border-[#F1F5F9] last:border-0">
      <div className="flex-1">
        <p className="text-sm text-[#1E293B]">{label}</p>
        <p className="text-xs text-[#64748B] mt-0.5">{description}</p>
      </div>
      <label className="relative inline-flex items-center cursor-pointer">
        <input 
          type="checkbox" 
          defaultChecked={defaultChecked}
          onChange={onChange}
          className="sr-only peer" 
        />
        <div className="w-11 h-6 bg-[#E2E8F0] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#3B82F6] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3B82F6]"></div>
      </label>
    </div>
  );
}
