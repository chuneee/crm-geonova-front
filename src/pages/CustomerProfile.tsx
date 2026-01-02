import { useParams } from 'react-router-dom';
import { CustomerProfileHeader } from '../components/customer-profile/CustomerProfileHeader';
import { MetricsBar } from '../components/customer-profile/MetricsBar';
import { TabsNavigation } from '../components/customer-profile/TabsNavigation';
import { LeftColumn } from '../components/customer-profile/LeftColumn';
import { CenterColumn } from '../components/customer-profile/CenterColumn';
import { RightColumn } from '../components/customer-profile/RightColumn';
import { FloatingActionButton } from '../components/customer-profile/FloatingActionButton';
import { useState } from 'react';

export type TabType = 'resumen' | 'oportunidades' | 'actividades' | 'contactos' | 'productos' | 'documentos' | 'instalaciones' | 'tickets' | 'facturacion' | 'notas';

export function CustomerProfile() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>('resumen');

  // Mock customer data - in real app, fetch based on id
  const customer = {
    id: id || '1',
    name: 'ACME Corporation',
    logo: '',
    verified: true,
    industry: 'Tecnología',
    type: 'company' as const,
    location: 'Ciudad de México, CDMX',
    website: 'acme.com',
    status: 'active' as const,
    healthScore: 92,
    segment: 'corporate' as const,
    clientSince: new Date('2023-01-15'),
    lastUpdated: new Date(Date.now() - 3 * 60 * 1000),
    metrics: {
      lifetimeValue: 127450,
      lifetimeValueGrowth: 23,
      activeOpportunities: 8,
      opportunitiesValue: 45600,
      openTickets: 3,
      ticketsPriority: { high: 1, medium: 2, low: 0 },
      avgResolution: 2.3,
      activeProducts: 12,
      lastPurchase: 15,
      npsScore: 9,
      lastSurvey: 5
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC] overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-b from-[#F8FAFC] to-white" style={{ minHeight: '160px' }}>
        <CustomerProfileHeader customer={customer} />
      </div>

      {/* Metrics Bar */}
      <div className="px-8 -mt-6">
        <MetricsBar metrics={customer.metrics} />
      </div>

      {/* Tabs Navigation */}
      <div className="mt-6">
        <TabsNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full px-8 py-6">
          <div className="h-full flex gap-4">
            {/* Left Column - 25% */}
            <div className="w-1/4 overflow-y-auto space-y-4">
              <LeftColumn customerId={customer.id} />
            </div>

            {/* Center Column - 50% */}
            <div className="w-1/2 overflow-y-auto">
              <CenterColumn activeTab={activeTab} customerId={customer.id} />
            </div>

            {/* Right Column - 25% */}
            <div className="w-1/4 overflow-y-auto space-y-4">
              <RightColumn customerId={customer.id} />
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton />
    </div>
  );
}
