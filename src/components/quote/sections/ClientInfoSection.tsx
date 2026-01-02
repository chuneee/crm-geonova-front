import { Building2, Mail, Phone, ExternalLink, Edit } from 'lucide-react';

interface ClientInfoSectionProps {
  client: any;
  opportunity: any;
}

export function ClientInfoSection({ client, opportunity }: ClientInfoSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-[#1E293B]">Información del Cliente</h3>
        <button className="text-sm text-[#3B82F6] hover:underline">
          Cambiar cliente
        </button>
      </div>

      <div className="space-y-4">
        {/* Cliente */}
        <div className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg">
          <div className="w-[60px] h-[60px] rounded-lg bg-gradient-to-br from-[#3B82F6] to-[#2563EB] flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xl">
              {client.logo}
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Building2 className="w-4 h-4 text-[#64748B]" />
              <span className="text-lg text-[#1E293B]">{client.name}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#64748B]">
              <div className="flex items-center gap-1">
                <Mail className="w-4 h-4" />
                <span>{client.contact.email}</span>
              </div>
              <div className="flex items-center gap-1">
                <Phone className="w-4 h-4" />
                <span>{client.contact.phone}</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-[#64748B] hover:bg-white rounded-lg transition-colors">
            <Edit className="w-5 h-5" />
          </button>
        </div>

        {/* Contacto */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Contacto principal</label>
          <div className="flex items-center justify-between p-3 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
            <span className="text-[#1E293B]">{client.contact.name}</span>
            <button className="text-sm text-[#3B82F6] hover:underline">
              Editar
            </button>
          </div>
        </div>

        {/* Oportunidad Vinculada */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Oportunidad vinculada</label>
          <button className="flex items-center gap-2 px-3 py-2 border border-[#3B82F6] text-[#3B82F6] rounded-lg hover:bg-[#EFF6FF] transition-colors">
            <span>#OPP-{opportunity.id}</span>
            <span>-</span>
            <span>{opportunity.title}</span>
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
