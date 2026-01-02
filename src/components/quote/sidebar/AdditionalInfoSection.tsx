import { Hash, Calendar, User } from 'lucide-react';

interface AdditionalInfoSectionProps {
  quoteNumber: string;
  issueDate: string;
  expirationDate: string;
  seller: any;
}

export function AdditionalInfoSection({ quoteNumber, issueDate, expirationDate, seller }: AdditionalInfoSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Información Adicional</h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-1">
            <Hash className="w-4 h-4" />
            Número de cotización
          </label>
          <input
            type="text"
            defaultValue={quoteNumber}
            className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Fecha emisión
          </label>
          <input
            type="date"
            defaultValue={issueDate}
            className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            Fecha vencimiento
          </label>
          <input
            type="date"
            defaultValue={expirationDate}
            className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm text-[#64748B] mb-2 flex items-center gap-1">
            <User className="w-4 h-4" />
            Vendedor asignado
          </label>
          <div className="flex items-center gap-3 p-3 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
            <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${seller.color} flex items-center justify-center text-white text-xs`}>
              {seller.avatar}
            </div>
            <span className="text-sm text-[#1E293B]">{seller.name}</span>
          </div>
        </div>

        <div>
          <label className="block text-sm text-[#64748B] mb-2">Referencias</label>
          <input
            type="text"
            placeholder="Número de pedido, proyecto, etc."
            className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
