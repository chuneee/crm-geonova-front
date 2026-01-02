import { Plus, Crown, Edit, Eye } from 'lucide-react';

interface CollaboratorsSectionProps {
  collaborators: any[];
}

const roleIcons: Record<string, any> = {
  Owner: Crown,
  Editor: Edit,
  Viewer: Eye
};

const roleColors: Record<string, string> = {
  Owner: 'text-[#F59E0B] bg-[#FEF3C7]',
  Editor: 'text-[#3B82F6] bg-[#EFF6FF]',
  Viewer: 'text-[#64748B] bg-[#F1F5F9]'
};

export function CollaboratorsSection({ collaborators }: CollaboratorsSectionProps) {
  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[#1E293B]">Colaboradores</h3>
        <button className="p-1.5 text-[#3B82F6] hover:bg-[#EFF6FF] rounded transition-colors">
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      {/* Avatar Stack */}
      <div className="flex items-center mb-4">
        {collaborators.map((collab, idx) => (
          <div 
            key={collab.id}
            className={`w-10 h-10 rounded-full bg-gradient-to-br ${collab.color} flex items-center justify-center text-white text-sm border-2 border-white -ml-${idx > 0 ? '2' : '0'}`}
            style={{ zIndex: collaborators.length - idx, marginLeft: idx > 0 ? '-8px' : '0' }}
          >
            {collab.avatar}
          </div>
        ))}
      </div>

      {/* Collaborators List */}
      <div className="space-y-3">
        {collaborators.map((collab) => {
          const RoleIcon = roleIcons[collab.role];
          
          return (
            <div key={collab.id} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${collab.color} flex items-center justify-center text-white text-xs`}>
                {collab.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[#1E293B] truncate">{collab.name}</div>
              </div>
              <div className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${roleColors[collab.role]}`}>
                <RoleIcon className="w-3 h-3" />
                <span>{collab.role}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="w-full mt-4 px-4 py-2 border border-[#E2E8F0] rounded-lg text-sm text-[#3B82F6] hover:bg-[#EFF6FF] transition-colors flex items-center justify-center gap-2">
        <Plus className="w-4 h-4" />
        Invitar colaborador
      </button>
    </div>
  );
}
