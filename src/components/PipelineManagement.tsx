import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { PipelineHeader } from './pipeline/PipelineHeader';
import { PipelineSummary } from './pipeline/PipelineSummary';
import { FilterBar } from './pipeline/FilterBar';
import { KanbanBoard } from './pipeline/KanbanBoard';
import { ListView } from './pipeline/ListView';
import { ForecastView } from './pipeline/ForecastView';
import { PipelineFooter } from './pipeline/PipelineFooter';
import { NewOpportunityModal } from './pipeline/NewOpportunityModal';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  value: number;
  stage: string;
  assignedTo: {
    id: string;
    name: string;
    avatar: string;
    color: string;
  };
  closeDate: string;
  probability: number;
  progress: number;
}

const initialOpportunities: Opportunity[] = [
  {
    id: '1',
    title: 'Sistema CRM Enterprise',
    company: 'TechCorp Solutions',
    value: 125000,
    stage: 'prospeccion',
    assignedTo: { id: '1', name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    closeDate: '2024-12-28',
    probability: 30,
    progress: 25
  },
  {
    id: '2',
    title: 'Implementación ERP',
    company: 'Manufactura Global',
    value: 450000,
    stage: 'calificacion',
    assignedTo: { id: '2', name: 'María García', avatar: 'MG', color: 'from-purple-500 to-purple-600' },
    closeDate: '2025-01-15',
    probability: 55,
    progress: 45
  },
  {
    id: '3',
    title: 'Consultoría Digital',
    company: 'RetailMax',
    value: 85000,
    stage: 'propuesta',
    assignedTo: { id: '3', name: 'Juan Pérez', avatar: 'JP', color: 'from-green-500 to-green-600' },
    closeDate: '2024-12-20',
    probability: 75,
    progress: 60
  },
  {
    id: '4',
    title: 'Software de Nómina',
    company: 'HR Solutions Inc',
    value: 95000,
    stage: 'negociacion',
    assignedTo: { id: '4', name: 'Ana Martínez', avatar: 'AM', color: 'from-pink-500 to-pink-600' },
    closeDate: '2024-12-18',
    probability: 85,
    progress: 80
  },
  {
    id: '5',
    title: 'Plataforma E-commerce',
    company: 'Fashion Brands Co',
    value: 220000,
    stage: 'ganado',
    assignedTo: { id: '1', name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    closeDate: '2024-12-10',
    probability: 100,
    progress: 100
  },
  {
    id: '6',
    title: 'Sistema de Inventario',
    company: 'LogisPro',
    value: 65000,
    stage: 'perdido',
    assignedTo: { id: '2', name: 'María García', avatar: 'MG', color: 'from-purple-500 to-purple-600' },
    closeDate: '2024-11-30',
    probability: 0,
    progress: 35
  },
  {
    id: '7',
    title: 'Automatización Marketing',
    company: 'AdTech Agency',
    value: 78000,
    stage: 'prospeccion',
    assignedTo: { id: '3', name: 'Juan Pérez', avatar: 'JP', color: 'from-green-500 to-green-600' },
    closeDate: '2025-01-10',
    probability: 25,
    progress: 20
  },
  {
    id: '8',
    title: 'BI Dashboard',
    company: 'DataDriven Corp',
    value: 156000,
    stage: 'calificacion',
    assignedTo: { id: '4', name: 'Ana Martínez', avatar: 'AM', color: 'from-pink-500 to-pink-600' },
    closeDate: '2025-01-20',
    probability: 60,
    progress: 50
  },
  {
    id: '9',
    title: 'App Móvil Custom',
    company: 'StartupX',
    value: 180000,
    stage: 'propuesta',
    assignedTo: { id: '1', name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    closeDate: '2024-12-25',
    probability: 70,
    progress: 65
  },
  {
    id: '10',
    title: 'Migración a Cloud',
    company: 'FinServe Bank',
    value: 520000,
    stage: 'negociacion',
    assignedTo: { id: '2', name: 'María García', avatar: 'MG', color: 'from-purple-500 to-purple-600' },
    closeDate: '2024-12-22',
    probability: 90,
    progress: 85
  }
];

export function PipelineManagement() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'forecast'>('kanban');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleMoveOpportunity = (opportunityId: string, newStage: string) => {
    setOpportunities(prev => 
      prev.map(opp => 
        opp.id === opportunityId 
          ? { ...opp, stage: newStage }
          : opp
      )
    );
  };

  const handleCreateOpportunity = () => {
    setIsCreateModalOpen(true);
  };

  const handleSubmitOpportunity = (newOpportunity: any) => {
    setOpportunities(prev => [...prev, newOpportunity]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-full bg-white">
        {/* Header */}
        <PipelineHeader 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onCreateOpportunity={handleCreateOpportunity}
        />

        {/* Summary Bar */}
        <PipelineSummary opportunities={opportunities} />

        {/* Filter Bar */}
        <FilterBar />

        {/* Main Content - Kanban Board */}
        <div className="flex-1 overflow-hidden min-h-0">
          {viewMode === 'kanban' && (
            <KanbanBoard 
              opportunities={opportunities}
              onMoveOpportunity={handleMoveOpportunity}
            />
          )}
          {viewMode === 'list' && (
            <ListView 
              opportunities={opportunities}
              onMoveOpportunity={handleMoveOpportunity}
            />
          )}
          {viewMode === 'forecast' && (
            <ForecastView opportunities={opportunities} />
          )}
        </div>

        {/* Footer */}
        <PipelineFooter opportunities={opportunities} />

        {/* New Opportunity Modal */}
        <NewOpportunityModal 
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleSubmitOpportunity}
        />
      </div>
    </DndProvider>
  );
}