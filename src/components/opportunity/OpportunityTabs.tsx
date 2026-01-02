import { FileText, Activity, DollarSign, Package, History, FolderOpen } from 'lucide-react';

interface OpportunityTabsProps {
  activeTab: string;
  onTabChange: (tab: any) => void;
}

const tabs = [
  { id: 'resumen', label: 'Resumen', icon: FileText, count: null },
  { id: 'actividades', label: 'Actividades', icon: Activity, count: 12 },
  { id: 'cotizaciones', label: 'Cotizaciones', icon: DollarSign, count: 3 },
  { id: 'productos', label: 'Productos', icon: Package, count: 5 },
  { id: 'historial', label: 'Historial', icon: History, count: 24 },
  { id: 'documentos', label: 'Documentos', icon: FolderOpen, count: 8 }
];

export function OpportunityTabs({ activeTab, onTabChange }: OpportunityTabsProps) {
  return (
    <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]" style={{ height: '56px' }}>
      <div className="flex items-center px-8 h-full gap-1">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`
                relative px-6 h-full flex items-center gap-2 transition-colors
                ${isActive 
                  ? 'bg-white text-[#3B82F6]' 
                  : 'text-[#64748B] hover:text-[#1E293B]'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span className="text-sm">{tab.label}</span>
              {tab.count !== null && (
                <span className={`
                  px-2 py-0.5 rounded-full text-xs
                  ${isActive ? 'bg-[#EFF6FF] text-[#3B82F6]' : 'bg-[#E2E8F0] text-[#64748B]'}
                `}>
                  {tab.count}
                </span>
              )}
              {isActive && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#3B82F6]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
