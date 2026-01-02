import { TrendingUp, TrendingDown } from 'lucide-react';

export function MetricsCards() {
  const metrics = [
    {
      title: 'Leads del Mes',
      value: '342',
      change: '+12.5%',
      isPositive: true,
      trendData: [20, 35, 28, 42, 38, 50, 45]
    },
    {
      title: 'Oportunidades Activas',
      value: '89',
      subtitle: '$1.2M en valor total',
      isPositive: true
    },
    {
      title: 'Instalaciones Pendientes',
      value: '24',
      progress: 68,
      isPositive: true
    },
    {
      title: 'Tasa de Conversión',
      value: '34.2%',
      change: '+2.4%',
      isPositive: true
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm"
        >
          <div className="text-xs text-gray-500 mb-2">{metric.title}</div>
          <div className="text-3xl text-gray-900 mb-2">{metric.value}</div>
          
          {metric.change && (
            <div className={`flex items-center gap-1 text-sm ${
              metric.isPositive ? 'text-[#10B981]' : 'text-[#EF4444]'
            }`}>
              {metric.isPositive ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span>{metric.change}</span>
            </div>
          )}
          
          {metric.subtitle && (
            <div className="text-sm text-gray-500">{metric.subtitle}</div>
          )}
          
          {metric.progress !== undefined && (
            <div className="mt-3">
              <div className="w-full h-2 bg-[#F8FAFC] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#3B82F6] rounded-full transition-all"
                  style={{ width: `${metric.progress}%` }}
                />
              </div>
            </div>
          )}
          
          {metric.trendData && (
            <div className="mt-3 h-8 flex items-end gap-1">
              {metric.trendData.map((height, i) => (
                <div
                  key={i}
                  className="flex-1 bg-[#3B82F6] bg-opacity-20 rounded-sm"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}