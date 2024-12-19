import { create } from 'zustand';
import type { Contact } from '../types';

interface ContactStore {
  contacts: Contact[];
  selectedContact: Contact | null;
  isLoading: boolean;
  error: string | null;
  fetchContacts: () => Promise<void>;
  addContact: (contact: Omit<Contact, 'id' | 'socialProfiles' | 'tags'> & { tags?: string[] }) => Promise<void>;
  updateContact: (id: string, updates: Partial<Contact>) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
  setSelectedContact: (contact: Contact | null) => void;
}

export const useContactStore = create<ContactStore>((set, get) => ({
  contacts: [],
  selectedContact: null,
  isLoading: false,
  error: null,

  fetchContacts: async () => {
    set({ isLoading: true });
    try {
      // In production, fetch from API
      set({ contacts: [], isLoading: false });
    } catch (error) {
      set({ error: 'Failed to fetch contacts', isLoading: false });
    }
  },

  addContact: async (contactData) => {
    set({ isLoading: true });
    try {
      // In production, make API call
      const newContact: Contact = {
        id: crypto.randomUUID(),
        ...contactData,
        tags: contactData.tags || [],
        socialProfiles: {},
        lastContactedAt: new Date()
      };

      set(state => ({
        contacts: [...state.contacts, newContact],
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to add contact', isLoading: false });
    }
  },

  updateContact: async (id, updates) => {
    set({ isLoading: true });
    try {
      set(state => ({
        contacts: state.contacts.map(contact =>
          contact.id === id ? { ...contact, ...updates } : contact
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to update contact', isLoading: false });
    }
  },

  deleteContact: async (id) => {
    set({ isLoading: true });
    try {
      set(state => ({
        contacts: state.contacts.filter(contact => contact.id !== id),
        isLoading: false
      }));
    } catch (error) {
      set({ error: 'Failed to delete contact', isLoading: false });
    }
  },

  setSelectedContact: (contact) => set({ selectedContact: contact }),
}));