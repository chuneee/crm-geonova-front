import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit2, Copy, Trash2, Clock, Calendar, DollarSign, TrendingUp } from 'lucide-react';
import { OpportunityHeader } from '../components/opportunity/OpportunityHeader';
import { OpportunityTabs } from '../components/opportunity/OpportunityTabs';
import { OverviewTab } from '../components/opportunity/tabs/OverviewTab';
import { ActivitiesTab } from '../components/opportunity/tabs/ActivitiesTab';
import { QuotesTab } from '../components/opportunity/tabs/QuotesTab';
import { ProductsTab } from '../components/opportunity/tabs/ProductsTab';
import { HistoryTab } from '../components/opportunity/tabs/HistoryTab';
import { DocumentsTab } from '../components/opportunity/tabs/DocumentsTab';

export function OpportunityDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<'resumen' | 'actividades' | 'cotizaciones' | 'productos' | 'historial' | 'documentos'>('resumen');

  // Mock data - en producción vendría de una API
  const opportunity = {
    id: id || '1',
    title: 'Sistema CRM Enterprise',
    company: 'TechCorp Solutions',
    value: 450000,
    probability: 65,
    stage: 'propuesta',
    stageLabel: 'Propuesta',
    status: 'open',
    closeDate: '2025-12-15',
    lastActivity: '2 horas',
    assignedTo: {
      id: '1',
      name: 'Carlos Rodríguez',
      avatar: 'CR',
      color: 'from-blue-500 to-blue-600'
    },
    createdBy: {
      name: 'Ana Martínez',
      avatar: 'AM',
      date: '2024-11-01'
    },
    createdAt: '2024-11-01T10:30:00',
    updatedAt: '2024-12-15T14:30:00',
    contact: {
      name: 'Roberto Silva',
      email: 'roberto.silva@techcorp.com',
      phone: '+52 55 1234 5678',
      verified: true
    },
    source: 'Referido',
    campaign: 'Q4 Enterprise Sales',
    type: 'Nueva venta',
    competitors: ['Salesforce', 'HubSpot'],
    discount: 10,
    estimatedCost: 180000,
    paymentMethod: 'Transferencia',
    paymentTerms: '30 días',
    territory: 'CDMX Centro',
    tags: ['Enterprise', 'High Priority', 'Tech'],
    nextSteps: [
      { id: '1', text: 'Enviar propuesta económica', completed: false, dueDate: 'Hoy', priority: 'high' },
      { id: '2', text: 'Confirmar reunión con CFO', completed: false, dueDate: 'Mañana', priority: 'medium' },
      { id: '3', text: 'Demo técnica completada', completed: true, dueDate: 'Ayer', priority: 'low' }
    ],
    collaborators: [
      { id: '1', name: 'Carlos Rodríguez', avatar: 'CR', role: 'Owner', color: 'from-blue-500 to-blue-600' },
      { id: '2', name: 'María García', avatar: 'MG', role: 'Editor', color: 'from-purple-500 to-purple-600' },
      { id: '3', name: 'Juan Pérez', avatar: 'JP', role: 'Viewer', color: 'from-green-500 to-green-600' }
    ],
    documents: [
      { id: '1', name: 'Propuesta_v2.pdf', size: '1.2 MB', date: 'Hace 1 día', type: 'pdf' },
      { id: '2', name: 'Contrato_template.docx', size: '845 KB', date: 'Hace 3 días', type: 'docx' }
    ],
    aiSuggestion: {
      probability: 70,
      factors: [
        { text: 'Budget confirmed', status: 'positive', icon: 'check' },
        { text: 'Decision maker engaged', status: 'positive', icon: 'check' },
        { text: 'Competitor present', status: 'warning', icon: 'alert' },
        { text: 'Timeline uncertain', status: 'warning', icon: 'alert' }
      ]
    }
  };

  const stages = [
    { id: 'prospeccion', label: 'Prospección' },
    { id: 'calificacion', label: 'Calificación' },
    { id: 'propuesta', label: 'Propuesta' },
    { id: 'negociacion', label: 'Negociación' },
    { id: 'ganado', label: 'Ganado' },
    { id: 'perdido', label: 'Perdido' }
  ];

  const currentStageIndex = stages.findIndex(s => s.id === opportunity.stage);

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <OpportunityHeader 
        opportunity={opportunity}
        onBack={() => navigate('/pipeline')}
      />

      {/* Tabs */}
      <OpportunityTabs 
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {activeTab === 'resumen' && <OverviewTab opportunity={opportunity} />}
        {activeTab === 'actividades' && <ActivitiesTab opportunityId={opportunity.id} />}
        {activeTab === 'cotizaciones' && <QuotesTab opportunityId={opportunity.id} />}
        {activeTab === 'productos' && <ProductsTab opportunityId={opportunity.id} />}
        {activeTab === 'historial' && <HistoryTab opportunityId={opportunity.id} />}
        {activeTab === 'documentos' && <DocumentsTab documents={opportunity.documents} />}
      </div>

      {/* Floating Action Bar */}
      <div className="sticky bottom-0 bg-white border-t border-[#E2E8F0] px-8 py-4 h-[72px] flex items-center justify-between">
        <div className="flex items-center gap-3">
          {stages.slice(0, -1).map((stage, idx) => (
            <div key={stage.id} className="flex items-center gap-3">
              <div 
                className={`w-3 h-3 rounded-full ${
                  idx < currentStageIndex 
                    ? 'bg-[#10B981]' 
                    : idx === currentStageIndex 
                    ? 'bg-[#3B82F6]' 
                    : 'bg-[#E2E8F0]'
                }`}
              />
              {idx < stages.length - 2 && (
                <div className={`w-16 h-0.5 ${idx < currentStageIndex ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'}`} />
              )}
            </div>
          ))}
        </div>
        
        <div className="flex items-center gap-3">
          <button className="px-6 py-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors">
            Anterior etapa
          </button>
          <button className="px-6 py-2 text-[#EF4444] border border-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors">
            Marcar como perdida
          </button>
          <button className="px-6 py-2 text-white bg-[#10B981] hover:bg-[#059669] rounded-lg transition-colors">
            Marcar como ganada
          </button>
          <button className="px-8 py-2 text-white bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-colors">
            Siguiente etapa
          </button>
        </div>
      </div>
    </div>
  );
}
