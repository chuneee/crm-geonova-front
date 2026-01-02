import { ArrowLeft, Edit2, Copy, Trash2, Clock, Calendar, DollarSign } from 'lucide-react';

interface OpportunityHeaderProps {
  opportunity: any;
  onBack: () => void;
}

const stageColors: Record<string, string> = {
  prospeccion: 'bg-[#94A3B8] text-white',
  calificacion: 'bg-[#3B82F6] text-white',
  propuesta: 'bg-[#8B5CF6] text-white',
  negociacion: 'bg-[#F59E0B] text-white',
  ganado: 'bg-[#10B981] text-white',
  perdido: 'bg-[#EF4444] text-white'
};

export function OpportunityHeader({ opportunity, onBack }: OpportunityHeaderProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }).format(date);
  };

  return (
    <div className="bg-white border-b border-[#E2E8F0]" style={{ height: '120px' }}>
      {/* Top Row */}
      <div className="flex items-center justify-between px-8" style={{ height: '64px' }}>
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-[#64748B] hover:text-[#3B82F6] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al pipeline</span>
          </button>
          
          <div className="h-6 w-px bg-[#E2E8F0]" />
          
          <input 
            type="text"
            defaultValue={opportunity.title}
            className="text-xl text-[#1E293B] border-none outline-none hover:bg-[#F8FAFC] px-2 py-1 rounded transition-colors flex-1"
          />
          
          <span className={`px-3 py-1 rounded-full text-xs ${stageColors[opportunity.stage]}`}>
            {opportunity.stageLabel}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors">
            <Edit2 className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors">
            <Copy className="w-5 h-5" />
          </button>
          <button className="p-2 text-[#EF4444] hover:bg-[#FEF2F2] rounded-lg transition-colors">
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="flex items-center gap-6 px-8" style={{ height: '56px' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#10B981]" />
          <span className="text-sm text-[#64748B]">Abierta</span>
        </div>

        <div className="h-4 w-px bg-[#E2E8F0]" />

        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-[#10B981]" />
          <span className="text-lg text-[#10B981]">{formatCurrency(opportunity.value)}</span>
        </div>

        <div className="h-4 w-px bg-[#E2E8F0]" />

        <div className="flex items-center gap-2">
          <div className="relative w-10 h-10">
            <svg className="w-10 h-10 transform -rotate-90">
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#E2E8F0"
                strokeWidth="3"
                fill="none"
              />
              <circle
                cx="20"
                cy="20"
                r="16"
                stroke="#3B82F6"
                strokeWidth="3"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 16 * opportunity.probability / 100} ${2 * Math.PI * 16}`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-xs text-[#1E293B]">
              {opportunity.probability}%
            </div>
          </div>
          <span className="text-sm text-[#64748B]">Probabilidad</span>
        </div>

        <div className="h-4 w-px bg-[#E2E8F0]" />

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#64748B]" />
          <span className="text-sm text-[#1E293B]">{formatDate(opportunity.closeDate)}</span>
        </div>

        <div className="h-4 w-px bg-[#E2E8F0]" />

        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#64748B]" />
          <span className="text-sm text-[#64748B]">Hace {opportunity.lastActivity}</span>
        </div>

        <div className="h-4 w-px bg-[#E2E8F0]" />

        <div className="flex items-center gap-3">
          <span className="text-sm text-[#64748B]">Asignado a:</span>
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${opportunity.assignedTo.color} flex items-center justify-center text-white text-sm`}>
              {opportunity.assignedTo.avatar}
            </div>
            <span className="text-sm text-[#1E293B]">{opportunity.assignedTo.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
