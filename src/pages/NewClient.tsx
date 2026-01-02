import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { StepIndicator } from '../components/new-client/StepIndicator';
import { Step1ClientType } from '../components/new-client/Step1ClientType';
import { Step2BasicInfo } from '../components/new-client/Step2BasicInfo';
import { Step3FiscalInfo } from '../components/new-client/Step3FiscalInfo';
import { Step4Contacts } from '../components/new-client/Step4Contacts';
import { Step5Configuration } from '../components/new-client/Step5Configuration';
import { FormFooter } from '../components/new-client/FormFooter';

export type ClientType = 'company' | 'individual' | null;

export interface ClientFormData {
  // Step 1
  clientType: ClientType;
  
  // Step 2
  logo?: string;
  companyName: string;
  tradeName: string;
  industry: string;
  website: string;
  taxId: string;
  companySize: string;
  annualRevenue: string;
  segment: 'premium' | 'corporate' | 'sme' | 'individual' | '';
  country: string;
  postalCode: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  addressNotes: string;
  
  // Step 3
  legalName: string;
  taxRegime: string;
  cfdiUse: string;
  paymentMethods: string[];
  paymentTerms: string;
  customPaymentTerms: string;
  cutoffDay: string;
  creditLimit: string;
  bankName: string;
  accountNumber: string;
  clabe: string;
  swiftBic: string;
  documents: any[];
  
  // Step 4
  contacts: any[];
  
  // Step 5
  preferredLanguage: 'es' | 'en';
  timezone: string;
  currency: string;
  communicationChannels: string[];
  assignedSales: string;
  supportTeam: string[];
  territory: string;
  source: string;
  campaign: string;
  tags: string[];
  specialClassifications: string[];
  initialStatus: 'active' | 'prospect' | 'inactive';
  createOpportunity: boolean;
  opportunityName: string;
  opportunityAmount: string;
  opportunityCloseDate: string;
  scheduleOnboarding: boolean;
  onboardingDate: string;
  sendWelcomeEmail: boolean;
}

export function NewClient() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [hasChanges, setHasChanges] = useState(false);
  
  const [formData, setFormData] = useState<ClientFormData>({
    clientType: null,
    companyName: '',
    tradeName: '',
    industry: '',
    website: '',
    taxId: '',
    companySize: '',
    annualRevenue: '',
    segment: '',
    country: 'México',
    postalCode: '',
    state: '',
    city: '',
    neighborhood: '',
    street: '',
    addressNotes: '',
    legalName: '',
    taxRegime: '',
    cfdiUse: '',
    paymentMethods: [],
    paymentTerms: 'net30',
    customPaymentTerms: '',
    cutoffDay: '',
    creditLimit: '',
    bankName: '',
    accountNumber: '',
    clabe: '',
    swiftBic: '',
    documents: [],
    contacts: [],
    preferredLanguage: 'es',
    timezone: 'America/Mexico_City',
    currency: 'MXN',
    communicationChannels: [],
    assignedSales: '',
    supportTeam: [],
    territory: '',
    source: '',
    campaign: '',
    tags: [],
    specialClassifications: [],
    initialStatus: 'prospect',
    createOpportunity: false,
    opportunityName: '',
    opportunityAmount: '',
    opportunityCloseDate: '',
    scheduleOnboarding: false,
    onboardingDate: '',
    sendWelcomeEmail: true,
  });

  // Auto-save every 30 seconds
  useEffect(() => {
    if (!hasChanges) return;
    
    const timer = setTimeout(() => {
      // Simulate save to localStorage or backend
      localStorage.setItem('newClientDraft', JSON.stringify(formData));
      setLastSaved(new Date());
      setHasChanges(false);
    }, 30000);

    return () => clearTimeout(timer);
  }, [formData, hasChanges]);

  // Load draft on mount
  useEffect(() => {
    const draft = localStorage.getItem('newClientDraft');
    if (draft) {
      try {
        const parsed = JSON.parse(draft);
        setFormData(parsed);
      } catch (e) {
        console.error('Failed to load draft');
      }
    }
  }, []);

  const updateFormData = (updates: Partial<ClientFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    setHasChanges(true);
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('newClientDraft', JSON.stringify(formData));
    setLastSaved(new Date());
    setHasChanges(false);
  };

  const handleCancel = () => {
    if (hasChanges) {
      const confirmed = window.confirm('¿Estás seguro? Los cambios no guardados se perderán.');
      if (!confirmed) return;
    }
    localStorage.removeItem('newClientDraft');
    navigate('/clientes');
  };

  const handleFinish = () => {
    // Validate all required fields
    console.log('Creating client:', formData);
    // In real app: send to backend API
    localStorage.removeItem('newClientDraft');
    navigate('/clientes');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.clientType !== null;
      case 2:
        return formData.companyName && formData.industry && formData.taxId && formData.segment && formData.postalCode && formData.street;
      case 3:
        return formData.legalName && formData.paymentTerms;
      case 4:
        return formData.contacts.length > 0;
      case 5:
        return formData.assignedSales && formData.territory && formData.source;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-32">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 text-[#64748B] hover:text-[#1E293B] transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Volver a clientes</span>
            </button>
            <button
              onClick={handleCancel}
              className="p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <h1 className="text-2xl text-[#1E293B] mb-1">Nuevo Cliente</h1>
          <p className="text-sm text-[#64748B]">Registra la información completa del cliente</p>
        </div>
      </div>

      {/* Step Indicator */}
      <StepIndicator currentStep={currentStep} />

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-8">
        {currentStep === 1 && (
          <Step1ClientType
            selectedType={formData.clientType}
            onSelect={(type) => updateFormData({ clientType: type })}
          />
        )}
        
        {currentStep === 2 && (
          <Step2BasicInfo
            formData={formData}
            onChange={updateFormData}
          />
        )}
        
        {currentStep === 3 && (
          <Step3FiscalInfo
            formData={formData}
            onChange={updateFormData}
          />
        )}
        
        {currentStep === 4 && (
          <Step4Contacts
            contacts={formData.contacts}
            onChange={(contacts) => updateFormData({ contacts })}
          />
        )}
        
        {currentStep === 5 && (
          <Step5Configuration
            formData={formData}
            onChange={updateFormData}
          />
        )}
      </div>

      {/* Footer */}
      <FormFooter
        currentStep={currentStep}
        totalSteps={5}
        canProceed={canProceed()}
        lastSaved={lastSaved}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onCancel={handleCancel}
        onSaveDraft={handleSaveDraft}
        onFinish={handleFinish}
      />
    </div>
  );
}