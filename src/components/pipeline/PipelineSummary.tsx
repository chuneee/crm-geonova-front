import { TrendingUp, TrendingDown, Users, Target, Calendar, DollarSign } from 'lucide-react';
import { Opportunity } from '../PipelineManagement';

interface PipelineSummaryProps {
  opportunities: Opportunity[];
}

export function PipelineSummary({ opportunities }: PipelineSummaryProps) {
  const activeOpportunities = opportunities.filter(o => o.stage !== 'ganado' && o.stage !== 'perdido');
  const wonOpportunities = opportunities.filter(o => o.stage === 'ganado');
  
  const totalValue = opportunities.reduce((sum, opp) => sum + opp.value, 0);
  const wonValue = wonOpportunities.reduce((sum, opp) => sum + opp.value, 0);
  const estimatedMonthClose = opportunities
    .filter(o => o.probability >= 70 && o.stage !== 'ganado' && o.stage !== 'perdido')
    .reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
  
  const conversionRate = opportunities.length > 0 
    ? Math.round((wonOpportunities.length / opportunities.length) * 100)
    : 0;

  const averageCycle = 21; // días - esto podría calcularse de datos reales
  const monthProgress = (wonValue / (wonValue + estimatedMonthClose)) * 100;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="h-20 px-4 md:px-8 py-4 border-b border-[#E2E8F0] bg-gradient-to-b from-[#F8FAFC] to-white flex-shrink-0">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 h-full">
        {/* Total Pipeline Value */}
        <div className="bg-white rounded-xl px-4 py-2 border border-[#E2E8F0] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-[#3B82F6]" />
            <span className="text-xs text-[#64748B]">Total Pipeline</span>
          </div>
          <div className="text-xl font-bold text-[#1E293B]">
            {formatCurrency(totalValue)}
          </div>
        </div>

        {/* Active Opportunities */}
        <div className="bg-white rounded-xl px-4 py-2 border border-[#E2E8F0] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <Users className="w-4 h-4 text-[#8B5CF6]" />
            <span className="text-xs text-[#64748B]">Oportunidades</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#1E293B]">{activeOpportunities.length}</span>
            <span className="px-2 py-0.5 bg-[#ECFDF5] text-[#10B981] rounded-full text-xs font-semibold">
              +12%
            </span>
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="bg-white rounded-xl px-4 py-2 border border-[#E2E8F0] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <Target className="w-4 h-4 text-[#10B981]" />
            <span className="text-xs text-[#64748B]">Tasa Conversión</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-[#1E293B]">{conversionRate}%</span>
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
          </div>
        </div>

        {/* Average Cycle */}
        <div className="bg-white rounded-xl px-4 py-2 border border-[#E2E8F0] hover:shadow-md transition-shadow">
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-[#F59E0B]" />
            <span className="text-xs text-[#64748B]">Ciclo Promedio</span>
          </div>
          <div className="text-xl font-bold text-[#1E293B]">
            {averageCycle} días
          </div>
        </div>

        {/* Estimated Month Close */}
        <div className="bg-white rounded-xl px-4 py-2 border border-[#E2E8F0] hover:shadow-md transition-shadow col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <DollarSign className="w-4 h-4 text-[#EF4444]" />
            <span className="text-xs text-[#64748B]">Cierre Est. Mes</span>
          </div>
          <div className="text-xl font-bold text-[#1E293B] mb-1">
            {formatCurrency(estimatedMonthClose)}
          </div>
          <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-[#10B981] to-[#059669] h-1.5 rounded-full transition-all"
              style={{ width: `${Math.min(monthProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
