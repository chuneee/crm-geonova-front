import { useState } from "react";
import {
  X,
  MoreVertical,
  Star,
  Camera,
  Mail,
  Phone,
  Linkedin,
  Edit,
  CheckCircle,
  Calendar,
  Plus,
  Trash2,
} from "lucide-react";

interface LeadDetailPanelProps {
  isOpen: boolean;
  onClose: () => void;
  lead: any;
}

export function LeadDetailPanel({
  isOpen,
  onClose,
  lead,
}: LeadDetailPanelProps) {
  const [activeTab, setActiveTab] = useState("informacion");
  const [isEditing, setIsEditing] = useState(false);

  if (!isOpen) return null;

  const tabs = [
    { id: "informacion", label: "Información" },
    { id: "actividades", label: "Actividades" },
    { id: "historial", label: "Historial" },
    { id: "documentos", label: "Documentos" },
  ];

  const renderStars = (score: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 cursor-pointer transition-colors ${
              star <= score
                ? "fill-white text-white"
                : "text-white opacity-40"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Panel - Starts below header */}
      <div className="fixed right-0 top-[72px] bottom-0 w-full sm:w-[480px] bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
        {/* Header with Gradient */}
        <div className="h-[72px] bg-gradient-to-r from-[#3B82F6] to-[#2563EB] px-6 flex flex-col justify-center flex-shrink-0 mt-[0px] mr-[0px] mb-[12px] ml-[0px] m-[0px]">
          <div>
            <h2 className="text-white text-xl font-bold mb-[4px] mt-[10px] mr-[0px] ml-[0px]">
              {lead?.name}
            </h2>

            <p className="text-white text-sm opacity-80 mt-[4px] mr-[0px] mb-[3px] ml-[0px]">
              {lead?.company}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="h-14 bg-white border-b border-[#E2E8F0] flex items-center px-6 gap-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`h-full flex items-center text-sm transition-all relative ${
                activeTab === tab.id
                  ? "text-[#3B82F6] font-semibold"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#3B82F6]" />
              )}
            </button>
          ))}
        </div>

        {/* Content Area - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
          {activeTab === "informacion" && (
            <>
              {/* Información Principal */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 relative">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Edit className="w-4 h-4 text-[#64748B]" />
                </button>

                {/* Avatar */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {lead?.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 w-7 h-7 bg-white border-2 border-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-50 transition-colors">
                      <Camera className="w-4 h-4 text-[#64748B]" />
                    </button>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Nombre completo
                    </label>
                    <input
                      type="text"
                      value={lead?.name || ""}
                      onChange={() => {}}
                      disabled={!isEditing}
                      className="w-full h-10 px-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-60"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-[#64748B] font-medium mb-2">
                        Cargo
                      </label>
                      <input
                        type="text"
                        defaultValue="Director de Ventas"
                        disabled={!isEditing}
                        className="w-full h-10 px-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-60"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#64748B] font-medium mb-2">
                        Empresa
                      </label>
                      <input
                        type="text"
                        value={lead?.company || ""}
                        onChange={() => {}}
                        disabled={!isEditing}
                        className="w-full h-10 px-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-60"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Email
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="email"
                        value={lead?.email || ""}
                        onChange={() => {}}
                        disabled={!isEditing}
                        className="w-full h-10 pl-10 pr-10 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-60"
                      />
                      <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#10B981]" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="tel"
                        value={lead?.phone || ""}
                        onChange={() => {}}
                        disabled={!isEditing}
                        className="w-full h-10 pl-10 pr-10 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-60"
                      />
                      <button className="absolute right-3 top-1/2 -translate-y-1/2">
                        <svg
                          className="w-4 h-4 text-[#25D366]"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      LinkedIn
                    </label>
                    <div className="relative">
                      <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
                      <input
                        type="url"
                        defaultValue="linkedin.com/in/roberto-fernandez"
                        disabled={!isEditing}
                        className="w-full h-10 pl-10 pr-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] disabled:opacity-60"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Detalles del Lead */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-4">
                  Detalles del Lead
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Fuente
                    </label>
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-xs text-white"
                      style={{
                        backgroundColor: lead?.sourceColor,
                      }}
                    >
                      {lead?.source}
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Estado
                    </label>
                    <select className="w-full h-10 px-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]">
                      <option>Nuevo</option>
                      <option>Contactado</option>
                      <option>Calificado</option>
                      <option>Descalificado</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Score
                    </label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 cursor-pointer transition-colors ${
                            star <= (lead?.score || 0)
                              ? "fill-[#F59E0B] text-[#F59E0B]"
                              : "text-[#E2E8F0]"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Industria
                    </label>
                    <input
                      type="text"
                      defaultValue={lead?.industry}
                      className="w-full h-10 px-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Tamaño empresa
                    </label>
                    <select className="w-full h-10 px-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]">
                      <option>1-10 empleados</option>
                      <option>11-50 empleados</option>
                      <option>51-200 empleados</option>
                      <option>201-500 empleados</option>
                      <option>500+ empleados</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Presupuesto estimado
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                        $
                      </span>
                      <input
                        type="text"
                        defaultValue="50,000"
                        className="w-full h-10 pl-7 pr-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Fecha contacto
                    </label>
                    <input
                      type="date"
                      defaultValue="2024-12-15"
                      className="w-full h-10 px-3 bg-[#F1F5F9] border border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Asignado a
                    </label>
                    <div className="flex items-center gap-2 h-10 px-3 bg-[#F1F5F9] rounded-lg">
                      <div
                        className={`w-6 h-6 rounded-full bg-gradient-to-br ${lead?.assignedColor} flex items-center justify-center`}
                      >
                        <span className="text-white text-xs">
                          {lead?.assignedTo}
                        </span>
                      </div>
                      <span className="text-sm text-gray-700">
                        {lead?.assignedName}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Tags
                    </label>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-[#EFF6FF] text-[#3B82F6] text-xs rounded-full">
                        Prioridad Alta
                      </span>
                      <span className="px-3 py-1 bg-[#F0FDF4] text-[#10B981] text-xs rounded-full">
                        Interesado
                      </span>
                      <button className="px-3 py-1 border border-dashed border-[#E2E8F0] text-[#64748B] text-xs rounded-full hover:border-[#3B82F6] hover:text-[#3B82F6] transition-colors">
                        + Agregar
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-xs text-[#64748B] font-medium mb-2">
                      Probabilidad de cierre
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        defaultValue="65"
                        className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
                      />
                      <div className="flex justify-between text-xs text-[#64748B]">
                        <span>0%</span>
                        <span className="text-[#3B82F6] font-medium">
                          65%
                        </span>
                        <span>100%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Próxima Actividad */}
              <div className="bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#F59E0B] rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      Llamada de seguimiento
                    </h4>
                    <p className="text-sm text-[#92400E]">
                      Mañana, 16 de Diciembre • 10:00 AM
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-[#F59E0B] text-[#F59E0B] focus:ring-[#F59E0B]"
                    />
                    <span className="text-sm text-gray-700">
                      Marcar como completada
                    </span>
                  </label>
                  <button className="text-sm text-[#3B82F6] font-medium hover:text-[#2563EB] flex items-center gap-1">
                    <Plus className="w-4 h-4" />
                    <span>Agregar actividad</span>
                  </button>
                </div>
              </div>

              {/* Notas */}
              <div className="bg-white border border-[#E2E8F0] rounded-xl p-4">
                <h3 className="text-sm font-semibold text-gray-900 mb-3">
                  Notas
                </h3>

                {/* Rich Text Editor */}
                <div className="mb-4">
                  <div className="flex items-center gap-1 border-b border-[#E2E8F0] pb-2 mb-2">
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100">
                      <span className="text-sm font-bold">
                        B
                      </span>
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100">
                      <span className="text-sm italic">I</span>
                    </button>
                    <button className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100">
                      <span className="text-sm underline">
                        U
                      </span>
                    </button>
                  </div>
                  <textarea
                    placeholder="Escribe una nota..."
                    rows={3}
                    className="w-full px-3 py-2 bg-[#F1F5F9] border border-transparent rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
                  />
                  <div className="flex justify-end mt-2">
                    <button className="h-8 px-4 bg-[#3B82F6] text-white rounded-lg text-xs hover:bg-[#2563EB] transition-colors">
                      Guardar nota
                    </button>
                  </div>
                </div>

                {/* Previous Notes */}
                <div className="space-y-3">
                  {[1, 2].map((note) => (
                    <div
                      key={note}
                      className="flex gap-3 pb-3 border-b border-[#E2E8F0] last:border-0"
                    >
                      <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">
                          CR
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium text-gray-900">
                            Carlos Rodríguez
                          </span>
                          <span className="text-xs text-[#64748B]">
                            Hace 2 horas
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">
                          Cliente muy interesado en nuestro
                          producto. Mencionó que necesita una
                          solución para Q1 2025.
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-3 text-sm text-[#3B82F6] font-medium hover:text-[#2563EB]">
                  Mostrar más notas
                </button>
              </div>
            </>
          )}

          {activeTab === "actividades" && (
            <div className="text-center py-16">
              <Calendar className="w-12 h-12 text-[#64748B] mx-auto mb-3" />
              <p className="text-sm text-[#64748B]">
                No hay actividades registradas
              </p>
            </div>
          )}

          {activeTab === "historial" && (
            <div className="text-center py-16">
              <p className="text-sm text-[#64748B]">
                Historial de cambios aparecerá aquí
              </p>
            </div>
          )}

          {activeTab === "documentos" && (
            <div className="text-center py-16">
              <p className="text-sm text-[#64748B]">
                No hay documentos adjuntos
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="h-[72px] bg-[#F8FAFC] border-t border-[#E2E8F0] px-6 flex items-center justify-between">
          <button className="text-sm text-[#EF4444] font-medium hover:text-[#DC2626] flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            <span>Eliminar lead</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="h-10 px-5 bg-white border border-[#E2E8F0] rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button className="h-10 px-5 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-[#2563EB] transition-colors">
              Convertir a Oportunidad
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }

        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F5F9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
    </>
  );
}