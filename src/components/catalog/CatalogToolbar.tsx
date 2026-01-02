import { Search, Filter, ChevronDown, X, Edit, FolderOpen, Power } from 'lucide-react';

interface CatalogToolbarProps {
  selectedCount: number;
  onClearSelection: () => void;
  onBulkEdit: () => void;
}

export function CatalogToolbar({ selectedCount, onClearSelection, onBulkEdit }: CatalogToolbarProps) {
  return (
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]" style={{ minHeight: '72px' }}>
      <div className="px-8 py-3">
        {/* Top Row */}
        <div className="flex items-center gap-3 mb-3">
          {/* Search */}
          <div className="relative" style={{ width: '400px' }}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input
              type="text"
              placeholder="Buscar por nombre, SKU, categoría..."
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg bg-white text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
            />
          </div>

          {/* Category Filter */}
          <button className="h-11 px-4 border border-[#E2E8F0] bg-white rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            <FolderOpen className="w-5 h-5" />
            Categorías
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Status Filter */}
          <button className="h-11 px-4 border border-[#E2E8F0] bg-white rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Estado
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Price Range */}
          <button className="h-11 px-4 border border-[#E2E8F0] bg-white rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
            Precio
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Clear */}
          <button className="text-sm text-[#3B82F6] hover:underline">
            Limpiar
          </button>
        </div>

        {/* Bottom Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Sort */}
            <select className="h-9 px-3 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#64748B] focus:outline-none focus:border-[#3B82F6]">
              <option>Más reciente</option>
              <option>Nombre A-Z</option>
              <option>Precio menor-mayor</option>
              <option>Más vendidos</option>
            </select>

            {/* Bulk Actions */}
            {selectedCount > 0 && (
              <>
                <div className="h-6 w-px bg-[#E2E8F0]" />
                <span className="text-sm text-[#64748B]">
                  {selectedCount} producto{selectedCount > 1 ? 's' : ''} seleccionado{selectedCount > 1 ? 's' : ''}
                </span>
                <button 
                  onClick={onBulkEdit}
                  className="h-9 px-3 border border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2 text-sm"
                >
                  <Edit className="w-4 h-4" />
                  Editar precios
                </button>
                <button className="h-9 px-3 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-white transition-colors flex items-center gap-2 text-sm">
                  <FolderOpen className="w-4 h-4" />
                  Cambiar categoría
                </button>
                <button className="h-9 px-3 border border-[#E2E8F0] text-[#64748B] rounded-lg hover:bg-white transition-colors flex items-center gap-2 text-sm">
                  <Power className="w-4 h-4" />
                  Activar/Desactivar
                </button>
                <button 
                  onClick={onClearSelection}
                  className="p-1.5 text-[#64748B] hover:bg-white rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
