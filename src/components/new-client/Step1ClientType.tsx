import { Building2, User, Check } from 'lucide-react';
import type { ClientType } from '../../pages/NewClient';

interface Step1ClientTypeProps {
  selectedType: ClientType;
  onSelect: (type: ClientType) => void;
}

export function Step1ClientType({ selectedType, onSelect }: Step1ClientTypeProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="grid grid-cols-2 gap-6">
        {/* Empresa Card */}
        <button
          onClick={() => onSelect('company')}
          className={`relative h-80 bg-white rounded-xl border-2 transition-all hover:shadow-lg ${
            selectedType === 'company'
              ? 'border-[#3B82F6] shadow-md'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
          }`}
        >
          {selectedType === 'company' && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-[#3B82F6] rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          
          <div className="p-8 flex flex-col items-center text-center h-full">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedType === 'company' ? 'bg-[#EFF6FF]' : 'bg-[#F8FAFC]'
            }`}>
              <Building2 className={`w-8 h-8 ${
                selectedType === 'company' ? 'text-[#3B82F6]' : 'text-[#64748B]'
              }`} />
            </div>
            
            <h3 className="text-xl text-[#1E293B] mb-2">Empresa</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Clientes corporativos, PyMEs o negocios
            </p>
            
            <div className="flex-1 flex flex-col justify-center">
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Múltiples contactos
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Información fiscal completa
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Gestión de contratos
                </li>
              </ul>
            </div>
            
            <div className={`mt-6 px-6 py-2 rounded-lg text-sm transition-colors ${
              selectedType === 'company'
                ? 'bg-[#3B82F6] text-white'
                : 'bg-[#F8FAFC] text-[#64748B]'
            }`}>
              {selectedType === 'company' ? 'Seleccionado' : 'Seleccionar'}
            </div>
          </div>
        </button>

        {/* Individual Card */}
        <button
          onClick={() => onSelect('individual')}
          className={`relative h-80 bg-white rounded-xl border-2 transition-all hover:shadow-lg ${
            selectedType === 'individual'
              ? 'border-[#10B981] shadow-md'
              : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
          }`}
        >
          {selectedType === 'individual' && (
            <div className="absolute top-4 right-4 w-8 h-8 bg-[#10B981] rounded-full flex items-center justify-center">
              <Check className="w-5 h-5 text-white" />
            </div>
          )}
          
          <div className="p-8 flex flex-col items-center text-center h-full">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
              selectedType === 'individual' ? 'bg-[#F0FDF4]' : 'bg-[#F8FAFC]'
            }`}>
              <User className={`w-8 h-8 ${
                selectedType === 'individual' ? 'text-[#10B981]' : 'text-[#64748B]'
              }`} />
            </div>
            
            <h3 className="text-xl text-[#1E293B] mb-2">Individual</h3>
            <p className="text-sm text-[#64748B] mb-6">
              Clientes personas físicas
            </p>
            
            <div className="flex-1 flex flex-col justify-center">
              <ul className="space-y-2 text-left">
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Contacto único
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Datos simplificados
                </li>
                <li className="flex items-center gap-2 text-sm text-[#64748B]">
                  <Check className="w-4 h-4 text-[#10B981]" />
                  Proceso rápido
                </li>
              </ul>
            </div>
            
            <div className={`mt-6 px-6 py-2 rounded-lg text-sm transition-colors ${
              selectedType === 'individual'
                ? 'bg-[#10B981] text-white'
                : 'bg-[#F8FAFC] text-[#64748B]'
            }`}>
              {selectedType === 'individual' ? 'Seleccionado' : 'Seleccionar'}
            </div>
          </div>
        </button>
      </div>
    </div>
  );
}
