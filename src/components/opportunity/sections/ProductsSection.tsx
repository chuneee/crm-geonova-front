import { Package, Plus, GripVertical, Trash2 } from 'lucide-react';

interface ProductsSectionProps {
  opportunityId: string;
}

const products = [
  { id: '1', name: 'CRM Enterprise License', quantity: 50, unitPrice: 6000, discount: 10 },
  { id: '2', name: 'Módulo de Análisis Avanzado', quantity: 1, unitPrice: 45000, discount: 5 },
  { id: '3', name: 'Soporte Premium (anual)', quantity: 1, unitPrice: 24000, discount: 0 },
  { id: '4', name: 'Capacitación on-site', quantity: 3, unitPrice: 8000, discount: 15 },
  { id: '5', name: 'Integración con SAP', quantity: 1, unitPrice: 35000, discount: 0 }
];

export function ProductsSection({ opportunityId }: ProductsSectionProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const subtotal = products.reduce((sum, p) => sum + (p.quantity * p.unitPrice), 0);
  const totalDiscount = products.reduce((sum, p) => sum + (p.quantity * p.unitPrice * p.discount / 100), 0);
  const afterDiscount = subtotal - totalDiscount;
  const tax = afterDiscount * 0.16;
  const total = afterDiscount + tax;

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#1E293B]">Productos/Servicios</h3>
        <button className="px-3 py-1.5 text-sm text-[#3B82F6] border border-[#3B82F6] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Agregar producto
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#E2E8F0]">
              <th className="w-8"></th>
              <th className="text-left py-3 px-2 text-sm text-[#64748B]">Producto</th>
              <th className="text-right py-3 px-2 text-sm text-[#64748B] w-24">Cantidad</th>
              <th className="text-right py-3 px-2 text-sm text-[#64748B] w-32">Precio Unit.</th>
              <th className="text-right py-3 px-2 text-sm text-[#64748B] w-24">Desc. %</th>
              <th className="text-right py-3 px-2 text-sm text-[#64748B] w-32">Subtotal</th>
              <th className="w-8"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const itemSubtotal = product.quantity * product.unitPrice;
              const itemDiscount = itemSubtotal * product.discount / 100;
              const itemTotal = itemSubtotal - itemDiscount;
              
              return (
                <tr key={product.id} className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors group">
                  <td className="py-3 px-2">
                    <GripVertical className="w-4 h-4 text-[#94A3B8] cursor-move" />
                  </td>
                  <td className="py-3 px-2 text-sm text-[#1E293B]">{product.name}</td>
                  <td className="py-3 px-2 text-right text-sm text-[#1E293B]">{product.quantity}</td>
                  <td className="py-3 px-2 text-right text-sm text-[#1E293B]">{formatCurrency(product.unitPrice)}</td>
                  <td className="py-3 px-2 text-right text-sm text-[#1E293B]">{product.discount}%</td>
                  <td className="py-3 px-2 text-right text-sm text-[#1E293B]">{formatCurrency(itemTotal)}</td>
                  <td className="py-3 px-2">
                    <button className="p-1 text-[#EF4444] opacity-0 group-hover:opacity-100 hover:bg-[#FEF2F2] rounded transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot className="bg-[#F8FAFC]">
            <tr>
              <td colSpan={5} className="py-3 px-2 text-right text-sm text-[#64748B]">Subtotal:</td>
              <td className="py-3 px-2 text-right text-sm text-[#1E293B]">{formatCurrency(subtotal)}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={5} className="py-3 px-2 text-right text-sm text-[#64748B]">Descuento total:</td>
              <td className="py-3 px-2 text-right text-sm text-[#EF4444]">-{formatCurrency(totalDiscount)}</td>
              <td></td>
            </tr>
            <tr>
              <td colSpan={5} className="py-3 px-2 text-right text-sm text-[#64748B]">Impuestos (16%):</td>
              <td className="py-3 px-2 text-right text-sm text-[#1E293B]">{formatCurrency(tax)}</td>
              <td></td>
            </tr>
            <tr className="border-t-2 border-[#E2E8F0]">
              <td colSpan={5} className="py-3 px-2 text-right text-[#1E293B]">Total:</td>
              <td className="py-3 px-2 text-right text-xl text-[#10B981]">{formatCurrency(total)}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
