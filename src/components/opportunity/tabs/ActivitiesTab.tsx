interface ActivitiesTabProps {
  opportunityId: string;
}

export function ActivitiesTab({ opportunityId }: ActivitiesTabProps) {
  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto bg-white rounded-xl border border-[#E2E8F0] p-12">
        <div className="text-center">
          <h3 className="text-xl text-[#1E293B] mb-2">Tab de Actividades</h3>
          <p className="text-[#64748B]">Vista completa de actividades para la oportunidad #{opportunityId}</p>
        </div>
      </div>
    </div>
  );
}
