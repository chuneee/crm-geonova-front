import { X, Phone, Users, Mail, FileText, CheckSquare, Calendar, Clock, MapPin, User, Edit2, Trash2, CheckCircle, Bell, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import type { Activity } from '../../pages/Activities';

interface ActivityDetailPanelProps {
  activity: Activity;
  onClose: () => void;
  onComplete: (activityId: string) => void;
  onUpdate: (activity: Activity) => void;
}

const activityTypeConfig = {
  call: { icon: Phone, color: '#3B82F6', label: 'Llamada' },
  meeting: { icon: Users, color: '#8B5CF6', label: 'Reunión' },
  task: { icon: CheckSquare, color: '#F59E0B', label: 'Tarea' },
  email: { icon: Mail, color: '#10B981', label: 'Email' },
  'follow-up': { icon: FileText, color: '#EF4444', label: 'Seguimiento' },
};

export function ActivityDetailPanel({ activity, onClose, onComplete, onUpdate }: ActivityDetailPanelProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(activity.notes || '');

  const typeConfig = activityTypeConfig[activity.type];
  const TypeIcon = typeConfig.icon;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleSaveNotes = () => {
    onUpdate({ ...activity, notes });
  };

  return (
    <div className="fixed right-0 top-[72px] bottom-0 w-[480px] bg-white border-l border-[#E2E8F0] shadow-2xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 z-10">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-start gap-3 flex-1">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${typeConfig.color}15` }}
            >
              <TypeIcon className="w-6 h-6" style={{ color: typeConfig.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg text-[#1E293B] mb-1 line-clamp-2">{activity.title}</h2>
              <span className="text-xs text-[#64748B]">{typeConfig.label}</span>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status & Priority */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs ${
            activity.status === 'completed' ? 'bg-[#D1FAE5] text-[#10B981]' :
            activity.status === 'overdue' ? 'bg-[#FEE2E2] text-[#EF4444]' :
            'bg-[#DBEAFE] text-[#3B82F6]'
          }`}>
            {activity.status === 'completed' ? 'Completada' :
             activity.status === 'overdue' ? 'Vencida' : 'Pendiente'}
          </span>
          
          <span className={`px-3 py-1 rounded-full text-xs ${
            activity.priority === 'high' ? 'bg-[#FEE2E2] text-[#EF4444]' :
            activity.priority === 'medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
            'bg-[#D1FAE5] text-[#10B981]'
          }`}>
            Prioridad {activity.priority === 'high' ? 'Alta' : activity.priority === 'medium' ? 'Media' : 'Baja'}
          </span>

          {activity.reminder && (
            <span className="flex items-center gap-1 px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] rounded-full text-xs">
              <Bell className="w-3 h-3" />
              <span>Recordatorio</span>
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Description */}
        {activity.description && (
          <div>
            <h3 className="text-sm text-[#1E293B] mb-2">Descripción</h3>
            <p className="text-sm text-[#64748B] leading-relaxed">{activity.description}</p>
          </div>
        )}

        {/* Date & Time */}
        <div className="p-4 bg-[#F8FAFC] rounded-lg">
          <div className="flex items-start gap-3 mb-3">
            <Calendar className="w-5 h-5 text-[#64748B] mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-[#64748B] mb-0.5">Fecha programada</p>
              <p className="text-sm text-[#1E293B]">{formatDate(activity.dueDate)}</p>
            </div>
          </div>

          {activity.dueTime && (
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#64748B] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#64748B] mb-0.5">Hora</p>
                <p className="text-sm text-[#1E293B]">{activity.dueTime}</p>
              </div>
            </div>
          )}
        </div>

        {/* Location */}
        {activity.location && (
          <div>
            <h3 className="text-sm text-[#1E293B] mb-2">Ubicación</h3>
            <div className="flex items-start gap-2 p-3 bg-[#F8FAFC] rounded-lg">
              <MapPin className="w-5 h-5 text-[#64748B] mt-0.5 flex-shrink-0" />
              <p className="text-sm text-[#64748B]">{activity.location}</p>
            </div>
          </div>
        )}

        {/* Attendees */}
        {activity.attendees && activity.attendees.length > 0 && (
          <div>
            <h3 className="text-sm text-[#1E293B] mb-2">Asistentes</h3>
            <div className="space-y-2">
              {activity.attendees.map((attendee, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-[#F8FAFC] rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-xs">
                    {attendee.charAt(0)}
                  </div>
                  <span className="text-sm text-[#1E293B]">{attendee}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related To */}
        {activity.relatedTo && (
          <div>
            <h3 className="text-sm text-[#1E293B] mb-2">Relacionado con</h3>
            <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white">
                {activity.relatedTo.name.charAt(0)}
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#64748B]">
                  {activity.relatedTo.type === 'lead' ? 'Lead' :
                   activity.relatedTo.type === 'opportunity' ? 'Oportunidad' : 'Cliente'}
                </p>
                <p className="text-sm text-[#1E293B]">{activity.relatedTo.name}</p>
              </div>
              <button className="p-2 text-[#64748B] hover:bg-white rounded-lg transition-colors">
                →
              </button>
            </div>
          </div>
        )}

        {/* Assigned To */}
        <div>
          <h3 className="text-sm text-[#1E293B] mb-2">Asignado a</h3>
          <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white">
              {activity.assignedTo.name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className="text-sm text-[#1E293B]">{activity.assignedTo.name}</p>
              <p className="text-xs text-[#64748B]">Responsable</p>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-[#1E293B]">Notas</h3>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-xs text-[#3B82F6] hover:underline"
              >
                Editar
              </button>
            )}
          </div>
          
          {isEditing ? (
            <div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                placeholder="Agregar notas sobre esta actividad..."
                className="w-full px-4 py-2.5 bg-white border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent resize-none mb-2"
              />
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    handleSaveNotes();
                    setIsEditing(false);
                  }}
                  className="px-3 py-1.5 bg-[#3B82F6] text-white text-xs rounded-lg hover:bg-[#2563EB] transition-colors"
                >
                  Guardar
                </button>
                <button
                  onClick={() => {
                    setNotes(activity.notes || '');
                    setIsEditing(false);
                  }}
                  className="px-3 py-1.5 text-xs text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="p-3 bg-[#F8FAFC] rounded-lg">
              {notes ? (
                <p className="text-sm text-[#64748B] whitespace-pre-wrap">{notes}</p>
              ) : (
                <p className="text-sm text-[#94A3B8] italic">Sin notas</p>
              )}
            </div>
          )}
        </div>

        {/* Timeline */}
        <div>
          <h3 className="text-sm text-[#1E293B] mb-3">Historial</h3>
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />
            
            <div className="space-y-4">
              <div className="relative pl-8">
                <div className="absolute left-0 w-4 h-4 bg-[#3B82F6] rounded-full border-2 border-white" />
                <div className="text-xs text-[#64748B] mb-0.5">
                  {new Date(activity.createdAt).toLocaleDateString('es-MX', { 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
                <div className="text-sm text-[#1E293B]">Actividad creada</div>
              </div>

              {activity.completedAt && (
                <div className="relative pl-8">
                  <div className="absolute left-0 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white" />
                  <div className="text-xs text-[#64748B] mb-0.5">
                    {new Date(activity.completedAt).toLocaleDateString('es-MX', { 
                      month: 'short', 
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </div>
                  <div className="text-sm text-[#1E293B]">Actividad completada</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] p-6">
        {activity.status === 'pending' || activity.status === 'overdue' ? (
          <div className="space-y-2">
            <button
              onClick={() => onComplete(activity.id)}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Marcar como Completada</span>
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                <Edit2 className="w-4 h-4" />
                <span className="text-sm">Editar</span>
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white text-[#EF4444] border border-[#E2E8F0] rounded-lg hover:bg-[#FEF2F2] transition-colors">
                <Trash2 className="w-4 h-4" />
                <span className="text-sm">Eliminar</span>
              </button>
            </div>
          </div>
        ) : (
          <button className="w-full px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
            Ver Registro Completo
          </button>
        )}
      </div>
    </div>
  );
}
