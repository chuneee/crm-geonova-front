import { Download, Settings2, LayoutGrid, Table } from 'lucide-react';
import { useState } from 'react';
import { ColumnToggle } from './ColumnToggle';

interface ActionsBarProps {
  selectedCount: number;
  viewMode: 'table' | 'card';
  onViewModeChange: (mode: 'table' | 'card') => void;
}

export function ActionsBar({ selectedCount, viewMode, onViewModeChange }: ActionsBarProps) {
  const [showColumnToggle, setShowColumnToggle] = useState(false);

  return (
    <div className="px-4 md:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      {/* Left - Bulk Actions */}
      <div className="flex items-center gap-3 flex-wrap">
        {selectedCount > 0 ? (
          <>
            <select className="h-9 px-3 bg-white border border-[#E2E8F0] rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6]">
              <option>Acciones en lote</option>
              <option>Asignar a usuario</option>
              <option>Cambiar estado</option>
              <option>Exportar selección</option>
              <option>Eliminar selección</option>
            </select>
            <span className="text-sm text-[#64748B]">
              {selectedCount} lead{selectedCount !== 1 ? 's' : ''} seleccionado{selectedCount !== 1 ? 's' : ''}
            </span>
          </>
        ) : (
          <span className="text-sm text-[#64748B]">247 leads totales</span>
        )}
      </div>

      {/* Center - View Toggle (Hidden on mobile) */}
      <div className="hidden lg:flex items-center gap-1 bg-[#F8FAFC] rounded-lg p-1">
        <button 
          onClick={() => onViewModeChange('table')}
          className={`w-8 h-8 flex items-center justify-center rounded transition-all ${
            viewMode === 'table' 
              ? 'bg-white border border-[#E2E8F0] text-[#3B82F6] shadow-sm' 
              : 'text-[#64748B] hover:bg-white'
          }`}
        >
          <Table className="w-4 h-4" />
        </button>
        <button 
          onClick={() => onViewModeChange('card')}
          className={`w-8 h-8 flex items-center justify-center rounded transition-all ${
            viewMode === 'card' 
              ? 'bg-white border border-[#E2E8F0] text-[#3B82F6] shadow-sm' 
              : 'text-[#64748B] hover:bg-white'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
        </button>
      </div>

      {/* Right - Export & Settings */}
      <div className="flex items-center gap-2">
        <button className="h-9 px-4 bg-white border border-[#E2E8F0] rounded-lg text-sm text-gray-700 hover:bg-[#F8FAFC] flex items-center gap-2 transition-colors">
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exportar</span>
        </button>
        <div className="relative">
          <button 
            onClick={() => setShowColumnToggle(!showColumnToggle)}
            className="w-9 h-9 flex items-center justify-center bg-white border border-[#E2E8F0] rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors"
          >
            <Settings2 className="w-4 h-4" />
          </button>
          <ColumnToggle 
            isOpen={showColumnToggle}
            onClose={() => setShowColumnToggle(false)}
          />
        </div>
      </div>
    </div>
  );
}