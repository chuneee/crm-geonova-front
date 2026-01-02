import { Calendar, MapPin, User, Clock } from 'lucide-react';

export function UpcomingInstallations() {
  const installations = [
    {
      date: '15',
      day: 'Lun',
      client: 'Tech Solutions SA',
      location: 'Monterrey, NL',
      technician: 'Carlos Ruiz',
      time: '09:00 - 11:00',
      status: 'confirmed',
      color: '#3B82F6'
    },
    {
      date: '16',
      day: 'Mar',
      client: 'Global Industries',
      location: 'Guadalajara, JAL',
      technician: 'María López',
      time: '14:00 - 16:00',
      status: 'confirmed',
      color: '#3B82F6'
    },
    {
      date: '17',
      day: 'Mié',
      client: 'Innovate Corp',
      location: 'Ciudad de México',
      technician: 'Juan García',
      time: '10:00 - 12:00',
      status: 'pending',
      color: '#F59E0B'
    },
    {
      date: '18',
      day: 'Jue',
      client: 'Digital Ventures',
      location: 'Puebla, PUE',
      technician: 'Ana Martínez',
      time: '11:00 - 13:00',
      status: 'confirmed',
      color: '#3B82F6'
    },
    {
      date: '19',
      day: 'Vie',
      client: 'Smart Systems Ltd',
      location: 'Querétaro, QRO',
      technician: 'Pedro Sánchez',
      time: '15:00 - 17:00',
      status: 'pending',
      color: '#F59E0B'
    }
  ];

  return (
    <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-[#3B82F6]" />
          <h2 className="text-gray-900">Próximas Instalaciones</h2>
        </div>
        <button className="text-sm text-[#3B82F6] hover:text-[#2563EB]">
          Ver calendario
        </button>
      </div>

      <div className="space-y-3">
        {installations.map((installation, index) => (
          <div
            key={index}
            className="flex gap-4 p-3 rounded-lg border border-[#E2E8F0] hover:border-[#3B82F6] transition-colors"
          >
            <div className="flex flex-col items-center justify-center w-14 h-14 rounded-lg bg-[#F8FAFC] flex-shrink-0">
              <div className="text-xl text-gray-900">{installation.date}</div>
              <div className="text-xs text-gray-500">{installation.day}</div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-sm text-gray-900 mb-1">{installation.client}</div>
              
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{installation.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span className="truncate">{installation.location}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                <User className="w-3 h-3" />
                <span>{installation.technician}</span>
              </div>
            </div>

            <div className="flex items-center">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: installation.color }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
