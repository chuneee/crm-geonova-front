import { useState } from 'react';
import { ChevronRight, ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const categories = [
  {
    id: 'drones',
    name: 'Drones',
    count: 12,
    children: [
      { id: 'dji', name: 'DJI', count: 8 },
      { id: 'autel', name: 'Autel', count: 4 }
    ]
  },
  { id: 'servicios', name: 'Servicios', count: 5, children: [] },
  { id: 'software', name: 'Software', count: 3, children: [] },
  {
    id: 'accesorios',
    name: 'Accesorios',
    count: 15,
    children: [
      { id: 'baterias', name: 'Baterías', count: 6 },
      { id: 'propellers', name: 'Propellers', count: 9 }
    ]
  }
];

const priceRanges = [
  { id: 'low', label: 'Menos de $1,000', count: 23 },
  { id: 'mid-low', label: '$1,000 - $5,000', count: 45 },
  { id: 'mid-high', label: '$5,000 - $10,000', count: 18 },
  { id: 'high', label: 'Más de $10,000', count: 8 }
];

const availability = [
  { id: 'in-stock', label: 'En stock', count: 89 },
  { id: 'low-stock', label: 'Stock bajo', count: 12 },
  { id: 'out-of-stock', label: 'Agotado', count: 5 }
];

const tags = ['Popular', 'Nuevo', 'Oferta', 'Importado', 'Nacional', 'Premium'];

const tagColors: Record<string, string> = {
  Popular: 'bg-[#3B82F6] text-white',
  Nuevo: 'bg-[#10B981] text-white',
  Oferta: 'bg-[#F59E0B] text-white',
  Importado: 'bg-[#8B5CF6] text-white',
  Nacional: 'bg-[#06B6D4] text-white',
  Premium: 'bg-[#EC4899] text-white'
};

export function FilterSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['drones', 'accesorios']));

  const toggleCategory = (categoryId: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryId)) {
        newSet.delete(categoryId);
      } else {
        newSet.add(categoryId);
      }
      return newSet;
    });
  };

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white border-r border-[#E2E8F0] flex flex-col items-center py-6">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[280px] bg-white border-r border-[#E2E8F0] overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#1E293B] flex items-center gap-2">
            <SlidersHorizontal className="w-5 h-5" />
            Filtros
          </h3>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-6">
          <h4 className="text-sm text-[#64748B] mb-3">Categorías</h4>
          <div className="space-y-1">
            {categories.map((category) => (
              <div key={category.id}>
                <button
                  onClick={() => toggleCategory(category.id)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#1E293B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {category.children.length > 0 && (
                      expandedCategories.has(category.id) ? 
                        <ChevronDown className="w-4 h-4 text-[#64748B]" /> : 
                        <ChevronRight className="w-4 h-4 text-[#64748B]" />
                    )}
                    <span>{category.name}</span>
                  </div>
                  <span className="text-xs text-[#94A3B8]">({category.count})</span>
                </button>
                
                {expandedCategories.has(category.id) && category.children.length > 0 && (
                  <div className="ml-6 mt-1 space-y-1">
                    {category.children.map((child) => (
                      <button
                        key={child.id}
                        className="w-full flex items-center justify-between px-3 py-2 text-sm text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
                      >
                        <span>{child.name}</span>
                        <span className="text-xs text-[#94A3B8]">({child.count})</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Price Ranges */}
        <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
          <h4 className="text-sm text-[#64748B] mb-3">Rango de Precio</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.id}
                className="flex items-center justify-between px-3 py-2 hover:bg-[#F8FAFC] rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#E2E8F0] cursor-pointer accent-[#3B82F6]"
                  />
                  <span className="text-sm text-[#1E293B]">{range.label}</span>
                </div>
                <span className="text-xs text-[#94A3B8]">({range.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Availability */}
        <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
          <h4 className="text-sm text-[#64748B] mb-3">Disponibilidad</h4>
          <div className="space-y-2">
            {availability.map((item) => (
              <label
                key={item.id}
                className="flex items-center justify-between px-3 py-2 hover:bg-[#F8FAFC] rounded-lg cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-[#E2E8F0] cursor-pointer accent-[#3B82F6]"
                  />
                  <span className="text-sm text-[#1E293B]">{item.label}</span>
                </div>
                <span className="text-xs text-[#94A3B8]">({item.count})</span>
              </label>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div>
          <h4 className="text-sm text-[#64748B] mb-3">Etiquetas</h4>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <button
                key={tag}
                className={`px-3 py-1 rounded-full text-xs transition-all hover:scale-105 ${tagColors[tag]}`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
