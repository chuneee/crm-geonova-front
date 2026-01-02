import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Search, Filter, LayoutGrid, List, Download, Send } from 'lucide-react';
import { QuoteMetrics } from '../components/quotes/QuoteMetrics';
import { QuoteFilters } from '../components/quotes/QuoteFilters';
import { QuoteCard } from '../components/quotes/QuoteCard';
import { QuoteTable } from '../components/quotes/QuoteTable';
import { QuoteDetailModal } from '../components/quotes/QuoteDetailModal';

export interface Quote {
  id: string;
  quoteNumber: string;
  version: number;
  status: 'draft' | 'sent' | 'viewed' | 'approved' | 'rejected' | 'expired';
  client: {
    id: string;
    name: string;
    contact: string;
    email: string;
    logo?: string;
  };
  opportunity?: {
    id: string;
    name: string;
  };
  items: {
    id: string;
    product: string;
    description: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    tax: number;
    total: number;
  }[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  validUntil: string;
  createdAt: string;
  sentAt?: string;
  viewedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  createdBy: {
    id: string;
    name: string;
  };
  notes?: string;
  terms?: string;
  paymentTerms?: string;
}

type ViewMode = 'grid' | 'list';

// Mock data
const mockQuotes: Quote[] = [
  {
    id: '1',
    quoteNumber: 'COT-2024-001',
    version: 1,
    status: 'sent',
    client: {
      id: 'c1',
      name: 'Constructora ABC',
      contact: 'Juan Pérez',
      email: 'juan@constructoraabc.com',
    },
    opportunity: {
      id: 'opp1',
      name: 'Proyecto Drones Construcción',
    },
    items: [
      {
        id: 'i1',
        product: 'DJI Mavic 3 Enterprise',
        description: 'Drone profesional para topografía',
        quantity: 2,
        unitPrice: 85000,
        discount: 10,
        tax: 16,
        total: 177480,
      },
    ],
    subtotal: 170000,
    discount: 17000,
    tax: 24480,
    total: 177480,
    validUntil: '2024-12-31',
    createdAt: '2024-12-10T10:00:00',
    sentAt: '2024-12-10T14:30:00',
    viewedAt: '2024-12-11T09:15:00',
    createdBy: {
      id: 'u1',
      name: 'María González',
    },
    paymentTerms: '50% anticipo, 50% contra entrega',
  },
  {
    id: '2',
    quoteNumber: 'COT-2024-002',
    version: 2,
    status: 'approved',
    client: {
      id: 'c2',
      name: 'Minera del Norte',
      contact: 'Ana Torres',
      email: 'atorres@minera.com',
    },
    items: [
      {
        id: 'i2',
        product: 'Estación Total Leica TS16',
        description: 'Equipo de topografía de precisión',
        quantity: 1,
        unitPrice: 320000,
        discount: 15,
        tax: 16,
        total: 315520,
      },
    ],
    subtotal: 320000,
    discount: 48000,
    tax: 43520,
    total: 315520,
    validUntil: '2025-01-15',
    createdAt: '2024-12-05T11:00:00',
    sentAt: '2024-12-05T16:00:00',
    viewedAt: '2024-12-06T10:00:00',
    approvedAt: '2024-12-08T14:30:00',
    createdBy: {
      id: 'u2',
      name: 'Carlos Ramírez',
    },
    paymentTerms: '30% anticipo, 70% a 30 días',
  },
  {
    id: '3',
    quoteNumber: 'COT-2024-003',
    version: 1,
    status: 'draft',
    client: {
      id: 'c3',
      name: 'Agroindustrias del Sur',
      contact: 'Roberto Sánchez',
      email: 'rsanchez@agrosur.com',
    },
    items: [
      {
        id: 'i3',
        product: 'DJI Agras T30',
        description: 'Drone agrícola profesional',
        quantity: 1,
        unitPrice: 180000,
        discount: 0,
        tax: 16,
        total: 208800,
      },
    ],
    subtotal: 180000,
    discount: 0,
    tax: 28800,
    total: 208800,
    validUntil: '2024-12-25',
    createdAt: '2024-12-18T09:00:00',
    createdBy: {
      id: 'u1',
      name: 'María González',
    },
  },
  {
    id: '4',
    quoteNumber: 'COT-2024-004',
    version: 1,
    status: 'expired',
    client: {
      id: 'c4',
      name: 'Topografía Moderna',
      contact: 'Laura Méndez',
      email: 'lmendez@topomoderna.com',
    },
    items: [
      {
        id: 'i4',
        product: 'GNSS Trimble R12i',
        description: 'Receptor GNSS de alta precisión',
        quantity: 2,
        unitPrice: 250000,
        discount: 10,
        tax: 16,
        total: 522000,
      },
    ],
    subtotal: 500000,
    discount: 50000,
    tax: 72000,
    total: 522000,
    validUntil: '2024-12-15',
    createdAt: '2024-11-20T10:00:00',
    sentAt: '2024-11-20T15:00:00',
    viewedAt: '2024-11-21T11:00:00',
    createdBy: {
      id: 'u3',
      name: 'Luis Mendoza',
    },
  },
  {
    id: '5',
    quoteNumber: 'COT-2024-005',
    version: 1,
    status: 'rejected',
    client: {
      id: 'c5',
      name: 'Desarrollo Urbano XYZ',
      contact: 'Jorge Martínez',
      email: 'jmartinez@desarrollo.com',
    },
    items: [
      {
        id: 'i5',
        product: 'Software Pix4D Mapper',
        description: 'Licencia anual de software de fotogrametría',
        quantity: 5,
        unitPrice: 35000,
        discount: 20,
        tax: 16,
        total: 162400,
      },
    ],
    subtotal: 175000,
    discount: 35000,
    tax: 22400,
    total: 162400,
    validUntil: '2025-01-10',
    createdAt: '2024-12-12T13:00:00',
    sentAt: '2024-12-12T17:00:00',
    viewedAt: '2024-12-13T09:00:00',
    rejectedAt: '2024-12-15T11:00:00',
    createdBy: {
      id: 'u4',
      name: 'Ana Torres',
    },
  },
];

export function Quotes() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [quotes, setQuotes] = useState<Quote[]>(mockQuotes);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [filters, setFilters] = useState({
    search: '',
    status: [] as string[],
    dateRange: 'all',
    client: '',
    minAmount: '',
    maxAmount: '',
  });

