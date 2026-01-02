import { useDrop } from 'react-dnd';
import { MoreVertical, Plus } from 'lucide-react';
import { OpportunityCard } from './OpportunityCard';
import { Opportunity } from '../PipelineManagement';

interface Stage {
  id: string;
  name: string;
  color: string;
  bgColor: string;
}

interface KanbanColumnProps {
  stage: Stage;
  opportunities: Opportunity[];
  totalValue: number;
  onMoveOpportunity: (opportunityId: string, newStage: string) => void;
}

export function KanbanColumn({ stage, opportunities, totalValue, onMoveOpportunity }: KanbanColumnProps) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'OPPORTUNITY',
    drop: (item: { id: string }) => {
      onMoveOpportunity(item.id, stage.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver()
    })
  }));

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`;
    }
    return `$${(value / 1000).toFixed(0)}K`;
  };

  return (
    <div className="w-80 flex-shrink-0 flex flex-col">
      {/* Column Header */}
      <div className="bg-white rounded-t-xl border-t-4 border-x border-[#E2E8F0] px-4 py-3" style={{ borderTopColor: stage.color }}>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#1E293B]">{stage.name}</h3>
            <span 
              className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold text-white"
              style={{ backgroundColor: stage.color }}
            >
              {opportunities.length}
            </span>
          </div>
          <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <MoreVertical className="w-4 h-4 text-[#64748B]" />
          </button>
        </div>
        <p className="text-sm text-[#64748B] font-medium">
          {formatCurrency(totalValue)}
        </p>
      </div>

      {/* Column Content - Scrollable */}
      <div 
        ref={drop}
        className={`flex-1 overflow-y-auto bg-white border-x border-b border-[#E2E8F0] rounded-b-xl p-2 transition-all custom-scrollbar ${
          isOver ? 'bg-[#EFF6FF] border-[#3B82F6] border-2 border-dashed' : ''
        }`}
        style={{ 
          minHeight: '400px',
          backgroundColor: isOver ? stage.bgColor : 'white'
        }}
      >
        {opportunities.length > 0 ? (
          <div className="space-y-3">
            {opportunities.map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                stageColor={stage.color}
              />
            ))}
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center py-12 border-2 border-dashed border-[#E2E8F0] rounded-lg">
            <div 
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: stage.bgColor }}
            >
              <Plus className="w-6 h-6" style={{ color: stage.color }} />
            </div>
            <p className="text-sm text-[#94A3B8] mb-2">Arrastra oportunidades aquí</p>
            <button 
              className="text-xs font-medium hover:underline"
              style={{ color: stage.color }}
            >
              + Crear oportunidad en esta etapa
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #CBD5E1;
        }
      `}</style>
    </div>
  );
}
