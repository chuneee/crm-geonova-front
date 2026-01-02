import { Building, CreditCard, Upload, FileText, X, AlertCircle } from 'lucide-react';
import type { ClientFormData } from '../../pages/NewClient';
import { useState } from 'react';

interface Step3FiscalInfoProps {
  formData: ClientFormData;
  onChange: (data: Partial<ClientFormData>) => void;
}

const taxRegimes = [
  { code: '601', name: 'General de Ley Personas Morales' },
  { code: '603', name: 'Personas Morales con Fines no Lucrativos' },
  { code: '605', name: 'Sueldos y Salarios e Ingresos Asimilados a Salarios' },
  { code: '606', name: 'Arrendamiento' },
  { code: '612', name: 'Personas Físicas con Actividades Empresariales' },
  { code: '621', name: 'Incorporación Fiscal' },
  { code: '625', name: 'Régimen de Actividades Empresariales con ingresos a través de Plataformas' },
  { code: '626', name: 'Régimen Simplificado de Confianza' },
];

const cfdiUses = [
  { code: 'G01', name: 'Adquisición de mercancías' },
  { code: 'G02', name: 'Devoluciones, descuentos o bonificaciones' },
  { code: 'G03', name: 'Gastos en general' },
  { code: 'I01', name: 'Construcciones' },
  { code: 'I02', name: 'Mobilario y equipo de oficina por inversiones' },
  { code: 'I03', name: 'Equipo de transporte' },
  { code: 'I04', name: 'Equipo de computo y accesorios' },
  { code: 'I05', name: 'Dados, troqueles, moldes, matrices y herramental' },
];

const banks = [
  'BBVA',
  'Santander',
  'Banorte',
  'HSBC',
  'Citibanamex',
  'Scotiabank',
  'Inbursa',
  'Otro'
];

