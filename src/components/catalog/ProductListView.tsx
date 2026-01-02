import { Star, Edit, Copy, Eye, MoreVertical, Package, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { Product } from '../../pages/ProductCatalog';

interface ProductListViewProps {
  products: Product[];
  selectedProducts: Set<string>;
  onSelectProduct: (productId: string) => void;
  onSelectAll: (checked: boolean) => void;
  onToggleFavorite: (productId: string) => void;
}

const statusConfig = {
  active: { label: 'Activo', color: 'bg-[#10B981]' },
  inactive: { label: 'Inactivo', color: 'bg-[#94A3B8]' },
  out_of_stock: { label: 'Agotado', color: 'bg-[#EF4444]' }
};

export function ProductListView({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onSelectAll,
  onToggleFavorite 
}: ProductListViewProps) {
  const allSelected = products.length > 0 && products.every(p => selectedProducts.has(p.id));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getStockPercentage = (stock: number) => {
    const max = 100;
    return Math.min((stock / max) * 100, 100);
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'bg-[#EF4444]';
    if (stock < 10) return 'bg-[#F59E0B]';
    return 'bg-[#10B981]';
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden">
      <table className="w-full">
        <thead className="bg-[#F1F5F9] border-b border-[#E2E8F0]" style={{ height: '56px' }}>
          <tr>
            <th className="w-10 px-4">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-4 h-4 rounded border-[#E2E8F0] cursor-pointer accent-[#3B82F6]"
              />
            </th>
            <th className="w-20 px-4 text-left text-sm text-[#64748B]">Imagen</th>
            <th className="w-80 px-4 text-left text-sm text-[#64748B]">Nombre / SKU</th>
            <th className="w-40 px-4 text-left text-sm text-[#64748B]">Categoría</th>
            <th className="w-32 px-4 text-left text-sm text-[#64748B]">Precio</th>
            <th className="w-32 px-4 text-left text-sm text-[#64748B]">Stock</th>
            <th className="w-32 px-4 text-left text-sm text-[#64748B]">Estado</th>
            <th className="w-28 px-4 text-left text-sm text-[#64748B]">Ventas</th>
            <th className="w-24 px-4 text-left text-sm text-[#64748B]">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            const status = statusConfig[product.status];
            const stockPercent = getStockPercentage(product.stock);
            const stockColor = getStockColor(product.stock);

            return (
              <tr
                key={product.id}
                className="border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors group"
                style={{ height: '80px' }}
              >
                {/* Checkbox */}
                <td className="px-4">
                  <input
                    type="checkbox"
                    checked={selectedProducts.has(product.id)}
                    onChange={() => onSelectProduct(product.id)}
                    className="w-4 h-4 rounded border-[#E2E8F0] cursor-pointer accent-[#3B82F6]"
                  />
                </td>

                {/* Image */}
                <td className="px-4">
                  <div className="w-16 h-16 rounded-lg bg-[#F1F5F9] flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    ) : (
                      <Package className="w-8 h-8 text-[#CBD5E1]" />
                    )}
                  </div>
                </td>

                {/* Name & SKU */}
                <td className="px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <div className="text-sm text-[#1E293B] mb-1">{product.name}</div>
                      <div className="text-xs text-[#9CA3AF] font-mono">{product.sku}</div>
                    </div>
                    <button
                      onClick={() => onToggleFavorite(product.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Star className={`w-4 h-4 ${product.isFavorite ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#64748B]'}`} />
                    </button>
                  </div>
                </td>

                {/* Category */}
                <td className="px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs text-white bg-gradient-to-br ${product.categoryColor}`}>
                    {product.category.split(' / ')[0]}
                  </span>
                </td>

                {/* Price */}
                <td className="px-4">
                  <span className="text-[#10B981]">
                    {product.hasVariants && 'Desde '}
                    {formatCurrency(product.price)}
                  </span>
                </td>

                {/* Stock */}
                <td className="px-4">
                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-[#E2E8F0] rounded-full h-1 max-w-[60px]">
                      <div
                        className={`h-1 rounded-full ${stockColor}`}
                        style={{ width: `${stockPercent}%` }}
                      />
                    </div>
                    <span className="text-sm text-[#64748B] min-w-[30px]">{product.stock}</span>
                  </div>
                </td>

                {/* Status */}
                <td className="px-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs text-white ${status.color}`}>
                    {status.label}
                  </span>
                </td>

                {/* Sales */}
                <td className="px-4">
                  <div className="flex items-center gap-1">
                    <span className="text-sm text-[#1E293B]">{product.sales}</span>
                    {product.salesTrend === 'up' && <TrendingUp className="w-4 h-4 text-[#10B981]" />}
                    {product.salesTrend === 'down' && <TrendingDown className="w-4 h-4 text-[#EF4444]" />}
                    {product.salesTrend === 'neutral' && <Minus className="w-4 h-4 text-[#64748B]" />}
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4">
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-[#64748B] hover:bg-[#F1F5F9] rounded transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-[#64748B] hover:bg-[#F1F5F9] rounded transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1.5 text-[#64748B] hover:bg-[#F1F5F9] rounded transition-colors">
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
  );
}
