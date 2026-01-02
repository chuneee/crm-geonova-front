import { ChevronDown, X, Table2, LayoutGrid, Map, Columns, Save } from 'lucide-react';
import type { ViewMode } from '../../pages/Customers';

interface ActionsBarProps {
  selectedCount: number;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  onClearSelection: () => void;
}

export function ActionsBar({ selectedCount, viewMode, onViewModeChange, onClearSelection }: ActionsBarProps) {
  return (
    <div className="bg-white border-b border-[#E2E8F0] h-14 px-8 flex items-center justify-between">
      {/* Left - Bulk Actions */}
      <div className="flex items-center gap-3">
        {selectedCount > 0 && (
          <>
            <button className="h-9 px-3 border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
              Acciones masivas
              <ChevronDown className="w-4 h-4" />
            </button>
            <span className="px-3 py-1.5 bg-[#3B82F6] text-white text-sm rounded-full flex items-center gap-2">
              {selectedCount} cliente{selectedCount > 1 ? 's' : ''} seleccionado{selectedCount > 1 ? 's' : ''}
              <button
                onClick={onClearSelection}
                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          </>
        )}
      </div>

      {/* Center - View Toggle */}
      <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
        <button
          onClick={() => onViewModeChange('table')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'table'
              ? 'bg-white text-[#3B82F6] shadow-sm'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
          title="Vista de tabla"
        >
          <Table2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('cards')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'cards'
              ? 'bg-white text-[#3B82F6] shadow-sm'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
          title="Vista de tarjetas"
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
        <button
          onClick={() => onViewModeChange('map')}
          className={`p-2 rounded transition-colors ${
            viewMode === 'map'
              ? 'bg-white text-[#3B82F6] shadow-sm'
              : 'text-[#64748B] hover:text-[#1E293B]'
          }`}
          title="Vista de mapa"
        >
          <Map className="w-4 h-4" />
        </button>
      </div>

      {/* Right - Settings */}
      <div className="flex items-center gap-2">
        <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors" title="Visibilidad de columnas">
          <Columns className="w-5 h-5" />
        </button>
        <button className="h-9 px-3 border border-[#E2E8F0] rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
          <Save className="w-4 h-4" />
          Guardar vista
        </button>
      </div>
    </div>
  );
}
