import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Activity } from 'lucide-react';
import type { ReportFilters } from '../../pages/Reports';

interface ActivityChartProps {
  filters: ReportFilters;
}

const data = [
  { day: 'Lun', llamadas: 24, reuniones: 8, emails: 45, tareas: 18 },
  { day: 'Mar', llamadas: 28, reuniones: 12, emails: 52, tareas: 22 },
  { day: 'Mié', llamadas: 32, reuniones: 10, emails: 48, tareas: 20 },
  { day: 'Jue', llamadas: 26, reuniones: 15, emails: 56, tareas: 25 },
  { day: 'Vie', llamadas: 30, reuniones: 9, emails: 42, tareas: 16 },
  { day: 'Sáb', llamadas: 12, reuniones: 3, emails: 18, tareas: 8 },
  { day: 'Dom', llamadas: 8, reuniones: 2, emails: 12, tareas: 5 },
];

export function ActivityChart({ filters }: ActivityChartProps) {
  const totals = data.reduce(
    (acc, day) => ({
      llamadas: acc.llamadas + day.llamadas,
      reuniones: acc.reuniones + day.reuniones,
      emails: acc.emails + day.emails,
      tareas: acc.tareas + day.tareas,
    }),
    { llamadas: 0, reuniones: 0, emails: 0, tareas: 0 }
  );

  const totalActivities = Object.values(totals).reduce((sum, val) => sum + val, 0);

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

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg text-[#1E293B] mb-1">Actividad del Equipo</h3>
          <p className="text-sm text-[#64748B]">Registro de actividades de la semana</p>
        </div>
        <div className="text-right">
          <p className="text-2xl text-[#1E293B] mb-1">{totalActivities}</p>
          <p className="text-sm text-[#64748B]">actividades totales</p>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis 
            dataKey="day" 
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
            iconType="circle"
          />
          <Bar dataKey="llamadas" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Llamadas" />
          <Bar dataKey="reuniones" fill="#10B981" radius={[4, 4, 0, 0]} name="Reuniones" />
          <Bar dataKey="emails" fill="#8B5CF6" radius={[4, 4, 0, 0]} name="Emails" />
          <Bar dataKey="tareas" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Tareas" />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3 mt-4 pt-4 border-t border-[#E2E8F0]">
        <div className="text-center">
          <p className="text-2xl text-[#3B82F6] mb-1">{totals.llamadas}</p>
          <p className="text-xs text-[#64748B]">Llamadas</p>
        </div>
        <div className="text-center">
          <p className="text-2xl text-[#10B981] mb-1">{totals.reuniones}</p>
          <p className="text-xs text-[#64748B]">Reuniones</p>
        </div>
        <div className="text-center">
          <p className="text-2xl text-[#8B5CF6] mb-1">{totals.emails}</p>
          <p className="text-xs text-[#64748B]">Emails</p>
        </div>
        <div className="text-center">
          <p className="text-2xl text-[#F59E0B] mb-1">{totals.tareas}</p>
          <p className="text-xs text-[#64748B]">Tareas</p>
        </div>
      </div>
    </div>
  );
}
