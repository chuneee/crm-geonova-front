import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, TrendingUp } from 'lucide-react';
import type { ReportFilters } from '../../pages/Reports';

interface CustomerAnalysisProps {
  filters: ReportFilters;
}

const data = [
  { month: 'Ene', nuevos: 12, activos: 95, churned: 3 },
  { month: 'Feb', nuevos: 15, activos: 107, churned: 2 },
  { month: 'Mar', nuevos: 18, activos: 123, churned: 1 },
  { month: 'Abr', nuevos: 10, activos: 132, churned: 4 },
  { month: 'May', nuevos: 22, activos: 150, churned: 2 },
  { month: 'Jun', nuevos: 16, activos: 164, churned: 3 },
  { month: 'Jul', nuevos: 20, activos: 181, churned: 1 },
  { month: 'Ago', nuevos: 14, activos: 194, churned: 2 },
  { month: 'Sep', nuevos: 25, activos: 217, churned: 1 },
  { month: 'Oct', nuevos: 19, activos: 235, churned: 2 },
  { month: 'Nov', nuevos: 23, activos: 256, churned: 3 },
  { month: 'Dic', nuevos: 28, activos: 281, churned: 1 },
];

export function CustomerAnalysis({ filters }: CustomerAnalysisProps) {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#E2E8F0]">
          <p className="text-sm text-[#1E293B] mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs mb-1">
              <div className="flex items-center gap-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-[#64748B]">{entry.name}:</span>
              </div>
              <span className="text-[#1E293B]">{entry.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const totalNuevos = data.reduce((sum, month) => sum + month.nuevos, 0);
  const totalActivos = data[data.length - 1].activos;
  const growthRate = Math.round(
    ((data[data.length - 1].activos - data[0].activos) / data[0].activos) * 100
  );

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg text-[#1E293B] mb-1">Análisis de Clientes</h3>
          <p className="text-sm text-[#64748B]">Crecimiento y retención de la base de clientes</p>
        </div>
        <div className="text-right">
          <p className="text-2xl text-[#1E293B] mb-1">{totalActivos}</p>
          <div className="flex items-center gap-1 text-sm text-[#10B981]">
            <TrendingUp className="w-4 h-4" />
            <span>+{growthRate}%</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="month" 
            stroke="#94A3B8" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#94A3B8" 
            style={{ fontSize: '12px' }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            iconType="line"
          />
          <Line 
            type="monotone" 
            dataKey="activos" 
            stroke="#3B82F6" 
            strokeWidth={3}
            dot={{ fill: '#3B82F6', r: 4 }}
            activeDot={{ r: 6 }}
            name="Clientes Activos"
          />
          <Line 
            type="monotone" 
            dataKey="nuevos" 
            stroke="#10B981" 
            strokeWidth={2}
            dot={{ fill: '#10B981', r: 3 }}
            name="Nuevos Clientes"
          />
          <Line 
            type="monotone" 
            dataKey="churned" 
            stroke="#EF4444" 
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ fill: '#EF4444', r: 3 }}
            name="Bajas"
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-[#E2E8F0]">
        <div className="text-center p-3 bg-[#F0F9FF] rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Users className="w-4 h-4 text-[#3B82F6]" />
          </div>
          <p className="text-2xl text-[#3B82F6] mb-1">{totalActivos}</p>
          <p className="text-xs text-[#64748B]">Base Activa</p>
        </div>

        <div className="text-center p-3 bg-[#F0FDF4] rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-2">
            <TrendingUp className="w-4 h-4 text-[#10B981]" />
          </div>
          <p className="text-2xl text-[#10B981] mb-1">{totalNuevos}</p>
          <p className="text-xs text-[#64748B]">Nuevos (año)</p>
        </div>

        <div className="text-center p-3 bg-[#FEF2F2] rounded-lg">
          <div className="flex items-center justify-center gap-1 mb-2">
            <TrendingUp className="w-4 h-4 text-[#EF4444] rotate-180" />
          </div>
          <p className="text-2xl text-[#EF4444] mb-1">
            {data.reduce((sum, m) => sum + m.churned, 0)}
          </p>
          <p className="text-xs text-[#64748B]">Bajas (año)</p>
        </div>
      </div>

      {/* Retention Rate */}
      <div className="mt-4 p-4 bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] rounded-lg text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs opacity-90 mb-1">Tasa de Retención</p>
            <p className="text-2xl">
              {Math.round(
                ((totalActivos - data.reduce((sum, m) => sum + m.churned, 0)) / totalActivos) * 100
              )}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-90 mb-1">Crecimiento Neto</p>
            <p className="text-2xl">+{growthRate}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
