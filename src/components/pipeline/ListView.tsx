import { useState } from 'react';
import { TrendingUp, TrendingDown, Calendar, User, DollarSign, Target, ChevronDown, ChevronUp } from 'lucide-react';
import type { Opportunity } from '../PipelineManagement';
import React from 'react';

interface ListViewProps {
  opportunities: Opportunity[];
  onMoveOpportunity: (opportunityId: string, newStage: string) => void;
}

const stages = [
  { id: 'prospeccion', label: 'Prospección', color: 'bg-[#94A3B8]' },
  { id: 'calificacion', label: 'Calificación', color: 'bg-[#3B82F6]' },
  { id: 'propuesta', label: 'Propuesta', color: 'bg-[#8B5CF6]' },
  { id: 'negociacion', label: 'Negociación', color: 'bg-[#F59E0B]' },
  { id: 'ganado', label: 'Cerrado Ganado', color: 'bg-[#10B981]' },
  { id: 'perdido', label: 'Cerrado Perdido', color: 'bg-[#EF4444]' }
];

type SortField = 'title' | 'company' | 'value' | 'closeDate' | 'probability' | 'stage';
type SortDirection = 'asc' | 'desc';

export function ListView({ opportunities, onMoveOpportunity }: ListViewProps) {
  const [sortField, setSortField] = useState<SortField>('value');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedOpportunities = [...opportunities].sort((a, b) => {
    let comparison = 0;
    
    switch (sortField) {
      case 'title':
        comparison = a.title.localeCompare(b.title);
        break;
      case 'company':
        comparison = a.company.localeCompare(b.company);
        break;
      case 'value':
        comparison = a.value - b.value;
        break;
      case 'closeDate':
        comparison = new Date(a.closeDate).getTime() - new Date(b.closeDate).getTime();
        break;
      case 'probability':
        comparison = a.probability - b.probability;
        break;
      case 'stage':
        comparison = stages.findIndex(s => s.id === a.stage) - stages.findIndex(s => s.id === b.stage);
        break;
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const toggleExpanded = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  const getDaysUntilClose = (dateString: string) => {
    const today = new Date();
    const closeDate = new Date(dateString);
    const diffTime = closeDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const SortHeader = ({ field, children }: { field: SortField; children: React.ReactNode }) => (
    <th 
      className="px-6 py-4 text-left cursor-pointer hover:bg-[#F1F5F9] transition-colors"
      onClick={() => handleSort(field)}
    >
      <div className="flex items-center gap-2 text-[#64748B]">
        <span>{children}</span>
        {sortField === field && (
          sortDirection === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
        )}
      </div>
    </th>
  );

  return (
    <div className="h-full overflow-auto">
      <div className="min-w-[1200px]">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0] sticky top-0 z-10">
            <tr>
              <th className="w-12 px-6 py-4"></th>
              <SortHeader field="title">Oportunidad</SortHeader>
              <SortHeader field="company">Empresa</SortHeader>
              <SortHeader field="value">Valor</SortHeader>
              <SortHeader field="stage">Etapa</SortHeader>
              <SortHeader field="probability">Probabilidad</SortHeader>
              <SortHeader field="closeDate">Fecha Cierre</SortHeader>
              <th className="px-6 py-4 text-left text-[#64748B]">Asignado</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {sortedOpportunities.map((opp) => {
              const isExpanded = expandedRows.has(opp.id);
              const stage = stages.find(s => s.id === opp.stage);
              const daysUntilClose = getDaysUntilClose(opp.closeDate);
              const isOverdue = daysUntilClose < 0;
              const isClosingSoon = daysUntilClose >= 0 && daysUntilClose <= 7;

              return (
                <React.Fragment key={opp.id}>
                  <tr 
                    className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors cursor-pointer"
                    onClick={() => toggleExpanded(opp.id)}
                  >
                    <td className="px-6 py-4">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#1E293B]">{opp.title}</span>
                        <span className="text-sm text-[#64748B]">ID: {opp.id}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#1E293B]">{opp.company}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-[#10B981]" />
                        <span className="text-[#1E293B]">{formatCurrency(opp.value)}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs text-white ${stage?.color}`}>
                        {stage?.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#E2E8F0] rounded-full h-2 max-w-[80px]">
                          <div 
                            className="bg-[#3B82F6] h-2 rounded-full transition-all"
                            style={{ width: `${opp.probability}%` }}
                          />
                        </div>
                        <span className="text-sm text-[#1E293B] min-w-[40px]">{opp.probability}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-[#64748B]" />
                          <span className="text-[#1E293B]">{formatDate(opp.closeDate)}</span>
                        </div>
                        {isOverdue && (
                          <span className="text-xs text-[#EF4444] flex items-center gap-1 mt-1">
                            <TrendingDown className="w-3 h-3" />
                            Vencida ({Math.abs(daysUntilClose)} días)
                          </span>
                        )}
                        {isClosingSoon && (
                          <span className="text-xs text-[#F59E0B] flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3" />
                            Cierra en {daysUntilClose} días
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${opp.assignedTo.color} flex items-center justify-center text-white text-xs`}>
                          {opp.assignedTo.avatar}
                        </div>
                        <span className="text-sm text-[#1E293B]">{opp.assignedTo.name}</span>
                      </div>
                    </td>
                  </tr>
                  {isExpanded && (
                    <tr key={`${opp.id}-expanded`} className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                      <td colSpan={8} className="px-6 py-6">
                        <div className="flex gap-8">
                          <div className="flex-1 space-y-4">
                            <h4 className="text-sm text-[#64748B]">Detalles</h4>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <div className="text-xs text-[#64748B] mb-1">Progreso</div>
                                <div className="flex items-center gap-2">
                                  <div className="flex-1 bg-[#E2E8F0] rounded-full h-2">
                                    <div 
                                      className="bg-[#10B981] h-2 rounded-full transition-all"
                                      style={{ width: `${opp.progress}%` }}
                                    />
                                  </div>
                                  <span className="text-sm text-[#1E293B]">{opp.progress}%</span>
                                </div>
                              </div>
                              <div>
                                <div className="text-xs text-[#64748B] mb-1">Valor Ponderado</div>
                                <div className="text-sm text-[#1E293B]">
                                  {formatCurrency(opp.value * (opp.probability / 100))}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm text-[#64748B] mb-4">Cambiar Etapa</h4>
                            <div className="grid grid-cols-3 gap-2">
                              {stages.map(stage => (
                                <button
                                  key={stage.id}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    onMoveOpportunity(opp.id, stage.id);
                                  }}
                                  disabled={opp.stage === stage.id}
                                  className={`px-3 py-2 rounded-lg text-xs transition-colors ${
                                    opp.stage === stage.id
                                      ? `${stage.color} text-white cursor-default`
                                      : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:border-[#3B82F6] hover:text-[#3B82F6]'
                                  }`}
                                >
                                  {stage.label}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
        {sortedOpportunities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-[#64748B]">
            <Target className="w-12 h-12 mb-4 opacity-50" />
            <p>No se encontraron oportunidades</p>
          </div>
        )}
      </div>
    </div>
  );
}