import { Grid3x3, List, Plus, ChevronRight } from 'lucide-react';

interface CatalogHeaderProps {
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
}

export function CatalogHeader({ viewMode, onViewModeChange }: CatalogHeaderProps) {
  return (
    <div className="bg-white border-b border-[#E2E8F0]" style={{ minHeight: '64px' }}>
      <div className="px-8 py-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#64748B] mb-2">
          <span className="hover:text-[#3B82F6] cursor-pointer transition-colors">Productos</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#1E293B]">Catálogo</span>
        </div>

        {/* Title and Actions */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl text-[#1E293B]">Catálogo de Productos</h1>

          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex items-center gap-1 p-1 bg-[#F1F5F9] rounded-lg">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white text-[#3B82F6] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => onViewModeChange('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-white text-[#3B82F6] shadow-sm'
                    : 'text-[#64748B] hover:text-[#1E293B]'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            {/* New Product Button */}
            <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Nuevo Producto
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
