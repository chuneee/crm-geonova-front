import { X, User, MapPin, Calendar, FileText, MessageSquare, Clock, CheckSquare, Image as ImageIcon, Activity } from 'lucide-react';
import { useState } from 'react';
import type { ServiceOrder } from '../../pages/ServiceOrders';

interface OrderDetailPanelProps {
  order: ServiceOrder;
  onClose: () => void;
}

type TabType = 'details' | 'checklist' | 'evidence' | 'history' | 'communication';

export function OrderDetailPanel({ order, onClose }: OrderDetailPanelProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');

  const tabs = [
    { id: 'details' as TabType, label: 'Detalles', icon: FileText },
    { id: 'checklist' as TabType, label: 'Checklist', icon: CheckSquare },
    { id: 'evidence' as TabType, label: 'Evidencias', icon: ImageIcon },
    { id: 'history' as TabType, label: 'Historial', icon: Activity },
    { id: 'communication' as TabType, label: 'Comunicación', icon: MessageSquare },
  ];

  return (
    <div className="fixed right-0 top-[72px] bottom-0 w-[480px] bg-white border-l border-[#E2E8F0] shadow-2xl z-40 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-[#E2E8F0] px-6 py-4 z-10">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h2 className="text-lg text-[#1E293B] mb-1">{order.orderNumber}</h2>
            <p className="text-sm text-[#64748B]">{order.client.name}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs ${
            order.status === 'pending' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
            order.status === 'scheduled' ? 'bg-[#DBEAFE] text-[#3B82F6]' :
            order.status === 'in-progress' ? 'bg-[#EDE9FE] text-[#8B5CF6]' :
            order.status === 'completed' ? 'bg-[#D1FAE5] text-[#10B981]' :
            order.status === 'cancelled' ? 'bg-[#F1F5F9] text-[#64748B]' :
            'bg-[#FED7AA] text-[#F97316]'
          }`}>
            {order.status === 'pending' ? 'Pendiente' :
             order.status === 'scheduled' ? 'Programada' :
             order.status === 'in-progress' ? 'En Proceso' :
             order.status === 'completed' ? 'Completada' :
             order.status === 'cancelled' ? 'Cancelada' :
             'Reprogramada'}
          </span>
          
          <span className={`px-3 py-1 rounded-full text-xs ${
            order.priority === 'high' ? 'bg-[#FEE2E2] text-[#EF4444]' :
            order.priority === 'medium' ? 'bg-[#FEF3C7] text-[#F59E0B]' :
            'bg-[#D1FAE5] text-[#10B981]'
          }`}>
            Prioridad {order.priority === 'high' ? 'Alta' : order.priority === 'medium' ? 'Media' : 'Baja'}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E2E8F0] px-6 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#3B82F6] text-[#3B82F6]'
                : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'details' && (
          <div className="space-y-6">
            {/* Service Info */}
            <div>
              <h3 className="text-sm text-[#1E293B] mb-3">Información del Servicio</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-[#64748B] mb-1">Tipo de Servicio</p>
                  <p className="text-sm text-[#1E293B]">
                    {order.service.icon} {order.service.description}
                  </p>
                </div>
                
                {order.schedule && (
                  <>
                    <div>
                      <p className="text-xs text-[#64748B] mb-1">Fecha y Hora</p>
                      <div className="flex items-center gap-2 text-sm text-[#1E293B]">
                        <Calendar className="w-4 h-4 text-[#64748B]" />
                        <span>
                          {new Date(order.schedule.date).toLocaleDateString('es-MX', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#1E293B] mt-1">
                        <Clock className="w-4 h-4 text-[#64748B]" />
                        <span>{order.schedule.time} · {order.schedule.duration}</span>
                      </div>
                    </div>
                  </>
                )}

                <div>
                  <p className="text-xs text-[#64748B] mb-1">Ubicación</p>
                  <div className="flex items-start gap-2 text-sm text-[#1E293B]">
                    <MapPin className="w-4 h-4 text-[#64748B] mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{order.location.address}</p>
                      {order.location.distance && (
                        <p className="text-xs text-[#64748B] mt-1">
                          {order.location.distance} km de la base
                        </p>
                      )}
                    </div>
                  </div>
                  <button className="mt-2 text-xs text-[#3B82F6] hover:underline">
                    Ver en mapa
                  </button>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <div className="pt-6 border-t border-[#E2E8F0]">
              <h3 className="text-sm text-[#1E293B] mb-3">Información del Cliente</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white">
                    {order.client.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm text-[#1E293B]">{order.client.name}</p>
                    <p className="text-xs text-[#64748B]">{order.client.contact}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <button className="flex-1 px-4 py-2 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors">
                    📞 Llamar
                  </button>
                  {order.client.hasWhatsApp && (
                    <button className="flex-1 px-4 py-2 bg-[#10B981] text-white text-sm rounded-lg hover:bg-[#059669] transition-colors">
                      WhatsApp
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Technician Info */}
            {order.technician && (
              <div className="pt-6 border-t border-[#E2E8F0]">
                <h3 className="text-sm text-[#1E293B] mb-3">Técnico Asignado</h3>
                <div className="flex items-center gap-3 p-3 bg-[#F8FAFC] rounded-lg">
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-full flex items-center justify-center text-white">
                      {order.technician.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    {order.technician.online && (
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#10B981] border-2 border-white rounded-full" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1E293B]">{order.technician.name}</p>
                    <p className="text-xs text-[#64748B]">{order.technician.phone}</p>
                  </div>
                  <button className="p-2 text-[#64748B] hover:bg-white rounded-lg transition-colors">
                    <User className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="space-y-3">
            <h3 className="text-sm text-[#1E293B] mb-3">Lista de Verificación</h3>
            {[
              { id: 1, task: 'Verificar herramientas necesarias', completed: true },
              { id: 2, task: 'Confirmar horario con cliente', completed: true },
              { id: 3, task: 'Revisar estado del equipo', completed: true },
              { id: 4, task: 'Realizar instalación física', completed: order.status === 'completed' },
              { id: 5, task: 'Configurar software', completed: order.status === 'completed' },
              { id: 6, task: 'Pruebas de funcionamiento', completed: order.status === 'completed' },
              { id: 7, task: 'Capacitación básica al usuario', completed: order.status === 'completed' },
              { id: 8, task: 'Obtener firma de conformidad', completed: order.status === 'completed' },
            ].map((item) => (
              <label
                key={item.id}
                className="flex items-start gap-3 p-3 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={item.completed}
                  className="mt-0.5 w-4 h-4 text-[#3B82F6] border-[#CBD5E1] rounded focus:ring-2 focus:ring-[#3B82F6]"
                  readOnly
                />
                <span className={`text-sm flex-1 ${
                  item.completed ? 'text-[#64748B] line-through' : 'text-[#1E293B]'
                }`}>
                  {item.task}
                </span>
              </label>
            ))}
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="space-y-4">
            <h3 className="text-sm text-[#1E293B] mb-3">Evidencias y Documentos</h3>
            
            <div className="grid grid-cols-2 gap-3">
              {order.status === 'completed' ? (
                <>
                  <div className="aspect-square bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-lg flex items-center justify-center text-white">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                  <div className="aspect-square bg-gradient-to-br from-[#F59E0B] to-[#EF4444] rounded-lg flex items-center justify-center text-white">
                    <ImageIcon className="w-8 h-8" />
                  </div>
                </>
              ) : (
                <div className="col-span-2 flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#CBD5E1] rounded-lg">
                  <ImageIcon className="w-12 h-12 text-[#CBD5E1] mb-2" />
                  <p className="text-sm text-[#64748B]">No hay evidencias disponibles</p>
                </div>
              )}
            </div>

            <button className="w-full px-4 py-2.5 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors">
              📎 Adjuntar archivo
            </button>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <h3 className="text-sm text-[#1E293B] mb-3">Historial de Cambios</h3>
            
            <div className="relative">
              <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />
              
              <div className="space-y-4">
                {[
                  {
                    time: '10:30',
                    date: '16 Dic',
                    action: 'Orden creada',
                    user: 'Sistema',
                    color: '#3B82F6'
                  },
                  order.technician && {
                    time: '10:45',
                    date: '16 Dic',
                    action: `Asignado a ${order.technician.name}`,
                    user: 'María González',
                    color: '#8B5CF6'
                  },
                  order.status === 'in-progress' && {
                    time: '14:00',
                    date: '16 Dic',
                    action: 'Servicio iniciado',
                    user: order.technician?.name,
                    color: '#10B981'
                  },
                  order.status === 'completed' && {
                    time: '16:30',
                    date: '16 Dic',
                    action: 'Servicio completado',
                    user: order.technician?.name,
                    color: '#10B981'
                  },
                ].filter(Boolean).map((event, index) => (
                  <div key={index} className="relative pl-8">
                    <div
                      className="absolute left-0 w-4 h-4 rounded-full border-2 border-white"
                      style={{ backgroundColor: event!.color }}
                    />
                    <div className="text-xs text-[#64748B] mb-0.5">{event!.time} · {event!.date}</div>
                    <div className="text-sm text-[#1E293B] mb-0.5">{event!.action}</div>
                    <div className="text-xs text-[#64748B]">Por {event!.user}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="space-y-4">
            <h3 className="text-sm text-[#1E293B] mb-3">Chat con Técnico</h3>
            
            <div className="space-y-3">
              {order.technician ? (
                <>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-[#F8FAFC] p-3 rounded-lg rounded-tl-none">
                      <p className="text-sm text-[#1E293B] mb-1">En camino al sitio</p>
                      <p className="text-xs text-[#64748B]">14:30</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 justify-end">
                    <div className="flex-1 bg-[#3B82F6] text-white p-3 rounded-lg rounded-tr-none">
                      <p className="text-sm mb-1">Perfecto, el cliente está esperando</p>
                      <p className="text-xs opacity-75">14:32</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#CBD5E1] rounded-lg">
                  <MessageSquare className="w-12 h-12 text-[#CBD5E1] mb-2" />
                  <p className="text-sm text-[#64748B]">No hay conversaciones</p>
                </div>
              )}
            </div>

            <div className="flex gap-2 pt-4 border-t border-[#E2E8F0]">
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 px-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
              <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
                Enviar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] p-6">
        <div className="flex gap-2">
          {order.status === 'pending' && (
            <>
              <button className="flex-1 px-4 py-2.5 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors">
                Asignar Técnico
              </button>
              <button className="flex-1 px-4 py-2.5 bg-white text-[#64748B] border border-[#E2E8F0] text-sm rounded-lg hover:bg-[#F8FAFC] transition-colors">
                Editar
              </button>
            </>
          )}
          
          {order.status === 'scheduled' && (
            <>
              <button className="flex-1 px-4 py-2.5 bg-[#8B5CF6] text-white text-sm rounded-lg hover:bg-[#7C3AED] transition-colors">
                Iniciar Servicio
              </button>
              <button className="flex-1 px-4 py-2.5 bg-white text-[#64748B] border border-[#E2E8F0] text-sm rounded-lg hover:bg-[#F8FAFC] transition-colors">
                Reprogramar
              </button>
            </>
          )}
          
          {order.status === 'in-progress' && (
            <button className="w-full px-4 py-2.5 bg-[#10B981] text-white text-sm rounded-lg hover:bg-[#059669] transition-colors">
              Marcar como Completada
            </button>
          )}
          
          {order.status === 'completed' && (
            <button className="w-full px-4 py-2.5 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors">
              Descargar Reporte
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
