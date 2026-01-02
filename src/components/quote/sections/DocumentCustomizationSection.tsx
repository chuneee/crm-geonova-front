import { useState } from 'react';
import { Upload, ChevronDown, ChevronUp } from 'lucide-react';

export function DocumentCustomizationSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0]">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#F8FAFC] transition-colors"
      >
        <h3 className="text-[#1E293B]">Personalización del Documento</h3>
        {isExpanded ? <ChevronUp className="w-5 h-5 text-[#64748B]" /> : <ChevronDown className="w-5 h-5 text-[#64748B]" />}
      </button>

      {isExpanded && (
        <div className="px-6 pb-6 space-y-4 border-t border-[#E2E8F0]">
          {/* Logo Upload */}
          <div>
            <label className="block text-sm text-[#64748B] mb-2">Logo de empresa</label>
            <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-8 text-center hover:border-[#3B82F6] transition-colors cursor-pointer">
              <Upload className="w-8 h-8 text-[#64748B] mx-auto mb-2" />
              <p className="text-sm text-[#64748B] mb-1">Arrastra tu logo aquí o haz clic para seleccionar</p>
              <p className="text-xs text-[#94A3B8]">PNG, JPG hasta 2MB</p>
            </div>
          </div>

          {/* Color Picker */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-[#64748B] mb-2">Color principal</label>
              <div className="flex gap-2">
                <input
                  type="color"
                  defaultValue="#3B82F6"
                  className="w-12 h-11 border border-[#E2E8F0] rounded-lg cursor-pointer"
                />
                <input
                  type="text"
                  defaultValue="#3B82F6"
                  className="flex-1 h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#64748B] mb-2">Idioma</label>
              <select className="w-full h-11 px-3 border border-[#E2E8F0] rounded-lg text-[#1E293B] focus:outline-none focus:border-[#3B82F6]">
                <option>Español</option>
                <option>English</option>
              </select>
            </div>
          </div>

          {/* Options */}
          <label className="flex items-center gap-2 p-3 border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] cursor-pointer">
            <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#E2E8F0] text-[#3B82F6]" />
            <span className="text-sm text-[#1E293B]">Incluir términos y condiciones completos</span>
          </label>

          {/* Template */}
          <div>
            <label className="block text-sm text-[#64748B] mb-3">Template</label>
            <div className="grid grid-cols-3 gap-3">
              {['Clásico', 'Moderno', 'Minimalista'].map((template, idx) => (
                <button
                  key={template}
                  className={`p-4 border-2 rounded-lg transition-colors ${
                    idx === 0 ? 'border-[#3B82F6] bg-[#EFF6FF]' : 'border-[#E2E8F0] hover:border-[#3B82F6]'
                  }`}
                >
                  <div className="w-full h-24 bg-white rounded mb-2 border border-[#E2E8F0]"></div>
                  <span className="text-xs text-[#1E293B]">{template}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
