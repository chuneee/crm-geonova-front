import { Building2, User, Briefcase, Globe, FileText, Users, Upload, MapPin, Check } from 'lucide-react';
import type { ClientFormData } from '../../pages/NewClient';
import { useState } from 'react';

interface Step2BasicInfoProps {
  formData: ClientFormData;
  onChange: (data: Partial<ClientFormData>) => void;
}

const industries = [
  'Tecnología',
  'Construcción',
  'Agricultura',
  'Topografía',
  'Inmobiliario',
  'Consultoría',
  'Manufactura',
  'Servicios',
  'Retail',
  'Otro'
];

const companySizes = [
  { value: '1-10', label: '1-10 empleados' },
  { value: '11-50', label: '11-50 empleados' },
  { value: '51-200', label: '51-200 empleados' },
  { value: '201-500', label: '201-500 empleados' },
  { value: '500+', label: 'Más de 500 empleados' }
];

export function Step2BasicInfo({ formData, onChange }: Step2BasicInfoProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isCompany = formData.clientType === 'company';

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert('El archivo debe ser menor a 2MB');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
        onChange({ logo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const validateField = (name: string, value: string) => {
    const newErrors = { ...errors };
    
    if (name === 'companyName' && value.length < 3) {
      newErrors[name] = 'Mínimo 3 caracteres';
    } else if (name === 'website' && value && !value.match(/^https?:\/\//)) {
      onChange({ website: `https://${value}` });
    } else if (name === 'taxId' && value.length > 0 && value.length < 12) {
      newErrors[name] = 'RFC inválido';
    } else {
      delete newErrors[name];
    }
    
    setErrors(newErrors);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        {/* Logo Upload */}
        <div className="mb-8">
          <h3 className="text-sm text-[#1E293B] mb-4">Logo / Avatar</h3>
          <div className="flex flex-col items-center">
            <label
              htmlFor="logo-upload"
              className="w-30 h-30 border-2 border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAFC] flex flex-col items-center justify-center cursor-pointer hover:border-[#3B82F6] hover:bg-[#EFF6FF] transition-colors"
            >
              {logoPreview ? (
                <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="p-8 text-center">
                  <Upload className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
                  <p className="text-sm text-[#64748B] mb-1">Arrastra una imagen aquí</p>
                  <p className="text-xs text-[#94A3B8]">o haz clic para buscar</p>
                </div>
              )}
            </label>
            <input
              id="logo-upload"
              type="file"
              accept="image/jpeg,image/png"
              className="hidden"
              onChange={handleFileUpload}
            />
            <p className="text-xs text-[#64748B] mt-2">JPG o PNG, máx. 2MB</p>
          </div>
        </div>

        {/* Datos Principales */}
        <div className="mb-8">
          <h3 className="text-sm text-[#1E293B] mb-4">Datos Principales</h3>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-5">
              {/* Company/Full Name */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  {isCompany ? 'Nombre de la empresa' : 'Nombre completo'} <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  {isCompany ? (
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  ) : (
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  )}
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => onChange({ companyName: e.target.value })}
                    onBlur={(e) => validateField('companyName', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                    placeholder={isCompany ? 'ACME Corporation' : 'Juan Pérez García'}
                  />
                  {formData.companyName.length >= 3 && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#10B981]" />
                  )}
                </div>
                {errors.companyName && (
                  <p className="text-xs text-[#EF4444] mt-1">{errors.companyName}</p>
                )}
              </div>

              {/* Trade Name */}
              {isCompany && (
                <div>
                  <label className="block text-xs text-[#1E293B] mb-2">Nombre comercial</label>
                  <input
                    type="text"
                    value={formData.tradeName}
                    onChange={(e) => onChange({ tradeName: e.target.value })}
                    className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                    placeholder="Si es diferente al nombre legal"
                  />
                </div>
              )}

              {/* Industry */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  Industria/Giro <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <select
                    value={formData.industry}
                    onChange={(e) => onChange({ industry: e.target.value })}
                    className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
                  >
                    <option value="">Selecciona una industria</option>
                    {industries.map((industry) => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Website */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">Sitio web</label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => onChange({ website: e.target.value })}
                    onBlur={(e) => validateField('website', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                    placeholder="www.empresa.com"
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-5">
              {/* Tax ID */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  RFC (México) / Tax ID <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    value={formData.taxId}
                    onChange={(e) => onChange({ taxId: e.target.value.toUpperCase() })}
                    onBlur={(e) => validateField('taxId', e.target.value)}
                    className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm font-mono uppercase"
                    placeholder="AAA000000AA0"
                    maxLength={13}
                  />
                </div>
                {errors.taxId && (
                  <p className="text-xs text-[#EF4444] mt-1">{errors.taxId}</p>
                )}
              </div>

              {/* Company Size */}
              {isCompany && (
                <div>
                  <label className="block text-xs text-[#1E293B] mb-2">Tamaño de empresa</label>
                  <div className="relative">
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                    <select
                      value={formData.companySize}
                      onChange={(e) => onChange({ companySize: e.target.value })}
                      className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
                    >
                      <option value="">Selecciona un rango</option>
                      {companySizes.map((size) => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Annual Revenue */}
              {isCompany && (
                <div>
                  <label className="block text-xs text-[#1E293B] mb-2">Ingresos anuales</label>
                  <input
                    type="text"
                    value={formData.annualRevenue}
                    onChange={(e) => onChange({ annualRevenue: e.target.value })}
                    className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                    placeholder="Estimado"
                  />
                </div>
              )}

              {/* Segment */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  Segmento <span className="text-[#EF4444]">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onChange({ segment: 'premium' })}
                    className={`h-12 px-3 rounded-lg border-2 transition-all text-xs ${
                      formData.segment === 'premium'
                        ? 'border-[#F59E0B] bg-[#FEF3C7] text-[#92400E]'
                        : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]'
                    }`}
                  >
                    Premium
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ segment: 'corporate' })}
                    className={`h-12 px-3 rounded-lg border-2 transition-all text-xs ${
                      formData.segment === 'corporate'
                        ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#1E3A8A]'
                        : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]'
                    }`}
                  >
                    Corporativo
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ segment: 'sme' })}
                    className={`h-12 px-3 rounded-lg border-2 transition-all text-xs ${
                      formData.segment === 'sme'
                        ? 'border-[#10B981] bg-[#D1FAE5] text-[#065F46]'
                        : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]'
                    }`}
                  >
                    PyME
                  </button>
                  <button
                    type="button"
                    onClick={() => onChange({ segment: 'individual' })}
                    className={`h-12 px-3 rounded-lg border-2 transition-all text-xs ${
                      formData.segment === 'individual'
                        ? 'border-[#64748B] bg-[#F1F5F9] text-[#1E293B]'
                        : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]'
                    }`}
                  >
                    Individual
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dirección Fiscal */}
        <div>
          <h3 className="text-sm text-[#1E293B] mb-4">Dirección Fiscal</h3>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-5">
              {/* Country */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  País <span className="text-[#EF4444]">*</span>
                </label>
                <select
                  value={formData.country}
                  onChange={(e) => onChange({ country: e.target.value })}
                  className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
                >
                  <option value="México">🇲🇽 México</option>
                  <option value="USA">🇺🇸 Estados Unidos</option>
                  <option value="España">🇪🇸 España</option>
                </select>
              </div>

              {/* Postal Code */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  Código Postal <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => onChange({ postalCode: e.target.value })}
                  className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                  placeholder="06600"
                  maxLength={5}
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  Estado/Provincia <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => onChange({ state: e.target.value })}
                  className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                  placeholder="Ciudad de México"
                />
              </div>
            </div>

            <div className="space-y-5">
              {/* City */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  Ciudad <span className="text-[#EF4444]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => onChange({ city: e.target.value })}
                  className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                  placeholder="Ciudad de México"
                />
              </div>

              {/* Neighborhood */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">Colonia</label>
                <input
                  type="text"
                  value={formData.neighborhood}
                  onChange={(e) => onChange({ neighborhood: e.target.value })}
                  className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                  placeholder="Roma Norte"
                />
              </div>

              {/* Street */}
              <div>
                <label className="block text-xs text-[#1E293B] mb-2">
                  Calle y número <span className="text-[#EF4444]">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                  <input
                    type="text"
                    value={formData.street}
                    onChange={(e) => onChange({ street: e.target.value })}
                    className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                    placeholder="Av. Insurgentes Sur 123"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Address Notes */}
          <div className="mt-5">
            <label className="block text-xs text-[#1E293B] mb-2">Referencias</label>
            <textarea
              value={formData.addressNotes}
              onChange={(e) => onChange({ addressNotes: e.target.value })}
              className="w-full h-20 px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm resize-none"
              placeholder="Entre calles, edificio, piso..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
