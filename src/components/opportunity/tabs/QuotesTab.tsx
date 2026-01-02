interface QuotesTabProps {
  opportunityId: string;
}

export function QuotesTab({ opportunityId }: QuotesTabProps) {
  return (
    <div className="p-8">
      <div className="max-w-[1200px] mx-auto bg-white rounded-xl border border-[#E2E8F0] p-12">
        <div className="text-center">
          <h3 className="text-xl text-[#1E293B] mb-2">Tab de Cotizaciones</h3>
          <p className="text-[#64748B]">Vista de cotizaciones para la oportunidad #{opportunityId}</p>
        </div>
      </div>
    </div>
  );
}
