import type { TabType } from '../../pages/CustomerProfile';

interface TabsNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'resumen' as const, label: 'Resumen', badge: null },
  { id: 'oportunidades' as const, label: 'Oportunidades', badge: 8 },
  { id: 'actividades' as const, label: 'Actividades', badge: 127 },
  { id: 'contactos' as const, label: 'Contactos', badge: 5 },
  { id: 'productos' as const, label: 'Productos', badge: 12 },
  { id: 'documentos' as const, label: 'Documentos', badge: 23 },
  { id: 'instalaciones' as const, label: 'Instalaciones', badge: 6 },
  { id: 'tickets' as const, label: 'Tickets', badge: 3 },
  { id: 'facturacion' as const, label: 'Facturación', badge: null },
  { id: 'notas' as const, label: 'Notas', badge: null },
];

export function TabsNavigation({ activeTab, onTabChange }: TabsNavigationProps) {
  return (
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0] h-14">
      <div className="px-8 h-full flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-white text-[#3B82F6] shadow-sm'
                : 'text-[#64748B] hover:bg-white/50'
            }`}
          >
            <span>{tab.label}</span>
            {tab.badge !== null && (
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                activeTab === tab.id
                  ? 'bg-[#3B82F6] text-white'
                  : 'bg-[#E2E8F0] text-[#64748B]'
              }`}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
