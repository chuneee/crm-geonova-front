import { 
  Mail, 
  Phone, 
  MoreVertical, 
  Star,
  Building2,
  Eye,
  Edit,
  TrendingUp,
  Trash2,
  Calendar
} from 'lucide-react';
import { useState } from 'react';

interface LeadsCardsProps {
  selectedLeads: number[];
  onSelectLeads: (ids: number[]) => void;
  onViewLead: (lead: any) => void;
}

export function LeadsCards({ selectedLeads, onSelectLeads, onViewLead }: LeadsCardsProps) {
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const leads = [
    {
      id: 1,
      name: 'Roberto Fernández',
      company: 'Tech Solutions',
      industry: 'Tecnología',
      email: 'roberto@techsolutions.com',
      phone: '+52 81 1234 5678',
      source: 'Web',
      sourceColor: '#3B82F6',
      status: 'Nuevo',
      statusColor: '#3B82F6',
      score: 5,
      assignedTo: 'CR',
      assignedName: 'Carlos Rodríguez',
      assignedColor: 'from-[#3B82F6] to-[#2563EB]',
      dateCreated: '2024-12-15',
      timeAgo: 'Hoy'
    },
    {
      id: 2,
      name: 'Laura Méndez',
      company: 'Global Industries',
      industry: 'Manufactura',
      email: 'laura.mendez@global.com',
      phone: '+52 33 9876 5432',
      source: 'Referido',
      sourceColor: '#10B981',
      status: 'Contactado',
      statusColor: '#8B5CF6',
      score: 4,
      assignedTo: 'MG',
      assignedName: 'María González',
      assignedColor: 'from-[#8B5CF6] to-[#7C3AED]',
      dateCreated: '2024-12-14',
      timeAgo: 'Ayer'
    },
    {
      id: 3,
      name: 'Miguel Ángel Torres',
      company: 'Innovate Corp',
      industry: 'Consultoría',
      email: 'mtorres@innovate.mx',
      phone: '+52 55 2345 6789',
      source: 'Llamada',
      sourceColor: '#F59E0B',
      status: 'Calificado',
      statusColor: '#10B981',
      score: 5,
      assignedTo: 'JL',
      assignedName: 'Juan López',
      assignedColor: 'from-[#10B981] to-[#059669]',
      dateCreated: '2024-12-13',
      timeAgo: 'Hace 2 días'
    },
    {
      id: 4,
      name: 'Patricia Ramírez',
      company: 'Digital Ventures',
      industry: 'Marketing',
      email: 'p.ramirez@digitalv.com',
      phone: '+52 81 5555 1234',
      source: 'Redes Sociales',
      sourceColor: '#EC4899',
      status: 'Contactado',
      statusColor: '#8B5CF6',
      score: 3,
      assignedTo: 'AM',
      assignedName: 'Ana Martínez',
      assignedColor: 'from-[#F59E0B] to-[#D97706]',
      dateCreated: '2024-12-13',
      timeAgo: 'Hace 2 días'
    },
    {
      id: 5,
      name: 'Javier Hernández',
      company: 'Smart Systems',
      industry: 'Software',
      email: 'jhernandez@smartsys.com',
      phone: '+52 33 7777 8888',
      source: 'Web',
      sourceColor: '#3B82F6',
      status: 'Nuevo',
      statusColor: '#3B82F6',
      score: 4,
      assignedTo: 'CR',
      assignedName: 'Carlos Rodríguez',
      assignedColor: 'from-[#3B82F6] to-[#2563EB]',
      dateCreated: '2024-12-12',
      timeAgo: 'Hace 3 días'
    },
    {
      id: 6,
      name: 'Carmen Soto',
      company: 'Acme Corporation',
      industry: 'Retail',
      email: 'csoto@acme.mx',
      phone: '+52 55 9999 0000',
      source: 'Referido',
      sourceColor: '#10B981',
      status: 'Calificado',
      statusColor: '#10B981',
      score: 5,
      assignedTo: 'MG',
      assignedName: 'María González',
      assignedColor: 'from-[#8B5CF6] to-[#7C3AED]',
      dateCreated: '2024-12-11',
      timeAgo: 'Hace 4 días'
    },
    {
      id: 7,
      name: 'Ricardo Morales',
      company: 'BuildTech SA',
      industry: 'Construcción',
      email: 'rmorales@buildtech.com',
      phone: '+52 81 3333 4444',
      source: 'Llamada',
      sourceColor: '#F59E0B',
      status: 'Descalificado',
      statusColor: '#64748B',
      score: 2,
      assignedTo: 'JL',
      assignedName: 'Juan López',
      assignedColor: 'from-[#10B981] to-[#059669]',
      dateCreated: '2024-12-10',
      timeAgo: 'Hace 5 días'
    },
    {
      id: 8,
      name: 'Daniela Cruz',
      company: 'EcoSolutions',
      industry: 'Energía',
      email: 'dcruz@ecosolutions.mx',
      phone: '+52 33 1111 2222',
      source: 'Web',
      sourceColor: '#3B82F6',
      status: 'Contactado',
      statusColor: '#8B5CF6',
      score: 4,
      assignedTo: 'AM',
      assignedName: 'Ana Martínez',
      assignedColor: 'from-[#F59E0B] to-[#D97706]',
      dateCreated: '2024-12-09',
      timeAgo: 'Hace 6 días'
    }
  ];

  const handleSelectLead = (id: number) => {
    if (selectedLeads.includes(id)) {
      onSelectLeads(selectedLeads.filter(leadId => leadId !== id));
    } else {
      onSelectLeads([...selectedLeads, id]);
    }
  };

  const renderStars = (score: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= score
                ? 'fill-[#F59E0B] text-[#F59E0B]'
                : 'text-[#E2E8F0]'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {leads.map((lead) => (
          <div
            key={lead.id}
            className={`bg-white border border-[#E2E8F0] rounded-xl p-4 hover:shadow-lg transition-all cursor-pointer ${
              selectedLeads.includes(lead.id)
                ? 'ring-2 ring-[#3B82F6] border-[#3B82F6]'
                : ''
            }`}
            onClick={() => handleSelectLead(lead.id)}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <div className={`w-10 h-10 bg-gradient-to-br ${lead.assignedColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs font-medium">
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-medium text-gray-900 truncate">{lead.name}</h3>
                  <div className="flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3 h-3 text-[#64748B] flex-shrink-0" />
                    <span className="text-xs text-[#64748B] truncate">{lead.company}</span>
                  </div>
                </div>
              </div>
              
              <div className="relative ml-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => setActiveMenu(activeMenu === lead.id ? null : lead.id)}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100 flex-shrink-0"
                >
                  <MoreVertical className="w-4 h-4 text-[#64748B]" />
                </button>
                
                {activeMenu === lead.id && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setActiveMenu(null)}
                    />
                    <div className="absolute right-0 top-full mt-1 w-56 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-20">
                      <button 
                        onClick={() => {
                          onViewLead(lead);
                          setActiveMenu(null);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#F8FAFC] flex items-center gap-3"
                      >
                        <Eye className="w-4 h-4 text-[#64748B]" />
                        <span>Ver detalle</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#F8FAFC] flex items-center gap-3">
                        <Edit className="w-4 h-4 text-[#64748B]" />
                        <span>Editar</span>
                      </button>
                      <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#F8FAFC] flex items-center gap-3">
                        <TrendingUp className="w-4 h-4 text-[#64748B]" />
                        <span>Convertir a oportunidad</span>
                      </button>
                      <div className="border-t border-[#E2E8F0] my-1" />
                      <button className="w-full px-4 py-2 text-left text-sm text-[#EF4444] hover:bg-[#FEF2F2] flex items-center gap-3">
                        <Trash2 className="w-4 h-4" />
                        <span>Eliminar</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Status & Source Badges */}
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium text-white"
                style={{ backgroundColor: lead.statusColor }}
              >
                {lead.status}
              </span>
              <span
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs text-white"
                style={{ backgroundColor: lead.sourceColor }}
              >
                {lead.source}
              </span>
            </div>

            {/* Score */}
            <div className="mb-3">
              {renderStars(lead.score)}
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-3">
              <a
                href={`mailto:${lead.email}`}
                className="flex items-center gap-2 text-xs text-[#3B82F6] hover:text-[#2563EB] min-w-0"
                onClick={(e) => e.stopPropagation()}
              >
                <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                <span className="truncate">{lead.email}</span>
              </a>
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center gap-2 text-xs text-gray-700 hover:text-[#3B82F6]"
                onClick={(e) => e.stopPropagation()}
              >
                <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{lead.phone}</span>
              </a>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-[#E2E8F0]">
              <div className="flex items-center gap-2 min-w-0">
                <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${lead.assignedColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-white text-xs">{lead.assignedTo}</span>
                </div>
                <span className="text-xs text-[#64748B] truncate">{lead.assignedName.split(' ')[0]}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-[#64748B] flex-shrink-0">
                <Calendar className="w-3 h-3" />
                <span>{lead.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}