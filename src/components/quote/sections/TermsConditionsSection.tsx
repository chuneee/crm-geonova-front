import { useState } from 'react';
import { FileText, CreditCard, Truck, Shield } from 'lucide-react';

type TabType = 'general' | 'payment' | 'delivery' | 'warranty';

export function TermsConditionsSection() {
  const [activeTab, setActiveTab] = useState<TabType>('general');

  const tabs = [
    { id: 'general' as TabType, label: 'General', icon: FileText },
    { id: 'payment' as TabType, label: 'Pago', icon: CreditCard },
    { id: 'delivery' as TabType, label: 'Entrega', icon: Truck },
    { id: 'warranty' as TabType, label: 'Garantía', icon: Shield }
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-6">Términos y Condiciones</h3>

      {/* Tabs */}
      <div className="flex items-center gap-2 mb-6 border-b border-[#E2E8F0]">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 flex items-center gap-2 border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'general' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Validez de cotización</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    defaultValue={30}
                    className="flex-1 h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                  <select className="h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors">
                    <option>días</option>
                    <option>meses</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Tiempo de entrega</label>
                <input
                  type="text"
                  defaultValue="15-20 días hábiles"
                  className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2">Notas para el cliente</label>
              <textarea
                placeholder="Información adicional relevante para el cliente..."
                className="w-full h-24 px-3 py-2 border border-[#E2E8F0] rounded-lg text-[#1E293B] resize-none focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2">Template selector</label>
              <select className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors">
                <option>Estándar</option>
                <option>Servicios</option>
                <option>Productos</option>
              </select>
            </div>
          </>
        )}

        {activeTab === 'payment' && (
          <>
            <div>
              <label className="block text-sm text-[#64748B] mb-3">Método de pago</label>
              <div className="grid grid-cols-2 gap-3">
                {['Transferencia', 'Tarjeta', 'Efectivo', 'Crédito'].map((method) => (
                  <label key={method} className="flex items-center gap-2 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                    <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
                    <span className="text-sm text-[#1E293B]">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-3">Términos de pago</label>
              <div className="space-y-2">
                {['Contado', '50/50', '30% anticipo', 'Net 30', 'Net 60'].map((term) => (
                  <label key={term} className="flex items-center gap-2 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                    <input type="radio" name="paymentTerms" className="w-4 h-4 border-[#E2E8F0] text-[#3B82F6]" />
                    <span className="text-sm text-[#1E293B]">{term}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2">Cuenta bancaria</label>
              <select className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors">
                <option>BBVA - ****1234</option>
                <option>Santander - ****5678</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2">Instrucciones especiales</label>
              <textarea
                placeholder="Instrucciones adicionales de pago..."
                className="w-full h-24 px-3 py-2 border border-[#E2E8F0] rounded-lg text-[#1E293B] resize-none focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>
          </>
        )}

        {activeTab === 'delivery' && (
          <>
            <div>
              <label className="block text-sm text-[#64748B] mb-2">Dirección de entrega</label>
              <input
                type="text"
                placeholder="Buscar dirección..."
                className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Contacto de recepción</label>
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#64748B] mb-2">Teléfono</label>
                <input
                  type="tel"
                  placeholder="+52 55 1234 5678"
                  className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2">Instrucciones de entrega</label>
              <textarea
                placeholder="Horarios preferidos, indicaciones especiales..."
                className="w-full h-24 px-3 py-2 border border-[#E2E8F0] rounded-lg text-[#1E293B] resize-none focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <label className="flex items-center gap-3 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
              <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
              <div className="flex-1">
                <span className="text-sm text-[#1E293B]">Incluir costo de instalación</span>
              </div>
              <input
                type="number"
                placeholder="$0.00"
                className="w-32 h-9 px-3 text-right border border-[#E2E8F0] rounded text-sm"
              />
            </label>
          </>
        )}

        {activeTab === 'warranty' && (
          <>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#64748B] mb-2">Período de garantía</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    defaultValue={12}
                    className="flex-1 h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                  <select className="h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors">
                    <option>meses</option>
                    <option>años</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2">Términos de garantía</label>
              <textarea
                defaultValue="Garantía limitada de fábrica contra defectos de fabricación. No cubre daños por mal uso o accidentes."
                className="w-full h-32 px-3 py-2 border border-[#E2E8F0] rounded-lg text-[#1E293B] resize-none focus:outline-none focus:border-[#3B82F6] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-3">Política de devolución</label>
              <div className="space-y-2">
                {[
                  'Devoluciones aceptadas dentro de 30 días',
                  'Producto debe estar sin uso y en empaque original',
                  'Se aplica cargo de 15% por restocking'
                ].map((policy, idx) => (
                  <label key={idx} className="flex items-center gap-2 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer transition-colors">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
                    <span className="text-sm text-[#1E293B]">{policy}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
