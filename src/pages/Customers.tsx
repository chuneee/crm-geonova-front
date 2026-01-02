import { useState } from 'react';
import { CustomersHeader } from '../components/customers/CustomersHeader';
import { FiltersBar } from '../components/customers/FiltersBar';
import { ActionsBar } from '../components/customers/ActionsBar';
import { CustomersTable } from '../components/customers/CustomersTable';
import { SidebarPanel } from '../components/customers/SidebarPanel';

export type CustomerStatus = 'active' | 'inactive' | 'at_risk' | 'new';
export type CustomerSegment = 'premium' | 'corporate' | 'sme' | 'individual';
export type CustomerType = 'company' | 'individual';
export type ViewMode = 'table' | 'cards' | 'map';

export type Customer = {
  id: string;
  companyName: string;
  logo?: string;
  industry: string;
  type: CustomerType;
  contactName: string;
  contactRole: string;
  email: string;
  emailVerified: boolean;
  phone: string;
  hasWhatsApp: boolean;
  segment: CustomerSegment;
  totalValue: number;
  valueGrowth: number;
  lastActivity: Date;
  activityType: 'call' | 'email' | 'meeting';
  status: CustomerStatus;
  healthScore: number;
  assignedTo: {
    id: string;
    name: string;
    avatar?: string;
    isOnline: boolean;
  };
  address: string;
  website?: string;
  tags: string[];
};

const mockCustomers: Customer[] = [
  {
    id: '1',
    companyName: 'ACME Corporation',
    industry: 'Tecnología',
    type: 'company',
    contactName: 'Juan García',
    contactRole: 'CEO',
    email: 'juan@acme.com',
    emailVerified: true,
    phone: '+52 55 1234 5678',
    hasWhatsApp: true,
    segment: 'corporate',
    totalValue: 245000,
    valueGrowth: 12,
    lastActivity: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    activityType: 'meeting',
    status: 'active',
    healthScore: 92,
    assignedTo: {
      id: 'u1',
      name: 'María López',
      isOnline: true
    },
    address: 'Av. Reforma 123, CDMX',
    website: 'acme.com',
    tags: ['VIP', 'Tecnología']
  },
  {
    id: '2',
    companyName: 'Tech Solutions SA',
    industry: 'Consultoría',
    type: 'company',
    contactName: 'Ana Martínez',
    contactRole: 'Directora',
    email: 'ana@techsol.com',
    emailVerified: true,
    phone: '+52 81 9876 5432',
    hasWhatsApp: false,
    segment: 'premium',
    totalValue: 389000,
    valueGrowth: 25,
    lastActivity: new Date(Date.now() - 5 * 60 * 60 * 1000),
    activityType: 'email',
    status: 'active',
    healthScore: 88,
    assignedTo: {
      id: 'u2',
      name: 'Carlos Ruiz',
      isOnline: false
    },
    address: 'San Pedro Garza García, NL',
    website: 'techsolutions.mx',
    tags: ['Premium', 'Consultoría']
  },
  {
    id: '3',
    companyName: 'Innovatech',
    industry: 'Desarrollo',
    type: 'company',
    contactName: 'Roberto Sánchez',
    contactRole: 'CTO',
    email: 'roberto@innovatech.com',
    emailVerified: false,
    phone: '+52 33 5555 1234',
    hasWhatsApp: true,
    segment: 'sme',
    totalValue: 78000,
    valueGrowth: -5,
    lastActivity: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
    activityType: 'call',
    status: 'at_risk',
    healthScore: 35,
    assignedTo: {
      id: 'u1',
      name: 'María López',
      isOnline: true
    },
    address: 'Guadalajara, JAL',
    tags: ['PyME']
  },
  {
    id: '4',
    companyName: 'Global Industries',
    industry: 'Manufactura',
    type: 'company',
    contactName: 'Patricia Hernández',
    contactRole: 'Gerente Compras',
    email: 'patricia@global.com',
    emailVerified: true,
    phone: '+52 55 8888 9999',
    hasWhatsApp: true,
    segment: 'corporate',
    totalValue: 567000,
    valueGrowth: 8,
    lastActivity: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    activityType: 'meeting',
    status: 'active',
    healthScore: 75,
    assignedTo: {
      id: 'u3',
      name: 'Luis Hernández',
      isOnline: true
    },
    address: 'Monterrey, NL',
    website: 'globalind.com',
    tags: ['Manufactura', 'Grande']
  },
  {
    id: '5',
    companyName: 'StartupXYZ',
    industry: 'SaaS',
    type: 'company',
    contactName: 'Miguel Torres',
    contactRole: 'Founder',
    email: 'miguel@startupxyz.io',
    emailVerified: true,
    phone: '+52 55 3333 4444',
    hasWhatsApp: true,
    segment: 'sme',
    totalValue: 45000,
    valueGrowth: 45,
    lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    activityType: 'email',
    status: 'new',
    healthScore: 95,
    assignedTo: {
      id: 'u2',
      name: 'Carlos Ruiz',
      isOnline: false
    },
    address: 'CDMX',
    website: 'startupxyz.io',
    tags: ['Startup', 'Nuevo']
  }
];

