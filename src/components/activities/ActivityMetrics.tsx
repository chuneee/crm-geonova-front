import { CheckCircle, Clock, AlertCircle, TrendingUp } from 'lucide-react';
import type { Activity } from '../../pages/Activities';

interface ActivityMetricsProps {
  activities: Activity[];
}

export function ActivityMetrics({ activities }: ActivityMetricsProps) {
  const today = new Date().toISOString().split('T')[0];
  
  const metrics = {
    pending: activities.filter(a => a.status === 'pending').length,
    completed: activities.filter(a => a.status === 'completed').length,
    overdue: activities.filter(a => a.status === 'overdue').length,
    today: activities.filter(a => a.dueDate === today).length,
    completionRate: activities.length > 0 
      ? Math.round((activities.filter(a => a.status === 'completed').length / activities.length) * 100)
      : 0,
  };

  return (
    <div className="bg-gradient-to-b from-[#F8FAFC] to-white px-8 py-6">
      <div className="grid grid-cols-5 gap-4">
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-2xl text-[#3B82F6]">{metrics.pending}</span>
          </div>
          <p className="text-xs text-[#64748B]">Pendientes</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#D1FAE5] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-2xl text-[#10B981]">{metrics.completed}</span>
          </div>
          <p className="text-xs text-[#64748B]">Completadas</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <span className="text-2xl text-[#EF4444]">{metrics.overdue}</span>
          </div>
          <p className="text-xs text-[#64748B]">Vencidas</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-2xl text-[#F59E0B]">{metrics.today}</span>
          </div>
          <p className="text-xs text-[#64748B]">Para hoy</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#EDE9FE] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="text-2xl text-[#8B5CF6]">{metrics.completionRate}%</span>
          </div>
          <p className="text-xs text-[#64748B]">Tasa de completado</p>
        </div>
      </div>
    </div>
  );
}
