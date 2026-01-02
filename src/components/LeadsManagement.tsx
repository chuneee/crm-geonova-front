import { useState, useEffect } from 'react';
import { Plus, ChevronRight } from 'lucide-react';
import { FiltersBar } from './leads/FiltersBar';
import { ActionsBar } from './leads/ActionsBar';
import { LeadsTable } from './leads/LeadsTable';
import { LeadsCards } from './leads/LeadsCards';
import { TableFooter } from './leads/TableFooter';
import { LeadDetailPanel } from './leads/LeadDetailPanel';
import { CreateLeadModal } from './leads/CreateLeadModal';

export function LeadsManagement() {
  const [selectedLeads, setSelectedLeads] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<'table' | 'card'>('table');
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Force card view on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setViewMode('card');
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleViewLead = (lead: any) => {
    setSelectedLead(lead);
    setIsPanelOpen(true);
  };

  const handleCreateLead = (leadData: any) => {
    console.log('Creating new lead:', leadData);
    // Here you would typically send the data to your backend
    // For now, we'll just log it
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header Section */}
      <div className="px-4 md:px-8 py-6 border-b border-[#E2E8F0] bg-white">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-[#1E293B] mb-2" style={{ fontSize: '24px' }}>Gestión de Leads</h1>
            <div className="flex items-center gap-2 text-xs text-[#64748B]">
              <span>Dashboard</span>
              <ChevronRight className="w-3 h-3" />
              <span>Leads</span>
            </div>
          </div>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="h-10 px-6 bg-[#3B82F6] text-white rounded-lg flex items-center justify-center gap-2 hover:bg-[#2563EB] transition-colors w-full md:w-auto"
          >
            <Plus className="w-5 h-5" />
            <span className="text-sm">Nuevo Lead</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
        <FiltersBar />
      </div>

      {/* Actions Bar */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <ActionsBar 
          selectedCount={selectedLeads.length}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
      </div>

      {/* Data Table or Cards */}
      <div className="flex-1 overflow-auto bg-white">
        {viewMode === 'table' ? (
          <LeadsTable 
            selectedLeads={selectedLeads}
            onSelectLeads={setSelectedLeads}
            onViewLead={handleViewLead}
          />
        ) : (
          <LeadsCards 
            selectedLeads={selectedLeads}
            onSelectLeads={setSelectedLeads}
            onViewLead={handleViewLead}
          />
        )}
      </div>

      {/* Footer */}
      <TableFooter />

      {/* Lead Detail Panel */}
      <LeadDetailPanel
        isOpen={isPanelOpen}
        onClose={() => setIsPanelOpen(false)}
        lead={selectedLead}
      />

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateLead}
      />
    </div>
  );
}