import { useDrag } from 'react-dnd';
import { useNavigate } from 'react-router-dom';
import { Calendar, MoreVertical, GripVertical } from 'lucide-react';
import { Opportunity } from '../PipelineManagement';

interface OpportunityCardProps {
  opportunity: Opportunity;
  stageColor: string;
}

export function OpportunityCard({ opportunity, stageColor }: OpportunityCardProps) {
  const navigate = useNavigate();
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'OPPORTUNITY',
    item: { id: opportunity.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging()
    })
  }));

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' });
  };

  const getProbabilityColor = (probability: number) => {
    if (probability >= 70) return { bg: '#ECFDF5', text: '#10B981' };
    if (probability >= 40) return { bg: '#FEF3C7', text: '#F59E0B' };
    return { bg: '#FEE2E2', text: '#EF4444' };
  };

  const probabilityColors = getProbabilityColor(opportunity.probability);

  return (
    <div
      ref={drag}
      onClick={() => navigate(`/pipeline/${opportunity.id}`)}
      className={`bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all cursor-pointer hover:shadow-lg hover:-translate-y-0.5 ${
        isDragging ? 'opacity-60 shadow-xl' : ''
      }`}
      style={{ width: '280px' }}
    >
      {/* Color Strip */}
      <div className="h-1" style={{ backgroundColor: stageColor }} />

      {/* Card Content */}
      <div className="p-4">
        {/* Header with Logo and Menu */}
        <div className="flex items-start gap-3 mb-3">
          {/* Drag Handle */}
          <div className="pt-1" onClick={(e) => e.stopPropagation()}>
            <GripVertical className="w-4 h-4 text-[#9CA3AF]" />
          </div>

          {/* Company Avatar/Logo */}
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">
              {opportunity.company.substring(0, 2).toUpperCase()}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-[#1E293B] mb-0.5">
              {opportunity.company}
            </h4>
            <p className="text-xs text-[#64748B] line-clamp-2">
              {opportunity.title}
            </p>
          </div>

          {/* Menu */}
          <button className="w-6 h-6 flex items-center justify-center rounded hover:bg-[#F8FAFC] transition-colors flex-shrink-0">
            <MoreVertical className="w-4 h-4 text-[#64748B]" />
          </button>
        </div>

        {/* Value Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold bg-[#ECFDF5] text-[#10B981]">
            {formatCurrency(opportunity.value)}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-[#64748B]">Progreso</span>
            <span className="text-xs font-semibold text-[#1E293B]">{opportunity.progress}%</span>
          </div>
          <div className="w-full bg-[#E2E8F0] rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full transition-all"
              style={{ 
                width: `${opportunity.progress}%`,
                backgroundColor: stageColor
              }}
            />
          </div>
        </div>

        {/* Footer - User, Date, Probability */}
        <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
          {/* Assigned User */}
          <div 
            className={`w-8 h-8 rounded-full bg-gradient-to-br ${opportunity.assignedTo.color} flex items-center justify-center`}
            title={opportunity.assignedTo.name}
          >
            <span className="text-white text-xs font-semibold">
              {opportunity.assignedTo.avatar}
            </span>
          </div>

          {/* Close Date */}
          <div className="flex items-center gap-1 text-xs text-[#64748B]">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(opportunity.closeDate)}</span>
          </div>

          {/* Probability Badge */}
          <div 
            className="px-2 py-1 rounded text-xs font-semibold"
            style={{ 
              backgroundColor: probabilityColors.bg,
              color: probabilityColors.text
            }}
          >
            {opportunity.probability}%
          </div>
        </div>
      </div>
    </div>
  );
}