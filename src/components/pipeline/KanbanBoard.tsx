import { KanbanColumn } from './KanbanColumn';
import { Opportunity } from '../PipelineManagement';

interface KanbanBoardProps {
  opportunities: Opportunity[];
  onMoveOpportunity: (opportunityId: string, newStage: string) => void;
}

const stages = [
  {
    id: 'prospeccion',
    name: 'Prospección',
    color: '#8B5CF6',
    bgColor: '#F5F3FF'
  },
  {
    id: 'calificacion',
    name: 'Calificación',
    color: '#3B82F6',
    bgColor: '#EFF6FF'
  },
  {
    id: 'propuesta',
    name: 'Propuesta',
    color: '#F59E0B',
    bgColor: '#FEF3C7'
  },
  {
    id: 'negociacion',
    name: 'Negociación',
    color: '#EF4444',
    bgColor: '#FEE2E2'
  },
  {
    id: 'ganado',
    name: 'Cerrado Ganado',
    color: '#10B981',
    bgColor: '#ECFDF5'
  },
  {
    id: 'perdido',
    name: 'Cerrado Perdido',
    color: '#64748B',
    bgColor: '#F8FAFC'
  }
];

export function KanbanBoard({ opportunities, onMoveOpportunity }: KanbanBoardProps) {
  return (
    <div className="h-full overflow-x-auto overflow-y-hidden bg-[#F8FAFC] custom-scrollbar">
      <div className="h-full flex gap-4 p-4 md:p-6 min-w-max">
        {stages.map((stage) => {
          const stageOpportunities = opportunities.filter(opp => opp.stage === stage.id);
          const totalValue = stageOpportunities.reduce((sum, opp) => sum + opp.value, 0);

          return (
            <KanbanColumn
              key={stage.id}
              stage={stage}
              opportunities={stageOpportunities}
              totalValue={totalValue}
              onMoveOpportunity={onMoveOpportunity}
            />
          );
        })}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F5F9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
    </div>
  );
}
