import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Award, Target } from 'lucide-react';
import type { ReportFilters } from '../../pages/Reports';

interface TeamPerformanceProps {
  filters: ReportFilters;
}

const data = [
  { name: 'Carlos R.', ventas: 12, objetivo: 10, revenue: 850000, color: '#3B82F6' },
  { name: 'María G.', ventas: 15, objetivo: 12, revenue: 1020000, color: '#10B981' },
  { name: 'Luis M.', ventas: 9, objetivo: 10, revenue: 680000, color: '#F59E0B' },
  { name: 'Ana T.', ventas: 11, objetivo: 10, revenue: 790000, color: '#8B5CF6' },
  { name: 'Roberto S.', ventas: 8, objetivo: 8, revenue: 620000, color: '#EF4444' },
];

export function TeamPerformance({ filters }: TeamPerformanceProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#E2E8F0]">
          <p className="text-sm text-[#1E293B] mb-2">{data.name}</p>
          <div className="space-y-1">
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-[#64748B]">Ventas:</span>
              <span className="text-[#1E293B]">{data.ventas}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-[#64748B]">Objetivo:</span>
              <span className="text-[#1E293B]">{data.objetivo}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs">
              <span className="text-[#64748B]">Ingresos:</span>
              <span className="text-[#1E293B]">{formatCurrency(data.revenue)}</span>
            </div>
            <div className="flex items-center justify-between gap-4 text-xs pt-1 border-t border-[#E2E8F0]">
              <span className="text-[#64748B]">Cumplimiento:</span>
              <span className={data.ventas >= data.objetivo ? 'text-[#10B981]' : 'text-[#EF4444]'}>
                {Math.round((data.ventas / data.objetivo) * 100)}%
              </span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const totalSales = data.reduce((sum, member) => sum + member.ventas, 0);
  const totalRevenue = data.reduce((sum, member) => sum + member.revenue, 0);
  const topPerformer = data.reduce((max, member) => 
    member.ventas > max.ventas ? member : max
  );

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg text-[#1E293B] mb-1">Desempeño del Equipo</h3>
          <p className="text-sm text-[#64748B]">Ventas por miembro del equipo</p>
        </div>
        <div className="text-right">
          <p className="text-2xl text-[#1E293B] mb-1">{totalSales}</p>
          <p className="text-sm text-[#64748B]">ventas totales</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="name" 
            stroke="#94A3B8" 
            style={{ fontSize: '11px' }}
          />
          <YAxis 
            stroke="#94A3B8" 
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="ventas" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-[#E2E8F0]">
        <div className="p-4 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg text-white">
          <div className="flex items-center gap-2 mb-2">
            <Award className="w-4 h-4 opacity-90" />
            <span className="text-xs opacity-90">Top Performer</span>
          </div>
          <p className="text-lg mb-1">{topPerformer.name}</p>
          <p className="text-xs opacity-75">{topPerformer.ventas} ventas · {formatCurrency(topPerformer.revenue)}</p>
        </div>

        <div className="p-4 bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-lg text-white">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-4 h-4 opacity-90" />
            <span className="text-xs opacity-90">Ingresos Totales</span>
          </div>
          <p className="text-lg mb-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-xs opacity-75">{totalSales} ventas cerradas</p>
        </div>
      </div>

      {/* Individual Performance */}
      <div className="mt-4 space-y-2">
        {data.map((member) => {
          const achievement = (member.ventas / member.objetivo) * 100;
          
          return (
            <div key={member.name} className="flex items-center gap-3 p-2 hover:bg-[#F8FAFC] rounded transition-colors">
              <div 
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                style={{ backgroundColor: member.color }}
              >
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-[#1E293B]">{member.name}</span>
                  <span className={`text-xs ${achievement >= 100 ? 'text-[#10B981]' : 'text-[#64748B]'}`}>
                    {Math.round(achievement)}%
                  </span>
                </div>
                <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${Math.min(achievement, 100)}%`,
                      backgroundColor: achievement >= 100 ? '#10B981' : member.color,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
