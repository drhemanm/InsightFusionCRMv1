// src/services/api/dealService.ts - Supabase Version
import { supabase } from '../../lib/supabase';
import type { Deal } from '../../types/crm';

export const dealService = {
  async getAll(): Promise<Deal[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's organization to filter deals
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      // Fetch deals for user's organization
      const { data, error } = await supabase
        .from('deals')
        .select(`
          id,
          title,
          description,
          value,
          currency,
          stage,
          probability,
          expected_close_date,
          actual_close_date,
          lead_source,
          tags,
          notes,
          custom_fields,
          contact_id,
          assigned_to,
          created_by,
          created_at,
          updated_at
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform to match your frontend Deal interface
      return data.map(deal => ({
        id: deal.id,
        title: deal.title,
        description: deal.description || '',
        value: deal.value || 0,
        currency: deal.currency || 'USD',
        stage: deal.stage,
        probability: deal.probability || 10,
        expectedCloseDate: deal.expected_close_date || '',
        actualCloseDate: deal.actual_close_date || '',
        leadSource: deal.lead_source,
        tags: deal.tags || [],
        notes: deal.notes || '',
        customFields: deal.custom_fields || {},
        contactId: deal.contact_id || '',
        assignedTo: deal.assigned_to || '',
        createdBy: deal.created_by || '',
        createdAt: deal.created_at,
        updatedAt: deal.updated_at
      }));
    } catch (error) {
      console.error('Error fetching deals:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Deal> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('deals')
        .select(`
          id,
          title,
          description,
          value,
          currency,
          stage,
          probability,
          expected_close_date,
          actual_close_date,
          lead_source,
          tags,
          notes,
          custom_fields,
          contact_id,
          assigned_to,
          created_by,
          created_at,
          updated_at
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Deal not found');

      // Transform to match your frontend Deal interface
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        value: data.value || 0,
        currency: data.currency || 'USD',
        stage: data.stage,
        probability: data.probability || 10,
        expectedCloseDate: data.expected_close_date || '',
        actualCloseDate: data.actual_close_date || '',
        leadSource: data.lead_source,
        tags: data.tags || [],
        notes: data.notes || '',
        customFields: data.custom_fields || {},
        contactId: data.contact_id || '',
        assignedTo: data.assigned_to || '',
        createdBy: data.created_by || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error fetching deal:', error);
      throw error;
    }
  },

  async create(dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
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

      // Insert new deal
      const { data, error } = await supabase
        .from('deals')
        .insert({
          organization_id: profile.organization_id,
          created_by: user.id,
          title: dealData.title,
          description: dealData.description,
          value: dealData.value,
          currency: dealData.currency || 'USD',
          stage: dealData.stage || 'prospecting',
          probability: dealData.probability || 10,
          expected_close_date: dealData.expectedCloseDate || null,
          actual_close_date: dealData.actualCloseDate || null,
          lead_source: dealData.leadSource,
          tags: dealData.tags || [],
          notes: dealData.notes,
          custom_fields: dealData.customFields || {},
          contact_id: dealData.contactId || null,
          assigned_to: dealData.assignedTo
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
          deal_id: data.id,
          contact_id: dealData.contactId || null,
          type: 'deal_created',
          title: 'Deal Created',
          description: `Created deal "${dealData.title}"`,
          metadata: { deal_id: data.id, value: dealData.value }
        });

      // Transform and return
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        value: data.value || 0,
        currency: data.currency || 'USD',
        stage: data.stage,
        probability: data.probability || 10,
        expectedCloseDate: data.expected_close_date || '',
        actualCloseDate: data.actual_close_date || '',
        leadSource: data.lead_source,
        tags: data.tags || [],
        notes: data.notes || '',
        customFields: data.custom_fields || {},
        contactId: data.contact_id || '',
        assignedTo: data.assigned_to || '',
        createdBy: data.created_by || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Deal>): Promise<Deal> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Transform frontend field names to database field names
      const dbUpdates: Record<string, any> = {};
      
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.value !== undefined) dbUpdates.value = updates.value;
      if (updates.currency !== undefined) dbUpdates.currency = updates.currency;
      if (updates.stage !== undefined) dbUpdates.stage = updates.stage;
      if (updates.probability !== undefined) dbUpdates.probability = updates.probability;
      if (updates.expectedCloseDate !== undefined) dbUpdates.expected_close_date = updates.expectedCloseDate || null;
      if (updates.actualCloseDate !== undefined) dbUpdates.actual_close_date = updates.actualCloseDate || null;
      if (updates.leadSource !== undefined) dbUpdates.lead_source = updates.leadSource;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      if (updates.customFields !== undefined) dbUpdates.custom_fields = updates.customFields;
      if (updates.contactId !== undefined) dbUpdates.contact_id = updates.contactId || null;
      if (updates.assignedTo !== undefined) dbUpdates.assigned_to = updates.assignedTo;

      // Get original deal for activity logging
      const { data: originalDeal } = await supabase
        .from('deals')
        .select('stage, title')
        .eq('id', id)
        .single();

      const { data, error } = await supabase
        .from('deals')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Deal not found');

      // Log activity
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (profile) {
        // Check if stage changed for special logging
        if (updates.stage && originalDeal && updates.stage !== originalDeal.stage) {
          await supabase
            .from('activities')
            .insert({
              organization_id: profile.organization_id,
              user_id: user.id,
              deal_id: id,
              contact_id: data.contact_id,
              type: 'deal_stage_changed',
              title: 'Deal Stage Changed',
              description: `Changed deal "${data.title}" from ${originalDeal.stage} to ${updates.stage}`,
              metadata: { 
                deal_id: id, 
                old_stage: originalDeal.stage, 
                new_stage: updates.stage 
              }
            });
        } else {
          await supabase
            .from('activities')
            .insert({
              organization_id: profile.organization_id,
              user_id: user.id,
              deal_id: id,
              contact_id: data.contact_id,
              type: 'deal_updated',
              title: 'Deal Updated',
              description: `Updated deal "${data.title}"`,
              metadata: { deal_id: id, updates: Object.keys(dbUpdates) }
            });
        }
      }

      // Transform and return
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        value: data.value || 0,
        currency: data.currency || 'USD',
        stage: data.stage,
        probability: data.probability || 10,
        expectedCloseDate: data.expected_close_date || '',
        actualCloseDate: data.actual_close_date || '',
        leadSource: data.lead_source,
        tags: data.tags || [],
        notes: data.notes || '',
        customFields: data.custom_fields || {},
        contactId: data.contact_id || '',
        assignedTo: data.assigned_to || '',
        createdBy: data.created_by || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get deal info for activity logging
      const { data: deal } = await supabase
        .from('deals')
        .select('title, organization_id, contact_id')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('deals')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log activity
      if (deal) {
        await supabase
          .from('activities')
          .insert({
            organization_id: deal.organization_id,
            user_id: user.id,
            contact_id: deal.contact_id,
            type: 'deal_closed',
            title: 'Deal Deleted',
            description: `Deleted deal "${deal.title}"`,
            metadata: { deal_id: id }
          });
      }
    } catch (error) {
      console.error('Error deleting deal:', error);
      throw error;
    }
  }
};
