import { Download, Upload, Settings, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { ViewMode } from '../../pages/Customers';

interface CustomersHeaderProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  totalCustomers: number;
}

export function CustomersHeader({ viewMode, onViewModeChange, totalCustomers }: CustomersHeaderProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl text-[#1E293B] mb-1">Clientes</h1>
        <p className="text-sm text-[#64748B]">{totalCustomers} clientes registrados</p>
      </div>

      <div className="flex items-center gap-3">
        {/* View Mode Toggle */}
        <div className="flex items-center border border-[#E2E8F0] rounded-lg overflow-hidden">
          <button
            onClick={() => onViewModeChange('table')}
            className={`px-4 py-2 text-sm transition-colors ${
              viewMode === 'table'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-white text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            Tabla
          </button>
          <button
            onClick={() => onViewModeChange('cards')}
            className={`px-4 py-2 text-sm transition-colors border-l border-r border-[#E2E8F0] ${
              viewMode === 'cards'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-white text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            Tarjetas
          </button>
          <button
            onClick={() => onViewModeChange('map')}
            className={`px-4 py-2 text-sm transition-colors ${
              viewMode === 'map'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-white text-[#64748B] hover:bg-[#F8FAFC]'
            }`}
          >
            Mapa
          </button>
        </div>

        {/* Action Buttons */}
        <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
          <Download className="w-4 h-4" />
          Exportar
        </button>

        <button className="flex items-center gap-2 px-4 py-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
          <Upload className="w-4 h-4" />
          Importar
        </button>

        <button className="p-2 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
          <Settings className="w-4 h-4" />
        </button>

        <button
          onClick={() => navigate('/clientes/nuevo')}
          className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Nuevo Cliente
        </button>
      </div>
    </div>
  );
}