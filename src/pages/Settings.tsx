import { useState } from 'react';
import { User, Building2, Bell, Users, Globe, Save, Shield } from 'lucide-react';
import { ProfileSettings } from '../components/settings/ProfileSettings';
import { CompanySettings } from '../components/settings/CompanySettings';
import { NotificationSettings } from '../components/settings/NotificationSettings';
import { TeamSettings } from '../components/settings/TeamSettings';

type SettingsTab = 'profile' | 'company' | 'notifications' | 'team';

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  const [hasChanges, setHasChanges] = useState(false);

  const tabs = [
    { id: 'profile' as const, label: 'Mi Perfil', icon: User },
    { id: 'company' as const, label: 'Empresa', icon: Building2 },
    { id: 'notifications' as const, label: 'Notificaciones', icon: Bell },
    { id: 'team' as const, label: 'Equipo', icon: Users },
  ];

  const handleSave = () => {
    console.log('Guardando configuración...');
    setHasChanges(false);
    // Implementar guardado
  };

  return (
    <div className="min-h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-[#1E293B]">Configuración</h1>
          
          {hasChanges && (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Guardar Cambios</span>
            </button>
          )}
        </div>
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#64748B]">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#1E293B]">Configuración</span>
        </div>
      </div>

      <div className="flex h-[calc(100vh-145px)]">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-white border-r border-[#E2E8F0] p-6">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-[#EFF6FF] text-[#3B82F6] shadow-sm'
                      : 'text-[#64748B] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}

            <div className="pt-6 mt-6 border-t border-[#E2E8F0]">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                <Shield className="w-5 h-5" />
                <span>Seguridad</span>
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-[#64748B] hover:bg-[#F8FAFC] transition-colors">
                <Globe className="w-5 h-5" />
                <span>Preferencias</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'profile' && <ProfileSettings onChange={() => setHasChanges(true)} />}
          {activeTab === 'company' && <CompanySettings onChange={() => setHasChanges(true)} />}
          {activeTab === 'notifications' && <NotificationSettings onChange={() => setHasChanges(true)} />}
          {activeTab === 'team' && <TeamSettings />}
        </div>
      </div>
    </div>
  );
}