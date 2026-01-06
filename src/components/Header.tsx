import {
  Search,
  Bell,
  ChevronDown,
  Menu,
  Plus,
  Command,
  Settings,
  LogOut,
  User,
  HelpCircle,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const quickRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        notifRef.current &&
        !notifRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
      if (
        quickRef.current &&
        !quickRef.current.contains(event.target as Node)
      ) {
        setShowQuickActions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const notifications = [
    {
      id: 1,
      title: "Nuevo lead asignado",
      desc: "Ana García - Proyecto residencial",
      time: "5 min",
      unread: true,
    },
    {
      id: 2,
      title: "Cotización aprobada",
      desc: "Cliente: Solar Tech SA",
      time: "1 hora",
      unread: true,
    },
    {
      id: 3,
      title: "Recordatorio de seguimiento",
      desc: "Lead: Instalación comercial",
      time: "2 horas",
      unread: false,
    },
  ];

  const quickActions = [
    {
      label: "Crear Lead",
      path: "/leads",
      color: "text-[#3B82F6]",
      bg: "bg-[#EFF6FF]",
    },
    {
      label: "Nueva Cotización",
      path: "/quote/new",
      color: "text-[#10B981]",
      bg: "bg-[#D1FAE5]",
    },
    {
      label: "Agregar Cliente",
      path: "/clientes/nuevo",
      color: "text-[#F59E0B]",
      bg: "bg-[#FEF3C7]",
    },
    {
      label: "Orden de Servicio",
      path: "/ordenes/nuevo",
      color: "text-[#8B5CF6]",
      bg: "bg-[#EDE9FE]",
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 h-[72px] bg-white border-b border-[#E2E8F0] z-50">
      <div className="h-full flex items-center justify-between px-4 md:px-8 gap-4">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          {/* Hamburger Menu - Mobile Only */}
          <button
            onClick={onMenuClick}
            className="lg:hidden w-10 h-10 flex items-center justify-center hover:bg-[#F8FAFC] rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-[#64748B]" />
          </button>

          {/* Logo */}
          <NavLink
            to="/dashboard"
            className="flex items-center gap-3 flex-shrink-0"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#3B82F6] to-[#2563EB] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <span className="text-white text-lg">⚡</span>
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[#1E293B] leading-none mt-[0px] mr-[0px] mb-[2px] ml-[0px]">
                CRM Geonova
              </span>
              <span className="text-[10px] text-[#64748B] leading-none">
                Sistema de Gestión
              </span>
            </div>
          </NavLink>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-xl mx-4 hidden md:block">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#94A3B8] group-focus-within:text-[#3B82F6] transition-colors" />
            <input
              type="text"
              placeholder="Buscar leads, clientes, cotizaciones..."
              className="w-full h-11 pl-12 pr-20 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm text-[#1E293B] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#3B82F6]/20 focus:border-[#3B82F6] focus:bg-white transition-all"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2 py-1 bg-white border border-[#E2E8F0] rounded-md">
              <Command className="w-3 h-3 text-[#94A3B8]" />
              <span className="text-[10px] text-[#94A3B8]">K</span>
            </div>
          </div>
        </div>

        {/* Search Icon - Mobile Only */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center hover:bg-[#F8FAFC] rounded-lg transition-colors">
          <Search className="w-5 h-5 text-[#64748B]" />
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          {/* Quick Actions */}
          <div ref={quickRef} className="relative hidden lg:block">
            <button
              onClick={() => setShowQuickActions(!showQuickActions)}
              className="flex items-center gap-2 px-4 h-10 bg-[#3B82F6] hover:bg-[#2563EB] text-white rounded-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30"
            >
              <Plus className="w-4 h-4" />
              <span className="text-sm">Nuevo</span>
            </button>

            {showQuickActions && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                {quickActions.map((action) => (
                  <NavLink
                    key={action.path}
                    to={action.path}
                    onClick={() => setShowQuickActions(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <div
                      className={`w-8 h-8 ${action.bg} ${action.color} rounded-lg flex items-center justify-center`}
                    >
                      <Plus className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-[#1E293B]">
                      {action.label}
                    </span>
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {/* Notifications */}
          <div ref={notifRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative w-10 h-10 flex items-center justify-center hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <Bell className="w-5 h-5 text-[#64748B]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#E2E8F0]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-[#1E293B]">Notificaciones</h3>
                    <span className="px-2 py-0.5 bg-[#3B82F6] text-white text-[10px] rounded-full">
                      {notifications.filter((n) => n.unread).length}
                    </span>
                  </div>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 border-b border-[#E2E8F0] hover:bg-[#F8FAFC] transition-colors cursor-pointer ${
                        notif.unread ? "bg-[#EFF6FF]/50" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <p className="text-sm text-[#1E293B] mb-1">
                            {notif.title}
                          </p>
                          <p className="text-xs text-[#64748B]">{notif.desc}</p>
                        </div>
                        {notif.unread && (
                          <div className="w-2 h-2 bg-[#3B82F6] rounded-full mt-1.5"></div>
                        )}
                      </div>
                      <span className="text-[10px] text-[#94A3B8] mt-2 block">
                        {notif.time}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-3 border-t border-[#E2E8F0]">
                  <button className="w-full text-center text-sm text-[#3B82F6] hover:text-[#2563EB]">
                    Ver todas las notificaciones
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Menu */}
          <div ref={userRef} className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 pl-2 pr-3 h-10 hover:bg-[#F8FAFC] rounded-lg transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-sm">
                  {user?.names.charAt(0)}
                  {user?.surnames.charAt(0)}
                </span>
              </div>
              <ChevronDown className="w-4 h-4 text-[#64748B] hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-[#E2E8F0] py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-[#E2E8F0]">
                  <p className="text-sm text-[#1E293B]">
                    {user?.names} {user?.surnames}
                  </p>
                  <p className="text-xs text-[#64748B]">{user?.email}</p>
                </div>

                <div className="py-2">
                  <NavLink
                    to="/configuracion"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <User className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm text-[#1E293B]">Mi Perfil</span>
                  </NavLink>
                  <NavLink
                    to="/configuracion"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] transition-colors"
                  >
                    <Settings className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm text-[#1E293B]">
                      Configuración
                    </span>
                  </NavLink>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#F8FAFC] transition-colors">
                    <HelpCircle className="w-4 h-4 text-[#64748B]" />
                    <span className="text-sm text-[#1E293B]">
                      Ayuda y soporte
                    </span>
                  </button>
                </div>

                <div className="border-t border-[#E2E8F0] pt-2">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-[#FEF2F2] transition-colors text-[#EF4444]"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm">Cerrar sesión</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