  const filterQuotes = (quotes: Quote[]) => {
    let filtered = quotes;

    // Search filter
    if (filters.search) {
      filtered = filtered.filter(q =>
        q.quoteNumber.toLowerCase().includes(filters.search.toLowerCase()) ||
        q.client.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    // Status filter
    if (filters.status.length > 0) {
      filtered = filtered.filter(q => filters.status.includes(q.status));
    }

    // Amount filter
    if (filters.minAmount) {
      filtered = filtered.filter(q => q.total >= parseFloat(filters.minAmount));
    }
    if (filters.maxAmount) {
      filtered = filtered.filter(q => q.total <= parseFloat(filters.maxAmount));
    }

    return filtered;
  };

  const filteredQuotes = filterQuotes(quotes);

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-[#1E293B]">Cotizaciones</h1>
          
          <div className="flex items-center gap-3">
            {/* View Toggle */}
            <div className="flex bg-[#F1F5F9] rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list' ? 'bg-white text-[#3B82F6] shadow-sm' : 'text-[#64748B]'
                }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            <button className="flex items-center gap-2 px-4 h-10 text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm">Exportar</span>
            </button>

            <button
              onClick={() => navigate('/quote/new')}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>Nueva Cotización</span>
            </button>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span>Dashboard</span>
          <span>/</span>
          <span>Ventas</span>
          <span>/</span>
          <span className="text-[#1E293B]">Cotizaciones</span>
        </div>
      </div>

      {/* Metrics */}
      <QuoteMetrics quotes={quotes} />

      {/* Filters */}
      <QuoteFilters filters={filters} onChange={setFilters} />

      {/* Content */}
      <div className="px-8 mt-6">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredQuotes.map((quote) => (
              <QuoteCard
                key={quote.id}
                quote={quote}
                onClick={() => setSelectedQuote(quote)}
              />
            ))}
          </div>
        ) : (
          <QuoteTable
            quotes={filteredQuotes}
            onQuoteClick={setSelectedQuote}
          />
        )}

        {filteredQuotes.length === 0 && (
          <div className="bg-white rounded-lg border border-[#E2E8F0] p-12 text-center">
            <div className="w-16 h-16 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#CBD5E1]" />
            </div>
            <h3 className="text-lg text-[#1E293B] mb-2">No se encontraron cotizaciones</h3>
            <p className="text-sm text-[#64748B] mb-4">
              Intenta ajustar los filtros o crear una nueva cotización
            </p>
            <button
              onClick={() => navigate('/quote/new')}
              className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Nueva Cotización
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedQuote && (
        <QuoteDetailModal
          quote={selectedQuote}
          onClose={() => setSelectedQuote(null)}
          onUpdate={(updated) => {
            setQuotes(prev => prev.map(q => q.id === updated.id ? updated : q));
            setSelectedQuote(updated);
          }}
        />
      )}
    </div>
  );
}