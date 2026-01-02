import { Mail, Phone, Linkedin, Building2, Users, Calendar, Tag, Plus, ExternalLink } from 'lucide-react';

interface LeftColumnProps {
  customerId: string;
}

export function LeftColumn({ customerId }: LeftColumnProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(value);
  };

  return (
    <>
      {/* Contact Information */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Información de Contacto</h3>
        
        <div className="flex items-center gap-3 mb-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl">
              JG
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 border-white bg-[#10B981]" />
          </div>
          <div>
            <div className="text-sm text-[#1E293B]">Juan García</div>
            <div className="text-xs text-[#64748B]">CEO</div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="w-4 h-4 text-[#64748B]" />
            <a href="mailto:juan@acme.com" className="text-[#3B82F6] hover:underline flex-1">
              juan@acme.com
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Phone className="w-4 h-4 text-[#64748B]" />
            <span className="text-[#64748B] flex-1">+52 55 1234 5678</span>
            <a href="https://wa.me/5255123456678" className="text-[#10B981] hover:underline text-xs">
              WhatsApp
            </a>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Linkedin className="w-4 h-4 text-[#64748B]" />
            <a href="#" className="text-[#3B82F6] hover:underline">LinkedIn</a>
          </div>
        </div>

        <button className="w-full mt-4 text-sm text-[#3B82F6] hover:underline text-left">
          Ver todos los contactos (5)
        </button>
      </div>

      {/* Company Details */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Detalles de la Empresa</h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#64748B]">RFC/Tax ID:</span>
            <span className="text-sm text-[#1E293B] font-mono">ACM123456ABC</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#64748B]">Empleados:</span>
            <span className="text-sm text-[#1E293B]">250-500</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#64748B]">Ingresos anuales:</span>
            <span className="text-sm text-[#1E293B]">{formatCurrency(5000000)}</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#64748B]">Fundada:</span>
            <span className="text-sm text-[#1E293B]">2015</span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-xs text-[#64748B]">Territorio:</span>
            <span className="text-sm text-[#1E293B]">Centro</span>
          </div>
          <div>
            <div className="flex justify-between items-start mb-1">
              <span className="text-xs text-[#64748B]">Límite de crédito:</span>
              <span className="text-sm text-[#1E293B]">{formatCurrency(100000)}</span>
            </div>
            <div className="w-full h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden">
              <div className="h-full bg-[#10B981] rounded-full" style={{ width: '65%' }} />
            </div>
            <div className="text-xs text-[#64748B] mt-1">65% utilizado</div>
          </div>
        </div>
      </div>

      {/* Tags & Categories */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Etiquetas y Categorías</h3>
        
        <div className="flex flex-wrap gap-2 mb-3">
          <span className="px-3 py-1 bg-[#EFF6FF] text-[#3B82F6] text-xs rounded-full">VIP</span>
          <span className="px-3 py-1 bg-[#F0FDF4] text-[#10B981] text-xs rounded-full">Tecnología</span>
          <span className="px-3 py-1 bg-[#FEF3C7] text-[#F59E0B] text-xs rounded-full">Enterprise</span>
          <span className="px-3 py-1 bg-[#F3E8FF] text-[#8B5CF6] text-xs rounded-full">Alta prioridad</span>
        </div>

        <button className="flex items-center gap-1 text-sm text-[#3B82F6] hover:underline">
          <Plus className="w-4 h-4" />
          Agregar tag
        </button>
      </div>

      {/* Assigned Team */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Equipo Asignado</h3>
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center text-white text-xs">
              ML
            </div>
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">María López</div>
              <div className="text-xs text-[#64748B]">Account Manager</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs">
              CR
            </div>
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">Carlos Ruiz</div>
              <div className="text-xs text-[#64748B]">Sales Rep</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white text-xs">
              LH
            </div>
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">Luis Hernández</div>
              <div className="text-xs text-[#64748B]">Support Agent</div>
            </div>
          </div>
        </div>

        <button className="w-full mt-4 text-sm text-[#3B82F6] hover:underline text-left">
          Reasignar
        </button>
      </div>

      {/* Important Dates */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-5">
        <h3 className="text-sm text-[#1E293B] mb-4">Fechas Importantes</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#10B981] mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">Cliente desde</div>
              <div className="text-xs text-[#64748B]">15 Ene 2023</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#3B82F6] mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">Última compra</div>
              <div className="text-xs text-[#64748B]">Hace 15 días</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#F59E0B] mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">Próxima renovación</div>
              <div className="text-xs text-[#F59E0B]">15 Mar 2025 (28 días)</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#64748B] mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">Vencimiento contrato</div>
              <div className="text-xs text-[#64748B]">15 Dic 2025</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-[#64748B] mt-0.5" />
            <div className="flex-1">
              <div className="text-xs text-[#1E293B]">Última reunión</div>
              <div className="text-xs text-[#64748B]">Hace 5 días</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
