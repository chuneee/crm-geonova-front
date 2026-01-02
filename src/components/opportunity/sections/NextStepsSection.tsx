import { Plus, Clock } from 'lucide-react';

interface NextStepsSectionProps {
  steps: any[];
}

export function NextStepsSection({ steps }: NextStepsSectionProps) {
  return (
    <div className="bg-[#FEF3C7] rounded-xl border border-[#F59E0B] p-6">
      <h3 className="text-[#92400E] mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Próximos Pasos
      </h3>
      
      <div className="space-y-3">
        {steps.map((step) => (
          <div key={step.id} className="flex items-start gap-3">
            <input 
              type="checkbox"
              defaultChecked={step.completed}
              className="mt-1 w-4 h-4 rounded border-[#F59E0B] text-[#F59E0B] focus:ring-[#F59E0B]"
            />
            <div className="flex-1">
              <div className={`text-sm ${step.completed ? 'line-through text-[#92400E]/60' : 'text-[#92400E]'}`}>
                {step.text}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs ${
                  step.priority === 'high' ? 'text-[#DC2626]' :
                  step.priority === 'medium' ? 'text-[#F59E0B]' :
                  'text-[#64748B]'
                }`}>
                  {step.dueDate}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-4 px-4 py-2 border-2 border-dashed border-[#F59E0B] rounded-lg text-[#92400E] hover:bg-[#FEF3C7]/50 transition-colors flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" />
        <span className="text-sm">Agregar paso</span>
      </button>
    </div>
  );
}
