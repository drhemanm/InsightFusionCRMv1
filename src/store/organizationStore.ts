import { create } from 'zustand';
import type { Organization, TeamMember, TeamInvitation, ResourceUsage, AuditLogEntry } from '../types/organization';

interface OrganizationStore {
  organization: Organization | null;
  teamMembers: TeamMember[];
  invitations: TeamInvitation[];
  usage: ResourceUsage[];
  auditLogs: AuditLogEntry[];
  isLoading: boolean;
  error: string | null;

  fetchTeamMembers: () => Promise<void>;
  inviteTeamMember: (invitation: Omit<TeamInvitation, 'id' | 'status' | 'invitedAt' | 'expiresAt'>) => Promise<void>;
  updateTeamMember: (userId: string, updates: Partial<TeamMember>) => Promise<void>;
  removeTeamMember: (userId: string) => Promise<void>;
}

export const useOrganizationStore = create<OrganizationStore>((set, get) => ({
  organization: null,
  teamMembers: [],
  invitations: [],
  usage: [],
  auditLogs: [],
  isLoading: false,
  error: null,

  fetchTeamMembers: async () => {
    set({ isLoading: true });
    try {
      // In production, fetch from API
      const mockTeamMembers: TeamMember[] = [
        {
          id: '1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          role: 'admin',
          department: 'Management',
          position: 'CEO',
          status: 'active',
          permissions: ['*'],
          createdAt: new Date()
        }
      ];
      set({ teamMembers: mockTeamMembers, isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch team members', isLoading: false });
    }
  },

  inviteTeamMember: async (invitation) => {
    set({ isLoading: true });
    try {
      const newTeamMember: TeamMember = {
        id: crypto.randomUUID(),
        firstName: invitation.firstName || '',
        lastName: invitation.lastName || '',
        email: invitation.email,
        role: invitation.role,
        department: invitation.department,
        position: invitation.position,
        status: 'active',
        permissions: invitation.role === 'admin' ? ['*'] : ['view'],
        createdAt: new Date()
      };

      set(state => ({
        teamMembers: [...state.teamMembers, newTeamMember],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to invite team member', isLoading: false });
    }
  },

  updateTeamMember: async (userId, updates) => {
    set({ isLoading: true });
    try {
      set(state => ({
        teamMembers: state.teamMembers.map(member =>
          member.id === userId ? { ...member, ...updates } : member
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update team member', isLoading: false });
    }
  },

  removeTeamMember: async (userId) => {
    set({ isLoading: true });
    try {
      set(state => ({
        teamMembers: state.teamMembers.filter(member => member.id !== userId),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to remove team member', isLoading: false });
    }
  }
}));