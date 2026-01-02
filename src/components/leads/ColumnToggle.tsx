import { Check } from 'lucide-react';
import { useState } from 'react';

interface Column {
  id: string;
  label: string;
  visible: boolean;
  required?: boolean;
}

interface ColumnToggleProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ColumnToggle({ isOpen, onClose }: ColumnToggleProps) {
  const [columns, setColumns] = useState<Column[]>([
    { id: 'name', label: 'Nombre', visible: true, required: true },
    { id: 'company', label: 'Empresa', visible: true, required: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'phone', label: 'Teléfono', visible: true },
    { id: 'source', label: 'Fuente', visible: true },
    { id: 'status', label: 'Estado', visible: true, required: true },
    { id: 'score', label: 'Score', visible: true },
    { id: 'assigned', label: 'Asignado a', visible: true },
    { id: 'date', label: 'Fecha creación', visible: true },
  ]);

  const toggleColumn = (id: string) => {
    setColumns(cols => 
      cols.map(col => 
        col.id === id && !col.required 
          ? { ...col, visible: !col.visible } 
          : col
      )
    );
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div className="absolute right-0 top-full mt-1 w-64 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-2 z-50">
        <div className="px-4 py-2 border-b border-[#E2E8F0]">
          <h3 className="text-sm font-medium text-gray-900">Columnas visibles</h3>
        </div>
        <div className="max-h-80 overflow-y-auto py-1">
          {columns.map((column) => (
            <button
              key={column.id}
              onClick={() => toggleColumn(column.id)}
              disabled={column.required}
              className={`w-full px-4 py-2 text-left text-sm flex items-center justify-between hover:bg-[#F8FAFC] ${
                column.required ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <span className="text-gray-700">{column.label}</span>
              {column.visible && (
                <Check className="w-4 h-4 text-[#3B82F6]" />
              )}
            </button>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-[#E2E8F0] flex gap-2">
          <button
            onClick={onClose}
            className="flex-1 h-8 px-3 bg-[#3B82F6] text-white rounded-lg text-xs hover:bg-[#2563EB] transition-colors"
          >
            Aplicar
          </button>
          <button
            onClick={onClose}
            className="h-8 px-3 bg-white border border-[#E2E8F0] text-gray-700 rounded-lg text-xs hover:bg-[#F8FAFC] transition-colors"
          >
            Cancelar
          </button>
        </div>
      </div>
    </>
  );
}
