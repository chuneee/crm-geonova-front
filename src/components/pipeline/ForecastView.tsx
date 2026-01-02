import { TrendingUp, DollarSign, Target, Award, Calendar, BarChart3, PieChart } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell, Legend } from 'recharts';
import type { Opportunity } from '../PipelineManagement';

interface ForecastViewProps {
  opportunities: Opportunity[];
}

const stageColors = {
  prospeccion: '#94A3B8',
  calificacion: '#3B82F6',
  propuesta: '#8B5CF6',
  negociacion: '#F59E0B',
  ganado: '#10B981',
  perdido: '#EF4444'
};

export function ForecastView({ opportunities }: ForecastViewProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  // Calcular métricas de pronóstico
  const totalValue = opportunities
    .filter(opp => opp.stage !== 'perdido' && opp.stage !== 'ganado')
    .reduce((sum, opp) => sum + opp.value, 0);

  const weightedValue = opportunities
    .filter(opp => opp.stage !== 'perdido' && opp.stage !== 'ganado')
    .reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);

  const wonDeals = opportunities.filter(opp => opp.stage === 'ganado');
  const wonValue = wonDeals.reduce((sum, opp) => sum + opp.value, 0);

  const activeOpportunities = opportunities.filter(opp => opp.stage !== 'perdido' && opp.stage !== 'ganado');
  const avgDealSize = activeOpportunities.length > 0 ? totalValue / activeOpportunities.length : 0;

  const winRate = opportunities.length > 0 
    ? (wonDeals.length / opportunities.filter(o => o.stage === 'ganado' || o.stage === 'perdido').length) * 100 
    : 0;

  // Datos por etapa para gráfico de barras
  const stageData = [
    { name: 'Prospección', value: 0, weighted: 0, count: 0, stage: 'prospeccion' },
    { name: 'Calificación', value: 0, weighted: 0, count: 0, stage: 'calificacion' },
    { name: 'Propuesta', value: 0, weighted: 0, count: 0, stage: 'propuesta' },
    { name: 'Negociación', value: 0, weighted: 0, count: 0, stage: 'negociacion' }
  ];

  opportunities.forEach(opp => {
    const stage = stageData.find(s => s.stage === opp.stage);
    if (stage) {
      stage.value += opp.value;
      stage.weighted += (opp.value * opp.probability / 100);
      stage.count += 1;
    }
  });

  // Datos de distribución por probabilidad
  const probabilityData = [
    { name: '0-25%', value: 0, color: '#EF4444' },
    { name: '26-50%', value: 0, color: '#F59E0B' },
    { name: '51-75%', value: 0, color: '#3B82F6' },
    { name: '76-100%', value: 0, color: '#10B981' }
  ];

  activeOpportunities.forEach(opp => {
    if (opp.probability <= 25) probabilityData[0].value += opp.value;
    else if (opp.probability <= 50) probabilityData[1].value += opp.value;
    else if (opp.probability <= 75) probabilityData[2].value += opp.value;
    else probabilityData[3].value += opp.value;
  });

  // Pronóstico por mes (próximos 3 meses)
  const monthlyForecast = [];
  const today = new Date();
  
  for (let i = 0; i < 3; i++) {
    const month = new Date(today.getFullYear(), today.getMonth() + i, 1);
    const monthName = month.toLocaleDateString('es-MX', { month: 'short' });
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + i + 1, 0);
    
    const monthOpps = activeOpportunities.filter(opp => {
      const closeDate = new Date(opp.closeDate);
      return closeDate >= month && closeDate <= monthEnd;
    });
    
    const monthValue = monthOpps.reduce((sum, opp) => sum + opp.value, 0);
    const monthWeighted = monthOpps.reduce((sum, opp) => sum + (opp.value * opp.probability / 100), 0);
    
    monthlyForecast.push({
      month: monthName,
      pipeline: monthValue,
      weighted: monthWeighted,
      count: monthOpps.length
    });
  }

  // Top 5 oportunidades por valor ponderado
  const topOpportunities = [...activeOpportunities]
    .map(opp => ({
      ...opp,
      weightedValue: opp.value * (opp.probability / 100)
    }))
    .sort((a, b) => b.weightedValue - a.weightedValue)
    .slice(0, 5);

  return (
    <div className="h-full overflow-auto p-4 md:p-8 bg-[#F8FAFC]">
      <div className="max-w-[1600px] mx-auto space-y-6">
        {/* Métricas principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#EFF6FF] flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#3B82F6]" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#10B981]" />
            </div>
            <div className="text-2xl text-[#1E293B] mb-1">{formatCurrency(weightedValue)}</div>
            <div className="text-sm text-[#64748B]">Pronóstico Ponderado</div>
            <div className="mt-2 text-xs text-[#64748B]">
              Pipeline total: {formatCurrency(totalValue)}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#F0FDF4] flex items-center justify-center">
                <Target className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>
            <div className="text-2xl text-[#1E293B] mb-1">{activeOpportunities.length}</div>
            <div className="text-sm text-[#64748B]">Oportunidades Activas</div>
            <div className="mt-2 text-xs text-[#64748B]">
              Valor promedio: {formatCurrency(avgDealSize)}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#FEF3C7] flex items-center justify-center">
                <Award className="w-6 h-6 text-[#F59E0B]" />
              </div>
            </div>
            <div className="text-2xl text-[#1E293B] mb-1">{winRate.toFixed(1)}%</div>
            <div className="text-sm text-[#64748B]">Tasa de Conversión</div>
            <div className="mt-2 text-xs text-[#64748B]">
              {wonDeals.length} ganadas de {opportunities.filter(o => o.stage === 'ganado' || o.stage === 'perdido').length}
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-[#ECFDF5] flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#10B981]" />
              </div>
            </div>
            <div className="text-2xl text-[#1E293B] mb-1">{formatCurrency(wonValue)}</div>
            <div className="text-sm text-[#64748B]">Cerrado Ganado</div>
            <div className="mt-2 text-xs text-[#64748B]">
              Este período
            </div>
          </div>
        </div>

        {/* Gráficos principales */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pronóstico por Etapa */}
          <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <BarChart3 className="w-5 h-5 text-[#3B82F6]" />
              <h3 className="text-[#1E293B]">Pronóstico por Etapa</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                />
                <YAxis 
                  tick={{ fill: '#64748B', fontSize: 12 }}
                  axisLine={{ stroke: '#E2E8F0' }}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: 'white',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="value" fill="#3B82F6" name="Pipeline Total" radius={[8, 8, 0, 0]} />
                <Bar dataKey="weighted" fill="#10B981" name="Valor Ponderado" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Distribución por Probabilidad */}
          <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-5 h-5 text-[#3B82F6]" />
              <h3 className="text-[#1E293B]">Distribución por Probabilidad</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={probabilityData.filter(d => d.value > 0)}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {probabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pronóstico Mensual */}
        <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-[#1E293B]">Pronóstico Próximos 3 Meses</h3>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyForecast}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis 
                dataKey="month" 
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={{ stroke: '#E2E8F0' }}
              />
              <YAxis 
                tick={{ fill: '#64748B', fontSize: 12 }}
                axisLine={{ stroke: '#E2E8F0' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: number) => formatCurrency(value)}
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="pipeline" 
                stroke="#3B82F6" 
                strokeWidth={2}
                name="Pipeline Total"
                dot={{ fill: '#3B82F6', r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="weighted" 
                stroke="#10B981" 
                strokeWidth={2}
                name="Valor Ponderado"
                dot={{ fill: '#10B981', r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-3 gap-4 mt-6">
            {monthlyForecast.map((month, idx) => (
              <div key={idx} className="bg-[#F8FAFC] rounded-lg p-4">
                <div className="text-sm text-[#64748B] mb-2">{month.month}</div>
                <div className="text-lg text-[#1E293B] mb-1">{formatCurrency(month.weighted)}</div>
                <div className="text-xs text-[#64748B]">{month.count} oportunidades</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top 5 Oportunidades */}
        <div className="bg-white rounded-lg p-6 border border-[#E2E8F0]">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-[#3B82F6]" />
            <h3 className="text-[#1E293B]">Top 5 Oportunidades (Valor Ponderado)</h3>
          </div>
          <div className="space-y-4">
            {topOpportunities.map((opp, idx) => (
              <div key={opp.id} className="flex items-center gap-4 p-4 bg-[#F8FAFC] rounded-lg">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#1E40AF] flex items-center justify-center text-white">
                  {idx + 1}
                </div>
                <div className="flex-1">
                  <div className="text-[#1E293B] mb-1">{opp.title}</div>
                  <div className="text-sm text-[#64748B]">{opp.company}</div>
                </div>
                <div className="text-right">
                  <div className="text-[#1E293B] mb-1">{formatCurrency(opp.weightedValue)}</div>
                  <div className="text-sm text-[#64748B]">{opp.probability}% probabilidad</div>
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${opp.assignedTo.color} flex items-center justify-center text-white text-xs`}>
                    {opp.assignedTo.avatar}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
