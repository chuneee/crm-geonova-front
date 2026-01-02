import { ChevronDown, Plus, ChevronRight, X } from 'lucide-react';
import { useState } from 'react';
import type { Customer } from '../../pages/Customers';

interface SidebarPanelProps {
  customers: Customer[];
}

export function SidebarPanel({ customers }: SidebarPanelProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const segmentCounts = {
    premium: customers.filter(c => c.segment === 'premium').length,
    corporate: customers.filter(c => c.segment === 'corporate').length,
    sme: customers.filter(c => c.segment === 'sme').length,
    individual: customers.filter(c => c.segment === 'individual').length
  };

  const total = customers.length;

  if (isCollapsed) {
    return (
      <div className="w-16 bg-white border-l border-[#E2E8F0] flex flex-col items-center py-6">
        <button
          onClick={() => setIsCollapsed(false)}
          className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    );
  }

  return (
    <div className="w-[320px] bg-white border-l border-[#E2E8F0] overflow-auto">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-[#1E293B]">Filtros Rápidos</h3>
          <button
            onClick={() => setIsCollapsed(true)}
            className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Saved Views */}
        <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
          <select className="w-full h-10 px-3 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6]">
            <option>Mis clientes</option>
            <option>Clientes premium</option>
            <option>En riesgo</option>
            <option>Inactivos &gt;90 días</option>
          </select>
          <button className="w-full mt-2 text-sm text-[#3B82F6] hover:underline flex items-center justify-center gap-1">
            <Plus className="w-4 h-4" />
            Guardar vista actual
          </button>
        </div>

        {/* Segments Visualization */}
        <div className="mb-6 pb-6 border-b border-[#E2E8F0]">
          <h4 className="text-sm text-[#64748B] mb-4">Distribución por Segmento</h4>
          
          {/* Simple Pie Chart Visual */}
          <div className="relative w-32 h-32 mx-auto mb-4">
            <svg viewBox="0 0 100 100" className="transform -rotate-90">
              {/* Premium - Gold */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="20"
                strokeDasharray={`${(segmentCounts.premium / total) * 251.2} 251.2`}
              />
              {/* Corporate - Blue */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#3B82F6"
                strokeWidth="20"
                strokeDasharray={`${(segmentCounts.corporate / total) * 251.2} 251.2`}
                strokeDashoffset={`-${(segmentCounts.premium / total) * 251.2}`}
              />
              {/* SME - Green */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#10B981"
                strokeWidth="20"
                strokeDasharray={`${(segmentCounts.sme / total) * 251.2} 251.2`}
                strokeDashoffset={`-${((segmentCounts.premium + segmentCounts.corporate) / total) * 251.2}`}
              />
              {/* Individual - Gray */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="20"
                strokeDasharray={`${(segmentCounts.individual / total) * 251.2} 251.2`}
                strokeDashoffset={`-${((segmentCounts.premium + segmentCounts.corporate + segmentCounts.sme) / total) * 251.2}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl text-[#1E293B]">{total}</div>
                <div className="text-xs text-[#64748B]">Total</div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2">
            <button className="w-full flex items-center justify-between p-2 hover:bg-[#F8FAFC] rounded transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#F59E0B]" />
                <span className="text-sm text-[#1E293B]">Premium</span>
              </div>
              <span className="text-sm text-[#64748B]">{segmentCounts.premium}</span>
            </button>
            <button className="w-full flex items-center justify-between p-2 hover:bg-[#F8FAFC] rounded transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
                <span className="text-sm text-[#1E293B]">Corporativo</span>
              </div>
              <span className="text-sm text-[#64748B]">{segmentCounts.corporate}</span>
            </button>
            <button className="w-full flex items-center justify-between p-2 hover:bg-[#F8FAFC] rounded transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#10B981]" />
                <span className="text-sm text-[#1E293B]">PyME</span>
              </div>
              <span className="text-sm text-[#64748B]">{segmentCounts.sme}</span>
            </button>
            <button className="w-full flex items-center justify-between p-2 hover:bg-[#F8FAFC] rounded transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#94A3B8]" />
                <span className="text-sm text-[#1E293B]">Individual</span>
              </div>
              <span className="text-sm text-[#64748B]">{segmentCounts.individual}</span>
            </button>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div>
          <h4 className="text-sm text-[#64748B] mb-4">Actividad Reciente</h4>
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                ML
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#1E293B]">
                  <span>María López</span> agregó nota a{' '}
                  <span className="text-[#3B82F6]">ACME Corp</span>
                </p>
                <p className="text-xs text-[#94A3B8]">Hace 2 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                CR
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#1E293B]">
                  <span>Carlos Ruiz</span> creó oportunidad para{' '}
                  <span className="text-[#3B82F6]">Tech Solutions</span>
                </p>
                <p className="text-xs text-[#94A3B8]">Hace 5 horas</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xs flex-shrink-0">
                LH
              </div>
              <div className="flex-1">
                <p className="text-xs text-[#1E293B]">
                  <span>Luis Hernández</span> registró llamada con{' '}
                  <span className="text-[#3B82F6]">Global Industries</span>
                </p>
                <p className="text-xs text-[#94A3B8]">Hace 1 día</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-4 text-sm text-[#3B82F6] hover:underline">
            Ver todas
          </button>
        </div>
      </div>
    </div>
  );
}
