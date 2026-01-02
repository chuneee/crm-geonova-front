import { MainInfoSection } from '../sections/MainInfoSection';
import { FinancialDetailsSection } from '../sections/FinancialDetailsSection';
import { TimelineSection } from '../sections/TimelineSection';
import { ProductsSection } from '../sections/ProductsSection';
import { InternalNotesSection } from '../sections/InternalNotesSection';
import { QuickActionsSection } from '../sections/QuickActionsSection';
import { ProbabilitySection } from '../sections/ProbabilitySection';
import { NextStepsSection } from '../sections/NextStepsSection';
import { AdditionalInfoSection } from '../sections/AdditionalInfoSection';
import { CollaboratorsSection } from '../sections/CollaboratorsSection';
import { RecentDocumentsSection } from '../sections/RecentDocumentsSection';

interface OverviewTabProps {
  opportunity: any;
}

export function OverviewTab({ opportunity }: OverviewTabProps) {
  return (
    <div className="p-8">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex gap-6">
          {/* Left Column - 65% */}
          <div className="flex-1 space-y-4" style={{ width: '65%' }}>
            <MainInfoSection opportunity={opportunity} />
            <FinancialDetailsSection opportunity={opportunity} />
            <TimelineSection opportunityId={opportunity.id} />
            <ProductsSection opportunityId={opportunity.id} />
            <InternalNotesSection opportunityId={opportunity.id} />
          </div>

          {/* Right Column - 35% */}
          <div className="space-y-4" style={{ width: '35%' }}>
            <QuickActionsSection stage={opportunity.stage} />
            <ProbabilitySection 
              probability={opportunity.probability}
              aiSuggestion={opportunity.aiSuggestion}
            />
            <NextStepsSection steps={opportunity.nextSteps} />
            <AdditionalInfoSection opportunity={opportunity} />
            <CollaboratorsSection collaborators={opportunity.collaborators} />
            <RecentDocumentsSection documents={opportunity.documents} />
          </div>
        </div>
      </div>
    </div>
  );
}
