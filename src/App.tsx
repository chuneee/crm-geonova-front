import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Leads } from './pages/Leads';
import { Pipeline } from './pages/Pipeline';
import { OpportunityDetail } from './pages/OpportunityDetail';
import { QuoteBuilder } from './pages/QuoteBuilder';
import { ProductCatalog } from './pages/ProductCatalog';
import { Customers } from './pages/Customers';
import { CustomerProfile } from './pages/CustomerProfile';
import { NewClient } from './pages/NewClient';
import { ServiceOrders } from './pages/ServiceOrders';
import { NewServiceOrder } from './pages/NewServiceOrder';
import { Activities } from './pages/Activities';
import { Quotes } from './pages/Quotes';
import { Tickets } from './pages/Tickets';
import { NewTicket } from './pages/NewTicket';
import { Reports } from './pages/Reports';
import { Settings } from './pages/Settings';
import { Login } from './pages/Login';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Protected Routes */}
          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="leads" element={<Leads />} />
            <Route path="pipeline" element={<Pipeline />} />
            <Route path="pipeline/:id" element={<OpportunityDetail />} />
            <Route path="quote/new" element={<QuoteBuilder />} />
            <Route path="productos" element={<ProductCatalog />} />
            <Route path="clientes" element={<Customers />} />
            <Route path="clientes/nuevo" element={<NewClient />} />
            <Route path="clientes/:id" element={<CustomerProfile />} />
            <Route path="instalaciones" element={<div className="p-8">Instalaciones - En construcción</div>} />
            <Route path="reportes" element={<Reports />} />
            <Route path="actividades" element={<Activities />} />
            <Route path="cotizaciones" element={<Quotes />} />
            <Route path="ordenes" element={<ServiceOrders />} />
            <Route path="ordenes/nuevo" element={<NewServiceOrder />} />
            <Route path="tickets" element={<Tickets />} />
            <Route path="tickets/nuevo" element={<NewTicket />} />
            <Route path="configuracion" element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}