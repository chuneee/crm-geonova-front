import { Hash, MapPin, Tag as TagIcon } from 'lucide-react';

interface AdditionalInfoSectionProps {
  opportunity: any;
}

export function AdditionalInfoSection({ opportunity }: AdditionalInfoSectionProps) {
  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getRelativeTime = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) return `Hace ${diffMins} min`;
    if (diffHours < 24) return `Hace ${diffHours}h`;
    return `Hace ${diffDays} días`;
  };

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <h3 className="text-[#1E293B] mb-4">Información Adicional</h3>
      
      <div className="space-y-4">
        <div>
          <div className="text-xs text-[#64748B] mb-1">Creado por</div>
          <div className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 flex items-center justify-center text-white text-xs`}>
              {opportunity.createdBy.avatar}
            </div>
            <div className="flex-1">
              <div className="text-sm text-[#1E293B]">{opportunity.createdBy.name}</div>
              <div className="text-xs text-[#64748B]">{formatDateTime(opportunity.createdAt)}</div>
            </div>
          </div>
        </div>

        <div className="h-px bg-[#E2E8F0]" />

        <div>
          <div className="text-xs text-[#64748B] mb-1">Última modificación</div>
          <div className="text-sm text-[#1E293B]">{getRelativeTime(opportunity.updatedAt)}</div>
        </div>

        <div className="h-px bg-[#E2E8F0]" />

        <div>
          <div className="text-xs text-[#64748B] mb-1 flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            Territorio
          </div>
          <div className="text-sm text-[#1E293B]">{opportunity.territory}</div>
        </div>

        <div className="h-px bg-[#E2E8F0]" />

        <div>
          <div className="text-xs text-[#64748B] mb-2 flex items-center gap-1">
            <TagIcon className="w-3 h-3" />
            Etiquetas
          </div>
          <div className="flex flex-wrap gap-2">
            {opportunity.tags.map((tag: string, idx: number) => (
              <span 
                key={idx}
                className="px-2 py-1 bg-[#EFF6FF] text-[#3B82F6] text-xs rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="h-px bg-[#E2E8F0]" />

        <div>
          <div className="text-xs text-[#64748B] mb-1 flex items-center gap-1">
            <Hash className="w-3 h-3" />
            ID Oportunidad
          </div>
          <div className="text-sm text-[#1E293B] font-mono">#OPP-{opportunity.id.padStart(4, '0')}</div>
        </div>
      </div>
    </div>
  );
}
