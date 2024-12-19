export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  position?: string;
  lastContactedAt?: Date;
  tags: string[];
  socialProfiles: {
    linkedin?: string;
    twitter?: string;
  };
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  stage: 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  contactId: string;
  createdAt: Date;
  updatedAt: Date;
  expectedCloseDate?: Date;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string;
  relatedTo?: {
    type: 'contact' | 'deal';
    id: string;
  };
}

export interface EmailIntegration {
  provider: 'gmail' | 'outlook';
  connected: boolean;
  lastSynced?: Date;
  email: string;
}