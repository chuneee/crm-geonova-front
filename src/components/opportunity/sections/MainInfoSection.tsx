import { Building2, User, Mail, Phone, Target, Megaphone, Tag, Users } from 'lucide-react';

interface MainInfoSectionProps {
  opportunity: any;
}

export function MainInfoSection({ opportunity }: MainInfoSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Información Principal</h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Cliente/Empresa */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">
            Cliente/Empresa <span className="text-[#EF4444]">*</span>
          </label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select 
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.company}
            >
              <option>{opportunity.company}</option>
              <option>Otra empresa</option>
            </select>
          </div>
        </div>

        {/* Contacto Principal */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Contacto principal</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select 
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.contact.name}
            >
              <option>{opportunity.contact.name}</option>
              <option>Otro contacto</option>
            </select>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <input 
              type="email"
              className="w-full h-11 pl-10 pr-12 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.contact.email}
            />
            {opportunity.contact.verified && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-5 h-5 rounded-full bg-[#10B981] flex items-center justify-center">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Teléfono</label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <a 
              href={`tel:${opportunity.contact.phone}`}
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#3B82F6] hover:bg-[#F8FAFC] transition-colors flex items-center"
            >
              {opportunity.contact.phone}
            </a>
          </div>
        </div>

        {/* Fuente */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Fuente</label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select 
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.source}
            >
              <option>{opportunity.source}</option>
              <option>Website</option>
              <option>LinkedIn</option>
              <option>Evento</option>
              <option>Llamada en frío</option>
            </select>
          </div>
        </div>

        {/* Campaña */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Campaña</label>
          <div className="relative">
            <Megaphone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select 
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.campaign}
            >
              <option>{opportunity.campaign}</option>
              <option>Q1 Outbound</option>
              <option>Webinar Series</option>
            </select>
          </div>
        </div>

        {/* Tipo de Oportunidad */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Tipo de oportunidad</label>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <select 
              className="w-full h-11 pl-10 pr-4 border border-[#E2E8F0] rounded-lg text-[#1E293B] bg-white focus:outline-none focus:border-[#3B82F6] transition-colors"
              defaultValue={opportunity.type}
            >
              <option>{opportunity.type}</option>
              <option>Upsell</option>
              <option>Renovación</option>
              <option>Cross-sell</option>
            </select>
          </div>
        </div>

        {/* Competidores */}
        <div>
          <label className="block text-sm text-[#64748B] mb-2">Competidores</label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
            <div className="w-full min-h-[44px] pl-10 pr-4 border border-[#E2E8F0] rounded-lg bg-white flex items-center flex-wrap gap-2 py-2">
              {opportunity.competitors.map((comp: string, idx: number) => (
                <span 
                  key={idx}
                  className="px-2 py-1 bg-[#F1F5F9] text-[#64748B] text-sm rounded flex items-center gap-1"
                >
                  {comp}
                  <button className="hover:text-[#EF4444] transition-colors">×</button>
                </span>
              ))}
              <input 
                type="text"
                placeholder="Agregar..."
                className="flex-1 min-w-[100px] outline-none text-[#1E293B] text-sm"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
