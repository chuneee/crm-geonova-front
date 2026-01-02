import { useState } from 'react';
import { Download, Calendar, TrendingUp, Filter } from 'lucide-react';
import { ReportMetrics } from '../components/reports/ReportMetrics';
import { ReportFilters } from '../components/reports/ReportFilters';
import { SalesChart } from '../components/reports/SalesChart';
import { PipelineChart } from '../components/reports/PipelineChart';
import { ActivityChart } from '../components/reports/ActivityChart';
import { ProductPerformance } from '../components/reports/ProductPerformance';
import { TeamPerformance } from '../components/reports/TeamPerformance';
import { CustomerAnalysis } from '../components/reports/CustomerAnalysis';

export type DateRange = 'week' | 'month' | 'quarter' | 'year' | 'custom';

export interface ReportFilters {
  dateRange: DateRange;
  startDate: string;
  endDate: string;
  teamMember: string;
  category: string;
}

export function Reports() {
  const [filters, setFilters] = useState<ReportFilters>({
    dateRange: 'month',
    startDate: '',
    endDate: '',
    teamMember: '',
    category: '',
  });

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exportando reportes en formato ${format}...`);
    // Implementar exportación
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-8">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-[#1E293B]">Reportes y Análisis</h1>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleExport('excel')}
              className="flex items-center gap-2 px-4 h-10 text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">Excel</span>
            </button>

            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center gap-2 px-4 h-10 text-[#64748B] border border-[#E2E8F0] rounded-lg hover:bg-[#F8FAFC] transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm">PDF</span>
            </button>

            <button className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors">
              <TrendingUp className="w-5 h-5" />
              <span>Generar Reporte</span>
            </button>
          </div>
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#1E293B]">Reportes</span>
        </div>
      </div>

      {/* Filters */}
      <ReportFilters filters={filters} onChange={setFilters} />

      {/* Metrics Overview */}
      <ReportMetrics filters={filters} />

      {/* Charts Grid */}
      <div className="px-8 space-y-6">
        {/* Sales Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SalesChart filters={filters} />
          <PipelineChart filters={filters} />
        </div>

        {/* Activity & Products */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityChart filters={filters} />
          <ProductPerformance filters={filters} />
        </div>

        {/* Team & Customers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TeamPerformance filters={filters} />
          <CustomerAnalysis filters={filters} />
        </div>
      </div>
    </div>
  );
}
