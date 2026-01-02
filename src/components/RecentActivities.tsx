import { Phone, Mail, Calendar, CheckCircle, Clock } from 'lucide-react';

export function RecentActivities() {
  const activities = [
    {
      icon: Phone,
      iconBg: '#EFF6FF',
      iconColor: '#3B82F6',
      title: 'Llamada con cliente',
      description: 'Jorge Martínez - Acme Corp',
      time: 'Hace 15 min',
      status: 'completed'
    },
    {
      icon: Mail,
      iconBg: '#F0FDF4',
      iconColor: '#10B981',
      title: 'Email enviado',
      description: 'Propuesta para nuevo proyecto',
      time: 'Hace 1 hora',
      status: 'completed'
    },
    {
      icon: Calendar,
      iconBg: '#FEF3C7',
      iconColor: '#F59E0B',
      title: 'Reunión programada',
      description: 'Demo con Tech Solutions',
      time: 'Hace 2 horas',
      status: 'scheduled'
    },
    {
      icon: CheckCircle,
      iconBg: '#F0FDF4',
      iconColor: '#10B981',
      title: 'Contrato firmado',
      description: 'Global Industries - $45K',
      time: 'Hace 3 horas',
      status: 'completed'
    },
    {
      icon: Phone,
      iconBg: '#EFF6FF',
      iconColor: '#3B82F6',
      title: 'Llamada pendiente',
      description: 'Seguimiento con Ana García',
      time: 'Hace 4 horas',
      status: 'pending'
    },
    {
      icon: Mail,
      iconBg: '#FEF2F2',
      iconColor: '#EF4444',
      title: 'Email sin respuesta',
      description: 'Propuesta vencida - Urgente',
      time: 'Hace 5 horas',
      status: 'overdue'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Actividades Recientes</h2>
        <button className="text-sm text-[#3B82F6] hover:text-[#2563EB]">
          Ver todas
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity, index) => {
          const Icon = activity.icon;
          return (
            <div key={index} className="flex items-start gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: activity.iconBg }}
              >
                <Icon className="w-5 h-5" style={{ color: activity.iconColor }} />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-900 mb-0.5">{activity.title}</div>
                <div className="text-xs text-gray-500 mb-1">{activity.description}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="w-3 h-3" />
                  <span>{activity.time}</span>
                </div>
              </div>

              {activity.status === 'overdue' && (
                <div className="w-2 h-2 bg-[#EF4444] rounded-full flex-shrink-0 mt-2" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
