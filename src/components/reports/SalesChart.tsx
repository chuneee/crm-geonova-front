import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import type { ReportFilters } from '../../pages/Reports';

interface SalesChartProps {
  filters: ReportFilters;
}

const data = [
  { month: 'Ene', ventas: 420000, objetivo: 400000, anterior: 380000 },
  { month: 'Feb', ventas: 380000, objetivo: 400000, anterior: 350000 },
  { month: 'Mar', ventas: 510000, objetivo: 450000, anterior: 420000 },
  { month: 'Abr', ventas: 480000, objetivo: 450000, anterior: 390000 },
  { month: 'May', ventas: 620000, objetivo: 500000, anterior: 480000 },
  { month: 'Jun', ventas: 580000, objetivo: 500000, anterior: 510000 },
  { month: 'Jul', ventas: 690000, objetivo: 550000, anterior: 540000 },
  { month: 'Ago', ventas: 720000, objetivo: 600000, anterior: 580000 },
  { month: 'Sep', ventas: 650000, objetivo: 600000, anterior: 590000 },
  { month: 'Oct', ventas: 780000, objetivo: 650000, anterior: 620000 },
  { month: 'Nov', ventas: 850000, objetivo: 700000, anterior: 680000 },
  { month: 'Dic', ventas: 920000, objetivo: 750000, anterior: 750000 },
];

export function SalesChart({ filters }: SalesChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-[#E2E8F0]">
          <p className="text-sm text-[#1E293B] mb-2">{label}</p>
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center justify-between gap-4 text-xs">
              <span style={{ color: entry.color }}>{entry.name}:</span>
              <span className="text-[#1E293B]">{formatCurrency(entry.value)}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  const total = data.reduce((sum, item) => sum + item.ventas, 0);
  const objetivo = data.reduce((sum, item) => sum + item.objetivo, 0);
  const cumplimiento = Math.round((total / objetivo) * 100);

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg text-[#1E293B] mb-1">Desempeño de Ventas</h3>
          <p className="text-sm text-[#64748B]">Comparación con objetivos y periodo anterior</p>
        </div>
        <div className="text-right">
          <p className="text-2xl text-[#1E293B] mb-1">{formatCurrency(total)}</p>
          <div className="flex items-center gap-1 text-sm text-[#10B981]">
            <TrendingUp className="w-4 h-4" />
            <span>{cumplimiento}% del objetivo</span>
          </div>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorVentas" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorObjetivo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10B981" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorAnterior" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#94A3B8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="month" 
            stroke="#94A3B8" 
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#94A3B8" 
            style={{ fontSize: '12px' }}
            tickFormatter={(value) => `$${(value / 1000)}K`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }}
            iconType="line"
          />
          <Area 
            type="monotone" 
            dataKey="anterior" 
            stroke="#94A3B8" 
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorAnterior)"
            name="Año anterior"
          />
          <Area 
            type="monotone" 
            dataKey="objetivo" 
            stroke="#10B981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            fillOpacity={1} 
            fill="url(#colorObjetivo)"
            name="Objetivo"
          />
          <Area 
            type="monotone" 
            dataKey="ventas" 
            stroke="#3B82F6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorVentas)"
            name="Ventas"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
