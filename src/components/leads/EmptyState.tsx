import { Users } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 bg-[#EFF6FF] rounded-full flex items-center justify-center mb-4">
        <Users className="w-8 h-8 text-[#3B82F6]" />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">No hay leads disponibles</h3>
      <p className="text-sm text-gray-500 text-center max-w-md mb-6">
        Comienza agregando tu primer lead para gestionar tu pipeline de ventas
      </p>
      <button className="h-10 px-6 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors">
        Agregar primer lead
      </button>
    </div>
  );
}
