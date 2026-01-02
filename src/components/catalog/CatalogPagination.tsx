import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CatalogPaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  gridColumns: number;
  onGridColumnsChange: (columns: number) => void;
  viewMode: 'grid' | 'list';
}

export function CatalogPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  gridColumns,
  onGridColumnsChange,
  viewMode
}: CatalogPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 7;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="bg-white border-t border-[#E2E8F0] px-8 py-4 h-16 flex items-center justify-between">
      {/* Left - Info */}
      <div className="text-sm text-[#64748B]">
        Mostrando {startItem}-{endItem} de {totalItems} productos
      </div>

      {/* Center - Page Numbers */}
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded transition-colors ${
            currentPage === 1
              ? 'text-[#CBD5E1] cursor-not-allowed'
              : 'text-[#64748B] hover:bg-[#F8FAFC]'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {getPageNumbers().map((page, idx) => (
          page === '...' ? (
            <span key={`ellipsis-${idx}`} className="px-3 py-1 text-[#64748B]">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={`min-w-[36px] h-9 px-3 rounded transition-colors ${
                currentPage === page
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#64748B] hover:bg-[#F8FAFC]'
              }`}
            >
              {page}
            </button>
          )
        ))}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded transition-colors ${
            currentPage === totalPages
              ? 'text-[#CBD5E1] cursor-not-allowed'
              : 'text-[#64748B] hover:bg-[#F8FAFC]'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Right - Controls */}
      <div className="flex items-center gap-4">
        {/* Items per page */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-[#64748B]">Por página:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="h-9 px-3 border border-[#E2E8F0] rounded-lg text-sm text-[#1E293B] focus:outline-none focus:border-[#3B82F6]"
          >
            <option value={24}>24</option>
            <option value={48}>48</option>
            <option value={96}>96</option>
          </select>
        </div>

        {/* Grid size slider (only for grid view) */}
        {viewMode === 'grid' && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-[#64748B]">Columnas:</span>
            <input
              type="range"
              min="3"
              max="6"
              value={gridColumns}
              onChange={(e) => onGridColumnsChange(Number(e.target.value))}
              className="w-24 h-2 bg-[#E2E8F0] rounded-lg appearance-none cursor-pointer accent-[#3B82F6]"
            />
            <span className="text-sm text-[#1E293B] min-w-[12px]">{gridColumns}</span>
          </div>
        )}
      </div>
    </div>
  );
}