export function Step3FiscalInfo({ formData, onChange }: Step3FiscalInfoProps) {
  const [uploadedDocs, setUploadedDocs] = useState<any[]>([]);

  const togglePaymentMethod = (method: string) => {
    const methods = formData.paymentMethods.includes(method)
      ? formData.paymentMethods.filter(m => m !== method)
      : [...formData.paymentMethods, method];
    onChange({ paymentMethods: methods });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newDocs = files.map(file => ({
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type
    }));
    setUploadedDocs([...uploadedDocs, ...newDocs]);
    onChange({ documents: [...formData.documents, ...newDocs] });
  };

  const removeDoc = (index: number) => {
    const newDocs = uploadedDocs.filter((_, i) => i !== index);
    setUploadedDocs(newDocs);
    onChange({ documents: newDocs });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Datos Fiscales */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <h3 className="text-sm text-[#1E293B] mb-4">Datos Fiscales</h3>
        
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-5">
            {/* Legal Name */}
            <div>
              <label className="block text-xs text-[#1E293B] mb-2">
                Razón social completa <span className="text-[#EF4444]">*</span>
              </label>
              <input
                type="text"
                value={formData.legalName || formData.companyName}
                onChange={(e) => onChange({ legalName: e.target.value })}
                className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                placeholder="Nombre completo legal"
              />
            </div>

            {/* Tax Regime */}
            <div>
              <label className="block text-xs text-[#1E293B] mb-2">
                Régimen fiscal <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={formData.taxRegime}
                onChange={(e) => onChange({ taxRegime: e.target.value })}
                className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
              >
                <option value="">Selecciona régimen fiscal</option>
                {taxRegimes.map((regime) => (
                  <option key={regime.code} value={regime.code}>
                    {regime.code} - {regime.name}
                  </option>
                ))}
              </select>
            </div>

            {/* CFDI Use */}
            <div>
              <label className="block text-xs text-[#1E293B] mb-2">
                Uso de CFDI <span className="text-[#EF4444]">*</span>
              </label>
              <select
                value={formData.cfdiUse}
                onChange={(e) => onChange({ cfdiUse: e.target.value })}
                className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
              >
                <option value="">Selecciona uso de CFDI</option>
                {cfdiUses.map((use) => (
                  <option key={use.code} value={use.code}>
                    {use.code} - {use.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-5">
            {/* Payment Methods */}
            <div>
              <label className="block text-xs text-[#1E293B] mb-2">
                Métodos de pago preferidos <span className="text-[#EF4444]">*</span>
              </label>
              <div className="space-y-2">
                {['Transferencia bancaria', 'Tarjeta de crédito', 'Efectivo', 'Cheque'].map((method) => (
                  <label key={method} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.paymentMethods.includes(method)}
                      onChange={() => togglePaymentMethod(method)}
                      className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
                    />
                    <span className="text-sm text-[#64748B]">{method}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Terms */}
            <div>
              <label className="block text-xs text-[#1E293B] mb-2">
                Términos de pago <span className="text-[#EF4444]">*</span>
              </label>
              <div className="space-y-2">
                {[
                  { value: 'cash', label: 'Contado' },
                  { value: 'net30', label: 'Net 30' },
                  { value: 'net60', label: 'Net 60' },
                  { value: '50-50', label: '50% anticipo / 50% contra entrega' },
                  { value: 'custom', label: 'Personalizado' },
                ].map((term) => (
                  <label key={term.value} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="paymentTerms"
                      value={term.value}
                      checked={formData.paymentTerms === term.value}
                      onChange={(e) => onChange({ paymentTerms: e.target.value })}
                      className="w-4 h-4 border-[#E2E8F0] accent-[#3B82F6]"
                    />
                    <span className="text-sm text-[#64748B]">{term.label}</span>
                  </label>
                ))}
              </div>
              {formData.paymentTerms === 'custom' && (
                <input
                  type="text"
                  value={formData.customPaymentTerms}
                  onChange={(e) => onChange({ customPaymentTerms: e.target.value })}
                  className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm mt-2"
                  placeholder="Especifica términos personalizados"
                />
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mt-5">
          {/* Cutoff Day */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Día de corte</label>
            <input
              type="number"
              min="1"
              max="31"
              value={formData.cutoffDay}
              onChange={(e) => onChange({ cutoffDay: e.target.value })}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
              placeholder="1-31"
            />
          </div>

          {/* Credit Limit */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Crédito autorizado</label>
            <input
              type="text"
              value={formData.creditLimit}
              onChange={(e) => onChange({ creditLimit: e.target.value })}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
              placeholder="$0.00"
            />
            {parseFloat(formData.creditLimit.replace(/[^0-9.-]+/g, '')) > 50000 && (
              <div className="flex items-center gap-2 mt-2 text-xs text-[#F59E0B]">
                <AlertCircle className="w-4 h-4" />
                Requiere aprobación
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Información Bancaria */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <h3 className="text-sm text-[#1E293B] mb-4">Información Bancaria</h3>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Bank */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Banco</label>
            <div className="relative">
              <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
              <select
                value={formData.bankName}
                onChange={(e) => onChange({ bankName: e.target.value })}
                className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
              >
                <option value="">Selecciona un banco</option>
                {banks.map((bank) => (
                  <option key={bank} value={bank}>{bank}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">Número de cuenta</label>
            <input
              type="text"
              value={formData.accountNumber}
              onChange={(e) => onChange({ accountNumber: e.target.value })}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm font-mono"
              placeholder="****-****-****-1234"
            />
          </div>

          {/* CLABE */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">CLABE interbancaria</label>
            <input
              type="text"
              value={formData.clabe}
              onChange={(e) => onChange({ clabe: e.target.value })}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm font-mono"
              placeholder="000000000000000000"
              maxLength={18}
            />
          </div>

          {/* SWIFT/BIC */}
          <div>
            <label className="block text-xs text-[#1E293B] mb-2">SWIFT/BIC</label>
            <input
              type="text"
              value={formData.swiftBic}
              onChange={(e) => onChange({ swiftBic: e.target.value })}
              className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm font-mono"
              placeholder="BOFAUS3N"
            />
          </div>
        </div>
      </div>

      {/* Documentos Fiscales */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <h3 className="text-sm text-[#1E293B] mb-4">Documentos Fiscales</h3>
        
        {/* Upload Zone */}
        <label
          htmlFor="doc-upload"
          className="block border-2 border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAFC] p-8 text-center cursor-pointer hover:border-[#3B82F6] hover:bg-[#EFF6FF] transition-colors mb-4"
        >
          <Upload className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
          <p className="text-sm text-[#1E293B] mb-1">Arrastra documentos aquí o haz clic para buscar</p>
          <p className="text-xs text-[#64748B]">PDF, JPG, PNG hasta 10MB</p>
        </label>
        <input
          id="doc-upload"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          multiple
          className="hidden"
          onChange={handleFileUpload}
        />

        {/* Document Types Checklist */}
        <div className="space-y-2 mb-4">
          <label className="flex items-center gap-2 text-sm text-[#64748B] cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]" />
            Constancia de situación fiscal (CSF)
          </label>
          <label className="flex items-center gap-2 text-sm text-[#64748B] cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]" />
            Comprobante de domicilio
          </label>
          <label className="flex items-center gap-2 text-sm text-[#64748B] cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]" />
            Identificación oficial representante legal
          </label>
          <label className="flex items-center gap-2 text-sm text-[#64748B] cursor-pointer">
            <input type="checkbox" className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]" />
            Acta constitutiva
          </label>
        </div>

        {/* Uploaded Files List */}
        {uploadedDocs.length > 0 && (
          <div className="space-y-2">
            {uploadedDocs.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-[#3B82F6]" />
                  <div>
                    <div className="text-sm text-[#1E293B]">{doc.name}</div>
                    <div className="text-xs text-[#64748B]">{doc.size}</div>
                  </div>
                </div>
                <button
                  onClick={() => removeDoc(index)}
                  className="p-1 text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
