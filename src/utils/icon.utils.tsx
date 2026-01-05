import {
  LayoutDashboard,
  Users,
  GitBranch,
  Package,
  Calendar,
  FileText,
  ClipboardList,
  MessageSquare,
  BarChart,
  Settings,
  LucideIcon,
} from "lucide-react";

// Mapeo de nombres de iconos a componentes
const iconMap: Record<string, LucideIcon> = {
  LayoutDashboard,
  Users,
  GitBranch,
  Package,
  Calendar,
  FileText,
  ClipboardList,
  MessageSquare,
  BarChart,
  Settings,
};

// Función para obtener el componente de icono por nombre
export const getIconComponent = (iconName: string): LucideIcon => {
  return iconMap[iconName] || LayoutDashboard; // Fallback al dashboard icon
};
