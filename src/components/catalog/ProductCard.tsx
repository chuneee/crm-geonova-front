import { Star, Edit, Copy, Eye, MoreVertical, Package } from 'lucide-react';
import type { Product } from '../../pages/ProductCatalog';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

const statusConfig = {
  active: { label: 'Activo', color: 'bg-[#10B981]' },
  inactive: { label: 'Inactivo', color: 'bg-[#94A3B8]' },
  out_of_stock: { label: 'Agotado', color: 'bg-[#EF4444]' }
};

export function ProductCard({ product, isSelected, onSelect, onToggleFavorite }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const status = statusConfig[product.status];

  return (
    <div
      className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden transition-all duration-200 hover:shadow-lg group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className="relative bg-[#F1F5F9] aspect-[16/9] flex items-center justify-center">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <Package className="w-16 h-16 text-[#CBD5E1]" />
        )}

        {/* Checkbox */}
        <div className={`absolute top-3 left-3 transition-opacity ${isHovered || isSelected ? 'opacity-100' : 'opacity-0'}`}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-6 h-6 rounded border-2 border-white shadow-lg cursor-pointer accent-[#3B82F6]"
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Favorite */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-sm hover:bg-white transition-all"
        >
          <Star className={`w-5 h-5 ${product.isFavorite ? 'fill-[#F59E0B] text-[#F59E0B]' : 'text-[#64748B]'}`} />
        </button>

        {/* Status Badge */}
        <div className={`absolute top-3 right-14 px-2 py-1 ${status.color} text-white text-xs rounded-full`}>
          {status.label}
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity">
            <button className="px-4 py-2 bg-white text-[#1E293B] rounded-lg hover:bg-[#F8FAFC] transition-colors">
              Ver detalles
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Category */}
        <div className="text-xs text-[#64748B] uppercase mb-2 tracking-wide">
          {product.category.split(' / ')[0]}
        </div>

        {/* Name */}
        <h3 className="text-[#1E293B] mb-1 line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>

        {/* SKU */}
        <div className="text-xs text-[#9CA3AF] font-mono mb-2">
          {product.sku}
        </div>

        {/* Description */}
        <p className="text-sm text-[#64748B] line-clamp-2 mb-4 min-h-[2.5rem]">
          {product.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-4 pb-4 pt-3 border-t border-[#E2E8F0]">
        {/* Price */}
        <div className="text-lg text-[#10B981] mb-2">
          {product.hasVariants ? 'Desde ' : ''}{formatCurrency(product.price)}
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${
            product.stock === 0 ? 'bg-[#EF4444]' : 
            product.stock < 10 ? 'bg-[#F59E0B]' : 
            'bg-[#10B981]'
          }`} />
          <span className="text-sm text-[#64748B]">
            {product.stock === 0 ? 'Agotado' : `En stock: ${product.stock}`}
          </span>
        </div>

        {/* Quick Actions */}
        <div className={`flex items-center justify-between transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="flex items-center gap-1">
            <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors">
              <Edit className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors">
              <Copy className="w-4 h-4" />
            </button>
            <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors">
              <Eye className="w-4 h-4" />
            </button>
          </div>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
            >
              <MoreVertical className="w-4 h-4" />
            </button>
            {showMenu && (
              <div className="absolute right-0 bottom-full mb-1 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-10">
                <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                  Agregar a cotización
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                  Ver historial
                </button>
                <button className="w-full px-4 py-2 text-left text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors">
                  Desactivar
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
