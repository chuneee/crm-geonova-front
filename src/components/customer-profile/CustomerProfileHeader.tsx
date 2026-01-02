import { ArrowLeft, Edit, Copy, Archive, MoreVertical, ExternalLink, MapPin, CheckCircle2, RefreshCw, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface CustomerProfileHeaderProps {
  customer: {
    name: string;
    logo?: string;
    verified: boolean;
    industry: string;
    type: 'company' | 'individual';
    location: string;
    website: string;
    status: 'active' | 'inactive' | 'at_risk';
    healthScore: number;
    segment: 'premium' | 'corporate' | 'sme' | 'individual';
    clientSince: Date;
    lastUpdated: Date;
  };
}

const segmentConfig = {
  premium: { label: 'Premium', color: 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' },
  corporate: { label: 'Corporativo', color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' },
  sme: { label: 'PyME', color: 'bg-gradient-to-r from-green-500 to-green-600 text-white' },
  individual: { label: 'Individual', color: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' }
};

const statusConfig = {
  active: { color: 'bg-[#10B981]', label: 'Activo' },
  inactive: { color: 'bg-[#94A3B8]', label: 'Inactivo' },
  at_risk: { color: 'bg-[#F59E0B]', label: 'En riesgo' }
};

export function CustomerProfileHeader({ customer }: CustomerProfileHeaderProps) {
  const navigate = useNavigate();
  const segment = segmentConfig[customer.segment];
  const status = statusConfig[customer.status];

  const getRelativeTime = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / (1000 * 60));
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `Hace ${hours} h`;
    return `Hace ${Math.floor(hours / 24)} días`;
  };

  const getHealthScoreStroke = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-MX', { month: 'short', year: 'numeric' }).format(date);
  };

  return (
    <div className="px-8 py-6">
      {/* Top Row */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigate('/clientes')}
          className="flex items-center gap-2 text-[#64748B] hover:text-[#1E293B] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Volver a clientes</span>
        </button>

        <div className="flex items-center gap-4">
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${status.color} animate-pulse`} />
            <span className="text-sm text-[#64748B]">{status.label}</span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#64748B] hover:bg-white rounded-lg transition-colors" title="Editar">
              <Edit className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#64748B] hover:bg-white rounded-lg transition-colors" title="Duplicar">
              <Copy className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#64748B] hover:bg-white rounded-lg transition-colors" title="Archivar">
              <Archive className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#64748B] hover:bg-white rounded-lg transition-colors" title="Más opciones">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-2 text-sm text-[#64748B] pl-4 border-l border-[#E2E8F0]">
            <RefreshCw className="w-4 h-4" />
            <span>{getRelativeTime(customer.lastUpdated)}</span>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <div className="flex items-center justify-between">
        {/* Left - Logo and Info */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <div className="w-20 h-20 rounded-xl border-2 border-[#E2E8F0] bg-white flex items-center justify-center overflow-hidden flex-shrink-0">
            {customer.logo ? (
              <img src={customer.logo} alt={customer.name} className="w-full h-full object-cover" />
            ) : (
              <Building2 className="w-10 h-10 text-[#94A3B8]" />
            )}
          </div>

          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-2xl text-[#1E293B]">{customer.name}</h1>
              {customer.verified && (
                <CheckCircle2 className="w-6 h-6 text-[#3B82F6]" title="Verificado" />
              )}
            </div>

            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-sm rounded-full">
                {customer.industry}
              </span>
              <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-sm rounded-full">
                {customer.type === 'company' ? 'Empresa' : 'Individual'}
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm text-[#64748B]">
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{customer.location}</span>
              </div>
              {customer.website && (
                <a
                  href={`https://${customer.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[#3B82F6] hover:underline"
                >
                  <span>{customer.website}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right - Health Score and Segment */}
        <div className="flex items-center gap-8">
          {/* Health Score */}
          <div className="text-center">
            <div className="relative inline-block">
              <svg width="80" height="80" className="transform -rotate-90">
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke="#E2E8F0"
                  strokeWidth="6"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  fill="none"
                  stroke={getHealthScoreStroke(customer.healthScore)}
                  strokeWidth="6"
                  strokeDasharray={`${(customer.healthScore / 100) * 213.6} 213.6`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl text-[#1E293B]">{customer.healthScore}%</span>
              </div>
            </div>
            <div className="text-xs text-[#64748B] mt-1">Health Score</div>
          </div>

          {/* Segment and Client Since */}
          <div className="text-right">
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm ${segment.color} mb-3`}>
              {segment.label}
            </span>
            <div className="text-sm text-[#64748B]">
              Cliente desde {formatDate(customer.clientSince)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
