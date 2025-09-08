// src/services/api/contactService.ts - Supabase Version
import { supabase } from '../../lib/supabase';
import type { Contact } from '../../types/crm';

export const contactService = {
  async getAll(): Promise<Contact[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's organization to filter contacts
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      // Fetch contacts for user's organization
      const { data, error } = await supabase
        .from('contacts')
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          mobile,
          company,
          job_title,
          department,
          website,
          linkedin_url,
          twitter_url,
          facebook_url,
          address,
          tags,
          lead_score,
          status,
          lead_source,
          lifecycle_stage,
          notes,
          custom_fields,
          last_contacted_at,
          next_follow_up_at,
          created_at,
          updated_at,
          assigned_to,
          created_by
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform to match your frontend Contact interface
      return data.map(contact => ({
        id: contact.id,
        firstName: contact.first_name,
        lastName: contact.last_name,
        email: contact.email,
        phone: contact.phone,
        mobile: contact.mobile,
        company: contact.company,
        jobTitle: contact.job_title,
        department: contact.department,
        website: contact.website,
        linkedinUrl: contact.linkedin_url,
        twitterUrl: contact.twitter_url,
        facebookUrl: contact.facebook_url,
        address: contact.address,
        tags: contact.tags || [],
        leadScore: contact.lead_score || 0,
        status: contact.status,
        leadSource: contact.lead_source,
        lifecycleStage: contact.lifecycle_stage,
        notes: contact.notes,
        customFields: contact.custom_fields || {},
        lastContactedAt: contact.last_contacted_at,
        nextFollowUpAt: contact.next_follow_up_at,
        assignedTo: contact.assigned_to,
        createdBy: contact.created_by,
        createdAt: contact.created_at,
        updatedAt: contact.updated_at
      }));
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Contact> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('contacts')
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          mobile,
          company,
          job_title,
          department,
          website,
          linkedin_url,
          twitter_url,
          facebook_url,
          address,
          tags,
          lead_score,
          status,
          lead_source,
          lifecycle_stage,
          notes,
          custom_fields,
          last_contacted_at,
          next_follow_up_at,
          created_at,
          updated_at,
          assigned_to,
          created_by
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Contact not found');

      // Transform to match your frontend Contact interface
      return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        company: data.company,
        jobTitle: data.job_title,
        department: data.department,
        website: data.website,
        linkedinUrl: data.linkedin_url,
        twitterUrl: data.twitter_url,
        facebookUrl: data.facebook_url,
        address: data.address,
        tags: data.tags || [],
        leadScore: data.lead_score || 0,
        status: data.status,
        leadSource: data.lead_source,
        lifecycleStage: data.lifecycle_stage,
        notes: data.notes,
        customFields: data.custom_fields || {},
        lastContactedAt: data.last_contacted_at,
        nextFollowUpAt: data.next_follow_up_at,
        assignedTo: data.assigned_to,
        createdBy: data.created_by,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw error;
    }
  },

  async create(contactData: Omit<Contact, 'id' | 'createdAt' | 'updatedAt'>): Promise<Contact> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's organization
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      // Insert new contact
      const { data, error } = await supabase
        .from('contacts')
        .insert({
          organization_id: profile.organization_id,
          created_by: user.id,
          first_name: contactData.firstName,
          last_name: contactData.lastName,
          email: contactData.email,
          phone: contactData.phone,
          mobile: contactData.mobile,
          company: contactData.company,
          job_title: contactData.jobTitle,
          department: contactData.department,
          website: contactData.website,
          linkedin_url: contactData.linkedinUrl,
          twitter_url: contactData.twitterUrl,
          facebook_url: contactData.facebookUrl,
          address: contactData.address,
          tags: contactData.tags || [],
          lead_score: contactData.leadScore || 0,
          status: contactData.status || 'active',
          lead_source: contactData.leadSource,
          lifecycle_stage: contactData.lifecycleStage || 'lead',
          notes: contactData.notes,
          custom_fields: contactData.customFields || {},
          assigned_to: contactData.assignedTo,
          next_follow_up_at: contactData.nextFollowUpAt
        })
        .select()
        .single();

      if (error) throw error;

      // Log activity
      await supabase
        .from('activities')
        .insert({
          organization_id: profile.organization_id,
          user_id: user.id,
          contact_id: data.id,
          type: 'contact_created',
          title: 'Contact Created',
          description: `Created contact ${contactData.firstName} ${contactData.lastName}`,
          metadata: { contact_id: data.id }
        });

      // Transform and return
      return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        company: data.company,
        jobTitle: data.job_title,
        department: data.department,
        website: data.website,
        linkedinUrl: data.linkedin_url,
        twitterUrl: data.twitter_url,
        facebookUrl: data.facebook_url,
        address: data.address,
        tags: data.tags || [],
        leadScore: data.lead_score || 0,
        status: data.status,
        leadSource: data.lead_source,
        lifecycleStage: data.lifecycle_stage,
        notes: data.notes,
        customFields: data.custom_fields || {},
        lastContactedAt: data.last_contacted_at,
        nextFollowUpAt: data.next_follow_up_at,
        assignedTo: data.assigned_to,
        createdBy: data.created_by,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error creating contact:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Contact>): Promise<Contact> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Transform frontend field names to database field names
      const dbUpdates: Record<string, any> = {};
      
      if (updates.firstName !== undefined) dbUpdates.first_name = updates.firstName;
      if (updates.lastName !== undefined) dbUpdates.last_name = updates.lastName;
      if (updates.email !== undefined) dbUpdates.email = updates.email;
      if (updates.phone !== undefined) dbUpdates.phone = updates.phone;
      if (updates.mobile !== undefined) dbUpdates.mobile = updates.mobile;
      if (updates.company !== undefined) dbUpdates.company = updates.company;
      if (updates.jobTitle !== undefined) dbUpdates.job_title = updates.jobTitle;
      if (updates.department !== undefined) dbUpdates.department = updates.department;
      if (updates.website !== undefined) dbUpdates.website = updates.website;
      if (updates.linkedinUrl !== undefined) dbUpdates.linkedin_url = updates.linkedinUrl;
      if (updates.twitterUrl !== undefined) dbUpdates.twitter_url = updates.twitterUrl;
      if (updates.facebookUrl !== undefined) dbUpdates.facebook_url = updates.facebookUrl;
      if (updates.address !== undefined) dbUpdates.address = updates.address;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
      if (updates.leadScore !== undefined) dbUpdates.lead_score = updates.leadScore;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.leadSource !== undefined) dbUpdates.lead_source = updates.leadSource;
      if (updates.lifecycleStage !== undefined) dbUpdates.lifecycle_stage = updates.lifecycleStage;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      if (updates.customFields !== undefined) dbUpdates.custom_fields = updates.customFields;
      if (updates.assignedTo !== undefined) dbUpdates.assigned_to = updates.assignedTo;
      if (updates.nextFollowUpAt !== undefined) dbUpdates.next_follow_up_at = updates.nextFollowUpAt;
      if (updates.lastContactedAt !== undefined) dbUpdates.last_contacted_at = updates.lastContactedAt;

      const { data, error } = await supabase
        .from('contacts')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Contact not found');

      // Log activity
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (profile) {
        await supabase
          .from('activities')
          .insert({
            organization_id: profile.organization_id,
            user_id: user.id,
            contact_id: id,
            type: 'contact_updated',
            title: 'Contact Updated',
            description: `Updated contact ${data.first_name} ${data.last_name}`,
            metadata: { contact_id: id, updates: Object.keys(dbUpdates) }
          });
      }

      // Transform and return
      return {
        id: data.id,
        firstName: data.first_name,
        lastName: data.last_name,
        email: data.email,
        phone: data.phone,
        mobile: data.mobile,
        company: data.company,
        jobTitle: data.job_title,
        department: data.department,
        website: data.website,
        linkedinUrl: data.linkedin_url,
        twitterUrl: data.twitter_url,
        facebookUrl: data.facebook_url,
        address: data.address,
        tags: data.tags || [],
        leadScore: data.lead_score || 0,
        status: data.status,
        leadSource: data.lead_source,
        lifecycleStage: data.lifecycle_stage,
        notes: data.notes,
        customFields: data.custom_fields || {},
        lastContactedAt: data.last_contacted_at,
        nextFollowUpAt: data.next_follow_up_at,
        assignedTo: data.assigned_to,
        createdBy: data.created_by,
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error updating contact:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get contact info for activity logging
      const { data: contact } = await supabase
        .from('contacts')
        .select('first_name, last_name, organization_id')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log activity
      if (contact) {
        await supabase
          .from('activities')
          .insert({
            organization_id: contact.organization_id,
            user_id: user.id,
            type: 'contact_deleted',
            title: 'Contact Deleted',
            description: `Deleted contact ${contact.first_name} ${contact.last_name}`,
            metadata: { contact_id: id }
          });
      }
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw error;
    }
  }
};
