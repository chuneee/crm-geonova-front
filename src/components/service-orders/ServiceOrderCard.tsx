import { MapPin, Phone, Clock, AlertTriangle, MessageSquare, MoreVertical, GripVertical, Star } from 'lucide-react';
import type { ServiceOrder } from '../../pages/ServiceOrders';

interface ServiceOrderCardProps {
  order: ServiceOrder;
  onDragStart: (e: React.DragEvent, order: ServiceOrder) => void;
  onClick: (order: ServiceOrder) => void;
}

const priorityColors = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
};

const serviceIcons = {
  installation: '🚁',
  maintenance: '🔧',
  repair: '🔨',
  training: '🎓',
};

export function ServiceOrderCard({ order, onDragStart, onClick }: ServiceOrderCardProps) {
  const priorityColor = priorityColors[order.priority];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, order)}
      onClick={() => onClick(order)}
      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer group relative overflow-hidden"
    >
      {/* Priority Stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-1"
        style={{ backgroundColor: priorityColor }}
      />

      <div className="pl-4 pr-3 py-3">
        {/* Drag Handle */}
        <div className="absolute left-2 top-3 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
          <GripVertical className="w-4 h-4 text-[#94A3B8]" />
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h4 className="text-sm text-[#1E293B] mb-0.5">{order.orderNumber}</h4>
            <p className="text-xs text-[#64748B]">
              {new Date(order.createdAt).toLocaleDateString('es-MX', { 
                month: 'short', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}
            </p>
          </div>
          
          <div className="flex items-center gap-1">
            {order.urgency && (
              <div className="p-1 bg-[#FEF2F2] rounded">
                <AlertTriangle className="w-3 h-3 text-[#EF4444]" />
              </div>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="p-1 opacity-0 group-hover:opacity-100 hover:bg-[#F8FAFC] rounded transition-all"
            >
              <MoreVertical className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
        </div>

        {/* Client Info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white flex-shrink-0">
            {order.client.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#1E293B] truncate">{order.client.name}</p>
            <div className="flex items-center gap-1.5">
              <p className="text-xs text-[#64748B] truncate">{order.client.contact}</p>
              {order.client.hasWhatsApp && (
                <span className="text-[10px] bg-[#10B981] text-white px-1.5 py-0.5 rounded">
                  WA
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Service Type */}
        <div
          className="flex items-center gap-2 p-2.5 rounded-lg mb-3"
          style={{ backgroundColor: `${priorityColor}10` }}
        >
          <span className="text-base">{serviceIcons[order.service.type]}</span>
          <p className="text-xs flex-1 line-clamp-2" style={{ color: priorityColor }}>
            {order.service.description}
          </p>
        </div>

        {/* Location */}
        <div className="flex items-start gap-2 mb-3">
          <MapPin className="w-4 h-4 text-[#64748B] mt-0.5 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-[#64748B] truncate">{order.location.address}</p>
            {order.location.distance && (
              <p className="text-xs text-[#94A3B8]">{order.location.distance} km</p>
            )}
          </div>
        </div>

        {/* Schedule Info */}
        {order.schedule && (
          <div
            className={`p-2.5 rounded-lg mb-3 ${
              order.schedule.isOverdue ? 'bg-[#FEF2F2]' : 'bg-[#F8FAFC]'
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <Clock className={`w-4 h-4 ${order.schedule.isOverdue ? 'text-[#EF4444]' : 'text-[#64748B]'}`} />
              <p className={`text-xs ${order.schedule.isOverdue ? 'text-[#EF4444]' : 'text-[#1E293B]'}`}>
                {new Date(order.schedule.date).toLocaleDateString('es-MX', {
                  weekday: 'short',
                  month: 'short',
                  day: 'numeric'
                })} · {order.schedule.time}
              </p>
            </div>
            <p className="text-xs text-[#64748B]">Duración: {order.schedule.duration}</p>
          </div>
        )}

        {/* Technician */}
        {order.technician && (
          <div className="flex items-center gap-2 mb-3">
            <div className="relative">
              <div className="w-9 h-9 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white text-xs">
                {order.technician.name.split(' ').map(n => n[0]).join('')}
              </div>
              {order.technician.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-[#10B981] border-2 border-white rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#1E293B] truncate">{order.technician.name}</p>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-2.5 h-2.5 ${
                      i < order.technician!.skillsMatch
                        ? 'fill-[#F59E0B] text-[#F59E0B]'
                        : 'text-[#E2E8F0]'
                    }`}
                  />
                ))}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `tel:${order.technician?.phone}`;
              }}
              className="p-1.5 hover:bg-[#F8FAFC] rounded transition-colors"
            >
              <Phone className="w-4 h-4 text-[#64748B]" />
            </button>
          </div>
        )}

        {/* Progress */}
        {order.progress && (
          <div className="mb-3">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-xs text-[#64748B]">
                {order.progress.completed}/{order.progress.total} pasos completados
              </p>
              {order.progress.timeElapsed && (
                <p className="text-xs text-[#8B5CF6]">{order.progress.timeElapsed}</p>
              )}
            </div>
            <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#8B5CF6] rounded-full transition-all"
                style={{ width: `${(order.progress.completed / order.progress.total) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Satisfaction Rating (for completed) */}
        {order.satisfaction && (
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${
                    i < Math.round(order.satisfaction!)
                      ? 'fill-[#F59E0B] text-[#F59E0B]'
                      : 'text-[#E2E8F0]'
                  }`}
                />
              ))}
            </div>
            <span className="text-xs text-[#64748B]">{order.satisfaction}/5</span>
          </div>
        )}

        {/* Reschedule Info */}
        {order.rescheduleReason && (
          <div className="p-2 bg-[#FFF7ED] border border-[#FDBA74] rounded-lg mb-3">
            <p className="text-xs text-[#F97316] mb-0.5">Reprogramada</p>
            <p className="text-xs text-[#64748B]">{order.rescheduleReason}</p>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
          <div className="flex items-center gap-2">
            {order.status === 'pending' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-xs text-[#3B82F6] hover:underline"
              >
                Asignar técnico
              </button>
            )}
            {order.status === 'in-progress' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-xs text-[#8B5CF6] hover:underline"
              >
                Ver en mapa
              </button>
            )}
            {order.status === 'completed' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="text-xs text-[#10B981] hover:underline"
              >
                Ver reporte
              </button>
            )}
          </div>
          
          {order.notesCount && order.notesCount > 0 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-[#F8FAFC] rounded text-xs text-[#64748B]">
              <MessageSquare className="w-3 h-3" />
              <span>{order.notesCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
