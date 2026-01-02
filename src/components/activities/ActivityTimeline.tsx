import { Phone, Users, Mail, FileText, CheckSquare, Clock, MapPin, User, MoreVertical, CheckCircle, Bell } from 'lucide-react';
import type { Activity } from '../../pages/Activities';

interface ActivityTimelineProps {
  activities: Activity[];
  onActivityClick: (activity: Activity) => void;
  onCompleteActivity: (activityId: string) => void;
}

const activityTypeConfig = {
  call: { icon: Phone, color: '#3B82F6', bg: '#DBEAFE', label: 'Llamada' },
  meeting: { icon: Users, color: '#8B5CF6', bg: '#EDE9FE', label: 'Reunión' },
  task: { icon: CheckSquare, color: '#F59E0B', bg: '#FEF3C7', label: 'Tarea' },
  email: { icon: Mail, color: '#10B981', bg: '#D1FAE5', label: 'Email' },
  'follow-up': { icon: FileText, color: '#EF4444', bg: '#FEE2E2', label: 'Seguimiento' },
};

const priorityConfig = {
  high: { color: '#EF4444', label: 'Alta' },
  medium: { color: '#F59E0B', label: 'Media' },
  low: { color: '#10B981', label: 'Baja' },
};

export function ActivityTimeline({ activities, onActivityClick, onCompleteActivity }: ActivityTimelineProps) {
  const groupedActivities = activities.reduce((groups, activity) => {
    const date = activity.dueDate;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(activity);
    return groups;
  }, {} as Record<string, Activity[]>);

  const sortedDates = Object.keys(groupedActivities).sort();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Hoy';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Mañana';
    } else {
      return date.toLocaleDateString('es-MX', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
  };

  if (activities.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-12 text-center">
        <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckSquare className="w-8 h-8 text-[#CBD5E1]" />
        </div>
        <h3 className="text-lg text-[#1E293B] mb-2">No hay actividades</h3>
        <p className="text-sm text-[#64748B] mb-4">
          Comienza creando tu primera actividad
        </p>
        <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
          Nueva Actividad
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedDates.map((date) => (
        <div key={date}>
          {/* Date Header */}
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-sm text-[#1E293B] capitalize">{formatDate(date)}</h3>
            <div className="flex-1 h-px bg-[#E2E8F0]" />
            <span className="text-xs text-[#64748B]">
              {groupedActivities[date].length} actividad{groupedActivities[date].length !== 1 ? 'es' : ''}
            </span>
          </div>

          {/* Activities */}
          <div className="space-y-3">
            {groupedActivities[date].map((activity) => {
              const typeConfig = activityTypeConfig[activity.type];
              const TypeIcon = typeConfig.icon;

              return (
                <div
                  key={activity.id}
                  onClick={() => onActivityClick(activity)}
                  className={`bg-white rounded-lg border-2 p-4 hover:shadow-md transition-all cursor-pointer ${
                    activity.status === 'completed' ? 'border-[#E2E8F0] opacity-75' :
                    activity.status === 'overdue' ? 'border-[#FEE2E2]' :
                    'border-[#E2E8F0] hover:border-[#3B82F6]'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: typeConfig.bg }}
                    >
                      <TypeIcon className="w-6 h-6" style={{ color: typeConfig.color }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className={`text-sm ${
                              activity.status === 'completed' ? 'line-through text-[#64748B]' : 'text-[#1E293B]'
                            }`}>
                              {activity.title}
                            </h4>
                            {activity.reminder && (
                              <Bell className="w-3.5 h-3.5 text-[#F59E0B]" />
                            )}
                          </div>
                          {activity.description && (
                            <p className="text-xs text-[#64748B] line-clamp-1">
                              {activity.description}
                            </p>
                          )}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Meta Info */}
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        {/* Time */}
                        {activity.dueTime && (
                          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{activity.dueTime}</span>
                          </div>
                        )}

                        {/* Priority */}
                        <span
                          className="px-2 py-0.5 rounded-full text-xs"
                          style={{
                            backgroundColor: `${priorityConfig[activity.priority].color}15`,
                            color: priorityConfig[activity.priority].color,
                          }}
                        >
                          {priorityConfig[activity.priority].label}
                        </span>

                        {/* Type */}
                        <span className="px-2 py-0.5 bg-[#F8FAFC] text-[#64748B] rounded-full text-xs">
                          {typeConfig.label}
                        </span>

                        {/* Status */}
                        {activity.status === 'completed' && (
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-[#D1FAE5] text-[#10B981] rounded-full text-xs">
                            <CheckCircle className="w-3 h-3" />
                            <span>Completada</span>
                          </span>
                        )}

                        {activity.status === 'overdue' && (
                          <span className="px-2 py-0.5 bg-[#FEE2E2] text-[#EF4444] rounded-full text-xs">
                            Vencida
                          </span>
                        )}

                        {/* Location */}
                        {activity.location && (
                          <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                            <MapPin className="w-3.5 h-3.5" />
                            <span className="truncate max-w-[200px]">{activity.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Related To */}
                      {activity.relatedTo && (
                        <div className="flex items-center gap-2 mb-3 p-2 bg-[#F8FAFC] rounded-lg">
                          <div className="w-6 h-6 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded flex items-center justify-center text-white text-xs">
                            {activity.relatedTo.name.charAt(0)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-[#64748B]">
                              {activity.relatedTo.type === 'lead' ? 'Lead' :
                               activity.relatedTo.type === 'opportunity' ? 'Oportunidad' : 'Cliente'}
                            </p>
                            <p className="text-xs text-[#1E293B] truncate">{activity.relatedTo.name}</p>
                          </div>
                        </div>
                      )}

                      {/* Assigned To */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#64748B]" />
                          <span className="text-xs text-[#64748B]">{activity.assignedTo.name}</span>
                        </div>

                        {/* Actions */}
                        {activity.status === 'pending' && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onCompleteActivity(activity.id);
                            }}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#10B981] text-white rounded-lg text-xs hover:bg-[#059669] transition-colors"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>Marcar completada</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
