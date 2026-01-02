import { Plus, AlertCircle, CheckCircle2, Info, TrendingUp, ChevronDown, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface RightColumnProps {
  customerId: string;
}

export function RightColumn({ customerId }: RightColumnProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>('drone');

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      {/* Quick Actions - Sticky */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sticky top-0">
        <h3 className="text-sm text-[#1E293B] mb-4">Acciones Rápidas</h3>
        
        <div className="space-y-2">
          <button className="w-full h-11 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors flex items-center justify-center gap-2">
            <Plus className="w-5 h-5" />
            Nueva oportunidad
          </button>
          <button className="w-full h-11 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
            Generar cotización
          </button>
          <button className="w-full h-11 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
            Registrar actividad
          </button>
          <button className="w-full h-11 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
            Enviar mensaje
          </button>
          <button className="w-full h-11 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
            Programar instalación
          </button>
        </div>
      </div>

      {/* Risk Indicators */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Indicadores de Riesgo</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2 p-3 bg-[#FEF3C7] rounded-lg">
            <AlertCircle className="w-4 h-4 text-[#F59E0B] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-[#92400E] mb-1">Sin actividad en 45 días</div>
              <button className="text-xs text-[#F59E0B] hover:underline">Tomar acción</button>
            </div>
          </div>
          
          <div className="flex items-start gap-2 p-3 bg-[#EFF6FF] rounded-lg">
            <Info className="w-4 h-4 text-[#3B82F6] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <div className="text-xs text-[#1E3A8A] mb-1">Contrato expira en 15 días</div>
              <button className="text-xs text-[#3B82F6] hover:underline">Tomar acción</button>
            </div>
          </div>
        </div>
      </div>

      {/* Health Score Breakdown */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Desglose Health Score</h3>
        
        <div className="flex justify-center mb-4">
          <div className="relative inline-block">
            <svg width="100" height="100" className="transform -rotate-90">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#E2E8F0" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10B981"
                strokeWidth="8"
                strokeDasharray={`${(82 / 100) * 251.2} 251.2`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl text-[#1E293B]">82%</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#64748B]">Historial de pagos</span>
              <span className="text-[#10B981]">95%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full" style={{ width: '95%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#64748B]">Engagement</span>
              <span className="text-[#F59E0B]">75%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '75%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#64748B]">Adopción de producto</span>
              <span className="text-[#10B981]">90%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full" style={{ width: '90%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#64748B]">Satisfacción soporte</span>
              <span className="text-[#10B981]">80%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full" style={{ width: '80%' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-[#64748B]">Prob. renovación</span>
              <span className="text-[#F59E0B]">70%</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#F59E0B] rounded-full" style={{ width: '70%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Products & Services */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Productos y Servicios</h3>
        
        <div className="space-y-2">
          {/* Product Item */}
          <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedProduct(expandedProduct === 'drone' ? null : 'drone')}
              className="w-full p-3 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#1E293B]">Drones DJI Mavic 3</span>
                <span className="text-xs text-[#64748B]">(2 unidades)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${expandedProduct === 'drone' ? 'rotate-180' : ''}`} />
            </button>
            {expandedProduct === 'drone' && (
              <div className="px-3 pb-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Estado:</span>
                  <span className="text-[#10B981]">Activo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Compra:</span>
                  <span className="text-[#1E293B]">Oct 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Garantía:</span>
                  <span className="text-[#1E293B]">Válida hasta Oct 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Próx. mantenimiento:</span>
                  <span className="text-[#F59E0B]">Ene 2025</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Item */}
          <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedProduct(expandedProduct === 'software' ? null : 'software')}
              className="w-full p-3 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#1E293B]">Software TopoDrone</span>
                <span className="text-xs text-[#64748B]">(Licencia)</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${expandedProduct === 'software' ? 'rotate-180' : ''}`} />
            </button>
            {expandedProduct === 'software' && (
              <div className="px-3 pb-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Estado:</span>
                  <span className="text-[#10B981]">Activo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Renovación:</span>
                  <span className="text-[#F59E0B]">Mar 2025</span>
                </div>
              </div>
            )}
          </div>

          {/* Product Item */}
          <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedProduct(expandedProduct === 'service' ? null : 'service')}
              className="w-full p-3 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
            >
              <div className="flex items-center gap-2">
                <span className="text-xs text-[#1E293B]">Service Plan Premium</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-[#64748B] transition-transform ${expandedProduct === 'service' ? 'rotate-180' : ''}`} />
            </button>
            {expandedProduct === 'service' && (
              <div className="px-3 pb-3 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Estado:</span>
                  <span className="text-[#10B981]">Activo</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#64748B]">Visitas restantes:</span>
                  <span className="text-[#1E293B]">3/12</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <button className="w-full mt-3 text-sm text-[#3B82F6] hover:underline flex items-center justify-center gap-1">
          <Plus className="w-4 h-4" />
          Agregar producto/servicio
        </button>
      </div>

      {/* Revenue History */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Historial de Ingresos</h3>
        
        {/* Mini Line Chart */}
        <div className="mb-4">
          <svg width="100%" height="120" className="overflow-visible">
            <defs>
              <linearGradient id="revenueGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
              </linearGradient>
            </defs>
            
            {/* Area */}
            <path
              d="M 0 80 L 20 70 L 40 75 L 60 60 L 80 65 L 100 50 L 120 55 L 140 45 L 160 50 L 180 40 L 200 45 L 220 35 L 220 120 L 0 120 Z"
              fill="url(#revenueGradient)"
            />
            
            {/* Line */}
            <polyline
              points="0,80 20,70 40,75 60,60 80,65 100,50 120,55 140,45 160,50 180,40 200,45 220,35"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
            />
            
            {/* Forecast dotted line */}
            <polyline
              points="220,35 240,30 260,25"
              fill="none"
              stroke="#3B82F6"
              strokeWidth="2"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </svg>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">Total:</span>
            <span className="text-lg text-[#10B981]">{formatCurrency(127450)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">Crecimiento:</span>
            <div className="flex items-center gap-1 text-sm text-[#10B981]">
              <TrendingUp className="w-4 h-4" />
              <span>+18% YoY</span>
            </div>
          </div>
        </div>
      </div>

      {/* Upsell Opportunities */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-1">Oportunidades de Upsell</h3>
        <p className="text-xs text-[#64748B] mb-4">Sugerencias impulsadas por IA</p>
        
        <div className="space-y-3">
          <div className="border border-[#E2E8F0] rounded-lg p-3 hover:border-[#3B82F6] transition-colors">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm text-[#1E293B]">Premium support upgrade</span>
              <span className="text-sm text-[#10B981]">$2,500/año</span>
            </div>
            <p className="text-xs text-[#64748B] mb-2">Cliente usa soporte frecuentemente</p>
            <button className="text-xs text-[#3B82F6] hover:underline">Crear cotización</button>
          </div>

          <div className="border border-[#E2E8F0] rounded-lg p-3 hover:border-[#3B82F6] transition-colors">
            <div className="flex items-start justify-between mb-2">
              <span className="text-sm text-[#1E293B]">Additional drone package</span>
              <span className="text-sm text-[#10B981]">$18,000</span>
            </div>
            <p className="text-xs text-[#64748B] mb-2">Compró hace 6 meses, ciclo típico</p>
            <button className="text-xs text-[#3B82F6] hover:underline">Crear oportunidad</button>
          </div>
        </div>
      </div>

      {/* Related Accounts */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Cuentas Relacionadas</h3>
        
        <div className="space-y-3">
          <div>
            <div className="text-xs text-[#64748B] mb-1">Empresa matriz:</div>
            <a href="#" className="text-sm text-[#3B82F6] hover:underline flex items-center gap-1">
              ACME Global Inc.
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
          
          <div>
            <div className="text-xs text-[#64748B] mb-1">Empresas hermanas:</div>
            <div className="space-y-1">
              <a href="#" className="text-sm text-[#3B82F6] hover:underline block">ACME Technology</a>
              <a href="#" className="text-sm text-[#3B82F6] hover:underline block">ACME Solutions</a>
              <button className="text-xs text-[#64748B] hover:underline">Ver todas (5)</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
