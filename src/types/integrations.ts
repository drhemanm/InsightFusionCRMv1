export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  attendees: string[];
}

export interface LinkedInProfile {
  id: string;
  firstName: string;
  lastName: string;
  headline?: string;
  company?: string;
  industry?: string;
}

export interface EmailConfig {
  provider: 'gmail' | 'outlook';
  connected: boolean;
  lastSynced?: Date;
  email: string;
}