import { Ticket, AlertCircle, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import type { Ticket as TicketType } from '../../pages/Tickets';

interface TicketMetricsProps {
  tickets: TicketType[];
}

export function TicketMetrics({ tickets }: TicketMetricsProps) {
  const now = new Date();
  
  const metrics = {
    total: tickets.length,
    new: tickets.filter(t => t.status === 'new').length,
    open: tickets.filter(t => t.status === 'open').length,
    pending: tickets.filter(t => t.status === 'pending').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
    closed: tickets.filter(t => t.status === 'closed').length,
    urgent: tickets.filter(t => t.priority === 'urgent').length,
    overdue: tickets.filter(t => {
      if (!t.dueDate || t.status === 'closed' || t.status === 'resolved') return false;
      return new Date(t.dueDate) < now;
    }).length,
    avgResolutionTime: '4.2h',
    satisfactionRate: Math.round(
      (tickets.filter(t => t.satisfaction && t.satisfaction >= 4).length / 
       tickets.filter(t => t.satisfaction).length) * 100
    ) || 0,
  };

  return (
    <div className="bg-gradient-to-b from-[#F8FAFC] to-white px-8 py-6">
      <div className="grid grid-cols-6 gap-4">
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
              <Ticket className="w-5 h-5 text-[#64748B]" />
            </div>
            <span className="text-2xl text-[#1E293B]">{metrics.total}</span>
          </div>
          <p className="text-xs text-[#64748B]">Total Tickets</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-2xl text-[#3B82F6]">{metrics.new}</span>
          </div>
          <p className="text-xs text-[#64748B]">Nuevos</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#FEF3C7] rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
            </div>
            <span className="text-2xl text-[#F59E0B]">{metrics.open}</span>
          </div>
          <p className="text-xs text-[#64748B]">Abiertos</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#D1FAE5] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-2xl text-[#10B981]">{metrics.resolved}</span>
          </div>
          <p className="text-xs text-[#64748B]">Resueltos</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#FEE2E2] rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-[#EF4444]" />
            </div>
            <span className="text-2xl text-[#EF4444]">{metrics.urgent}</span>
          </div>
          <p className="text-xs text-[#64748B]">Urgentes</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#EDE9FE] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="text-2xl text-[#8B5CF6]">{metrics.satisfactionRate}%</span>
          </div>
          <p className="text-xs text-[#64748B]">Satisfacción</p>
        </div>
      </div>
    </div>
  );
}
