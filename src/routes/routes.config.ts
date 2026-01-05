// src/routes/routes.config.ts
import { JSX, lazy } from "react";
import { lazyLoad } from "../utils/lazyLoad";

// Lazy loading de componentes
const Dashboard = lazy(() =>
  import("../pages/Dashboard").then((m) => ({ default: m.Dashboard }))
);
const Leads = lazy(() =>
  import("../pages/Leads").then((m) => ({ default: m.Leads }))
);
const Pipeline = lazy(() =>
  import("../pages/Pipeline").then((m) => ({ default: m.Pipeline }))
);
const OpportunityDetail = lazy(() =>
  import("../pages/OpportunityDetail").then((m) => ({
    default: m.OpportunityDetail,
  }))
);
const QuoteBuilder = lazy(() =>
  import("../pages/QuoteBuilder").then((m) => ({ default: m.QuoteBuilder }))
);
const ProductCatalog = lazy(() =>
  import("../pages/ProductCatalog").then((m) => ({ default: m.ProductCatalog }))
);
const Customers = lazy(() =>
  import("../pages/Customers").then((m) => ({ default: m.Customers }))
);
const CustomerProfile = lazy(() =>
  import("../pages/CustomerProfile").then((m) => ({
    default: m.CustomerProfile,
  }))
);
const NewClient = lazy(() =>
  import("../pages/NewClient").then((m) => ({ default: m.NewClient }))
);
const ServiceOrders = lazy(() =>
  import("../pages/ServiceOrders").then((m) => ({ default: m.ServiceOrders }))
);
const NewServiceOrder = lazy(() =>
  import("../pages/NewServiceOrder").then((m) => ({
    default: m.NewServiceOrder,
  }))
);
const Activities = lazy(() =>
  import("../pages/Activities").then((m) => ({ default: m.Activities }))
);
const Quotes = lazy(() =>
  import("../pages/Quotes").then((m) => ({ default: m.Quotes }))
);
const Tickets = lazy(() =>
  import("../pages/Tickets").then((m) => ({ default: m.Tickets }))
);
const NewTicket = lazy(() =>
  import("../pages/NewTicket").then((m) => ({ default: m.NewTicket }))
);
const Reports = lazy(() =>
  import("../pages/Reports").then((m) => ({ default: m.Reports }))
);
const Settings = lazy(() =>
  import("../pages/Settings").then((m) => ({ default: m.Settings }))
);

export interface RouteConfig {
  path: string;
  element: React.LazyExoticComponent<() => JSX.Element> | (() => JSX.Element);
  permission?: string;
  children?: RouteConfig[];
  label?: string;
  showInMenu?: boolean;
  icon?: string;
  badge?: number | string | null;
}

export const privateRoutes: RouteConfig[] = [
  {
    path: "/dashboard",
    element: lazyLoad(() => import("../pages/Dashboard"), "Dashboard"),
    label: "Dashboard",
    showInMenu: true,
    icon: "LayoutDashboard",
  },
  {
    path: "/leads",
    element: lazyLoad(() => import("../pages/Leads"), "Leads"),
    permission: "leads.read",
    label: "Leads",
    showInMenu: true,
    icon: "Users",
    badge: 24,
  },
  {
    path: "/pipeline",
    element: lazyLoad(() => import("../pages/Pipeline"), "Pipeline"),
    permission: "pipeline.read",
    label: "Pipeline",
    showInMenu: true,
    icon: "GitBranch",
  },
  {
    path: "/pipeline/:id",
    element: lazyLoad(
      () => import("../pages/OpportunityDetail"),
      "OpportunityDetail"
    ),
    permission: "pipeline.read",
    showInMenu: false,
  },
  {
    path: "/quote/new",
    element: lazyLoad(() => import("../pages/QuoteBuilder"), "QuoteBuilder"),
    permission: "quotes.create",
    label: "Nueva Cotización",
    showInMenu: false,
  },
  {
    path: "/productos",
    element: lazyLoad(
      () => import("../pages/ProductCatalog"),
      "ProductCatalog"
    ),
    permission: "products.read",
    label: "Productos",
    showInMenu: true,
    icon: "Package",
  },
  {
    path: "/clientes",
    element: lazyLoad(() => import("../pages/Customers"), "Customers"),
    permission: "customers.read",
    label: "Clientes",
    showInMenu: true,
    icon: "Users",
  },
  {
    path: "/clientes/nuevo",
    element: lazyLoad(() => import("../pages/NewClient"), "NewClient"),
    permission: "customers.create",
    showInMenu: false,
  },
  {
    path: "/clientes/:id",
    element: lazyLoad(
      () => import("../pages/CustomerProfile"),
      "CustomerProfile"
    ),
    permission: "customers.read",
    showInMenu: false,
  },
  {
    path: "/ordenes",
    element: lazyLoad(() => import("../pages/ServiceOrders"), "ServiceOrders"),
    permission: "orders.read",
    label: "Órdenes de Servicio",
    showInMenu: true,
    icon: "ClipboardList",
  },
  {
    path: "/ordenes/nuevo",
    element: lazyLoad(
      () => import("../pages/NewServiceOrder"),
      "NewServiceOrder"
    ),
    permission: "orders.create",
    showInMenu: false,
  },
  {
    path: "/actividades",
    element: lazyLoad(() => import("../pages/Activities"), "Activities"),
    permission: "activities.read",
    label: "Actividades",
    showInMenu: true,
    icon: "Calendar",
    badge: 8,
  },
  {
    path: "/cotizaciones",
    element: lazyLoad(() => import("../pages/Quotes"), "Quotes"),
    permission: "quotes.read",
    label: "Cotizaciones",
    showInMenu: true,
    icon: "FileText",
  },
  {
    path: "/tickets",
    element: lazyLoad(() => import("../pages/Tickets"), "Tickets"),
    permission: "tickets.read",
    label: "Tickets",
    showInMenu: true,
    icon: "MessageSquare",
    badge: 3,
  },
  {
    path: "/tickets/nuevo",
    element: lazyLoad(() => import("../pages/NewTicket"), "NewTicket"),
    permission: "tickets.create",
    showInMenu: false,
  },
  {
    path: "/reportes",
    element: lazyLoad(() => import("../pages/Reports"), "Reports"),
    permission: "reports.read",
    label: "Reportes",
    showInMenu: true,
    icon: "BarChart",
  },

  {
    path: "/configuracion",
    element: lazyLoad(() => import("../pages/Settings"), "Settings"),
    permission: "settings.read",
    label: "Configuración",
    showInMenu: true,
    icon: "Settings",
  },
];
