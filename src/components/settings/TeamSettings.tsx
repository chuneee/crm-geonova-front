import { UserPlus, MoreVertical, Shield, Mail } from 'lucide-react';

const teamMembers = [
  {
    id: '1',
    name: 'Juan Pérez Director',
    email: 'juan.perez@empresa.com',
    role: 'admin',
    status: 'active',
    avatar: 'JP',
    joinedAt: '2023-01-15',
  },
  {
    id: '2',
    name: 'Carlos Ramírez',
    email: 'carlos.ramirez@empresa.com',
    role: 'sales',
    status: 'active',
    avatar: 'CR',
    joinedAt: '2023-03-20',
  },
  {
    id: '3',
    name: 'María González',
    email: 'maria.gonzalez@empresa.com',
    role: 'sales',
    status: 'active',
    avatar: 'MG',
    joinedAt: '2023-04-10',
  },
  {
    id: '4',
    name: 'Luis Mendoza',
    email: 'luis.mendoza@empresa.com',
    role: 'support',
    status: 'active',
    avatar: 'LM',
    joinedAt: '2023-06-05',
  },
  {
    id: '5',
    name: 'Ana Torres',
    email: 'ana.torres@empresa.com',
    role: 'sales',
    status: 'inactive',
    avatar: 'AT',
    joinedAt: '2023-02-28',
  },
];

const roleConfig = {
  admin: { label: 'Administrador', color: '#EF4444', bg: '#FEE2E2' },
  sales: { label: 'Ventas', color: '#3B82F6', bg: '#DBEAFE' },
  support: { label: 'Soporte', color: '#10B981', bg: '#D1FAE5' },
  viewer: { label: 'Visualizador', color: '#64748B', bg: '#F1F5F9' },
};

export function TeamSettings() {
  return (
    <div className="max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl text-[#1E293B] mb-1">Equipo</h2>
          <p className="text-sm text-[#64748B]">Gestiona los miembros y permisos de tu equipo</p>
        </div>
        
        <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors">
          <UserPlus className="w-4 h-4" />
          <span>Invitar Miembro</span>
        </button>
      </div>

      {/* Active Members */}
      <div className="bg-white rounded-lg border border-[#E2E8F0]">
        <div className="px-6 py-4 border-b border-[#E2E8F0]">
          <h3 className="text-sm text-[#1E293B]">Miembros Activos ({teamMembers.filter(m => m.status === 'active').length})</h3>
        </div>
        
        <div className="divide-y divide-[#E2E8F0]">
          {teamMembers.filter(m => m.status === 'active').map((member) => {
            const role = roleConfig[member.role as keyof typeof roleConfig];
            
            return (
              <div key={member.id} className="px-6 py-4 hover:bg-[#F8FAFC] transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {member.avatar}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-sm text-[#1E293B]">{member.name}</p>
                        {member.role === 'admin' && (
                          <Shield className="w-3.5 h-3.5 text-[#EF4444]" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#64748B]">
                        <Mail className="w-3 h-3" />
                        <span>{member.email}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: role.bg, color: role.color }}
                    >
                      {role.label}
                    </span>
                    
                    <button className="p-2 text-[#64748B] hover:bg-[#F1F5F9] rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Roles & Permissions */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Roles y Permisos</h3>
        
        <div className="space-y-3">
          <div className="p-4 border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#EF4444]" />
                <span className="text-sm text-[#1E293B]">Administrador</span>
              </div>
              <span className="text-xs text-[#64748B]">Acceso completo</span>
            </div>
            <p className="text-xs text-[#64748B]">
              Gestión completa del sistema, usuarios, configuración y datos
            </p>
          </div>
          
          <div className="p-4 border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#1E293B]">Ventas</span>
              <span className="text-xs text-[#64748B]">Gestión de ventas</span>
            </div>
            <p className="text-xs text-[#64748B]">
              Acceso a leads, oportunidades, cotizaciones y clientes
            </p>
          </div>
          
          <div className="p-4 border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#1E293B]">Soporte</span>
              <span className="text-xs text-[#64748B]">Gestión de soporte</span>
            </div>
            <p className="text-xs text-[#64748B]">
              Acceso a tickets, órdenes de servicio y base de conocimientos
            </p>
          </div>
          
          <div className="p-4 border border-[#E2E8F0] rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-[#1E293B]">Visualizador</span>
              <span className="text-xs text-[#64748B]">Solo lectura</span>
            </div>
            <p className="text-xs text-[#64748B]">
              Acceso de solo lectura a reportes y dashboards
            </p>
          </div>
        </div>
      </div>

      {/* Pending Invitations */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Invitaciones Pendientes</h3>
        
        <div className="text-center py-8">
          <div className="w-12 h-12 bg-[#F8FAFC] rounded-full flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6 text-[#94A3B8]" />
          </div>
          <p className="text-sm text-[#64748B]">No hay invitaciones pendientes</p>
        </div>
      </div>
    </div>
  );
}
