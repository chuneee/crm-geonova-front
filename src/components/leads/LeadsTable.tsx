import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MoreVertical, 
  ArrowUpDown, 
  Star,
  Building2,
  Eye,
  Edit,
  TrendingUp,
  Trash2
} from 'lucide-react';

interface LeadsTableProps {
  selectedLeads: number[];
  onSelectLeads: (ids: number[]) => void;
  onViewLead: (lead: any) => void;
}

export function LeadsTable({ selectedLeads, onSelectLeads, onViewLead }: LeadsTableProps) {
  const [sortColumn, setSortColumn] = useState<string>('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
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

  const handleSelectAll = () => {
    if (selectedLeads.length === leads.length) {
      onSelectLeads([]);
    } else {
      onSelectLeads(leads.map(lead => lead.id));
    }
  };

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
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-max">
        <thead className="sticky top-0 bg-white z-10">
          <tr className="bg-[#F1F5F9] h-12 border-b border-[#E2E8F0]">
            <th className="w-10 px-4 sticky left-0 bg-[#F1F5F9] z-20">
              <input
                type="checkbox"
                checked={selectedLeads.length === leads.length}
                onChange={handleSelectAll}
                className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-[#3B82F6] cursor-pointer"
              />
            </th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[200px] sticky left-10 bg-[#F1F5F9] z-20">
              <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                <span>Nombre</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[180px]">
              <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                <span>Empresa</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[200px] hidden xl:table-cell">Email</th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[140px] hidden 2xl:table-cell">Teléfono</th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[110px]">Fuente</th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[130px]">Estado</th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[100px] hidden 2xl:table-cell">Score</th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[150px] hidden xl:table-cell">Asignado a</th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] min-w-[140px]">
              <button className="flex items-center gap-1 hover:text-gray-900 transition-colors">
                <span>Fecha</span>
                <ArrowUpDown className="w-3 h-3" />
              </button>
            </th>
            <th className="px-4 text-left text-xs font-medium text-[#64748B] w-20 sticky right-0 bg-[#F1F5F9] z-20">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className={`h-16 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors ${
                selectedLeads.includes(lead.id)
                  ? 'bg-[#EFF6FF] border-l-4 border-l-[#3B82F6]'
                  : ''
              }`}
            >
              <td className="px-4 sticky left-0 bg-white z-10">
                <input
                  type="checkbox"
                  checked={selectedLeads.includes(lead.id)}
                  onChange={() => handleSelectLead(lead.id)}
                  className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-[#3B82F6] cursor-pointer"
                />
              </td>
              <td className="px-4 sticky left-10 bg-white z-10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-xs">
                      {lead.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <span className="text-sm text-gray-900 font-medium whitespace-nowrap">{lead.name}</span>
                </div>
              </td>
              <td className="px-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#64748B] flex-shrink-0" />
                  <div>
                    <div className="text-sm text-gray-900 whitespace-nowrap">{lead.company}</div>
                    <div className="text-xs text-[#64748B]">{lead.industry}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 hidden xl:table-cell">
                <a
                  href={`mailto:${lead.email}`}
                  className="flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#2563EB]"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span className="truncate max-w-[180px]">{lead.email}</span>
                </a>
              </td>
              <td className="px-4 hidden 2xl:table-cell">
                <a
                  href={`tel:${lead.phone}`}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-[#3B82F6]"
                >
                  <Phone className="w-4 h-4 text-[#64748B] flex-shrink-0" />
                  <span className="whitespace-nowrap">{lead.phone}</span>
                </a>
              </td>
              <td className="px-4">
                <span
                  className="inline-flex items-center px-2.5 py-1 rounded-full text-xs text-white whitespace-nowrap"
                  style={{ backgroundColor: lead.sourceColor }}
                >
                  {lead.source}
                </span>
              </td>
              <td className="px-4">
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white whitespace-nowrap"
                  style={{ backgroundColor: lead.statusColor }}
                >
                  {lead.status}
                </span>
              </td>
              <td className="px-4 hidden 2xl:table-cell">
                {renderStars(lead.score)}
              </td>
              <td className="px-4 hidden xl:table-cell">
                <div className="flex items-center gap-2 group relative">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-br ${lead.assignedColor} flex items-center justify-center`}
                  >
                    <span className="text-white text-xs">{lead.assignedTo}</span>
                  </div>
                  <span className="text-sm text-gray-700 whitespace-nowrap">{lead.assignedName}</span>
                  {/* Tooltip */}
                  <div className="absolute left-0 bottom-full mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-10">
                    {lead.assignedName}
                  </div>
                </div>
              </td>
              <td className="px-4">
                <div>
                  <div className="text-sm text-gray-900 whitespace-nowrap">{lead.dateCreated}</div>
                  <div className="text-xs text-[#64748B]">{lead.timeAgo}</div>
                </div>
              </td>
              <td className="px-4 sticky right-0 bg-white z-10">
                <div className="relative">
                  <button
                    onClick={() => setActiveMenu(activeMenu === lead.id ? null : lead.id)}
                    className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}