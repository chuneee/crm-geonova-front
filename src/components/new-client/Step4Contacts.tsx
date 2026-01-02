import { Plus, User, Briefcase, Mail, Phone, Star, ChevronDown, ChevronUp, Trash2, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Contact {
  id: string;
  fullName: string;
  position: string;
  department: string;
  primaryEmail: string;
  secondaryEmail: string;
  officePhone: string;
  mobilePhone: string;
  isWhatsApp: boolean;
  birthday: string;
  sendBirthdayGreeting: boolean;
  linkedin: string;
  notes: string;
  notifications: string[];
  isPrimary: boolean;
}

interface Step4ContactsProps {
  contacts: Contact[];
  onChange: (contacts: Contact[]) => void;
}

const departments = [
  'Ventas',
  'Compras',
  'Finanzas',
  'IT',
  'Operaciones',
  'Marketing',
  'Recursos Humanos',
  'Legal',
  'Otro'
];

export function Step4Contacts({ contacts, onChange }: Step4ContactsProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addContact = () => {
    const newContact: Contact = {
      id: Date.now().toString(),
      fullName: '',
      position: '',
      department: '',
      primaryEmail: '',
      secondaryEmail: '',
      officePhone: '',
      mobilePhone: '',
      isWhatsApp: false,
      birthday: '',
      sendBirthdayGreeting: false,
      linkedin: '',
      notes: '',
      notifications: [],
      isPrimary: contacts.length === 0,
    };
    onChange([...contacts, newContact]);
    setExpandedId(newContact.id);
  };

  const updateContact = (id: string, updates: Partial<Contact>) => {
    onChange(contacts.map(c => c.id === id ? { ...c, ...updates } : c));
  };

  const deleteContact = (id: string) => {
    onChange(contacts.filter(c => c.id !== id));
  };

  const setPrimary = (id: string) => {
    onChange(contacts.map(c => ({ ...c, isPrimary: c.id === id })));
  };

  const toggleNotification = (contactId: string, notification: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;
    
    const notifications = contact.notifications.includes(notification)
      ? contact.notifications.filter(n => n !== notification)
      : [...contact.notifications, notification];
    
    updateContact(contactId, { notifications });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-sm text-[#1E293B]">Contactos del Cliente</h3>
          <button
            onClick={addContact}
            className="flex items-center gap-2 px-4 py-2 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar contacto
          </button>
        </div>

        {contacts.length === 0 ? (
          <div className="text-center py-12">
            <User className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" />
            <p className="text-sm text-[#64748B] mb-4">Agrega al menos un contacto</p>
            <button
              onClick={addContact}
              className="px-6 py-3 bg-[#3B82F6] text-white rounded-lg hover:bg-[#2563EB] transition-colors"
            >
              Agregar primer contacto
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {contacts.map((contact) => (
              <div key={contact.id} className="border border-[#E2E8F0] rounded-lg overflow-hidden">
                {/* Card Header */}
                <div className="h-16 px-4 flex items-center justify-between bg-[#F8FAFC] hover:bg-[#F1F5F9] transition-colors">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm">
                      {contact.fullName ? contact.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-[#1E293B]">
                          {contact.fullName || 'Nuevo contacto'}
                        </span>
                        {contact.isPrimary && (
                          <span className="px-2 py-0.5 bg-[#3B82F6] text-white text-xs rounded-full">
                            Principal
                          </span>
                        )}
                      </div>
                      {contact.position && (
                        <span className="text-xs text-[#64748B]">{contact.position}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPrimary(contact.id)}
                      className={`p-1.5 rounded transition-colors ${
                        contact.isPrimary
                          ? 'text-[#F59E0B] bg-[#FEF3C7]'
                          : 'text-[#94A3B8] hover:text-[#F59E0B] hover:bg-[#FEF3C7]'
                      }`}
                      title="Marcar como principal"
                    >
                      <Star className={`w-4 h-4 ${contact.isPrimary ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={() => setExpandedId(expandedId === contact.id ? null : contact.id)}
                      className="p-1.5 text-[#64748B] hover:bg-[#E2E8F0] rounded transition-colors"
                    >
                      {expandedId === contact.id ? (
                        <ChevronUp className="w-4 h-4" />
                      ) : (
                        <ChevronDown className="w-4 h-4" />
                      )}
                    </button>
                    {!contact.isPrimary && (
                      <button
                        onClick={() => deleteContact(contact.id)}
                        className="p-1.5 text-[#EF4444] hover:bg-[#FEF2F2] rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                {expandedId === contact.id && (
                  <div className="p-6 bg-white">
                    <div className="grid grid-cols-2 gap-6">
                      {/* Left Column */}
                      <div className="space-y-5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">
                            Nombre completo <span className="text-[#EF4444]">*</span>
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="text"
                              value={contact.fullName}
                              onChange={(e) => updateContact(contact.id, { fullName: e.target.value })}
                              className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                              placeholder="Juan Pérez García"
                            />
                          </div>
                        </div>

                        {/* Position */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">
                            Cargo <span className="text-[#EF4444]">*</span>
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="text"
                              value={contact.position}
                              onChange={(e) => updateContact(contact.id, { position: e.target.value })}
                              className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                              placeholder="Director de Operaciones"
                            />
                          </div>
                        </div>

                        {/* Department */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">Departamento</label>
                          <select
                            value={contact.department}
                            onChange={(e) => updateContact(contact.id, { department: e.target.value })}
                            className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm appearance-none bg-white"
                          >
                            <option value="">Selecciona departamento</option>
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>{dept}</option>
                            ))}
                          </select>
                        </div>

                        {/* Primary Email */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">
                            Email principal <span className="text-[#EF4444]">*</span>
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="email"
                              value={contact.primaryEmail}
                              onChange={(e) => updateContact(contact.id, { primaryEmail: e.target.value })}
                              className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                              placeholder="juan@empresa.com"
                            />
                          </div>
                        </div>

                        {/* Secondary Email */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">Email secundario</label>
                          <input
                            type="email"
                            value={contact.secondaryEmail}
                            onChange={(e) => updateContact(contact.id, { secondaryEmail: e.target.value })}
                            className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                            placeholder="juan.personal@email.com"
                          />
                        </div>

                        {/* Birthday */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">Fecha de cumpleaños</label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="date"
                              value={contact.birthday}
                              onChange={(e) => updateContact(contact.id, { birthday: e.target.value })}
                              className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                            />
                          </div>
                          <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={contact.sendBirthdayGreeting}
                              onChange={(e) => updateContact(contact.id, { sendBirthdayGreeting: e.target.checked })}
                              className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
                            />
                            <span className="text-xs text-[#64748B]">Enviar felicitación automática</span>
                          </label>
                        </div>
                      </div>

                      {/* Right Column */}
                      <div className="space-y-5">
                        {/* Office Phone */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">
                            Teléfono oficina <span className="text-[#EF4444]">*</span>
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#64748B]" />
                            <input
                              type="tel"
                              value={contact.officePhone}
                              onChange={(e) => updateContact(contact.id, { officePhone: e.target.value })}
                              className="w-full h-12 pl-11 pr-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                              placeholder="+52 (55) 1234-5678"
                            />
                          </div>
                        </div>

                        {/* Mobile Phone */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">Teléfono móvil</label>
                          <input
                            type="tel"
                            value={contact.mobilePhone}
                            onChange={(e) => updateContact(contact.id, { mobilePhone: e.target.value })}
                            className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                            placeholder="+52 (55) 9876-5432"
                          />
                          <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={contact.isWhatsApp}
                              onChange={(e) => updateContact(contact.id, { isWhatsApp: e.target.checked })}
                              className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
                            />
                            <span className="text-xs text-[#64748B]">Es WhatsApp</span>
                          </label>
                        </div>

                        {/* LinkedIn */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">LinkedIn</label>
                          <input
                            type="url"
                            value={contact.linkedin}
                            onChange={(e) => updateContact(contact.id, { linkedin: e.target.value })}
                            className="w-full h-12 px-4 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm"
                            placeholder="linkedin.com/in/usuario"
                          />
                        </div>

                        {/* Notes */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">Notas</label>
                          <textarea
                            value={contact.notes}
                            onChange={(e) => updateContact(contact.id, { notes: e.target.value })}
                            className="w-full h-20 px-4 py-3 border border-[#E2E8F0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B82F6] text-sm resize-none"
                            placeholder="Información adicional del contacto..."
                          />
                        </div>

                        {/* Notifications */}
                        <div>
                          <label className="block text-xs text-[#1E293B] mb-2">Notificaciones</label>
                          <div className="space-y-2">
                            {[
                              'Cotizaciones y propuestas',
                              'Facturas y pagos',
                              'Soporte técnico',
                              'Marketing'
                            ].map((notif) => (
                              <label key={notif} className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={contact.notifications.includes(notif)}
                                  onChange={() => toggleNotification(contact.id, notif)}
                                  className="w-4 h-4 rounded border-[#E2E8F0] accent-[#3B82F6]"
                                />
                                <span className="text-xs text-[#64748B]">{notif}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
