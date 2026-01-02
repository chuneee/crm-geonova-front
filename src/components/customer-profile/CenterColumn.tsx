import { Phone, Mail, Video, FileText, DollarSign, LifeBuoy, ArrowRight, Plus, Filter } from 'lucide-react';
import type { TabType } from '../../pages/CustomerProfile';

interface CenterColumnProps {
  activeTab: TabType;
  customerId: string;
}

const activityTypes = [
  { id: 'all', label: 'Todas', active: true },
  { id: 'calls', label: 'Llamadas', active: false },
  { id: 'emails', label: 'Emails', active: false },
  { id: 'meetings', label: 'Reuniones', active: false },
  { id: 'opportunities', label: 'Oportunidades', active: false },
  { id: 'tickets', label: 'Tickets', active: false },
  { id: 'notes', label: 'Notas', active: false },
];

export function CenterColumn({ activeTab, customerId }: CenterColumnProps) {
  if (activeTab !== 'resumen') {
    return (
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-12 text-center">
        <div className="text-[#64748B]">
          Contenido de la pestaña "{activeTab}" en construcción
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Activity Timeline */}
      <div className="bg-white rounded-xl border border-[#E2E8F0]">
        <div className="p-5 border-b border-[#E2E8F0]">
          <h3 className="text-sm text-[#1E293B] mb-4">Timeline de Actividad</h3>
          
          {/* Filter Chips */}
          <div className="flex items-center gap-2 flex-wrap">
            {activityTypes.map((type) => (
              <button
                key={type.id}
                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
                  type.active
                    ? 'bg-[#3B82F6] text-white'
                    : 'bg-[#F8FAFC] text-[#64748B] hover:bg-[#F1F5F9]'
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Action Bar - Sticky */}
        <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-5 py-3 flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Registrar llamada
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Enviar email
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Agendar reunión
          </button>
          <button className="flex items-center gap-1.5 px-3 py-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors text-sm">
            <Plus className="w-4 h-4" />
            Agregar nota
          </button>
        </div>

        {/* Timeline Items */}
        <div className="p-5 space-y-6 max-h-[600px] overflow-y-auto">
          {/* Today Separator */}
          <div className="text-xs text-[#64748B] uppercase tracking-wide">Hoy</div>

          {/* Activity Item - Call */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs">
                ML
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#3B82F6] rounded-full flex items-center justify-center">
                <Phone className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#1E293B] mb-1">
                <span>María López</span> registró llamada con Juan García
              </div>
              <div className="text-xs text-[#64748B] mb-2">Hace 2 horas</div>
              <div className="text-sm text-[#64748B] bg-[#F8FAFC] p-3 rounded-lg">
                Llamada de seguimiento sobre la propuesta de DJI Mavic 3. Cliente interesado, solicitó información adicional sobre capacitación.
              </div>
              <div className="flex items-center gap-3 mt-2">
                <button className="text-xs text-[#3B82F6] hover:underline">Responder</button>
                <button className="text-xs text-[#3B82F6] hover:underline">Reenviar</button>
                <button className="text-xs text-[#3B82F6] hover:underline">Agregar nota</button>
              </div>
            </div>
          </div>

          {/* Activity Item - Email */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs">
                CR
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#8B5CF6] rounded-full flex items-center justify-center">
                <Mail className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#1E293B] mb-1">
                <span>Carlos Ruiz</span> envió cotización a Juan García
              </div>
              <div className="text-xs text-[#64748B] mb-2">Hace 5 horas</div>
              <div className="text-sm text-[#64748B] bg-[#F8FAFC] p-3 rounded-lg">
                <div className="mb-2">Asunto: Cotización DJI Mavic 3 Pro + Capacitación</div>
                <div className="flex items-center gap-2 p-2 bg-white rounded border border-[#E2E8F0]">
                  <FileText className="w-4 h-4 text-[#EF4444]" />
                  <span className="text-xs">Cotizacion_ACME_001.pdf</span>
                  <span className="text-xs text-[#64748B]">245 KB</span>
                </div>
              </div>
            </div>
          </div>

          {/* Yesterday Separator */}
          <div className="text-xs text-[#64748B] uppercase tracking-wide">Ayer</div>

          {/* Activity Item - Meeting */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xs">
                LH
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#10B981] rounded-full flex items-center justify-center">
                <Video className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#1E293B] mb-1">
                <span>Luis Hernández</span> completó reunión con Juan García
              </div>
              <div className="text-xs text-[#64748B] mb-2">Hace 1 día</div>
              <div className="text-sm text-[#64748B] bg-[#F8FAFC] p-3 rounded-lg">
                Reunión virtual de presentación de producto. Duración: 45 minutos. Asistentes: Juan García (CEO), Ana Martínez (CTO).
              </div>
            </div>
          </div>

          {/* Activity Item - Opportunity */}
          <div className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs">
                CR
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center">
                <DollarSign className="w-3 h-3 text-white" />
              </div>
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#1E293B] mb-1">
                <span>Carlos Ruiz</span> movió oportunidad a "Propuesta"
              </div>
              <div className="text-xs text-[#64748B] mb-2">Hace 1 día</div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-[#64748B]">DJI Mavic 3 Pro Package</span>
                <ArrowRight className="w-4 h-4 text-[#64748B]" />
                <span className="text-[#10B981]">$45,600</span>
              </div>
            </div>
          </div>

          {/* Load More */}
          <button className="w-full py-2 text-sm text-[#3B82F6] hover:underline">
            Cargar más actividades
          </button>
        </div>
      </div>

      {/* Active Opportunities */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#1E293B]">Oportunidades Activas</h3>
          <button className="text-sm text-[#3B82F6] hover:underline">Ver todas (8)</button>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {/* Opportunity Card */}
          <div className="border border-[#E2E8F0] rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-[#1E293B] mb-2">DJI Mavic 3 Pro Package</div>
            <div className="text-lg text-[#10B981] mb-1">$45,600</div>
            <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
              <span>Prob: 75%</span>
              <span>Cierre: Mar 2025</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          {/* Opportunity Card */}
          <div className="border border-[#E2E8F0] rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-[#1E293B] mb-2">Software TopoDrone License</div>
            <div className="text-lg text-[#10B981] mb-1">$12,500</div>
            <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
              <span>Prob: 60%</span>
              <span>Cierre: Abr 2025</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#3B82F6] rounded-full" style={{ width: '60%' }} />
            </div>
          </div>

          {/* Opportunity Card */}
          <div className="border border-[#E2E8F0] rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="text-sm text-[#1E293B] mb-2">Service Plan Premium</div>
            <div className="text-lg text-[#10B981] mb-1">$8,900</div>
            <div className="flex items-center justify-between text-xs text-[#64748B] mb-2">
              <span>Prob: 85%</span>
              <span>Cierre: Feb 2025</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full" style={{ width: '85%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#1E293B]">Documentos Recientes</h3>
          <button className="text-sm text-[#3B82F6] hover:underline">Ver todos (23)</button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {/* Document Card */}
          <div className="border border-[#E2E8F0] rounded-lg p-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <div className="w-full h-24 bg-[#FEF2F2] rounded flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-[#EF4444]" />
            </div>
            <div className="text-xs text-[#1E293B] truncate mb-1">Cotizacion_001.pdf</div>
            <div className="text-xs text-[#64748B]">Hace 5 horas · 245 KB</div>
          </div>

          {/* Document Card */}
          <div className="border border-[#E2E8F0] rounded-lg p-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <div className="w-full h-24 bg-[#EFF6FF] rounded flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-[#3B82F6]" />
            </div>
            <div className="text-xs text-[#1E293B] truncate mb-1">Contrato_2024.docx</div>
            <div className="text-xs text-[#64748B]">Hace 2 días · 1.2 MB</div>
          </div>

          {/* Document Card */}
          <div className="border border-[#E2E8F0] rounded-lg p-3 hover:bg-[#F8FAFC] transition-colors cursor-pointer">
            <div className="w-full h-24 bg-[#F0FDF4] rounded flex items-center justify-center mb-2">
              <FileText className="w-8 h-8 text-[#10B981]" />
            </div>
            <div className="text-xs text-[#1E293B] truncate mb-1">Especificaciones.xlsx</div>
            <div className="text-xs text-[#64748B]">Hace 3 días · 856 KB</div>
          </div>
        </div>
      </div>
    </div>
  );
}
