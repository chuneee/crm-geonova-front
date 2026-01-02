import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Filter } from 'lucide-react';
import type { ReportFilters } from '../../pages/Reports';

interface PipelineChartProps {
  filters: ReportFilters;
}

const data = [
  { name: 'Prospecto', value: 15, color: '#94A3B8' },
  { name: 'Calificación', value: 12, color: '#3B82F6' },
  { name: 'Propuesta', value: 8, color: '#8B5CF6' },
  { name: 'Negociación', value: 6, color: '#F59E0B' },
  { name: 'Ganadas', value: 18, color: '#10B981' },
  { name: 'Perdidas', value: 5, color: '#EF4444' },
];

export function PipelineChart({ filters }: PipelineChartProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const wonRate = Math.round((data.find(d => d.name === 'Ganadas')!.value / total) * 100);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const percentage = ((payload[0].value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-[#E2E8F0]">
          <p className="text-sm text-[#1E293B] mb-1">{payload[0].name}</p>
          <p className="text-xs text-[#64748B]">
            {payload[0].value} oportunidades ({percentage}%)
          </p>
        </div>
      );
    }
    return null;
  };

  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent < 0.05) return null;

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        style={{ fontSize: '12px', fontWeight: 600 }}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg text-[#1E293B] mb-1">Pipeline de Ventas</h3>
          <p className="text-sm text-[#64748B]">Distribución de oportunidades por etapa</p>
        </div>
        <div className="text-right">
          <p className="text-2xl text-[#1E293B] mb-1">{total}</p>
          <p className="text-sm text-[#10B981]">{wonRate}% tasa de cierre</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between p-2 bg-[#F8FAFC] rounded">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-[#64748B]">{item.name}</span>
            </div>
            <span className="text-xs text-[#1E293B]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
