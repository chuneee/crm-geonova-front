import { useState } from 'react';
import { Search, Filter, Plus, GripVertical, Copy, Trash2, DollarSign } from 'lucide-react';

const initialProducts = [
  {
    id: '1',
    name: 'CRM Enterprise License',
    description: 'Licencia anual para hasta 50 usuarios',
    quantity: 50,
    unitPrice: 6000,
    discount: 10,
    isOptional: false
  },
  {
    id: '2',
    name: 'Módulo de Análisis Avanzado',
    description: '',
    quantity: 1,
    unitPrice: 45000,
    discount: 5,
    isOptional: false
  },
  {
    id: '3',
    name: 'Soporte Premium (anual)',
    description: 'Soporte 24/7 con SLA de 2 horas',
    quantity: 1,
    unitPrice: 24000,
    discount: 0,
    isOptional: true
  }
];

export function ProductsServicesSection() {
  const [products, setProducts] = useState(initialProducts);
  const [globalDiscount, setGlobalDiscount] = useState(0);
  const [shippingCost, setShippingCost] = useState(500);
  const [depositPercentage, setDepositPercentage] = useState(30);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  const calculateSubtotal = (product: any) => {
    const base = product.quantity * product.unitPrice;
    const discount = base * (product.discount / 100);
    return base - discount;
  };

  const subtotal = products.reduce((sum, p) => sum + calculateSubtotal(p), 0);
  const globalDiscountAmount = subtotal * (globalDiscount / 100);
  const subtotalWithDiscount = subtotal - globalDiscountAmount;
  const tax = subtotalWithDiscount * 0.16;
  const total = subtotalWithDiscount + tax + shippingCost;
  const depositAmount = total * (depositPercentage / 100);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-6">Productos y Servicios</h3>

      {/* Search Bar */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 max-w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
          <input
            type="text"
            placeholder="Buscar en catálogo..."
            className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
          />
        </div>
        <button className="h-11 px-4 border border-[#E2E8F0] rounded-lg text-[#64748B] hover:bg-[#F8FAFC] transition-colors flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Todos
        </button>
        <button className="text-sm text-[#3B82F6] hover:underline">
          Crear producto personalizado
        </button>
      </div>

      {/* Products Table */}
      <div className="border border-[#E2E8F0] rounded-lg overflow-hidden mb-6">
        <table className="w-full">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              <th className="w-10 px-4 py-3"></th>
              <th className="text-left px-4 py-3 text-sm text-[#64748B]">Producto</th>
              <th className="text-left px-4 py-3 text-sm text-[#64748B]">Descripción</th>
              <th className="text-right px-4 py-3 text-sm text-[#64748B] w-24">Cantidad</th>
              <th className="text-right px-4 py-3 text-sm text-[#64748B] w-32">Precio Unit.</th>
              <th className="text-right px-4 py-3 text-sm text-[#64748B] w-24">Desc. %</th>
              <th className="text-right px-4 py-3 text-sm text-[#64748B] w-32">Subtotal</th>
              <th className="w-24 px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr 
                key={product.id} 
                className={`border-b border-[#E2E8F0] group ${product.isOptional ? 'bg-[#F8FAFC]' : 'bg-white'}`}
                style={{ height: '72px' }}
              >
                {/* Drag Handle */}
                <td className="px-4">
                  <div className="cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
                    <GripVertical className="w-5 h-5 text-[#94A3B8]" />
                  </div>
                </td>

                {/* Product */}
                <td className="px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">{product.name.substring(0, 2)}</span>
                    </div>
                    <div>
                      <div className="text-sm text-[#1E293B]">{product.name}</div>
                      {product.isOptional && (
                        <span className="inline-block px-2 py-0.5 bg-[#FEF3C7] text-[#92400E] text-xs rounded mt-1">
                          Opcional
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Description */}
                <td className="px-4">
                  <textarea
                    placeholder="Añade detalles..."
                    className="w-full px-3 py-2 text-sm text-[#64748B] border border-[#E2E8F0] rounded resize-none focus:outline-none focus:border-[#3B82F6] transition-colors"
                    rows={2}
                    defaultValue={product.description}
                  />
                </td>

                {/* Quantity */}
                <td className="px-4">
                  <input
                    type="number"
                    min="1"
                    defaultValue={product.quantity}
                    className="w-full h-11 px-3 text-right border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                  />
                </td>

                {/* Unit Price */}
                <td className="px-4">
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]">$</span>
                    <input
                      type="number"
                      defaultValue={product.unitPrice}
                      className="w-full h-11 pl-6 pr-3 text-right border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                  </div>
                </td>

                {/* Discount */}
                <td className="px-4">
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      defaultValue={product.discount}
                      className="w-full h-11 pr-8 pl-3 text-right border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6] transition-colors"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#64748B]">%</span>
                  </div>
                </td>

                {/* Subtotal */}
                <td className="px-4 text-right text-[#10B981]">
                  {formatCurrency(calculateSubtotal(product))}
                </td>

                {/* Actions */}
                <td className="px-4">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors">
                      <Copy className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Buttons */}
      <div className="flex items-center gap-4 mb-6">
        <button className="px-4 py-2 border border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-[#EFF6FF] transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Agregar producto
        </button>
        <button className="text-sm text-[#3B82F6] hover:underline">
          + Agregar sección
        </button>
        <button className="text-sm text-[#3B82F6] hover:underline">
          + Agregar línea de texto
        </button>
      </div>

      {/* Totals Panel */}
      <div className="bg-[#F8FAFC] rounded-lg p-6 ml-auto" style={{ maxWidth: '400px' }}>
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#64748B]">Subtotal:</span>
            <span className="text-[#1E293B]">{formatCurrency(subtotal)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">Descuento global:</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min="0"
                max="100"
                value={globalDiscount}
                onChange={(e) => setGlobalDiscount(Number(e.target.value))}
                className="w-20 h-9 px-2 text-right border border-[#E2E8F0] rounded text-sm"
              />
              <span className="text-sm text-[#64748B]">%</span>
              <span className="text-sm text-[#EF4444]">-{formatCurrency(globalDiscountAmount)}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#64748B]">Subtotal con descuento:</span>
            <span className="text-[#1E293B]">{formatCurrency(subtotalWithDiscount)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#64748B]">Impuesto (16%):</span>
            <span className="text-[#1E293B]">{formatCurrency(tax)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-[#64748B]">Envío:</span>
            <div className="relative">
              <DollarSign className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B]" />
              <input
                type="number"
                min="0"
                value={shippingCost}
                onChange={(e) => setShippingCost(Number(e.target.value))}
                className="w-28 h-9 pl-6 pr-2 text-right border border-[#E2E8F0] rounded text-sm"
              />
            </div>
          </div>

          <div className="pt-3 border-t-2 border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg text-[#1E293B]">Total:</span>
              <span className="text-2xl text-[#1E293B]">{formatCurrency(total)}</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#64748B]">Anticipo requerido ({depositPercentage}%):</span>
                <span className="text-[#3B82F6]">{formatCurrency(depositAmount)}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={depositPercentage}
                onChange={(e) => setDepositPercentage(Number(e.target.value))}
                className="w-full h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
