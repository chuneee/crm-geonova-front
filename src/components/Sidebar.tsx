import { X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { privateRoutes } from "../routes/routes.config";
import { getIconComponent } from "../utils/icon.utils";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  // Filtrar solo las rutas que deben mostrarse en el menú
  const menuItems = privateRoutes.filter((route) => route.showInMenu);

  return (
    <>
      {/* Sidebar - Drawer on mobile, fixed on desktop */}
      <aside
        className={`fixed left-0 top-[72px] bottom-0 w-[280px] lg:w-[240px] bg-[#F8FAFC] border-r border-[#E2E8F0] overflow-y-auto z-40 transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Close button - Mobile only */}
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-[#E2E8F0]">
          <span className="text-sm font-medium text-gray-900">Menú</span>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <nav className="p-3">
          {menuItems.map((route) => {
            const Icon = route.icon ? getIconComponent(route.icon) : null;
            return (
              <NavLink
                key={route.path}
                to={route.path}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-3 py-3 rounded-lg mb-2 transition-all ${
                    isActive
                      ? "bg-white text-[#3B82F6] shadow-sm border border-[#E2E8F0]"
                      : "text-gray-600 hover:bg-white hover:text-gray-900"
                  }`
                }
              >
                {Icon && <Icon className="w-5 h-5 flex-shrink-0" />}
                <span className="flex-1 text-left text-sm">{route.label}</span>
                {route.badge && (
                  <span className="px-2 py-0.5 bg-[#3B82F6] text-white text-xs rounded-full">
                    {route.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
