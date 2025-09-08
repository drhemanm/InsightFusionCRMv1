// src/services/api/taskService.ts - Supabase Version
import { supabase } from '../../lib/supabase';
import type { Task } from '../../types/crm';

export const taskService = {
  async getAll(): Promise<Task[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get user's organization to filter tasks
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (!profile) throw new Error('Profile not found');

      // Fetch tasks for user's organization
      const { data, error } = await supabase
        .from('tasks')
        .select(`
          id,
          title,
          description,
          type,
          priority,
          status,
          due_date,
          completed_at,
          reminder_at,
          tags,
          notes,
          custom_fields,
          contact_id,
          deal_id,
          assigned_to,
          created_by,
          created_at,
          updated_at
        `)
        .eq('organization_id', profile.organization_id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Transform to match your frontend Task interface
      return data.map(task => ({
        id: task.id,
        title: task.title,
        description: task.description || '',
        type: task.type,
        priority: task.priority,
        status: task.status,
        dueDate: task.due_date || '',
        completedAt: task.completed_at || '',
        reminderAt: task.reminder_at || '',
        tags: task.tags || [],
        notes: task.notes || '',
        customFields: task.custom_fields || {},
        contactId: task.contact_id || '',
        dealId: task.deal_id || '',
        assignedTo: task.assigned_to || '',
        createdBy: task.created_by || '',
        createdAt: task.created_at,
        updatedAt: task.updated_at
      }));
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  async getById(id: string): Promise<Task> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('tasks')
        .select(`
          id,
          title,
          description,
          type,
          priority,
          status,
          due_date,
          completed_at,
          reminder_at,
          tags,
          notes,
          custom_fields,
          contact_id,
          deal_id,
          assigned_to,
          created_by,
          created_at,
          updated_at
        `)
        .eq('id', id)
        .single();

      if (error) throw error;
      if (!data) throw new Error('Task not found');

      // Transform to match your frontend Task interface
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        type: data.type,
        priority: data.priority,
        status: data.status,
        dueDate: data.due_date || '',
        completedAt: data.completed_at || '',
        reminderAt: data.reminder_at || '',
        tags: data.tags || [],
        notes: data.notes || '',
        customFields: data.custom_fields || {},
        contactId: data.contact_id || '',
        dealId: data.deal_id || '',
        assignedTo: data.assigned_to || '',
        createdBy: data.created_by || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error fetching task:', error);
      throw error;
    }
  },

  async create(taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Promise<Task> {
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

      // Insert new task
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          organization_id: profile.organization_id,
          created_by: user.id,
          title: taskData.title,
          description: taskData.description,
          type: taskData.type || 'task',
          priority: taskData.priority || 'medium',
          status: taskData.status || 'pending',
          due_date: taskData.dueDate || null,
          completed_at: taskData.completedAt || null,
          reminder_at: taskData.reminderAt || null,
          tags: taskData.tags || [],
          notes: taskData.notes,
          custom_fields: taskData.customFields || {},
          contact_id: taskData.contactId || null,
          deal_id: taskData.dealId || null,
          assigned_to: taskData.assignedTo
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
          task_id: data.id,
          contact_id: taskData.contactId || null,
          deal_id: taskData.dealId || null,
          type: 'task_created',
          title: 'Task Created',
          description: `Created task "${taskData.title}"`,
          metadata: { 
            task_id: data.id, 
            priority: taskData.priority,
            due_date: taskData.dueDate 
          }
        });

      // Transform and return
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        type: data.type,
        priority: data.priority,
        status: data.status,
        dueDate: data.due_date || '',
        completedAt: data.completed_at || '',
        reminderAt: data.reminder_at || '',
        tags: data.tags || [],
        notes: data.notes || '',
        customFields: data.custom_fields || {},
        contactId: data.contact_id || '',
        dealId: data.deal_id || '',
        assignedTo: data.assigned_to || '',
        createdBy: data.created_by || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  async update(id: string, updates: Partial<Task>): Promise<Task> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Transform frontend field names to database field names
      const dbUpdates: Record<string, any> = {};
      
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.type !== undefined) dbUpdates.type = updates.type;
      if (updates.priority !== undefined) dbUpdates.priority = updates.priority;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.dueDate !== undefined) dbUpdates.due_date = updates.dueDate || null;
      if (updates.completedAt !== undefined) dbUpdates.completed_at = updates.completedAt || null;
      if (updates.reminderAt !== undefined) dbUpdates.reminder_at = updates.reminderAt || null;
      if (updates.tags !== undefined) dbUpdates.tags = updates.tags;
      if (updates.notes !== undefined) dbUpdates.notes = updates.notes;
      if (updates.customFields !== undefined) dbUpdates.custom_fields = updates.customFields;
      if (updates.contactId !== undefined) dbUpdates.contact_id = updates.contactId || null;
      if (updates.dealId !== undefined) dbUpdates.deal_id = updates.dealId || null;
      if (updates.assignedTo !== undefined) dbUpdates.assigned_to = updates.assignedTo;

      // Get original task for activity logging
      const { data: originalTask } = await supabase
        .from('tasks')
        .select('status, title')
        .eq('id', id)
        .single();

      // If marking as completed, set completed_at timestamp
      if (updates.status === 'completed' && originalTask?.status !== 'completed') {
        dbUpdates.completed_at = new Date().toISOString();
      }

      const { data, error } = await supabase
        .from('tasks')
        .update(dbUpdates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('Task not found');

      // Log activity
      const { data: profile } = await supabase
        .from('profiles')
        .select('organization_id')
        .eq('id', user.id)
        .single();

      if (profile) {
        // Check if task was completed for special logging
        if (updates.status === 'completed' && originalTask && originalTask.status !== 'completed') {
          await supabase
            .from('activities')
            .insert({
              organization_id: profile.organization_id,
              user_id: user.id,
              task_id: id,
              contact_id: data.contact_id,
              deal_id: data.deal_id,
              type: 'task_completed',
              title: 'Task Completed',
              description: `Completed task "${data.title}"`,
              metadata: { 
                task_id: id,
                completion_time: data.completed_at
              }
            });
        } else {
          await supabase
            .from('activities')
            .insert({
              organization_id: profile.organization_id,
              user_id: user.id,
              task_id: id,
              contact_id: data.contact_id,
              deal_id: data.deal_id,
              type: 'task_updated',
              title: 'Task Updated',
              description: `Updated task "${data.title}"`,
              metadata: { task_id: id, updates: Object.keys(dbUpdates) }
            });
        }
      }

      // Transform and return
      return {
        id: data.id,
        title: data.title,
        description: data.description || '',
        type: data.type,
        priority: data.priority,
        status: data.status,
        dueDate: data.due_date || '',
        completedAt: data.completed_at || '',
        reminderAt: data.reminder_at || '',
        tags: data.tags || [],
        notes: data.notes || '',
        customFields: data.custom_fields || {},
        contactId: data.contact_id || '',
        dealId: data.deal_id || '',
        assignedTo: data.assigned_to || '',
        createdBy: data.created_by || '',
        createdAt: data.created_at,
        updatedAt: data.updated_at
      };
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  async delete(id: string): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Get task info for activity logging
      const { data: task } = await supabase
        .from('tasks')
        .select('title, organization_id, contact_id, deal_id')
        .eq('id', id)
        .single();

      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Log activity
      if (task) {
        await supabase
          .from('activities')
          .insert({
            organization_id: task.organization_id,
            user_id: user.id,
            contact_id: task.contact_id,
            deal_id: task.deal_id,
            type: 'other',
            title: 'Task Deleted',
            description: `Deleted task "${task.title}"`,
            metadata: { task_id: id }
          });
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
};
