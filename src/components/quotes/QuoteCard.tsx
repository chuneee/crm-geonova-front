import { Calendar, Eye, Send, Copy, MoreVertical, Clock, CheckCircle, XCircle, FileText } from 'lucide-react';
import type { Quote } from '../../pages/Quotes';

interface QuoteCardProps {
  quote: Quote;
  onClick: () => void;
}

const statusConfig = {
  draft: { label: 'Borrador', color: '#64748B', bg: '#F1F5F9', icon: FileText },
  sent: { label: 'Enviada', color: '#3B82F6', bg: '#DBEAFE', icon: Send },
  viewed: { label: 'Vista', color: '#8B5CF6', bg: '#EDE9FE', icon: Eye },
  approved: { label: 'Aprobada', color: '#10B981', bg: '#D1FAE5', icon: CheckCircle },
  rejected: { label: 'Rechazada', color: '#EF4444', bg: '#FEE2E2', icon: XCircle },
  expired: { label: 'Expirada', color: '#F59E0B', bg: '#FEF3C7', icon: Clock },
};

export function QuoteCard({ quote, onClick }: QuoteCardProps) {
  const config = statusConfig[quote.status];
  const StatusIcon = config.icon;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const isExpiringSoon = () => {
    const today = new Date();
    const validUntil = new Date(quote.validUntil);
    const daysUntilExpiry = Math.ceil((validUntil.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilExpiry <= 7 && daysUntilExpiry > 0 && quote.status !== 'expired' && quote.status !== 'approved' && quote.status !== 'rejected';
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-[#E2E8F0] hover:shadow-md transition-all cursor-pointer overflow-hidden group"
    >
      {/* Header */}
      <div className="p-4 border-b border-[#E2E8F0]">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-sm text-[#1E293B] mb-1">{quote.quoteNumber}</h3>
            <p className="text-xs text-[#64748B]">
              Versión {quote.version} · {formatDate(quote.createdAt)}
            </p>
          </div>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="p-1 opacity-0 group-hover:opacity-100 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-all"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Status Badge */}
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
          style={{ backgroundColor: config.bg, color: config.color }}
        >
          <StatusIcon className="w-3.5 h-3.5" />
          <span>{config.label}</span>
        </div>
      </div>

      {/* Client Info */}
      <div className="p-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white flex-shrink-0">
            {quote.client.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#1E293B] truncate">{quote.client.name}</p>
            <p className="text-xs text-[#64748B] truncate">{quote.client.contact}</p>
          </div>
        </div>

        {quote.opportunity && (
          <div className="p-2 bg-[#F8FAFC] rounded text-xs text-[#64748B]">
            <span className="opacity-75">Oportunidad:</span> {quote.opportunity.name}
          </div>
        )}
      </div>

      {/* Items Summary */}
      <div className="p-4 border-b border-[#E2E8F0]">
        <div className="space-y-2">
          {quote.items.slice(0, 2).map((item) => (
            <div key={item.id} className="flex items-start justify-between">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-xs text-[#1E293B] truncate">{item.product}</p>
                <p className="text-xs text-[#64748B]">Cant: {item.quantity}</p>
              </div>
              <p className="text-xs text-[#64748B]">{formatCurrency(item.total)}</p>
            </div>
          ))}
          {quote.items.length > 2 && (
            <p className="text-xs text-[#3B82F6]">+{quote.items.length - 2} productos más</p>
          )}
        </div>
      </div>

      {/* Pricing */}
      <div className="p-4 bg-[#F8FAFC]">
        <div className="space-y-1 mb-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748B]">Subtotal</span>
            <span className="text-[#1E293B]">{formatCurrency(quote.subtotal)}</span>
          </div>
          {quote.discount > 0 && (
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#64748B]">Descuento</span>
              <span className="text-[#10B981]">-{formatCurrency(quote.discount)}</span>
            </div>
          )}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#64748B]">IVA</span>
            <span className="text-[#1E293B]">{formatCurrency(quote.tax)}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
          <span className="text-sm text-[#64748B]">Total</span>
          <span className="text-xl text-[#1E293B]">{formatCurrency(quote.total)}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 bg-white">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-[#64748B]" />
            <span className="text-[#64748B]">Válida hasta:</span>
          </div>
          <span className={isExpiringSoon() ? 'text-[#F59E0B]' : 'text-[#1E293B]'}>
            {formatDate(quote.validUntil)}
          </span>
        </div>

        {isExpiringSoon() && (
          <div className="mt-2 p-2 bg-[#FEF3C7] rounded text-xs text-[#F59E0B] flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>Vence pronto</span>
          </div>
        )}

        {/* Quick Actions */}
        <div className="flex gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {quote.status === 'draft' && (
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex-1 px-3 py-1.5 bg-[#3B82F6] text-white rounded text-xs hover:bg-[#2563EB] transition-colors"
            >
              Enviar
            </button>
          )}
          {(quote.status === 'sent' || quote.status === 'viewed') && (
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex-1 px-3 py-1.5 bg-[#10B981] text-white rounded text-xs hover:bg-[#059669] transition-colors"
            >
              Aprobar
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="flex items-center justify-center gap-1 px-3 py-1.5 bg-white border border-[#E2E8F0] text-[#64748B] rounded text-xs hover:bg-[#F8FAFC] transition-colors"
          >
            <Copy className="w-3 h-3" />
            <span>Duplicar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
