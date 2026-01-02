import { Clock, CalendarCheck, Wrench, CheckCircle, RefreshCw, Target, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  count: number | string;
  color: string;
  icon: React.ReactNode;
  subtitle: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

function MetricCard({ title, count, color, icon, subtitle, trend }: MetricCardProps) {
  return (
    <div className="flex-1 bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
      <div className="h-1" style={{ backgroundColor: color }} />
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
              <div style={{ color }}>{icon}</div>
            </div>
            <div>
              <p className="text-xs text-[#64748B]">{title}</p>
              <p className="text-xl" style={{ color }}>{count}</p>
            </div>
          </div>
          {trend && (
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
              trend.direction === 'up' ? 'bg-[#FEF3C7] text-[#F59E0B]' : 'bg-[#DBEAFE] text-[#3B82F6]'
            }`}>
              {trend.direction === 'up' ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="text-xs">{Math.abs(trend.value)}</span>
            </div>
          )}
        </div>
        <p className="text-xs text-[#64748B]">{subtitle}</p>
      </div>
    </div>
  );
}

export function MetricsBar() {
  return (
    <div className="bg-gradient-to-b from-[#F8FAFC] to-white px-8 py-6">
      <div className="flex gap-3">
        <MetricCard
          title="Pendientes"
          count="23"
          color="#F59E0B"
          icon={<Clock className="w-5 h-5" />}
          subtitle="+5 vs ayer"
          trend={{ value: 5, direction: 'up' }}
        />
        
        <MetricCard
          title="Programadas"
          count="15"
          color="#3B82F6"
          icon={<CalendarCheck className="w-5 h-5" />}
          subtitle="Próximas 24h: 8"
        />
        
        <MetricCard
          title="En Proceso"
          count="12"
          color="#8B5CF6"
          icon={<Wrench className="w-5 h-5" />}
          subtitle="Técnicos activos: 8"
        />
        
        <MetricCard
          title="Completadas Hoy"
          count="7"
          color="#10B981"
          icon={<CheckCircle className="w-5 h-5" />}
          subtitle="Satisfacción avg: 4.8/5"
        />
        
        <MetricCard
          title="Reprogramadas"
          count="4"
          color="#EF4444"
          icon={<RefreshCw className="w-5 h-5" />}
          subtitle="Requieren atención"
        />
        
        <MetricCard
          title="SLA Compliance"
          count="94%"
          color="#10B981"
          icon={<Target className="w-5 h-5" />}
          subtitle="Meta: 95%"
        />
      </div>
    </div>
  );
}
