import { DollarSign, TrendingUp, Users, CheckCircle, Target, Award } from 'lucide-react';
import type { ReportFilters } from '../../pages/Reports';

interface ReportMetricsProps {
  filters: ReportFilters;
}

export function ReportMetrics({ filters }: ReportMetricsProps) {
  // Mock data - en producción vendría del backend basado en filtros
  const metrics = {
    totalRevenue: 2450000,
    revenueGrowth: 23.5,
    closedDeals: 48,
    dealsGrowth: 12.3,
    activeCustomers: 127,
    customersGrowth: 8.7,
    conversionRate: 34.2,
    conversionGrowth: 5.1,
    avgDealSize: 51042,
    dealSizeGrowth: 15.8,
    teamPerformance: 87.5,
    performanceGrowth: 3.2,
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const MetricCard = ({ 
    icon: Icon, 
    label, 
    value, 
    growth, 
    color,
    prefix = '',
    suffix = ''
  }: { 
    icon: any; 
    label: string; 
    value: string | number; 
    growth: number; 
    color: string;
    prefix?: string;
    suffix?: string;
  }) => (
    <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center`} style={{ backgroundColor: `${color}15` }}>
          <Icon className="w-6 h-6" style={{ color }} />
        </div>
        <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
          growth >= 0 ? 'bg-[#D1FAE5] text-[#10B981]' : 'bg-[#FEE2E2] text-[#EF4444]'
        }`}>
          <TrendingUp className={`w-3 h-3 ${growth < 0 ? 'rotate-180' : ''}`} />
          <span>{Math.abs(growth)}%</span>
        </div>
      </div>
      <p className="text-xs text-[#64748B] mb-1">{label}</p>
      <p className="text-2xl text-[#1E293B]">
        {prefix}{typeof value === 'number' ? value.toLocaleString('es-MX') : value}{suffix}
      </p>
    </div>
  );

  return (
    <div className="px-8 py-6">
      <div className="grid grid-cols-6 gap-4">
        <MetricCard
          icon={DollarSign}
          label="Ingresos Totales"
          value={formatCurrency(metrics.totalRevenue)}
          growth={metrics.revenueGrowth}
          color="#10B981"
        />
        
        <MetricCard
          icon={CheckCircle}
          label="Negocios Cerrados"
          value={metrics.closedDeals}
          growth={metrics.dealsGrowth}
          color="#3B82F6"
        />
        
        <MetricCard
          icon={Users}
          label="Clientes Activos"
          value={metrics.activeCustomers}
          growth={metrics.customersGrowth}
          color="#8B5CF6"
        />
        
        <MetricCard
          icon={Target}
          label="Tasa de Conversión"
          value={metrics.conversionRate}
          growth={metrics.conversionGrowth}
          color="#F59E0B"
          suffix="%"
        />
        
        <MetricCard
          icon={DollarSign}
          label="Tamaño Promedio"
          value={formatCurrency(metrics.avgDealSize)}
          growth={metrics.dealSizeGrowth}
          color="#EF4444"
        />
        
        <MetricCard
          icon={Award}
          label="Desempeño Equipo"
          value={metrics.teamPerformance}
          growth={metrics.performanceGrowth}
          color="#06B6D4"
          suffix="%"
        />
      </div>
    </div>
  );
}
