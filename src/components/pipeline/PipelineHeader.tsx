import { Plus, Filter, ChevronRight, LayoutGrid, List, TrendingUp } from 'lucide-react';

interface PipelineHeaderProps {
  viewMode: 'kanban' | 'list' | 'forecast';
  onViewModeChange: (mode: 'kanban' | 'list' | 'forecast') => void;
  onCreateOpportunity: () => void;
}

export function PipelineHeader({ viewMode, onViewModeChange, onCreateOpportunity }: PipelineHeaderProps) {
  return (
    <div className="h-16 px-4 md:px-8 border-b border-[#E2E8F0] flex-shrink-0 bg-white">
      <div className="h-full flex items-center justify-between gap-4">
        {/* Left: Title */}
        <div>
          <h1 className="text-[#1E293B] mb-1" style={{ fontSize: '24px', fontWeight: 700 }}>
            Pipeline de Ventas
          </h1>
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <span>Dashboard</span>
            <ChevronRight className="w-3 h-3" />
            <span>Pipeline</span>
          </div>
        </div>

        {/* Center: View Toggle */}
        <div className="hidden md:flex items-center bg-[#F8FAFC] rounded-lg p-1">
          <button
            onClick={() => onViewModeChange('kanban')}
            className={`flex items-center gap-2 px-4 h-8 rounded-md text-sm font-medium transition-all ${
              viewMode === 'kanban'
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:text-[#475569]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            Kanban
          </button>
          <button
            onClick={() => onViewModeChange('list')}
            className={`flex items-center gap-2 px-4 h-8 rounded-md text-sm font-medium transition-all ${
              viewMode === 'list'
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:text-[#475569]'
            }`}
          >
            <List className="w-4 h-4" />
            Lista
          </button>
          <button
            onClick={() => onViewModeChange('forecast')}
            className={`flex items-center gap-2 px-4 h-8 rounded-md text-sm font-medium transition-all ${
              viewMode === 'forecast'
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:text-[#475569]'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            Pronóstico
          </button>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-[#F8FAFC] transition-colors">
            <Filter className="w-5 h-5 text-[#64748B]" />
          </button>
          <button 
            onClick={onCreateOpportunity}
            className="h-10 px-4 md:px-6 bg-[#3B82F6] text-white rounded-lg flex items-center gap-2 hover:bg-[#2563EB] transition-colors text-sm font-medium"
          >
            <Plus className="w-5 h-5" />
            <span className="hidden sm:inline">Nueva Oportunidad</span>
          </button>
        </div>
      </div>
    </div>
  );
}
