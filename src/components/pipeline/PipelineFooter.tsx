import { Download, Share2, ExternalLink } from 'lucide-react';
import { Opportunity } from '../PipelineManagement';

interface PipelineFooterProps {
  opportunities: Opportunity[];
}

export function PipelineFooter({ opportunities }: PipelineFooterProps) {
  const activeOpportunities = opportunities.filter(o => o.stage !== 'ganado' && o.stage !== 'perdido');
  const totalOpportunities = opportunities.length;

  // Calculate pipeline health
  const highProbabilityCount = opportunities.filter(o => o.probability >= 70 && o.stage !== 'ganado' && o.stage !== 'perdido').length;
  const mediumProbabilityCount = opportunities.filter(o => o.probability >= 40 && o.probability < 70 && o.stage !== 'ganado' && o.stage !== 'perdido').length;
  const lowProbabilityCount = opportunities.filter(o => o.probability < 40 && o.stage !== 'ganado' && o.stage !== 'perdido').length;

  const totalActive = highProbabilityCount + mediumProbabilityCount + lowProbabilityCount;
  
  const healthScore = totalActive > 0 
    ? ((highProbabilityCount * 100 + mediumProbabilityCount * 60 + lowProbabilityCount * 30) / totalActive)
    : 0;

  const getHealthStatus = () => {
    if (healthScore >= 70) return { label: 'Excelente', color: '#10B981' };
    if (healthScore >= 50) return { label: 'Bueno', color: '#F59E0B' };
    return { label: 'Necesita atención', color: '#EF4444' };
  };

  const health = getHealthStatus();

  return (
    <div className="h-16 px-4 md:px-8 border-t border-[#E2E8F0] bg-white flex items-center justify-between flex-shrink-0">
      {/* Left: Count */}
      <div className="flex items-center gap-2">
        <span className="text-sm text-[#64748B]">
          Mostrando <span className="font-semibold text-[#1E293B]">{activeOpportunities.length}</span> de{' '}
          <span className="font-semibold text-[#1E293B]">{totalOpportunities}</span> oportunidades
        </span>
        <button className="text-sm text-[#3B82F6] hover:text-[#2563EB] font-medium flex items-center gap-1">
          Ver todas
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Center: Pipeline Health */}
      <div className="hidden md:flex items-center gap-3">
        <span className="text-sm text-[#64748B]">Salud del pipeline:</span>
        <div className="flex items-center gap-2">
          <div className="w-32 h-2 bg-[#E2E8F0] rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all"
              style={{ 
                width: `${healthScore}%`,
                backgroundColor: health.color
              }}
            />
          </div>
          <span 
            className="text-sm font-semibold"
            style={{ color: health.color }}
          >
            {health.label}
          </span>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="h-9 px-4 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#475569] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Compartir</span>
        </button>
        <button className="h-9 px-4 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#475569] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exportar</span>
        </button>
      </div>
    </div>
  );
}
