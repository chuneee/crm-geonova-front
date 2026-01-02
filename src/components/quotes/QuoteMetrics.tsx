import { FileText, Send, Eye, CheckCircle, XCircle, Clock, DollarSign, TrendingUp } from 'lucide-react';
import type { Quote } from '../../pages/Quotes';

interface QuoteMetricsProps {
  quotes: Quote[];
}

export function QuoteMetrics({ quotes }: QuoteMetricsProps) {
  const metrics = {
    total: quotes.length,
    draft: quotes.filter(q => q.status === 'draft').length,
    sent: quotes.filter(q => q.status === 'sent' || q.status === 'viewed').length,
    approved: quotes.filter(q => q.status === 'approved').length,
    rejected: quotes.filter(q => q.status === 'rejected').length,
    expired: quotes.filter(q => q.status === 'expired').length,
    totalValue: quotes.reduce((sum, q) => sum + q.total, 0),
    approvedValue: quotes.filter(q => q.status === 'approved').reduce((sum, q) => sum + q.total, 0),
    conversionRate: quotes.length > 0 
      ? Math.round((quotes.filter(q => q.status === 'approved').length / quotes.filter(q => q.status !== 'draft').length) * 100) || 0
      : 0,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="bg-gradient-to-b from-[#F8FAFC] to-white px-8 py-6">
      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#F1F5F9] rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#64748B]" />
            </div>
            <span className="text-2xl text-[#1E293B]">{metrics.total}</span>
          </div>
          <p className="text-xs text-[#64748B]">Total Cotizaciones</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#DBEAFE] rounded-lg flex items-center justify-center">
              <Send className="w-5 h-5 text-[#3B82F6]" />
            </div>
            <span className="text-2xl text-[#3B82F6]">{metrics.sent}</span>
          </div>
          <p className="text-xs text-[#64748B]">Enviadas / Vistas</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#D1FAE5] rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#10B981]" />
            </div>
            <span className="text-2xl text-[#10B981]">{metrics.approved}</span>
          </div>
          <p className="text-xs text-[#64748B]">Aprobadas</p>
        </div>

        <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="w-10 h-10 bg-[#EDE9FE] rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#8B5CF6]" />
            </div>
            <span className="text-2xl text-[#8B5CF6]">{metrics.conversionRate}%</span>
          </div>
          <p className="text-xs text-[#64748B]">Tasa de Conversión</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 opacity-90" />
            <span className="text-sm opacity-90">Valor Total</span>
          </div>
          <p className="text-2xl mb-1">{formatCurrency(metrics.totalValue)}</p>
          <p className="text-xs opacity-75">{metrics.total} cotizaciones</p>
        </div>

        <div className="bg-gradient-to-br from-[#10B981] to-[#3B82F6] rounded-lg p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-5 h-5 opacity-90" />
            <span className="text-sm opacity-90">Valor Aprobado</span>
          </div>
          <p className="text-2xl mb-1">{formatCurrency(metrics.approvedValue)}</p>
          <p className="text-xs opacity-75">{metrics.approved} cotizaciones aprobadas</p>
        </div>
      </div>
    </div>
  );
}
