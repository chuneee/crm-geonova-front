import { TrendingUp, Package } from 'lucide-react';
import type { ReportFilters } from '../../pages/Reports';

interface ProductPerformanceProps {
  filters: ReportFilters;
}

const products = [
  { 
    id: 1, 
    name: 'DJI Mavic 3 Enterprise', 
    category: 'Drones',
    sales: 24, 
    revenue: 2040000,
    growth: 18.5,
    color: '#3B82F6'
  },
  { 
    id: 2, 
    name: 'Estación Total Leica TS16', 
    category: 'Topografía',
    sales: 18, 
    revenue: 5760000,
    growth: 25.3,
    color: '#10B981'
  },
  { 
    id: 3, 
    name: 'GNSS Trimble R12i', 
    category: 'Topografía',
    sales: 15, 
    revenue: 3750000,
    growth: 12.7,
    color: '#8B5CF6'
  },
  { 
    id: 4, 
    name: 'Software Pix4D Mapper', 
    category: 'Software',
    sales: 32, 
    revenue: 1120000,
    growth: 32.1,
    color: '#F59E0B'
  },
  { 
    id: 5, 
    name: 'DJI Agras T30', 
    category: 'Drones',
    sales: 8, 
    revenue: 1440000,
    growth: -5.2,
    color: '#EF4444'
  },
];

export function ProductPerformance({ filters }: ProductPerformanceProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const totalRevenue = products.reduce((sum, p) => sum + p.revenue, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg text-[#1E293B] mb-1">Desempeño de Productos</h3>
          <p className="text-sm text-[#64748B]">Top 5 productos más vendidos</p>
        </div>
        <div className="text-right">
          <p className="text-2xl text-[#1E293B] mb-1">{formatCurrency(totalRevenue)}</p>
          <p className="text-sm text-[#64748B]">{totalSales} ventas</p>
        </div>
      </div>

      {/* Products List */}
      <div className="space-y-4">
        {products.map((product, index) => {
          const percentage = (product.revenue / totalRevenue) * 100;
          
          return (
            <div key={product.id} className="space-y-2">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="flex items-center justify-center w-8 h-8 bg-[#F8FAFC] rounded text-sm text-[#64748B]">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1E293B] truncate">{product.name}</p>
                    <p className="text-xs text-[#64748B]">{product.category}</p>
                  </div>
                </div>
                
                <div className="text-right ml-4">
                  <p className="text-sm text-[#1E293B] mb-0.5">{formatCurrency(product.revenue)}</p>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-[#64748B]">{product.sales} ventas</span>
                    <span className={`text-xs ${
                      product.growth >= 0 ? 'text-[#10B981]' : 'text-[#EF4444]'
                    }`}>
                      ({product.growth > 0 ? '+' : ''}{product.growth}%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className="absolute left-0 top-0 h-full rounded-full transition-all"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: product.color,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-[#F8FAFC] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Package className="w-4 h-4 text-[#64748B]" />
              <span className="text-xs text-[#64748B]">Producto Top</span>
            </div>
            <p className="text-sm text-[#1E293B]">{products[0].name}</p>
          </div>
          
          <div className="p-3 bg-[#F8FAFC] rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-4 h-4 text-[#10B981]" />
              <span className="text-xs text-[#64748B]">Mayor Crecimiento</span>
            </div>
            <p className="text-sm text-[#1E293B]">
              {products.reduce((max, p) => p.growth > max.growth ? p : max).name}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
