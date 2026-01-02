import { Phone, Mail, Calendar, FileText, ArrowRight, Plus, Filter } from 'lucide-react';

interface TimelineSectionProps {
  opportunityId: string;
}

const activities = [
  {
    id: '1',
    type: 'call',
    user: { name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    action: 'Llamada con cliente',
    description: 'Discutimos los requerimientos técnicos y el timeline de implementación. Cliente mostró interés en módulos adicionales.',
    timestamp: 'Hace 2 horas',
    date: '15 Dic, 14:30'
  },
  {
    id: '2',
    type: 'email',
    user: { name: 'María García', avatar: 'MG', color: 'from-purple-500 to-purple-600' },
    action: 'Email enviado',
    description: 'Propuesta económica detallada con breakdown de costos por módulo.',
    timestamp: 'Hace 5 horas',
    date: '15 Dic, 11:15'
  },
  {
    id: '3',
    type: 'meeting',
    user: { name: 'Juan Pérez', avatar: 'JP', color: 'from-green-500 to-green-600' },
    action: 'Reunión de demostración',
    description: 'Demo exitosa del sistema. Asistieron CFO y CTO. Solicitaron información sobre integración con SAP.',
    timestamp: 'Hace 1 día',
    date: '14 Dic, 10:00'
  },
  {
    id: '4',
    type: 'note',
    user: { name: 'Ana Martínez', avatar: 'AM', color: 'from-pink-500 to-pink-600' },
    action: 'Nota agregada',
    description: 'Cliente tiene presupuesto aprobado para Q1 2025. Deadline de decisión: 20 de diciembre.',
    timestamp: 'Hace 2 días',
    date: '13 Dic, 16:45'
  },
  {
    id: '5',
    type: 'stage',
    user: { name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    action: 'Cambio de etapa',
    description: 'Movida de "Calificación" a "Propuesta"',
    timestamp: 'Hace 3 días',
    date: '12 Dic, 09:20'
  }
];

const activityIcons: Record<string, any> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: FileText,
  stage: ArrowRight
};

const activityColors: Record<string, string> = {
  call: 'bg-[#3B82F6]',
  email: 'bg-[#8B5CF6]',
  meeting: 'bg-[#10B981]',
  note: 'bg-[#F59E0B]',
  stage: 'bg-[#64748B]'
};

export function TimelineSection({ opportunityId }: TimelineSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#1E293B]">Timeline de Actividades</h3>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1.5 text-sm text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filtrar
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <button className="px-4 py-2.5 bg-[#EFF6FF] text-[#3B82F6] rounded-lg hover:bg-[#DBEAFE] transition-colors flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          <span className="text-sm">Registrar llamada</span>
        </button>
        <button className="px-4 py-2.5 bg-[#F5F3FF] text-[#8B5CF6] rounded-lg hover:bg-[#EDE9FE] transition-colors flex items-center justify-center gap-2">
          <Mail className="w-4 h-4" />
          <span className="text-sm">Enviar email</span>
        </button>
        <button className="px-4 py-2.5 bg-[#ECFDF5] text-[#10B981] rounded-lg hover:bg-[#D1FAE5] transition-colors flex items-center justify-center gap-2">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Agendar reunión</span>
        </button>
      </div>

      {/* Timeline */}
      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activityIcons[activity.type];
          const isLast = index === activities.length - 1;
          
          return (
            <div key={activity.id} className="relative">
              {/* Timeline line */}
              {!isLast && (
                <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-[#E2E8F0]" />
              )}
              
              <div className="flex gap-4">
                {/* Icon */}
                <div className={`relative z-10 w-10 h-10 rounded-full ${activityColors[activity.type]} flex items-center justify-center flex-shrink-0`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>

                {/* Content */}
                <div className="flex-1 pb-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.user.color} flex items-center justify-center text-white text-xs`}>
                        {activity.user.avatar}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-[#1E293B]">{activity.user.name}</span>
                          <span className="text-sm text-[#64748B]">•</span>
                          <span className="text-sm text-[#64748B]">{activity.action}</span>
                        </div>
                        <div className="text-xs text-[#64748B] mt-0.5">{activity.timestamp}</div>
                      </div>
                    </div>
                    <div className="text-xs text-[#94A3B8]">{activity.date}</div>
                  </div>
                  <p className="text-sm text-[#64748B] ml-11 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Activity */}
      <button className="w-full mt-4 px-4 py-3 border-2 border-dashed border-[#E2E8F0] rounded-lg text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6] hover:bg-[#F8FAFC] transition-colors flex items-center justify-center gap-2">
        <Plus className="w-5 h-5" />
        <span>Agregar actividad</span>
      </button>
    </div>
  );
}
