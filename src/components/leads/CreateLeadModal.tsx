import { useState } from 'react';
import { X, User, Mail, Phone, Globe, Building2, Tag, Calendar, DollarSign, Star, Check, AlertCircle, ChevronDown } from 'lucide-react';

interface CreateLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lead: any) => void;
}

export function CreateLeadModal({ isOpen, onClose, onSubmit }: CreateLeadModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    whatsappSameAsPhone: true,
    company: '',
    position: '',
    website: '',
    industry: '',
    companySize: '',
    source: '',
    campaign: '',
    notes: '',
    tags: [] as string[],
    score: 0,
    estimatedBudget: '',
    urgency: '',
    contactDate: '',
    assignedTo: '',
    autoAssign: false,
    privacyAccepted: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});
  const [tagInput, setTagInput] = useState('');

  if (!isOpen) return null;

  const steps = [
    { id: 1, name: 'Información', icon: User },
    { id: 2, name: 'Calificación', icon: Star },
    { id: 3, name: 'Asignación', icon: Building2 }
  ];

  const industries = [
    { value: 'tecnologia', label: 'Tecnología', icon: '💻' },
    { value: 'retail', label: 'Retail', icon: '🛍️' },
    { value: 'manufactura', label: 'Manufactura', icon: '🏭' },
    { value: 'servicios', label: 'Servicios', icon: '🤝' },
    { value: 'salud', label: 'Salud', icon: '🏥' },
    { value: 'educacion', label: 'Educación', icon: '🎓' },
    { value: 'finanzas', label: 'Finanzas', icon: '💰' },
    { value: 'inmobiliaria', label: 'Inmobiliaria', icon: '🏢' }
  ];

  const sources = [
    'Web',
    'Referido',
    'Llamada',
    'Email',
    'Redes Sociales',
    'Evento',
    'Otro'
  ];

  const salespeople = [
    { id: '1', name: 'Carlos Rodríguez', avatar: 'CR', color: 'from-blue-500 to-blue-600' },
    { id: '2', name: 'María García', avatar: 'MG', color: 'from-purple-500 to-purple-600' },
    { id: '3', name: 'Juan Pérez', avatar: 'JP', color: 'from-green-500 to-green-600' },
    { id: '4', name: 'Ana Martínez', avatar: 'AM', color: 'from-pink-500 to-pink-600' }
  ];

  const validateField = (name: string, value: any) => {
    let error = '';

    switch (name) {
      case 'name':
        if (!value || value.trim().length === 0) {
          error = 'El nombre es requerido';
        } else if (value.trim().length < 3) {
          error = 'El nombre debe tener al menos 3 caracteres';
        }
        break;
      case 'email':
        if (!value || value.trim().length === 0) {
          error = 'El email es requerido';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Email inválido';
        }
        break;
      case 'company':
        if (!value || value.trim().length === 0) {
          error = 'La empresa es requerida';
        }
        break;
      case 'source':
        if (!value || value.trim().length === 0) {
          error = 'La fuente es requerida';
        }
        break;
      case 'privacyAccepted':
        if (!value) {
          error = 'Debes aceptar la política de privacidad';
        }
        break;
    }

    return error;
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touchedFields[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleFieldBlur = (name: string) => {
    setTouchedFields(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const isFieldValid = (name: string) => {
    return touchedFields[name] && !errors[name] && formData[name as keyof typeof formData];
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, tagInput.trim()]
        }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const isFormValid = () => {
    const requiredFields = ['name', 'email', 'company', 'source', 'privacyAccepted'];
    return requiredFields.every(field => {
      const value = formData[field as keyof typeof formData];
      return value && !validateField(field, value);
    });
  };

  const handleSubmit = () => {
    // Validate all fields
    const allFields = ['name', 'email', 'company', 'source', 'privacyAccepted'];
    const newErrors: Record<string, string> = {};
    const newTouched: Record<string, boolean> = {};

    allFields.forEach(field => {
      newTouched[field] = true;
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) newErrors[field] = error;
    });

    setTouchedFields(newTouched);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleSaveDraft = () => {
    console.log('Guardando borrador...', formData);
    onClose();
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-[640px] max-h-[80vh] flex flex-col pointer-events-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="h-16 px-8 flex items-center justify-between border-b border-[#E2E8F0] flex-shrink-0">
            <div>
              <h2 className="text-[#1E293B] text-xl font-bold">Nuevo Lead</h2>
              <p className="text-[#64748B] text-sm">Ingresa la información del prospecto</p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5 text-[#64748B]" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="px-8 py-6 border-b border-[#E2E8F0] flex-shrink-0">
            <div className="flex items-center justify-between relative">
              {/* Connection Line */}
              <div className="absolute left-0 right-0 top-4 h-[2px] bg-[#E2E8F0]" style={{ zIndex: 0 }} />
              
              {steps.map((step, index) => (
                <div key={step.id} className="flex flex-col items-center relative" style={{ zIndex: 1 }}>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all mb-2 ${
                      currentStep === step.id
                        ? 'bg-[#3B82F6] text-white shadow-lg shadow-blue-500/30'
                        : currentStep > step.id
                        ? 'bg-[#10B981] text-white'
                        : 'bg-white border-2 border-[#E2E8F0] text-[#94A3B8]'
                    }`}
                  >
                    {currentStep > step.id ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      step.id
                    )}
                  </div>
                  <span className={`text-xs font-medium ${
                    currentStep === step.id ? 'text-[#3B82F6]' : 'text-[#64748B]'
                  }`}>
                    {step.name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Content - Scrollable */}
          <div className="flex-1 overflow-y-auto px-8 py-6 custom-scrollbar">
            {/* STEP 1: INFORMACIÓN */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* INFORMACIÓN DE CONTACTO */}
                <div>
                  <h3 className="text-[#1E293B] text-base font-semibold mb-5">Información de Contacto</h3>
                  
                  <div className="space-y-5">
                    {/* Nombre completo */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Nombre completo <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => handleFieldChange('name', e.target.value)}
                          onBlur={() => handleFieldBlur('name')}
                          placeholder="Ej: Roberto Fernández"
                          className={`w-full h-11 pl-11 pr-10 rounded-lg text-sm transition-all ${
                            errors.name && touchedFields.name
                              ? 'border-2 border-[#EF4444] bg-white'
                              : formData.name
                              ? 'border-2 border-transparent bg-white focus:border-[#3B82F6]'
                              : 'border border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#3B82F6] focus:bg-white'
                          } focus:outline-none placeholder:text-[#9CA3AF] placeholder:italic`}
                        />
                        {isFieldValid('name') && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#10B981]" />
                        )}
                      </div>
                      {errors.name && touchedFields.name && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 text-[#EF4444]" />
                          <p className="text-xs text-[#EF4444]">{errors.name}</p>
                        </div>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Email <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleFieldChange('email', e.target.value)}
                          onBlur={() => handleFieldBlur('email')}
                          placeholder="ejemplo@empresa.com"
                          className={`w-full h-11 pl-11 pr-10 rounded-lg text-sm transition-all ${
                            errors.email && touchedFields.email
                              ? 'border-2 border-[#EF4444] bg-white'
                              : formData.email
                              ? 'border-2 border-transparent bg-white focus:border-[#3B82F6]'
                              : 'border border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#3B82F6] focus:bg-white'
                          } focus:outline-none placeholder:text-[#9CA3AF] placeholder:italic`}
                        />
                        {isFieldValid('email') && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#10B981]" />
                        )}
                      </div>
                      {errors.email && touchedFields.email ? (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 text-[#EF4444]" />
                          <p className="text-xs text-[#EF4444]">{errors.email}</p>
                        </div>
                      ) : (
                        <p className="text-xs text-[#64748B] mt-1">Asegúrate de ingresar un email válido</p>
                      )}
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Teléfono
                      </label>
                      <div className="flex gap-2">
                        <select className="h-11 px-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white">
                          <option>🇲🇽 +52</option>
                          <option>🇺🇸 +1</option>
                          <option>🇪🇸 +34</option>
                          <option>🇦🇷 +54</option>
                          <option>🇨🇴 +57</option>
                        </select>
                        <div className="relative flex-1">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                          <input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleFieldChange('phone', e.target.value)}
                            placeholder="55 1234 5678"
                            className="w-full h-11 pl-11 pr-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white placeholder:text-[#9CA3AF] placeholder:italic"
                          />
                        </div>
                      </div>
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.whatsappSameAsPhone}
                          onChange={(e) => handleFieldChange('whatsappSameAsPhone', e.target.checked)}
                          className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0 cursor-pointer"
                        />
                        <span className="text-sm text-[#475569]">Mismo número para WhatsApp</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* INFORMACIÓN EMPRESARIAL */}
                <div className="pt-6 border-t border-[#E2E8F0]">
                  <h3 className="text-[#1E293B] text-base font-semibold mb-5">Información Empresarial</h3>
                  
                  <div className="space-y-5">
                    {/* Empresa */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Empresa <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => handleFieldChange('company', e.target.value)}
                          onBlur={() => handleFieldBlur('company')}
                          placeholder="Nombre de la empresa"
                          className={`w-full h-11 pl-11 pr-10 rounded-lg text-sm transition-all ${
                            errors.company && touchedFields.company
                              ? 'border-2 border-[#EF4444] bg-white'
                              : formData.company
                              ? 'border-2 border-transparent bg-white focus:border-[#3B82F6]'
                              : 'border border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#3B82F6] focus:bg-white'
                          } focus:outline-none placeholder:text-[#9CA3AF] placeholder:italic`}
                        />
                        {isFieldValid('company') && (
                          <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#10B981]" />
                        )}
                      </div>
                      {errors.company && touchedFields.company && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 text-[#EF4444]" />
                          <p className="text-xs text-[#EF4444]">{errors.company}</p>
                        </div>
                      )}
                    </div>

                    {/* Cargo */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Cargo
                      </label>
                      <input
                        type="text"
                        value={formData.position}
                        onChange={(e) => handleFieldChange('position', e.target.value)}
                        placeholder="Ej: Director de Ventas"
                        className="w-full h-11 px-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white placeholder:text-[#9CA3AF] placeholder:italic"
                      />
                    </div>

                    {/* Sitio web */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Sitio web
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          type="url"
                          value={formData.website}
                          onChange={(e) => handleFieldChange('website', e.target.value)}
                          placeholder="https://www.ejemplo.com"
                          className="w-full h-11 pl-11 pr-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white placeholder:text-[#9CA3AF] placeholder:italic"
                        />
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">El formato se ajustará automáticamente</p>
                    </div>

                    {/* Industria */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Industria
                      </label>
                      <div className="relative">
                        <select
                          value={formData.industry}
                          onChange={(e) => handleFieldChange('industry', e.target.value)}
                          className="w-full h-11 pl-3 pr-10 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white appearance-none"
                        >
                          <option value="">Selecciona una industria</option>
                          {industries.map((ind) => (
                            <option key={ind.value} value={ind.value}>
                              {ind.icon} {ind.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none" />
                      </div>
                    </div>

                    {/* Tamaño de empresa */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-3">
                        Tamaño de empresa
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {['1-10', '11-50', '51-200', '201-500', '500+'].map((size) => (
                          <label
                            key={size}
                            className={`flex-1 min-w-[90px] h-10 flex items-center justify-center rounded-lg border-2 cursor-pointer transition-all text-sm font-medium ${
                              formData.companySize === size
                                ? 'border-[#3B82F6] bg-[#EFF6FF] text-[#3B82F6]'
                                : 'border-[#E2E8F0] bg-white text-[#64748B] hover:border-[#CBD5E1]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="companySize"
                              value={size}
                              checked={formData.companySize === size}
                              onChange={(e) => handleFieldChange('companySize', e.target.value)}
                              className="sr-only"
                            />
                            {size}
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ORIGEN Y CONTEXTO */}
                <div className="pt-6 border-t border-[#E2E8F0]">
                  <h3 className="text-[#1E293B] text-base font-semibold mb-5">Origen y Contexto</h3>
                  
                  <div className="space-y-5">
                    {/* Fuente */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Fuente <span className="text-[#EF4444]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.source}
                          onChange={(e) => handleFieldChange('source', e.target.value)}
                          onBlur={() => handleFieldBlur('source')}
                          className={`w-full h-11 pl-3 pr-10 rounded-lg text-sm transition-all appearance-none ${
                            errors.source && touchedFields.source
                              ? 'border-2 border-[#EF4444] bg-white'
                              : formData.source
                              ? 'border-2 border-transparent bg-white focus:border-[#3B82F6]'
                              : 'border border-[#E2E8F0] bg-[#F8FAFC] focus:border-[#3B82F6] focus:bg-white'
                          } focus:outline-none`}
                        >
                          <option value="">Selecciona la fuente</option>
                          {sources.map((source) => (
                            <option key={source} value={source}>
                              {source}
                            </option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none" />
                      </div>
                      {errors.source && touchedFields.source && (
                        <div className="flex items-center gap-1 mt-1">
                          <AlertCircle className="w-3 h-3 text-[#EF4444]" />
                          <p className="text-xs text-[#EF4444]">{errors.source}</p>
                        </div>
                      )}
                    </div>

                    {/* Campaña */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Campaña
                      </label>
                      <div className="relative">
                        <select
                          value={formData.campaign}
                          onChange={(e) => handleFieldChange('campaign', e.target.value)}
                          className="w-full h-11 pl-3 pr-10 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white appearance-none"
                        >
                          <option value="">Selecciona una campaña (opcional)</option>
                          <option value="google-ads-q4">Google Ads Q4 2024</option>
                          <option value="linkedin-tech">LinkedIn - Tech Leaders</option>
                          <option value="email-campaign">Email Marketing Campaign</option>
                          <option value="webinar-nov">Webinar Noviembre</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF] pointer-events-none" />
                      </div>
                    </div>

                    {/* Descripción/Notas */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Descripción/Notas
                      </label>
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleFieldChange('notes', e.target.value)}
                        placeholder="Agrega notas relevantes sobre este lead..."
                        rows={3}
                        className="w-full px-3 py-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white resize-none placeholder:text-[#9CA3AF] placeholder:italic"
                      />
                      <p className="text-xs text-[#64748B] mt-1">
                        {formData.notes.length}/500 caracteres
                      </p>
                    </div>

                    {/* Tags */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Tags
                      </label>
                      <div className="space-y-2">
                        <div className="relative">
                          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleAddTag}
                            placeholder="Escribe y presiona Enter para agregar"
                            className="w-full h-11 pl-11 pr-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white placeholder:text-[#9CA3AF] placeholder:italic"
                          />
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-[#EFF6FF] text-[#3B82F6] text-sm rounded-full"
                              >
                                {tag}
                                <button
                                  onClick={() => handleRemoveTag(tag)}
                                  className="hover:bg-[#3B82F6]/10 rounded-full p-0.5"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: CALIFICACIÓN */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#1E293B] text-base font-semibold mb-5">Calificación Inicial</h3>
                  
                  <div className="space-y-5">
                    {/* Score inicial */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-3">
                        Score inicial
                      </label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleFieldChange('score', star)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 cursor-pointer transition-colors ${
                                star <= formData.score
                                  ? 'fill-[#F59E0B] text-[#F59E0B]'
                                  : 'text-[#E2E8F0] hover:text-[#FCD34D]'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-[#64748B] mt-2">
                        {formData.score === 0 && 'Selecciona una calificación'}
                        {formData.score === 1 && 'Muy baja prioridad'}
                        {formData.score === 2 && 'Baja prioridad'}
                        {formData.score === 3 && 'Prioridad media'}
                        {formData.score === 4 && 'Alta prioridad'}
                        {formData.score === 5 && 'Prioridad máxima'}
                      </p>
                    </div>

                    {/* Presupuesto estimado */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Presupuesto estimado
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          type="text"
                          value={formData.estimatedBudget}
                          onChange={(e) => handleFieldChange('estimatedBudget', e.target.value)}
                          placeholder="50,000"
                          className="w-full h-11 pl-11 pr-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white placeholder:text-[#9CA3AF] placeholder:italic"
                        />
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">Monto en tu moneda local</p>
                    </div>

                    {/* Urgencia */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-3">
                        Urgencia
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        {[
                          { value: 'baja', label: 'Baja', color: 'border-[#10B981] bg-[#ECFDF5] text-[#10B981]', icon: '⏱️' },
                          { value: 'media', label: 'Media', color: 'border-[#F59E0B] bg-[#FEF3C7] text-[#F59E0B]', icon: '⚡' },
                          { value: 'alta', label: 'Alta', color: 'border-[#EF4444] bg-[#FEE2E2] text-[#EF4444]', icon: '🔥' }
                        ].map((urgency) => (
                          <button
                            key={urgency.value}
                            onClick={() => handleFieldChange('urgency', urgency.value)}
                            className={`h-20 rounded-xl border-2 transition-all flex flex-col items-center justify-center gap-1 ${
                              formData.urgency === urgency.value
                                ? urgency.color + ' shadow-lg'
                                : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                            }`}
                          >
                            <span className="text-2xl">{urgency.icon}</span>
                            <span className="text-sm font-semibold">{urgency.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Fecha de contacto deseada */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-2">
                        Fecha de contacto deseada
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                        <input
                          type="date"
                          value={formData.contactDate}
                          onChange={(e) => handleFieldChange('contactDate', e.target.value)}
                          className="w-full h-11 pl-11 pr-3 border border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-sm focus:outline-none focus:border-[#3B82F6] focus:bg-white"
                        />
                      </div>
                      <p className="text-xs text-[#64748B] mt-1">Cuándo te gustaría hacer el primer contacto</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: ASIGNACIÓN */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-[#1E293B] text-base font-semibold mb-5">Asignación</h3>
                  
                  <div className="space-y-5">
                    {/* Asignar a vendedor */}
                    <div>
                      <label className="block text-sm text-[#1E293B] font-medium mb-3">
                        Asignar a vendedor
                      </label>
                      <div className="space-y-2">
                        {salespeople.map((person) => (
                          <label
                            key={person.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              formData.assignedTo === person.id
                                ? 'border-[#3B82F6] bg-[#EFF6FF]'
                                : 'border-[#E2E8F0] bg-white hover:border-[#CBD5E1]'
                            }`}
                          >
                            <input
                              type="radio"
                              name="assignedTo"
                              value={person.id}
                              checked={formData.assignedTo === person.id}
                              onChange={(e) => handleFieldChange('assignedTo', e.target.value)}
                              className="sr-only"
                            />
                            <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${person.color} flex items-center justify-center flex-shrink-0`}>
                              <span className="text-white font-semibold text-sm">{person.avatar}</span>
                            </div>
                            <span className="text-sm font-medium text-[#1E293B]">{person.name}</span>
                            {formData.assignedTo === person.id && (
                              <Check className="w-5 h-5 text-[#3B82F6] ml-auto" />
                            )}
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Asignación automática */}
                    <div className="p-4 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.autoAssign}
                          onChange={(e) => handleFieldChange('autoAssign', e.target.checked)}
                          className="w-4 h-4 mt-0.5 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0 cursor-pointer"
                        />
                        <div>
                          <span className="text-sm font-medium text-[#1E293B] block mb-1">
                            Asignación automática
                          </span>
                          <p className="text-xs text-[#64748B]">
                            El sistema asignará este lead automáticamente al vendedor con menor carga de trabajo
                          </p>
                        </div>
                      </label>
                    </div>

                    {/* Privacy checkbox */}
                    <div className="pt-4 border-t border-[#E2E8F0]">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.privacyAccepted}
                          onChange={(e) => handleFieldChange('privacyAccepted', e.target.checked)}
                          onBlur={() => handleFieldBlur('privacyAccepted')}
                          className={`w-4 h-4 mt-0.5 rounded border-[#E2E8F0] text-[#3B82F6] focus:ring-[#3B82F6] focus:ring-offset-0 cursor-pointer ${
                            errors.privacyAccepted && touchedFields.privacyAccepted ? 'border-[#EF4444]' : ''
                          }`}
                        />
                        <div>
                          <span className="text-sm text-[#475569]">
                            He leído y acepto la{' '}
                            <a href="#" className="text-[#3B82F6] underline hover:text-[#2563EB]">
                              política de privacidad
                            </a>{' '}
                            <span className="text-[#EF4444]">*</span>
                          </span>
                        </div>
                      </label>
                      {errors.privacyAccepted && touchedFields.privacyAccepted && (
                        <div className="flex items-center gap-1 mt-2 ml-7">
                          <AlertCircle className="w-3 h-3 text-[#EF4444]" />
                          <p className="text-xs text-[#EF4444]">{errors.privacyAccepted}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="h-18 px-8 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0] flex items-center justify-between flex-shrink-0">
            <button
              onClick={onClose}
              className="h-10 px-5 text-sm text-[#64748B] hover:text-[#475569] font-medium transition-colors"
            >
              Cancelar
            </button>

            <div className="flex items-center gap-3">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="h-10 px-5 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#475569] hover:bg-gray-50 font-medium transition-colors"
                >
                  Anterior
                </button>
              )}

              {currentStep < 3 && (
                <button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="h-10 px-5 bg-[#3B82F6] text-white rounded-lg text-sm hover:bg-[#2563EB] font-medium transition-colors shadow-sm"
                >
                  Siguiente
                </button>
              )}

              {currentStep === 3 && (
                <>
                  <button
                    onClick={handleSaveDraft}
                    className="h-10 px-5 border border-[#E2E8F0] bg-white rounded-lg text-sm text-[#475569] hover:bg-gray-50 font-medium transition-colors"
                  >
                    Guardar como borrador
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!isFormValid()}
                    className={`h-10 px-6 rounded-lg text-sm font-medium transition-all shadow-sm ${
                      isFormValid()
                        ? 'bg-[#3B82F6] text-white hover:bg-[#2563EB] hover:shadow-md'
                        : 'bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed'
                    }`}
                  >
                    Crear Lead
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #F1F5F9;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #CBD5E1;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94A3B8;
        }
      `}</style>
    </>
  );
}