export function Customers() {
  const [customers] = useState<Customer[]>(mockCustomers);
  const [selectedCustomers, setSelectedCustomers] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<ViewMode>('table');
  const [statusFilter, setStatusFilter] = useState<'all' | CustomerStatus>('all');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);

  const handleSelectCustomer = (customerId: string) => {
    setSelectedCustomers(prev => {
      const newSet = new Set(prev);
      if (newSet.has(customerId)) {
        newSet.delete(customerId);
      } else {
        newSet.add(customerId);
      }
      return newSet;
    });
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedCustomers(new Set(filteredCustomers.map(c => c.id)));
    } else {
      setSelectedCustomers(new Set());
    }
  };

  // Filter by status
  const filteredCustomers = statusFilter === 'all' 
    ? customers 
    : customers.filter(c => c.status === statusFilter);

  const statusCounts = {
    all: customers.length,
    active: customers.filter(c => c.status === 'active').length,
    inactive: customers.filter(c => c.status === 'inactive').length,
    at_risk: customers.filter(c => c.status === 'at_risk').length,
  };

  return (
    <div className="h-full flex bg-[#F8FAFC]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <CustomersHeader 
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          statusCounts={statusCounts}
        />

        {/* Filters Bar */}
        <FiltersBar />

        {/* Actions Bar */}
        <ActionsBar 
          selectedCount={selectedCustomers.size}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onClearSelection={() => setSelectedCustomers(new Set())}
        />

        {/* Table */}
        <div className="flex-1 overflow-auto">
          <CustomersTable 
            customers={filteredCustomers}
            selectedCustomers={selectedCustomers}
            onSelectCustomer={handleSelectCustomer}
            onSelectAll={handleSelectAll}
            expandedRow={expandedRow}
            onToggleExpand={setExpandedRow}
          />
        </div>

        {/* Footer Pagination */}
        <div className="bg-[#F8FAFC] border-t border-[#E2E8F0] px-8 py-4 h-16 flex items-center justify-between">
          <div className="text-sm text-[#64748B]">
            Mostrando 1-{filteredCustomers.length} de {filteredCustomers.length} clientes
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 text-sm text-[#64748B] hover:bg-white rounded transition-colors">
              Anterior
            </button>
            <button className="min-w-[36px] h-9 px-3 rounded bg-[#3B82F6] text-white">1</button>
            <button className="min-w-[36px] h-9 px-3 rounded text-[#64748B] hover:bg-white transition-colors">2</button>
            <button className="px-3 py-1.5 text-sm text-[#64748B] hover:bg-white rounded transition-colors">
              Siguiente
            </button>
          </div>
          <select className="h-9 px-3 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#1E293B]">
            <option value={25}>25 por página</option>
            <option value={50}>50 por página</option>
            <option value={100}>100 por página</option>
          </select>
        </div>
      </div>

      {/* Sidebar Panel */}
      <SidebarPanel customers={customers} />
    </div>
  );
}
