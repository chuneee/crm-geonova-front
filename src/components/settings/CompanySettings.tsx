import { Building2, MapPin, Globe, Phone } from 'lucide-react';

interface CompanySettingsProps {
  onChange: () => void;
}

export function CompanySettings({ onChange }: CompanySettingsProps) {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#1E293B] mb-1">Información de la Empresa</h2>
        <p className="text-sm text-[#64748B]">Configura los datos de tu organización</p>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Datos Generales</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Nombre de la Empresa</label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                defaultValue="TechGeo Solutions"
                onChange={onChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">RFC</label>
              <input
                type="text"
                defaultValue="TGS123456ABC"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Teléfono Principal</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="tel"
                  defaultValue="+52 55 5555 5555"
                  onChange={onChange}
                  className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Sitio Web</label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="url"
                defaultValue="https://techgeosolutions.com"
                onChange={onChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Address */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Dirección</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Calle y Número</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                defaultValue="Av. Insurgentes Sur 1234"
                onChange={onChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Colonia</label>
              <input
                type="text"
                defaultValue="Del Valle"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Ciudad</label>
              <input
                type="text"
                defaultValue="CDMX"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Código Postal</label>
              <input
                type="text"
                defaultValue="03100"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Configuración de Negocio</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Moneda</label>
              <select
                defaultValue="MXN"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="MXN">MXN - Peso Mexicano</option>
                <option value="USD">USD - Dólar Americano</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Zona Horaria</label>
              <select
                defaultValue="America/Mexico_City"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                <option value="America/Monterrey">Monterrey (GMT-6)</option>
                <option value="America/Cancun">Cancún (GMT-5)</option>
              </select>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Formato de Fecha</label>
              <select
                defaultValue="DD/MM/YYYY"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>
            
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Idioma</label>
              <select
                defaultValue="es"
                onChange={onChange}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
