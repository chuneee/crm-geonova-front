import { useState } from 'react';
import { CatalogHeader } from '../components/catalog/CatalogHeader';
import { CatalogToolbar } from '../components/catalog/CatalogToolbar';
import { ProductGridView } from '../components/catalog/ProductGridView';
import { ProductListView } from '../components/catalog/ProductListView';
import { FilterSidebar } from '../components/catalog/FilterSidebar';
import { BulkEditModal } from '../components/catalog/BulkEditModal';
import { CatalogPagination } from '../components/catalog/CatalogPagination';

export type Product = {
  id: string;
  name: string;
  sku: string;
  category: string;
  categoryColor: string;
  description: string;
  price: number;
  hasVariants: boolean;
  stock: number;
  status: 'active' | 'inactive' | 'out_of_stock';
  image?: string;
  isFavorite: boolean;
  sales: number;
  salesTrend: 'up' | 'down' | 'neutral';
  tags: string[];
};

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'DJI Mavic 3 Pro',
    sku: 'DJI-MAV3P-001',
    category: 'Drones / DJI',
    categoryColor: 'from-blue-500 to-blue-600',
    description: 'Drone profesional con cámara Hasselblad y triple sistema de cámaras',
    price: 189999,
    hasVariants: false,
    stock: 47,
    status: 'active',
    isFavorite: true,
    sales: 234,
    salesTrend: 'up',
    tags: ['Popular', 'Premium', 'Importado']
  },
  {
    id: '2',
    name: 'Batería Inteligente DJI',
    sku: 'DJI-BAT-5000',
    category: 'Accesorios / Baterías',
    categoryColor: 'from-amber-500 to-amber-600',
    description: 'Batería de vuelo inteligente de 5000mAh con carga rápida',
    price: 12999,
    hasVariants: true,
    stock: 8,
    status: 'active',
    isFavorite: false,
    sales: 456,
    salesTrend: 'up',
    tags: ['Popular', 'Nacional']
  },
  {
    id: '3',
    name: 'Software de Mapeo Aereo',
    sku: 'SW-MAP-PRO',
    category: 'Software',
    categoryColor: 'from-purple-500 to-purple-600',
    description: 'Licencia anual de software profesional para procesamiento de imágenes aéreas',
    price: 45000,
    hasVariants: false,
    stock: 999,
    status: 'active',
    isFavorite: false,
    sales: 89,
    salesTrend: 'neutral',
    tags: ['Digital', 'Premium']
  },
  {
    id: '4',
    name: 'Curso de Piloto Comercial',
    sku: 'SRV-CURSO-001',
    category: 'Servicios',
    categoryColor: 'from-green-500 to-green-600',
    description: 'Capacitación completa para obtener licencia de piloto comercial de drones',
    price: 25000,
    hasVariants: true,
    stock: 0,
    status: 'active',
    isFavorite: true,
    sales: 67,
    salesTrend: 'up',
    tags: ['Nuevo', 'Oferta']
  },
  {
    id: '5',
    name: 'Autel Robotics EVO II',
    sku: 'AUT-EVO2-001',
    category: 'Drones / Autel',
    categoryColor: 'from-blue-500 to-blue-600',
    description: 'Drone profesional con cámara 8K y 40 minutos de autonomía',
    price: 0,
    hasVariants: false,
    stock: 0,
    status: 'out_of_stock',
    isFavorite: false,
    sales: 12,
    salesTrend: 'down',
    tags: ['Importado']
  },
  {
    id: '6',
    name: 'Hélices de Repuesto (Set 4)',
    sku: 'ACC-PROP-SET4',
    category: 'Accesorios / Propellers',
    categoryColor: 'from-amber-500 to-amber-600',
    description: 'Set de 4 hélices de carbono ultra ligeras',
    price: 899,
    hasVariants: true,
    stock: 156,
    status: 'active',
    isFavorite: false,
    sales: 892,
    salesTrend: 'up',
    tags: ['Popular', 'Nacional']
  }
];

export function ProductCatalog() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProducts, setSelectedProducts] = useState<Set<string>>(new Set());
  const [showBulkEdit, setShowBulkEdit] = useState(false);
  const [products] = useState<Product[]>(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(24);
  const [gridColumns, setGridColumns] = useState(4);

  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedProducts(new Set(products.map(p => p.id)));
    } else {
      setSelectedProducts(new Set());
    }
  };

  const handleToggleFavorite = (productId: string) => {
    // Implementar toggle de favorito
    console.log('Toggle favorite:', productId);
  };

  return (
    <div className="h-full flex bg-[#F8FAFC]">
      {/* Sidebar Filters */}
      <FilterSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <CatalogHeader 
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />

        {/* Toolbar */}
        <CatalogToolbar 
          selectedCount={selectedProducts.size}
          onClearSelection={() => setSelectedProducts(new Set())}
          onBulkEdit={() => setShowBulkEdit(true)}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {viewMode === 'grid' ? (
            <ProductGridView 
              products={products}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onToggleFavorite={handleToggleFavorite}
              gridColumns={gridColumns}
            />
          ) : (
            <ProductListView 
              products={products}
              selectedProducts={selectedProducts}
              onSelectProduct={handleSelectProduct}
              onSelectAll={handleSelectAll}
              onToggleFavorite={handleToggleFavorite}
            />
          )}
        </div>

        {/* Pagination */}
        <CatalogPagination 
          currentPage={currentPage}
          totalItems={products.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          gridColumns={gridColumns}
          onGridColumnsChange={setGridColumns}
          viewMode={viewMode}
        />
      </div>

      {/* Bulk Edit Modal */}
      {showBulkEdit && (
        <BulkEditModal 
          selectedCount={selectedProducts.size}
          onClose={() => setShowBulkEdit(false)}
        />
      )}
    </div>
  );
}
