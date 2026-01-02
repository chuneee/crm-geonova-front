import { X, Send, Download, Copy, Edit2, Trash2, CheckCircle, XCircle, Eye, Calendar, User, FileText } from 'lucide-react';
import { useState } from 'react';
import type { Quote } from '../../pages/Quotes';

interface QuoteDetailModalProps {
  quote: Quote;
  onClose: () => void;
  onUpdate: (quote: Quote) => void;
}

const statusConfig = {
  draft: { label: 'Borrador', color: '#64748B', bg: '#F1F5F9' },
  sent: { label: 'Enviada', color: '#3B82F6', bg: '#DBEAFE' },
  viewed: { label: 'Vista', color: '#8B5CF6', bg: '#EDE9FE' },
  approved: { label: 'Aprobada', color: '#10B981', bg: '#D1FAE5' },
  rejected: { label: 'Rechazada', color: '#EF4444', bg: '#FEE2E2' },
  expired: { label: 'Expirada', color: '#F59E0B', bg: '#FEF3C7' },
};

export function QuoteDetailModal({ quote, onClose, onUpdate }: QuoteDetailModalProps) {
  const [activeTab, setActiveTab] = useState<'details' | 'history'>('details');
  const config = statusConfig[quote.status];

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('es-MX', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleApprove = () => {
    onUpdate({
      ...quote,
      status: 'approved',
      approvedAt: new Date().toISOString(),
    });
  };

  const handleReject = () => {
    onUpdate({
      ...quote,
      status: 'rejected',
      rejectedAt: new Date().toISOString(),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="border-b border-[#E2E8F0] px-6 py-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="text-xl text-[#1E293B] mb-1">{quote.quoteNumber}</h2>
              <p className="text-sm text-[#64748B]">Versión {quote.version}</p>
            </div>
            
            <div className="flex items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs"
                style={{ backgroundColor: config.bg, color: config.color }}
              >
                {config.label}
              </span>
              
              <button
                onClick={onClose}
                className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-[#E2E8F0] -mb-[1px]">
            <button
              onClick={() => setActiveTab('details')}
              className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                activeTab === 'details'
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              Detalles
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-4 py-2 text-sm border-b-2 transition-colors ${
                activeTab === 'history'
                  ? 'border-[#3B82F6] text-[#3B82F6]'
                  : 'border-transparent text-[#64748B] hover:text-[#1E293B]'
              }`}
            >
              Historial
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'details' ? (
            <div className="space-y-6">
              {/* Client Info */}
              <div>
                <h3 className="text-sm text-[#1E293B] mb-3">Información del Cliente</h3>
                <div className="flex items-center gap-3 p-4 bg-[#F8FAFC] rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center text-white flex-shrink-0">
                    {quote.client.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-[#1E293B] mb-0.5">{quote.client.name}</p>
                    <p className="text-xs text-[#64748B] mb-0.5">{quote.client.contact}</p>
                    <p className="text-xs text-[#64748B]">{quote.client.email}</p>
                  </div>
                </div>

                {quote.opportunity && (
                  <div className="mt-3 p-3 bg-[#F8FAFC] rounded-lg">
                    <p className="text-xs text-[#64748B] mb-1">Oportunidad vinculada</p>
                    <p className="text-sm text-[#1E293B]">{quote.opportunity.name}</p>
                  </div>
                )}
              </div>

              {/* Items */}
              <div>
                <h3 className="text-sm text-[#1E293B] mb-3">Productos y Servicios</h3>
                <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-[#F8FAFC]">
                      <tr>
                        <th className="text-left px-4 py-2 text-xs text-[#64748B]">Producto</th>
                        <th className="text-center px-4 py-2 text-xs text-[#64748B]">Cant.</th>
                        <th className="text-right px-4 py-2 text-xs text-[#64748B]">Precio Unit.</th>
                        <th className="text-right px-4 py-2 text-xs text-[#64748B]">Desc.</th>
                        <th className="text-right px-4 py-2 text-xs text-[#64748B]">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E8F0]">
                      {quote.items.map((item) => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">
                            <p className="text-sm text-[#1E293B]">{item.product}</p>
                            <p className="text-xs text-[#64748B]">{item.description}</p>
                          </td>
                          <td className="px-4 py-3 text-center text-sm text-[#1E293B]">
                            {item.quantity}
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-[#1E293B]">
                            {formatCurrency(item.unitPrice)}
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-[#10B981]">
                            {item.discount}%
                          </td>
                          <td className="px-4 py-3 text-right text-sm text-[#1E293B]">
                            {formatCurrency(item.total)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Totals */}
              <div className="bg-[#F8FAFC] rounded-lg p-4">
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">Subtotal</span>
                    <span className="text-[#1E293B]">{formatCurrency(quote.subtotal)}</span>
                  </div>
                  {quote.discount > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-[#64748B]">Descuento</span>
                      <span className="text-[#10B981]">-{formatCurrency(quote.discount)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#64748B]">IVA (16%)</span>
                    <span className="text-[#1E293B]">{formatCurrency(quote.tax)}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
                  <span className="text-lg text-[#1E293B]">Total</span>
                  <span className="text-2xl text-[#1E293B]">{formatCurrency(quote.total)}</span>
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-[#64748B]" />
                    <h4 className="text-xs text-[#64748B]">Válida hasta</h4>
                  </div>
                  <p className="text-sm text-[#1E293B]">
                    {new Date(quote.validUntil).toLocaleDateString('es-MX', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <User className="w-4 h-4 text-[#64748B]" />
                    <h4 className="text-xs text-[#64748B]">Creado por</h4>
                  </div>
                  <p className="text-sm text-[#1E293B]">{quote.createdBy.name}</p>
                </div>
              </div>

              {quote.paymentTerms && (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-[#64748B]" />
                    <h4 className="text-xs text-[#64748B]">Términos de Pago</h4>
                  </div>
                  <p className="text-sm text-[#1E293B]">{quote.paymentTerms}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-sm text-[#1E293B] mb-3">Historial de Actividad</h3>
              
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-[#E2E8F0]" />
                
                <div className="space-y-4">
                  <div className="relative pl-8">
                    <div className="absolute left-0 w-4 h-4 bg-[#3B82F6] rounded-full border-2 border-white" />
                    <div className="text-xs text-[#64748B] mb-0.5">
                      {formatDate(quote.createdAt)}
                    </div>
                    <div className="text-sm text-[#1E293B] mb-1">Cotización creada</div>
                    <div className="text-xs text-[#64748B]">Por {quote.createdBy.name}</div>
                  </div>

                  {quote.sentAt && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-4 h-4 bg-[#8B5CF6] rounded-full border-2 border-white" />
                      <div className="text-xs text-[#64748B] mb-0.5">
                        {formatDate(quote.sentAt)}
                      </div>
                      <div className="text-sm text-[#1E293B] mb-1">Cotización enviada</div>
                      <div className="text-xs text-[#64748B]">A {quote.client.email}</div>
                    </div>
                  )}

                  {quote.viewedAt && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-4 h-4 bg-[#F59E0B] rounded-full border-2 border-white" />
                      <div className="text-xs text-[#64748B] mb-0.5">
                        {formatDate(quote.viewedAt)}
                      </div>
                      <div className="text-sm text-[#1E293B]">Cotización vista por el cliente</div>
                    </div>
                  )}

                  {quote.approvedAt && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-4 h-4 bg-[#10B981] rounded-full border-2 border-white" />
                      <div className="text-xs text-[#64748B] mb-0.5">
                        {formatDate(quote.approvedAt)}
                      </div>
                      <div className="text-sm text-[#1E293B]">Cotización aprobada</div>
                    </div>
                  )}

                  {quote.rejectedAt && (
                    <div className="relative pl-8">
                      <div className="absolute left-0 w-4 h-4 bg-[#EF4444] rounded-full border-2 border-white" />
                      <div className="text-xs text-[#64748B] mb-0.5">
                        {formatDate(quote.rejectedAt)}
                      </div>
                      <div className="text-sm text-[#1E293B]">Cotización rechazada</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t border-[#E2E8F0] p-6 bg-[#F8FAFC]">
          <div className="flex gap-2">
            {quote.status === 'draft' && (
              <>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
                  <Send className="w-4 h-4" />
                  <span>Enviar Cotización</span>
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
                  <Edit2 className="w-4 h-4" />
                  <span>Editar</span>
                </button>
              </>
            )}

            {(quote.status === 'sent' || quote.status === 'viewed') && (
              <>
                <button
                  onClick={handleApprove}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#10B981] text-white rounded-lg hover:bg-[#059669] transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Aprobar</span>
                </button>
                <button
                  onClick={handleReject}
                  className="flex items-center gap-2 px-4 py-2.5 bg-[#EF4444] text-white rounded-lg hover:bg-[#DC2626] transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Rechazar</span>
                </button>
              </>
            )}

            <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors ml-auto">
              <Download className="w-4 h-4" />
              <span>Descargar PDF</span>
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
              <Copy className="w-4 h-4" />
              <span>Duplicar</span>
            </button>

            {quote.status !== 'approved' && quote.status !== 'rejected' && (
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white text-[#EF4444] border border-[#E2E8F0] rounded-lg hover:bg-[#FEF2F2] transition-colors">
                <Trash2 className="w-4 h-4" />
                <span>Eliminar</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
