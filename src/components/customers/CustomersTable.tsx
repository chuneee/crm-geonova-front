import { CustomerRow } from './CustomerRow';
import type { Customer } from '../../pages/Customers';

interface CustomersTableProps {
  customers: Customer[];
  selectedCustomers: Set<string>;
  onSelectCustomer: (customerId: string) => void;
  onSelectAll: (checked: boolean) => void;
  expandedRow: string | null;
  onToggleExpand: (customerId: string | null) => void;
}

export function CustomersTable({
  customers,
  selectedCustomers,
  onSelectCustomer,
  onSelectAll,
  expandedRow,
  onToggleExpand
}: CustomersTableProps) {
  const allSelected = customers.length > 0 && customers.every(c => selectedCustomers.has(c.id));

  return (
    <div className="min-w-full">
      <table className="w-full">
        <thead className="bg-[#F1F5F9] border-b border-[#E2E8F0] sticky top-0 z-10" style={{ height: '56px' }}>
          <tr>
            <th className="w-10 px-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={(e) => onSelectAll(e.target.checked)}
                className="w-4 h-4 rounded border-[#E2E8F0] cursor-pointer accent-[#3B82F6]"
              />
            </th>
            <th className="px-3 text-left">
              <span className="text-xs uppercase text-[#64748B]">Cliente</span>
            </th>
            <th className="px-3 text-left w-24">
              <span className="text-xs uppercase text-[#64748B]">Tipo</span>
            </th>
            <th className="px-3 text-left w-48">
              <span className="text-xs uppercase text-[#64748B]">Contacto Principal</span>
            </th>
            <th className="px-3 text-left w-36">
              <span className="text-xs uppercase text-[#64748B]">Segmento</span>
            </th>
            <th className="px-3 text-left w-32">
              <span className="text-xs uppercase text-[#64748B]">Valor Total</span>
            </th>
            <th className="px-3 text-left w-36">
              <span className="text-xs uppercase text-[#64748B]">Última Actividad</span>
            </th>
            <th className="px-3 text-left w-32">
              <span className="text-xs uppercase text-[#64748B]">Estado</span>
            </th>
            <th className="px-3 text-left w-24">
              <span className="text-xs uppercase text-[#64748B]">Health Score</span>
            </th>
            <th className="px-3 text-left w-36">
              <span className="text-xs uppercase text-[#64748B]">Asignado a</span>
            </th>
            <th className="px-3 w-20">
              <span className="text-xs uppercase text-[#64748B]">Acciones</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {customers.map((customer) => (
            <CustomerRow
              key={customer.id}
              customer={customer}
              isSelected={selectedCustomers.has(customer.id)}
              isExpanded={expandedRow === customer.id}
              onSelect={() => onSelectCustomer(customer.id)}
              onToggleExpand={() => onToggleExpand(expandedRow === customer.id ? null : customer.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
