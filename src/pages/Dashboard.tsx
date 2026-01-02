import { MetricsCards } from '../components/MetricsCards';
import { PipelineChart } from '../components/PipelineChart';
import { RecentActivities } from '../components/RecentActivities';
import { TopSellers } from '../components/TopSellers';
import { UpcomingInstallations } from '../components/UpcomingInstallations';

export function Dashboard() {
  return (
    <div className="p-4 md:p-8 overflow-auto h-full">
      <MetricsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-6 mt-6">
        <PipelineChart />
        <RecentActivities />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <TopSellers />
        <UpcomingInstallations />
      </div>
    </div>
  );
}