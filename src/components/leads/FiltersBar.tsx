import { Search, Calendar, X, SlidersHorizontal } from 'lucide-react';
import { useState } from 'react';

export function FiltersBar() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="px-4 md:px-8 py-4 md:py-5">
      {/* Top Row - Search and Filter Toggle */}
      <div className="flex gap-3 mb-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
          <input
            type="text"
            placeholder="Buscar por nombre, email o empresa..."
            className="w-full h-10 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
          />
        </div>

        {/* Filter Toggle - Mobile Only */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden h-10 px-3 bg-white border border-[#E2E8F0] rounded-lg flex items-center gap-2 hover:bg-[#F8FAFC] transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4 text-[#64748B]" />
          <span className="text-sm text-gray-700">Filtros</span>
        </button>
      </div>

      {/* Bottom Row - Filters (Always visible on desktop, toggle on mobile) */}
      <div className={`${showFilters ? 'block' : 'hidden lg:block'}`}>
        <div className="flex flex-col lg:flex-row lg:flex-wrap lg:items-center gap-3">
          {/* Status Filter */}
          <select className="h-10 px-3 bg-white border border-[#E2E8F0] rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] flex-shrink-0">
            <option>Todos los estados</option>
            <option>Nuevo</option>
            <option>Contactado</option>
            <option>Calificado</option>
            <option>Descalificado</option>
          </select>

          {/* Source Filter */}
          <select className="h-10 px-3 bg-white border border-[#E2E8F0] rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] flex-shrink-0">
            <option>Todas las fuentes</option>
            <option>Web</option>
            <option>Referido</option>
            <option>Llamada</option>
            <option>Redes Sociales</option>
          </select>

          {/* Date Range Picker */}
          <div className="relative flex-shrink-0">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" />
            <input
              type="text"
              placeholder="Rango de fechas"
              className="h-10 pl-10 pr-4 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] w-full"
            />
          </div>

          {/* Assigned User Filter */}
          <select className="h-10 px-3 bg-white border border-[#E2E8F0] rounded-lg text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#3B82F6] flex-shrink-0">
            <option>Todos los usuarios</option>
            <option>Carlos Rodríguez</option>
            <option>María González</option>
            <option>Juan López</option>
            <option>Ana Martínez</option>
          </select>

          {/* Clear Filters */}
          <button className="lg:ml-auto text-sm text-[#3B82F6] hover:text-[#2563EB] flex items-center gap-1 transition-colors h-10 px-3 justify-center lg:justify-start">
            <X className="w-4 h-4" />
            <span>Limpiar</span>
          </button>
        </div>
      </div>
    </div>
  );
}