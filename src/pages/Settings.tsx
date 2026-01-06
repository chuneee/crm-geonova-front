import { useEffect, useState } from "react";
import {
  User,
  Building2,
  Bell,
  Users,
  Globe,
  Save,
  Shield,
  AlertTriangle,
} from "lucide-react";
import { ProfileSettings } from "../components/settings/ProfileSettings";
import { CompanySettings } from "../components/settings/CompanySettings";
import { NotificationSettings } from "../components/settings/NotificationSettings";
import { TeamSettings } from "../components/settings/TeamSettings";
import { CompanyAPI } from "../api/endpoints/company.api";
import { Company } from "../api/types/company.type";
import { NotificationPreferences } from "../api/types/notification-preferences.type";
import { UserAPI } from "../api/endpoints/user.api";
import { User as UserType } from "../api/types/user.types";

type SettingsTab = "profile" | "company" | "notifications" | "team";

export function Settings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");
  const [hasChanges, setHasChanges] = useState(false);

  const [company, setCompany] = useState<Company>({} as Company);
  const [companyOriginal, setCompanyOriginal] = useState<Company>(
    {} as Company
  );
  const [notificationPreferences, setNotificationPreferences] =
    useState<NotificationPreferences>({} as NotificationPreferences);

  const [notificationPreferencesOriginal, setNotificationPreferencesOriginal] =
    useState<NotificationPreferences>({} as NotificationPreferences);

  const [errorMessage, setErrorMessage] = useState<string>("");

  const tabs = [
    { id: "profile" as const, label: "Mi Perfil", icon: User },
    { id: "company" as const, label: "Empresa", icon: Building2 },
    { id: "notifications" as const, label: "Notificaciones", icon: Bell },
    { id: "team" as const, label: "Equipo", icon: Users },
  ];

  const handleSave = async () => {
    console.log("Guardando configuración...");

    try {
      let response: Company | null = null;

      if (activeTab === "company" && company !== companyOriginal) {
        const companyCredentials = {
          brand_name: company.brand_name,
          rfc_init: company.rfc_init,
          phone: company.phone,
          website: company.website,
          address: company.address,
          city: company.city,
          state_province: company.state_province,
          zip_code: company.zip_code,

          settings: company?.settings,
        };

        response = await CompanyAPI.update(company.id, companyCredentials);
        setCompany(response);
        setCompanyOriginal(response);
      }

      if (
        activeTab === "notifications" &&
        notificationPreferences !== notificationPreferencesOriginal
      ) {
        const notificationCredentials = {
          email_unread_assigned: notificationPreferences.email_unread_assigned,
          email_opportunity_changes:
            notificationPreferences.email_opportunity_changes,
          email_quotes_approved: notificationPreferences.email_quotes_approved,
          email_support_tickets: notificationPreferences.email_support_tickets,
          push_team_messages: notificationPreferences.push_team_messages,
          push_overdue_tasks: notificationPreferences.push_overdue_tasks,
          push_scheduled_activities:
            notificationPreferences.push_scheduled_activities,
          reminder_meetings_minutes:
            notificationPreferences.reminder_meetings_minutes,
          reminder_tasks_days: notificationPreferences.reminder_tasks_days,
          dnd_enabled: notificationPreferences.dnd_enabled,
          dnd_start_time: notificationPreferences.dnd_start_time,
          dnd_end_time: notificationPreferences.dnd_end_time,
        };

        const notificationResponse = await UserAPI.updateNoticationPreferences(
          notificationCredentials
        );
        setNotificationPreferences(notificationResponse);
        setNotificationPreferencesOriginal(notificationResponse);
      }
    } catch (error: any) {
      console.error("Error saving settings:", error);
      setErrorMessage("Error al actualizar los datos.");
      setCompany(companyOriginal);
      setNotificationPreferences(notificationPreferencesOriginal);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message[0]);
      }
    } finally {
      setHasChanges(false);
    }
  };

  const initialData = async () => {
    try {
      const [companyResponse, notificationResponse] = await Promise.all([
        CompanyAPI.findOne(1),
        UserAPI.findNoticationPreferences(),
      ]);

      setCompany(companyResponse);
      setCompanyOriginal(companyResponse);

      setNotificationPreferences(notificationResponse);
      setNotificationPreferencesOriginal(notificationResponse);
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    initialData();
  }, []);

  const onChange = (updatedData: any) => {
    setErrorMessage("");
    if (activeTab === "company") setCompany({ ...company, ...updatedData });
    if (activeTab === "notifications")
      setNotificationPreferences({
        ...notificationPreferences,
        ...updatedData,
      });
    console.log(notificationPreferences);

    return setHasChanges(true);
  };

  return (
    <div className="min-h-full bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0] px-8 py-4">
        <div className="flex items-center justify-between mb-3">
          <h1 className="text-2xl text-[#1E293B]">Configuración</h1>
          <div>
            {hasChanges && (
              <button
                onClick={handleSave}
                className="mb-2 flex items-center gap-2 bg-[#3B82F6] text-white px-4 h-10 rounded-lg hover:bg-[#2563EB] transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Guardar Cambios</span>
              </button>
            )}
            {errorMessage && (
              <div className="flex items-center bg-[#EF4444] p-2  rounded-md border text-white border-[#B91C1C]">
                <AlertTriangle
                  color="white"
                  size={20}
                  strokeWidth={2}
                  className="inline mr-2"
                />
                <strong className="text-red-500 text-xs">
                  error al actualizar datos
                </strong>
              </div>
            )}
          </div>
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
                  onClick={() => {
                    setActiveTab(tab.id);
                    setHasChanges(false);
                    if (tab.id !== "company") {
                      setCompany(companyOriginal);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all ${
                    activeTab === tab.id
                      ? "bg-[#EFF6FF] text-[#3B82F6] shadow-sm"
                      : "text-[#64748B] hover:bg-[#F8FAFC]"
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
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "company" && (
            <CompanySettings
              id={company?.id || ""}
              company={company}
              onChange={onChange}
            />
          )}
          {activeTab === "notifications" && (
            <NotificationSettings
              id={notificationPreferencesOriginal?.id || ""}
              notificationPreferences={notificationPreferences}
              onChange={onChange}
            />
          )}
          {activeTab === "team" && <TeamSettings />}
        </div>
      </div>
    </div>
  );
}
