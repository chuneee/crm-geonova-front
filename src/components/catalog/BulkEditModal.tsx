import { X, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface BulkEditModalProps {
  selectedCount: number;
  onClose: () => void;
}

export function BulkEditModal({ selectedCount, onClose }: BulkEditModalProps) {
  const [adjustmentType, setAdjustmentType] = useState<'percentage' | 'fixed'>('percentage');
  const [adjustmentValue, setAdjustmentValue] = useState('');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[560px] max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <h2 className="text-xl text-[#1E293B]">Editar {selectedCount} productos</h2>
          <button
            onClick={onClose}
            className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 overflow-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Category */}
            <div>
              <label className="block text-sm text-[#64748B] mb-2">Categoría</label>
              <select className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6]">
                <option value="">Sin cambios</option>
                <option>Drones</option>
                <option>Servicios</option>
                <option>Software</option>
                <option>Accesorios</option>
              </select>
            </div>

            {/* Price Adjustment */}
            <div>
              <label className="block text-sm text-[#64748B] mb-2">Ajuste de precio</label>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => setAdjustmentType('percentage')}
                  className={`flex-1 h-11 rounded-lg border transition-colors ${
                    adjustmentType === 'percentage'
                      ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]'
                      : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
                  }`}
                >
                  Porcentaje (%)
                </button>
                <button
                  onClick={() => setAdjustmentType('fixed')}
                  className={`flex-1 h-11 rounded-lg border transition-colors ${
                    adjustmentType === 'fixed'
                      ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]'
                      : 'border-[#E2E8F0] text-[#64748B] hover:bg-[#F8FAFC]'
                  }`}
                >
                  Monto fijo ($)
                </button>
              </div>
              <div className="relative">
                {adjustmentType === 'fixed' && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">$</span>
                )}
                <input
                  type="number"
                  value={adjustmentValue}
                  onChange={(e) => setAdjustmentValue(e.target.value)}
                  placeholder={adjustmentType === 'percentage' ? 'Ej: 10 para +10%' : 'Ej: 1000'}
                  className={`w-full h-11 px-3 ${adjustmentType === 'fixed' ? 'pl-6' : ''} border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6]`}
                />
                {adjustmentType === 'percentage' && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]">%</span>
                )}
              </div>
              <p className="text-xs text-[#64748B] mt-2">
                Usa valores negativos para descuentos. Ej: -10 para reducir 10%
              </p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm text-[#64748B] mb-2">Estado</label>
              <select className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6]">
                <option value="">Sin cambios</option>
                <option>Activo</option>
                <option>Inactivo</option>
              </select>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm text-[#64748B] mb-2">Etiquetas</label>
              <div className="flex flex-wrap gap-2 p-3 border border-[#E2E8F0] rounded-lg min-h-[44px]">
                <span className="px-3 py-1 bg-[#3B82F6] text-white text-xs rounded-full flex items-center gap-1">
                  Popular
                  <button className="hover:bg-white/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
                <span className="px-3 py-1 bg-[#10B981] text-white text-xs rounded-full flex items-center gap-1">
                  Nuevo
                  <button className="hover:bg-white/20 rounded-full p-0.5">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              </div>
              <button className="text-sm text-[#3B82F6] hover:underline mt-2">
                + Agregar etiqueta
              </button>
            </div>

            {/* Preview */}
            <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg p-4">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-[#1E293B] mb-1">Vista previa de cambios</div>
                  <div className="text-xs text-[#64748B]">
                    Los siguientes productos serán afectados:
                  </div>
                </div>
              </div>
              <div className="space-y-2 max-h-32 overflow-auto">
                <div className="text-xs text-[#64748B] p-2 bg-white rounded border border-[#E2E8F0]">
                  • DJI Mavic 3 Pro
                </div>
                <div className="text-xs text-[#64748B] p-2 bg-white rounded border border-[#E2E8F0]">
                  • Batería Inteligente DJI
                </div>
                <div className="text-xs text-[#64748B] p-2 bg-white rounded border border-[#E2E8F0]">
                  • Software de Mapeo Aéreo
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#E2E8F0] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors"
          >
            Cancelar
          </button>
          <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
            Aplicar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
