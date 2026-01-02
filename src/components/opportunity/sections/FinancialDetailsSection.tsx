import { DollarSign, Percent, TrendingUp, CreditCard, Calendar } from 'lucide-react';

interface FinancialDetailsSectionProps {
  opportunity: any;
}

export function FinancialDetailsSection({ opportunity }: FinancialDetailsSectionProps) {
  const margin = ((opportunity.value - opportunity.estimatedCost) / opportunity.value) * 100;
  const finalValue = opportunity.value * (1 - opportunity.discount / 100);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Detalles Financieros</h3>
      
      <div className="grid grid-cols-3 gap-4">
        {/* Monto Estimado */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Monto estimado</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#10B981]" />
            <input 
              type="text"
              className="w-full h-11 pl-10 pr-4 border-2 border-[#3B82F6] rounded-lg text-[#3B82F6] text-lg bg-white focus:outline-none focus:border-[#2563EB] transition-colors"
              defaultValue={formatCurrency(opportunity.value)}
            />
          </div>
        </div>

        {/* Descuento Aplicado */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Descuento aplicado</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input 
              type="number"
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.discount}
              min="0"
              max="100"
            />
          </div>
        </div>

        {/* Costo Estimado */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Costo estimado</label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input 
              type="text"
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={formatCurrency(opportunity.estimatedCost)}
            />
          </div>
        </div>

        {/* Margen Proyectado */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Margen proyectado</label>
          <div className="relative">
            <TrendingUp className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${margin > 50 ? 'text-[#10B981]' : margin > 30 ? 'text-[#F59E0B]' : 'text-[#EF4444]'}`} />
            <div className={`w-full h-11 pl-10 pr-4 border-2 rounded-lg flex items-center text-lg ${
              margin > 50 
                ? 'border-[#10B981] text-[#10B981]' 
                : margin > 30 
                ? 'border-[#F59E0B] text-[#F59E0B]' 
                : 'border-[#EF4444] text-[#EF4444]'
            }`}>
              {margin.toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Método de Pago */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Método de pago</label>
          <div className="relative">
            <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select 
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.paymentMethod}
            >
              <option>{opportunity.paymentMethod}</option>
              <option>Tarjeta de crédito</option>
              <option>Cheque</option>
              <option>Efectivo</option>
            </select>
          </div>
        </div>

        {/* Términos */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Términos</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select 
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.paymentTerms}
            >
              <option>Contado</option>
              <option>{opportunity.paymentTerms}</option>
              <option>60 días</option>
              <option>90 días</option>
            </select>
          </div>
        </div>
      </div>

      {/* Summary Bar */}
      <div className="mt-4 pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
        <div className="text-sm text-[#64748B]">
          Valor final después de descuento
        </div>
        <div className="text-2xl text-[#10B981]">
          {formatCurrency(finalValue)}
        </div>
      </div>
    </div>
  );
}
