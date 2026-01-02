import { Eye, Send, Copy, Download, MoreVertical } from 'lucide-react';
import type { Quote } from '../../pages/Quotes';

interface QuoteTableProps {
  quotes: Quote[];
  onQuoteClick: (quote: Quote) => void;
}

const statusConfig = {
  draft: { label: 'Borrador', color: '#64748B', bg: '#F1F5F9' },
  sent: { label: 'Enviada', color: '#3B82F6', bg: '#DBEAFE' },
  viewed: { label: 'Vista', color: '#8B5CF6', bg: '#EDE9FE' },
  approved: { label: 'Aprobada', color: '#10B981', bg: '#D1FAE5' },
  rejected: { label: 'Rechazada', color: '#EF4444', bg: '#FEE2E2' },
  expired: { label: 'Expirada', color: '#F59E0B', bg: '#FEF3C7' },
};

export function QuoteTable({ quotes, onQuoteClick }: QuoteTableProps) {
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

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                # Cotización
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Cliente
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Estado
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Productos
              </th>
              <th className="text-right px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Total
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Válida hasta
              </th>
              <th className="text-left px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Creado por
              </th>
              <th className="text-center px-6 py-3 text-xs text-[#64748B] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {quotes.map((quote) => {
              const config = statusConfig[quote.status];
              
              return (
                <tr
                  key={quote.id}
                  onClick={() => onQuoteClick(quote)}
                  className="hover:bg-[#F8FAFC] transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm text-[#1E293B]">{quote.quoteNumber}</p>
                      <p className="text-xs text-[#64748B]">v{quote.version}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded flex items-center justify-center text-white text-xs flex-shrink-0">
                        {quote.client.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm text-[#1E293B]">{quote.client.name}</p>
                        <p className="text-xs text-[#64748B]">{quote.client.contact}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-xs"
                      style={{ backgroundColor: config.bg, color: config.color }}
                    >
                      {config.label}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1E293B]">{quote.items.length} producto{quote.items.length !== 1 ? 's' : ''}</p>
                    <p className="text-xs text-[#64748B] truncate max-w-[200px]">
                      {quote.items[0]?.product}
                      {quote.items.length > 1 && ` +${quote.items.length - 1}`}
                    </p>
                  </td>

                  <td className="px-6 py-4 text-right">
                    <p className="text-sm text-[#1E293B]">{formatCurrency(quote.total)}</p>
                    {quote.discount > 0 && (
                      <p className="text-xs text-[#10B981]">-{formatCurrency(quote.discount)} desc.</p>
                    )}
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-[#1E293B]">{formatDate(quote.validUntil)}</p>
                    <p className="text-xs text-[#64748B]">{formatDate(quote.createdAt)}</p>
                  </td>

                  <td className="px-6 py-4">
                    <p className="text-sm text-[#64748B]">{quote.createdBy.name}</p>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
                        title="Ver"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      
                      {quote.status === 'draft' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
                          title="Enviar"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
                        title="Duplicar"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
                        title="Descargar"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1.5 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
                        title="Más opciones"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
