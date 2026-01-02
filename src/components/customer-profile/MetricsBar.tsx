import { TrendingUp, TrendingDown, Target, Ticket, Package, Star } from 'lucide-react';

interface MetricsBarProps {
  metrics: {
    lifetimeValue: number;
    lifetimeValueGrowth: number;
    activeOpportunities: number;
    opportunitiesValue: number;
    openTickets: number;
    ticketsPriority: { high: number; medium: number; low: number };
    avgResolution: number;
    activeProducts: number;
    lastPurchase: number;
    npsScore: number;
    lastSurvey: number;
  };
}

export function MetricsBar({ metrics }: MetricsBarProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getConversionPercentage = () => {
    // Mock calculation - in real app, calculate from actual data
    return 65;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E2E8F0] p-6">
      <div className="grid grid-cols-5 gap-4">
        {/* Lifetime Value */}
        <div className="border-l-4 border-[#10B981] pl-4">
          <div className="text-xs uppercase text-[#64748B] mb-2">Valor de Vida</div>
          <div className="text-xl text-[#10B981] mb-1">{formatCurrency(metrics.lifetimeValue)}</div>
          <div className="flex items-center gap-1 text-xs text-[#10B981] mb-2">
            <TrendingUp className="w-3 h-3" />
            <span>+{metrics.lifetimeValueGrowth}% vs año pasado</span>
          </div>
          {/* Mini Sparkline */}
          <svg width="100%" height="24" className="mt-2">
            <polyline
              points="0,20 10,15 20,18 30,12 40,14 50,8 60,10 70,6 80,9 90,4 100,7"
              fill="none"
              stroke="#10B981"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Active Opportunities */}
        <div className="border-l-4 border-[#3B82F6] pl-4">
          <div className="text-xs uppercase text-[#64748B] mb-2">Oportunidades Activas</div>
          <div className="text-lg text-[#1E293B] mb-1">{metrics.activeOpportunities} oportunidades</div>
          <div className="text-sm text-[#64748B] mb-2">{formatCurrency(metrics.opportunitiesValue)}</div>
          {/* Progress Ring */}
          <div className="flex items-center gap-2">
            <svg width="32" height="32" className="transform -rotate-90">
              <circle cx="16" cy="16" r="12" fill="none" stroke="#E2E8F0" strokeWidth="4" />
              <circle
                cx="16"
                cy="16"
                r="12"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="4"
                strokeDasharray={`${(getConversionPercentage() / 100) * 75.4} 75.4`}
                strokeLinecap="round"
              />
            </svg>
            <span className="text-xs text-[#64748B]">{getConversionPercentage()}% conversión</span>
          </div>
        </div>

        {/* Open Tickets */}
        <div className="border-l-4 border-[#F59E0B] pl-4">
          <div className="text-xs uppercase text-[#64748B] mb-2">Tickets Abiertos</div>
          <div className={`text-lg mb-1 ${metrics.openTickets > 0 ? 'text-[#F59E0B]' : 'text-[#1E293B]'}`}>
            {metrics.openTickets} tickets
          </div>
          <div className="text-sm text-[#64748B] mb-2">
            Resolución: {metrics.avgResolution} días
          </div>
          {/* Priority Breakdown */}
          <div className="flex items-center gap-1">
            {metrics.ticketsPriority.high > 0 && (
              <div className="flex items-center gap-1 text-xs text-[#EF4444]">
                <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
                <span>{metrics.ticketsPriority.high}</span>
              </div>
            )}
            {metrics.ticketsPriority.medium > 0 && (
              <div className="flex items-center gap-1 text-xs text-[#F59E0B]">
                <div className="w-2 h-2 rounded-full bg-[#F59E0B]" />
                <span>{metrics.ticketsPriority.medium}</span>
              </div>
            )}
            {metrics.ticketsPriority.low > 0 && (
              <div className="flex items-center gap-1 text-xs text-[#64748B]">
                <div className="w-2 h-2 rounded-full bg-[#64748B]" />
                <span>{metrics.ticketsPriority.low}</span>
              </div>
            )}
          </div>
        </div>

        {/* Products/Services */}
        <div className="border-l-4 border-[#8B5CF6] pl-4">
          <div className="text-xs uppercase text-[#64748B] mb-2">Productos/Servicios</div>
          <div className="text-lg text-[#1E293B] mb-1">{metrics.activeProducts} activos</div>
          <div className="text-sm text-[#64748B] mb-2">
            Última compra: hace {metrics.lastPurchase} días
          </div>
          <button className="flex items-center gap-1 text-xs text-[#3B82F6] hover:underline">
            <Package className="w-3 h-3" />
            Ver detalles
          </button>
        </div>

        {/* Satisfaction Score */}
        <div className="border-l-4 border-[#10B981] pl-4">
          <div className="text-xs uppercase text-[#64748B] mb-2">Satisfacción</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-2xl text-[#10B981]">{metrics.npsScore}</span>
            <span className="text-sm text-[#64748B]">/10</span>
          </div>
          <div className="text-sm text-[#64748B] mb-2">
            Última encuesta: hace {metrics.lastSurvey} días
          </div>
          <div className="flex items-center gap-1 text-xs text-[#10B981]">
            <TrendingUp className="w-3 h-3" />
            <span>Mejorando</span>
          </div>
        </div>
      </div>
    </div>
  );
}
