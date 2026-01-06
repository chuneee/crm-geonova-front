import { Building2, MapPin, Globe, Phone } from "lucide-react";
import { Company } from "../../api/types/company.type";

interface CompanySettingsProps {
  id: string;
  onChange: ({}) => void;
  company?: Company;
}

export function CompanySettings({
  onChange,
  company,
  id,
}: CompanySettingsProps) {
  const {
    settings,
    brand_name,
    rfc_init,
    phone,
    website,
    address,
    city,
    state_province,
    zip_code,
  } = company || {};

  return (
    <div className="max-w-3xl space-y-6" id={`company-settings-${id}`}>
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#1E293B] mb-1">
          Información de la Empresa
        </h2>
        <p className="text-sm text-[#64748B]">
          Configura los datos de tu organización
        </p>
      </div>

      {/* Company Info */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Datos Generales</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#64748B] mb-2">
              Nombre de la Empresa
            </label>
            <div className="relative">
              <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                value={brand_name || ""}
                onChange={(e) => onChange({ brand_name: e.target.value })}
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">RFC</label>
              <input
                type="text"
                value={rfc_init || ""}
                onChange={(e) => onChange({ rfc_init: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Teléfono Principal
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
                <input
                  type="tel"
                  value={phone || ""}
                  onChange={(e) => onChange({ phone: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs text-[#64748B] mb-2">
              Sitio Web
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="url"
                value={website || ""}
                onChange={(e) => onChange({ website: e.target.value })}
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
            <label className="block text-xs text-[#64748B] mb-2">
              Calle y Número
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="text"
                value={address || ""}
                onChange={(e) => onChange({ address: e.target.value })}
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Colonia
              </label>
              <input
                type="text"
                value={state_province || ""}
                onChange={(e) => onChange({ state_province: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Ciudad
              </label>
              <input
                type="text"
                value={city || ""}
                onChange={(e) => onChange({ city: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Código Postal
              </label>
              <input
                type="text"
                value={zip_code || ""}
                onChange={(e) => onChange({ zip_code: e.target.value })}
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Business Settings */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">
          Configuración de Negocio
        </h3>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Moneda
              </label>
              <select
                value={settings?.type_currency || "MXN"}
                onChange={(value) =>
                  onChange({
                    settings: {
                      ...settings,
                      type_currency: value.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="MXN">MXN - Peso Mexicano</option>
                <option value="USD">USD - Dólar Americano</option>
                <option value="EUR">EUR - Euro</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Zona Horaria
              </label>
              <select
                value={settings?.timezone || "America/Mexico_City"}
                onChange={(value) =>
                  onChange({
                    settings: {
                      ...settings,
                      timezone: value.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="America/Mexico_City">
                  Ciudad de México (GMT-6)
                </option>
                <option value="America/Monterrey">Monterrey (GMT-6)</option>
                <option value="America/Cancun">Cancún (GMT-5)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Formato de Fecha
              </label>
              <select
                value={settings?.date_format || "DD/MM/YYYY"}
                onChange={(value) =>
                  onChange({
                    settings: {
                      ...settings,
                      date_format: value.target.value,
                    },
                  })
                }
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              >
                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
              </select>
            </div>

            <div>
              <label className="block text-xs text-[#64748B] mb-2">
                Idioma
              </label>
              <select
                value={settings?.language || "es"}
                onChange={(value) =>
                  onChange({
                    settings: {
                      ...settings,
                      language: value.target.value,
                    },
                  })
                }
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
