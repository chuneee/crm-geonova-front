import { 
  Building2, 
  User, 
  CheckCircle2, 
  Phone, 
  Mail, 
  TrendingUp, 
  TrendingDown,
  MoreVertical,
  AlertCircle,
  Circle,
  MessageSquare,
  Calendar,
  Video,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Customer } from '../../pages/Customers';

interface CustomerRowProps {
  customer: Customer;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: () => void;
  onToggleExpand: () => void;
}

const segmentConfig = {
  premium: { label: 'Premium', color: 'bg-gradient-to-r from-amber-400 to-amber-500 text-white' },
  corporate: { label: 'Corporativo', color: 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' },
  sme: { label: 'PyME', color: 'bg-gradient-to-r from-green-500 to-green-600 text-white' },
  individual: { label: 'Individual', color: 'bg-gradient-to-r from-gray-400 to-gray-500 text-white' }
};

const statusConfig = {
  active: { label: 'Activo', color: 'text-[#10B981]', dotColor: 'bg-[#10B981]' },
  inactive: { label: 'Inactivo', color: 'text-[#94A3B8]', dotColor: 'bg-[#94A3B8]' },
  at_risk: { label: 'En riesgo', color: 'text-[#EF4444]', dotColor: 'bg-[#EF4444]' },
  new: { label: 'Nuevo', color: 'text-[#3B82F6]', dotColor: 'bg-[#3B82F6]' }
};

const activityIcons = {
  call: Phone,
  email: Mail,
  meeting: Video
};

export function CustomerRow({ customer, isSelected, isExpanded, onSelect, onToggleExpand }: CustomerRowProps) {
  const [showMenu, setShowMenu] = useState(false);
  const segment = segmentConfig[customer.segment];
  const status = statusConfig[customer.status];
  const ActivityIcon = activityIcons[customer.activityType];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Hoy';
    if (diffDays === 1) return 'Ayer';
    if (diffDays < 7) return `Hace ${diffDays} días`;
    if (diffDays < 30) return `Hace ${Math.floor(diffDays / 7)} semanas`;
    return `Hace ${Math.floor(diffDays / 30)} meses`;
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-[#10B981]';
    if (score >= 50) return 'text-[#F59E0B]';
    return 'text-[#EF4444]';
  };

  const getHealthScoreStroke = (score: number) => {
    if (score >= 80) return '#10B981';
    if (score >= 50) return '#F59E0B';
    return '#EF4444';
  };

  const isNew = (Date.now() - customer.lastActivity.getTime()) / (1000 * 60 * 60 * 24) <= 7 && customer.status === 'new';

  const navigate = useNavigate();

  return (
    <>
      <tr
        onClick={onToggleExpand}
        className={`border-b border-[#E2E8F0] transition-all cursor-pointer group ${
          isSelected ? 'bg-[#EFF6FF] border-l-4 border-l-[#3B82F6]' : 'hover:bg-[#F8FAFC]'
        } ${customer.status === 'at_risk' ? 'bg-[#FEF2F2]/30' : ''} ${isNew ? 'bg-[#DBEAFE]/20' : ''}`}
        style={{ height: '72px' }}
      >
        {/* Checkbox */}
        <td className="px-3" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={onSelect}
            className="w-4 h-4 rounded border-[#E2E8F0] cursor-pointer accent-[#3B82F6]"
          />
        </td>

        {/* Client Info */}
        <td className="px-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white flex-shrink-0">
              {customer.logo ? (
                <img src={customer.logo} alt={customer.companyName} className="w-full h-full rounded-lg object-cover" />
              ) : (
                <Building2 className="w-6 h-6" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-[#1E293B]">{customer.companyName}</span>
                {isNew && (
                  <span className="px-2 py-0.5 bg-[#3B82F6] text-white text-xs rounded-full">NUEVO</span>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-[#64748B]">
                <Building2 className="w-3 h-3" />
                {customer.industry}
              </div>
            </div>
          </div>
        </td>

        {/* Type */}
        <td className="px-3">
          <span className="px-3 py-1 bg-[#F1F5F9] text-[#64748B] text-xs rounded-full">
            {customer.type === 'company' ? 'Empresa' : 'Individual'}
          </span>
        </td>

        {/* Contact */}
        <td className="px-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-[#1E293B]">{customer.contactName}</span>
              <span className="px-2 py-0.5 bg-[#E2E8F0] text-[#64748B] text-xs rounded">
                {customer.contactRole}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <Mail className="w-3 h-3" />
              {customer.email}
              {customer.emailVerified && <CheckCircle2 className="w-3 h-3 text-[#10B981]" />}
            </div>
          </div>
        </td>

        {/* Segment */}
        <td className="px-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${segment.color}`}>
            {segment.label}
          </span>
        </td>

        {/* Total Value */}
        <td className="px-3">
          <div>
            <div className="text-sm text-[#10B981]">{formatCurrency(customer.totalValue)}</div>
            <div className={`flex items-center gap-1 text-xs ${customer.valueGrowth > 0 ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
              {customer.valueGrowth > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              {Math.abs(customer.valueGrowth)}%
            </div>
          </div>
        </td>

        {/* Last Activity */}
        <td className="px-3">
          <div className="flex items-center gap-2">
            <ActivityIcon className="w-4 h-4 text-[#64748B]" />
            <span className="text-sm text-[#64748B]">{getRelativeTime(customer.lastActivity)}</span>
          </div>
        </td>

        {/* Status */}
        <td className="px-3">
          <div className="flex items-center gap-2">
            <Circle className={`w-2 h-2 ${status.dotColor} fill-current`} />
            <span className={`text-sm ${status.color}`}>{status.label}</span>
            {customer.status === 'at_risk' && <AlertCircle className="w-4 h-4 text-[#EF4444]" />}
          </div>
        </td>

        {/* Health Score */}
        <td className="px-3">
          <div className="flex items-center gap-2">
            <svg width="32" height="32" className="transform -rotate-90">
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="3"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                fill="none"
                stroke={getHealthScoreStroke(customer.healthScore)}
                strokeWidth="3"
                strokeDasharray={`${(customer.healthScore / 100) * 88} 88`}
                strokeLinecap="round"
              />
            </svg>
            <span className={`text-sm ${getHealthScoreColor(customer.healthScore)}`}>
              {customer.healthScore}%
            </span>
          </div>
        </td>

        {/* Assigned To */}
        <td className="px-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-sm">
                {customer.assignedTo.avatar ? (
                  <img src={customer.assignedTo.avatar} alt={customer.assignedTo.name} className="w-full h-full rounded-full" />
                ) : (
                  customer.assignedTo.name.charAt(0)
                )}
              </div>
              <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                customer.assignedTo.isOnline ? 'bg-[#10B981]' : 'bg-[#94A3B8]'
              }`} />
            </div>
            <span className="text-sm text-[#64748B] opacity-0 group-hover:opacity-100 transition-opacity">
              {customer.assignedTo.name}
            </span>
          </div>
        </td>

        {/* Actions */}
        <td className="px-3 relative" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 text-[#64748B] hover:bg-[#F1F5F9] rounded transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {showMenu && (
            <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-[#E2E8F0] py-1 z-20">
              <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                Ver perfil completo
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                Editar información
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                Nueva oportunidad
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                Registrar actividad
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                Enviar email
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#1E293B] hover:bg-[#F8FAFC] transition-colors">
                Ver historial
              </button>
              <div className="border-t border-[#E2E8F0] my-1" />
              <button className="w-full px-4 py-2 text-left text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors">
                Marcar en riesgo
              </button>
              <button className="w-full px-4 py-2 text-left text-sm text-[#EF4444] hover:bg-[#FEF2F2] transition-colors">
                Desactivar
              </button>
            </div>
          )}
        </td>
      </tr>

      {/* Expanded Row */}
      {isExpanded && (
        <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
          <td colSpan={11} className="px-3 py-6">
            <div className="grid grid-cols-4 gap-6 px-12">
              {/* Recent Opportunities */}
              <div>
                <h4 className="text-sm text-[#64748B] mb-3">Oportunidades Recientes</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                    <div className="text-xs text-[#1E293B]">Propuesta DJI Mavic 3</div>
                    <div className="text-xs text-[#10B981]">$45,000</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#E2E8F0]">
                    <div className="text-xs text-[#1E293B]">Servicio de mapeo</div>
                    <div className="text-xs text-[#10B981]">$12,500</div>
                  </div>
                </div>
              </div>

              {/* Last Activities */}
              <div>
                <h4 className="text-sm text-[#64748B] mb-3">Últimas Actividades</h4>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <MessageSquare className="w-4 h-4 text-[#64748B] mt-0.5" />
                    <div>
                      <div className="text-xs text-[#1E293B]">Llamada de seguimiento</div>
                      <div className="text-xs text-[#94A3B8]">Hace 2 días</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-[#64748B] mt-0.5" />
                    <div>
                      <div className="text-xs text-[#1E293B]">Envió cotización</div>
                      <div className="text-xs text-[#94A3B8]">Hace 5 días</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Contacts */}
              <div>
                <h4 className="text-sm text-[#64748B] mb-3">Contactos Clave</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs">
                      JG
                    </div>
                    <div className="flex-1">
                      <div className="text-xs text-[#1E293B]">{customer.contactName}</div>
                      <div className="text-xs text-[#94A3B8]">{customer.contactRole}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div>
                <h4 className="text-sm text-[#64748B] mb-3">Estadísticas Rápidas</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-white rounded border border-[#E2E8F0] text-center">
                    <div className="text-lg text-[#3B82F6]">12</div>
                    <div className="text-xs text-[#64748B]">Órdenes</div>
                  </div>
                  <div className="p-2 bg-white rounded border border-[#E2E8F0] text-center">
                    <div className="text-lg text-[#10B981]">3</div>
                    <div className="text-xs text-[#64748B]">Tickets</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors flex items-center gap-2"
                onClick={() => navigate(`/clientes/${customer.id}`)}
              >
                Ver perfil completo
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}