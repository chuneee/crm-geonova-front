export function PipelineChart() {
  const stages = [
    { name: 'Prospecto', count: 342, value: '$2.4M', width: 100, color: '#3B82F6' },
    { name: 'Calificación', count: 186, value: '$1.8M', width: 85, color: '#3B82F6' },
    { name: 'Propuesta', count: 124, value: '$1.4M', width: 70, color: '#3B82F6' },
    { name: 'Negociación', count: 89, value: '$1.2M', width: 55, color: '#10B981' },
    { name: 'Cierre', count: 47, value: '$890K', width: 40, color: '#10B981' }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-gray-900">Pipeline de Ventas</h2>
        <select className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-gray-600">
          <option>Este Mes</option>
          <option>Este Trimestre</option>
          <option>Este Año</option>
        </select>
      </div>

      <div className="space-y-4">
        {stages.map((stage, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{stage.name}</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">{stage.count} leads</span>
                <span className="text-gray-900">{stage.value}</span>
              </div>
            </div>
            <div className="relative h-12 bg-[#F8FAFC] rounded-lg overflow-hidden">
              <div
                className="absolute inset-y-0 left-0 rounded-lg flex items-center justify-center text-white text-sm transition-all"
                style={{
                  width: `${stage.width}%`,
                  backgroundColor: stage.color
                }}
              >
                {stage.width > 30 && <span>{stage.count}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-[#E2E8F0] flex items-center justify-between">
        <span className="text-sm text-gray-500">Tasa de Conversión Global</span>
        <span className="text-gray-900">13.7%</span>
      </div>
    </div>
  );
}
