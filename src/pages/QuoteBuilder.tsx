import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuoteHeader } from '../components/quote/QuoteHeader';
import { QuoteWizardSteps } from '../components/quote/QuoteWizardSteps';
import { ClientInfoSection } from '../components/quote/sections/ClientInfoSection';
import { ProductsServicesSection } from '../components/quote/sections/ProductsServicesSection';
import { TermsConditionsSection } from '../components/quote/sections/TermsConditionsSection';
import { DocumentCustomizationSection } from '../components/quote/sections/DocumentCustomizationSection';
import { PreviewSection } from '../components/quote/sidebar/PreviewSection';
import { AdditionalInfoSection } from '../components/quote/sidebar/AdditionalInfoSection';
import { PostGenerationSection } from '../components/quote/sidebar/PostGenerationSection';
import { QuoteFooter } from '../components/quote/QuoteFooter';

type WizardStep = 'client' | 'products' | 'terms' | 'review';

export function QuoteBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<WizardStep>('products');
  const [autoSaveTime, setAutoSaveTime] = useState('30 seg');

  const steps = [
    { id: 'client' as WizardStep, label: 'Cliente y Oportunidad', status: 'completed' },
    { id: 'products' as WizardStep, label: 'Productos y Servicios', status: 'active' },
    { id: 'terms' as WizardStep, label: 'Términos y Condiciones', status: 'pending' },
    { id: 'review' as WizardStep, label: 'Revisión y Envío', status: 'pending' }
  ];

  // Mock data
  const quoteData = {
    status: 'draft',
    number: 'COT-2024-0847',
    client: {
      name: 'TechCorp Solutions',
      logo: 'TC',
      contact: {
        name: 'Roberto Silva',
        email: 'roberto.silva@techcorp.com',
        phone: '+52 55 1234 5678'
      }
    },
    opportunity: {
      id: '2847',
      title: 'Sistema CRM Enterprise'
    },
    seller: {
      name: 'Carlos Rodríguez',
      avatar: 'CR',
      color: 'from-blue-500 to-blue-600'
    },
    issueDate: new Date().toISOString().split('T')[0],
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  const handleNext = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex < steps.length - 1) {
      setCurrentStep(steps[currentIndex + 1].id);
    }
  };

  const handlePrevious = () => {
    const currentIndex = steps.findIndex(s => s.id === currentStep);
    if (currentIndex > 0) {
      setCurrentStep(steps[currentIndex - 1].id);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#F8FAFC]">
      {/* Header */}
      <QuoteHeader 
        status={quoteData.status}
        autoSaveTime={autoSaveTime}
        onBack={() => navigate('/pipeline')}
      />

      {/* Wizard Steps */}
      <QuoteWizardSteps 
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 md:p-8">
          <div className="max-w-[1800px] mx-auto">
            <div className="flex gap-6">
              {/* Left Column - 70% */}
              <div className="flex-1 space-y-6" style={{ width: '70%' }}>
                <ClientInfoSection client={quoteData.client} opportunity={quoteData.opportunity} />
                <ProductsServicesSection />
                <TermsConditionsSection />
                <DocumentCustomizationSection />
              </div>

              {/* Right Column - 30% */}
              <div className="space-y-6" style={{ width: '30%' }}>
                <PreviewSection />
                <AdditionalInfoSection 
                  quoteNumber={quoteData.number}
                  issueDate={quoteData.issueDate}
                  expirationDate={quoteData.expirationDate}
                  seller={quoteData.seller}
                />
                <PostGenerationSection />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <QuoteFooter 
        currentStep={currentStep}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onCancel={() => navigate('/pipeline')}
      />
    </div>
  );
}
