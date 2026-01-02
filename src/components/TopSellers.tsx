import { Trophy, TrendingUp } from 'lucide-react';

export function TopSellers() {
  const sellers = [
    {
      name: 'Carlos Rodríguez',
      initials: 'CR',
      deals: 47,
      revenue: '$890K',
      change: '+18%',
      rank: 1,
      color: 'from-[#3B82F6] to-[#2563EB]'
    },
    {
      name: 'María González',
      initials: 'MG',
      deals: 42,
      revenue: '$765K',
      change: '+12%',
      rank: 2,
      color: 'from-[#8B5CF6] to-[#7C3AED]'
    },
    {
      name: 'Juan López',
      initials: 'JL',
      deals: 38,
      revenue: '$682K',
      change: '+8%',
      rank: 3,
      color: 'from-[#10B981] to-[#059669]'
    },
    {
      name: 'Ana Martínez',
      initials: 'AM',
      deals: 35,
      revenue: '$645K',
      change: '+15%',
      rank: 4,
      color: 'from-[#F59E0B] to-[#D97706]'
    },
    {
      name: 'Pedro Sánchez',
      initials: 'PS',
      deals: 31,
      revenue: '$598K',
      change: '+6%',
      rank: 5,
      color: 'from-[#EC4899] to-[#DB2777]'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-[#F59E0B]" />
          <h2 className="text-gray-900">Top Vendedores</h2>
        </div>
        <select className="px-3 py-1.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-sm text-gray-600">
          <option>Este Mes</option>
          <option>Este Trimestre</option>
          <option>Este Año</option>
        </select>
      </div>

      <div className="space-y-3">
        {sellers.map((seller) => (
          <div
            key={seller.rank}
            className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#F8FAFC] transition-colors"
          >
            <div className="text-sm text-gray-400 w-6">#{seller.rank}</div>
            
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${seller.color} flex items-center justify-center flex-shrink-0`}>
              <span className="text-white text-sm">{seller.initials}</span>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-900">{seller.name}</div>
              <div className="text-xs text-gray-500">{seller.deals} deals cerrados</div>
            </div>
            
            <div className="text-right">
              <div className="text-sm text-gray-900 mb-0.5">{seller.revenue}</div>
              <div className="flex items-center gap-1 text-xs text-[#10B981]">
                <TrendingUp className="w-3 h-3" />
                <span>{seller.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
