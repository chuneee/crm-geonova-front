import { Package } from 'lucide-react';
import { ProductCard } from './ProductCard';
import type { Product } from '../../pages/ProductCatalog';

interface ProductGridViewProps {
  products: Product[];
  selectedProducts: Set<string>;
  onSelectProduct: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  gridColumns: number;
}

export function ProductGridView({ 
  products, 
  selectedProducts, 
  onSelectProduct, 
  onToggleFavorite,
  gridColumns 
}: ProductGridViewProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-[#64748B]">
        <Package className="w-16 h-16 mb-4 text-[#CBD5E1]" />
        <p className="text-lg mb-4">No hay productos en esta categoría</p>
        <button className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
          + Crear primer producto
        </button>
      </div>
    );
  }

  return (
    <div 
      className="grid gap-6"
      style={{
        gridTemplateColumns: `repeat(${gridColumns}, minmax(0, 1fr))`
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          isSelected={selectedProducts.has(product.id)}
          onSelect={() => onSelectProduct(product.id)}
          onToggleFavorite={() => onToggleFavorite(product.id)}
        />
      ))}
    </div>
  );
}
