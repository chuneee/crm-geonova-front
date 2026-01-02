import { Camera, Mail, Phone, MapPin } from 'lucide-react';

interface ProfileSettingsProps {
  onChange: () => void;
}

export function ProfileSettings({ onChange }: ProfileSettingsProps) {
  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl text-[#1E293B] mb-1">Información Personal</h2>
        <p className="text-sm text-[#64748B]">Actualiza tu información de perfil y foto</p>
      </div>

      {/* Profile Photo */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Foto de Perfil</h3>
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full flex items-center justify-center text-white text-2xl">
              JD
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-[#3B82F6] text-white rounded-full flex items-center justify-center hover:bg-[#2563EB] transition-colors shadow-lg">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <div>
            <p className="text-sm text-[#1E293B] mb-1">Juan Pérez Director</p>
            <p className="text-xs text-[#64748B] mb-3">JPG o PNG. Tamaño máximo 2MB</p>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 bg-[#3B82F6] text-white rounded text-xs hover:bg-[#2563EB] transition-colors">
                Cambiar Foto
              </button>
              <button className="px-3 py-1.5 text-[#64748B] border border-[#E2E8F0] rounded text-xs hover:bg-[#F8FAFC] transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Información Personal</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Nombre</label>
            <input
              type="text"
              defaultValue="Juan"
              onChange={onChange}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Apellidos</label>
            <input
              type="text"
              defaultValue="Pérez Director"
              onChange={onChange}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
          
          <div className="col-span-2">
            <label className="block text-xs text-[#64748B] mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="email"
                defaultValue="juan.perez@empresa.com"
                onChange={onChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Teléfono</label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
              <input
                type="tel"
                defaultValue="+52 55 1234 5678"
                onChange={onChange}
                className="w-full pl-10 pr-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Puesto</label>
            <input
              type="text"
              defaultValue="Director de Ventas"
              onChange={onChange}
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Password */}
      <div className="bg-white rounded-lg border border-[#E2E8F0] p-6">
        <h3 className="text-sm text-[#1E293B] mb-4">Cambiar Contraseña</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs text-[#64748B] mb-2">Contraseña Actual</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Nueva Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-xs text-[#64748B] mb-2">Confirmar Contraseña</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-3 py-2 bg-white border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#3B82F6] focus:border-transparent"
              />
            </div>
          </div>
          
          <button className="px-4 py-2 bg-[#3B82F6] text-white text-sm rounded-lg hover:bg-[#2563EB] transition-colors">
            Actualizar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
}
