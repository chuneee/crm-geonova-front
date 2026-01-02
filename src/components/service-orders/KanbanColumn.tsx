import { MoreVertical } from 'lucide-react';
import { ServiceOrderCard } from './ServiceOrderCard';
import type { ServiceOrder } from '../../pages/ServiceOrders';

interface KanbanColumnProps {
  title: string;
  color: string;
  icon: string;
  count: number;
  orders: ServiceOrder[];
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent) => void;
  onDragStart: (e: React.DragEvent, order: ServiceOrder) => void;
  onCardClick: (order: ServiceOrder) => void;
}

export function KanbanColumn({
  title,
  color,
  icon,
  count,
  orders,
  onDragOver,
  onDrop,
  onDragStart,
  onCardClick,
}: KanbanColumnProps) {
  const avgTime = '2.3h'; // Mock average time in stage

  return (
    <div
      className="flex-shrink-0 w-[340px] bg-[#FAFAFA] rounded-lg"
      style={{ scrollSnapAlign: 'start' }}
    >
      {/* Column Header */}
      <div
        className="p-4 bg-white rounded-t-lg border-t-4"
        style={{ borderColor: color }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xl">{icon}</span>
            <h3 className="text-sm" style={{ color }}>{title}</h3>
          </div>
          
          <div className="flex items-center gap-2">
            <span
              className="flex items-center justify-center w-6 h-6 rounded-full text-white text-xs"
              style={{ backgroundColor: color }}
            >
              {count}
            </span>
            <button className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p className="text-xs text-[#64748B]">Tiempo promedio: {avgTime}</p>
      </div>

      {/* Column Content */}
      <div
        className="p-4 space-y-4 max-h-[calc(100vh-420px)] overflow-y-auto"
        onDragOver={onDragOver}
        onDrop={onDrop}
      >
        {orders.length > 0 ? (
          orders.map((order) => (
            <ServiceOrderCard
              key={order.id}
              order={order}
              onDragStart={onDragStart}
              onClick={onCardClick}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#CBD5E1] rounded-lg">
            <span className="text-4xl mb-2 opacity-30">{icon}</span>
            <p className="text-sm text-[#9CA3AF] mb-2">No hay órdenes en este estado</p>
            {title === 'Pendientes' && (
              <button className="text-xs text-[#3B82F6] hover:underline">
                + Crear nueva orden
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
