import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import { useState } from 'react';
import type { Activity } from '../../pages/Activities';

interface CalendarWidgetProps {
  activities: Activity[];
  onDateSelect: (date: string) => void;
}

export function CalendarWidget({ activities, onDateSelect }: CalendarWidgetProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getActivitiesForDate = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return activities.filter(a => a.dueDate === dateStr);
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="h-10" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayActivities = getActivitiesForDate(day);
    const hasActivities = dayActivities.length > 0;
    const hasPending = dayActivities.some(a => a.status === 'pending');
    const hasOverdue = dayActivities.some(a => a.status === 'overdue');

    days.push(
      <button
        key={day}
        onClick={() => {
          const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
          onDateSelect(dateStr);
        }}
        className={`h-10 flex flex-col items-center justify-center rounded-lg text-sm transition-all relative ${
          isToday(day)
            ? 'bg-[#3B82F6] text-white font-semibold'
            : hasActivities
            ? 'hover:bg-[#F8FAFC] text-[#1E293B]'
            : 'hover:bg-[#F8FAFC] text-[#64748B]'
        }`}
      >
        <span>{day}</span>
        {hasActivities && !isToday(day) && (
          <div className="flex gap-0.5 mt-0.5">
            {dayActivities.slice(0, 3).map((_, i) => (
              <div
                key={i}
                className={`w-1 h-1 rounded-full ${
                  hasOverdue ? 'bg-[#EF4444]' : hasPending ? 'bg-[#3B82F6]' : 'bg-[#10B981]'
                }`}
              />
            ))}
          </div>
        )}
      </button>
    );
  }

  // Today's activities summary
  const todayStr = new Date().toISOString().split('T')[0];
  const todayActivities = activities.filter(a => a.dueDate === todayStr);

  return (
    <div className="space-y-4">
      {/* Calendar Card */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-[#1E293B]">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <div className="flex gap-1">
            <button
              onClick={previousMonth}
              className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextMonth}
              className="p-1 text-[#64748B] hover:bg-[#F8FAFC] rounded transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Day Names */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {dayNames.map((name) => (
            <div key={name} className="text-xs text-center text-[#64748B] py-1">
              {name}
            </div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>

        {/* Legend */}
        <div className="mt-4 pt-4 border-t border-[#E2E8F0] space-y-2">
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <div className="w-2 h-2 rounded-full bg-[#3B82F6]" />
            <span>Pendientes</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <div className="w-2 h-2 rounded-full bg-[#10B981]" />
            <span>Completadas</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#64748B]">
            <div className="w-2 h-2 rounded-full bg-[#EF4444]" />
            <span>Vencidas</span>
          </div>
        </div>
      </div>

      {/* Today's Summary */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar className="w-4 h-4 text-[#3B82F6]" />
          <h3 className="text-sm text-[#1E293B]">Hoy</h3>
        </div>

        {todayActivities.length > 0 ? (
          <div className="space-y-2">
            {todayActivities.slice(0, 3).map((activity) => (
              <div
                key={activity.id}
                className="p-2 bg-[#F8FAFC] rounded-lg hover:bg-[#F1F5F9] transition-colors cursor-pointer"
                onClick={() => onDateSelect(todayStr)}
              >
                <div className="flex items-start gap-2">
                  <div
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${
                      activity.status === 'completed' ? 'bg-[#10B981]' :
                      activity.status === 'overdue' ? 'bg-[#EF4444]' :
                      'bg-[#3B82F6]'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#1E293B] line-clamp-1">{activity.title}</p>
                    {activity.dueTime && (
                      <p className="text-xs text-[#64748B]">{activity.dueTime}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {todayActivities.length > 3 && (
              <button className="w-full text-xs text-[#3B82F6] hover:underline text-left">
                Ver {todayActivities.length - 3} más
              </button>
            )}
          </div>
        ) : (
          <p className="text-xs text-[#64748B]">No hay actividades para hoy</p>
        )}
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg p-4 text-white">
        <h3 className="text-sm mb-3 opacity-90">Esta Semana</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-90">Total</span>
            <span className="text-lg">{activities.length}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs opacity-90">Completadas</span>
            <span className="text-lg">
              {activities.filter(a => a.status === 'completed').length}
            </span>
          </div>
          <div className="h-2 bg-white bg-opacity-20 rounded-full overflow-hidden">
            <div
              className="h-full bg-white rounded-full transition-all"
              style={{
                width: `${activities.length > 0 ? (activities.filter(a => a.status === 'completed').length / activities.length) * 100 : 0}%`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
