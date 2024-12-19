export interface ChecklistItem {
  id: string;
  phase: string;
  task: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  dependencies?: string[];
  assignee?: string;
  notes?: string;
}

export class ImplementationChecklist {
  static getFullChecklist(): ChecklistItem[] {
    return [
      // Initial System Setup
      {
        id: 'admin_setup',
        phase: 'initial_setup',
        task: 'Create admin account and configure permissions',
        status: 'pending',
      },
      {
        id: 'org_settings',
        phase: 'initial_setup',
        task: 'Configure organization-wide settings',
        status: 'pending',
        dependencies: ['admin_setup'],
      },
      {
        id: 'data_import',
        phase: 'initial_setup',
        task: 'Import existing customer data',
        status: 'pending',
        dependencies: ['org_settings'],
      },

      // Data Architecture
      {
        id: 'contact_structure',
        phase: 'data_architecture',
        task: 'Configure contact and company record structures',
        status: 'pending',
      },
      {
        id: 'lead_scoring',
        phase: 'data_architecture',
        task: 'Implement lead scoring system',
        status: 'pending',
        dependencies: ['contact_structure'],
      },
      {
        id: 'custom_fields',
        phase: 'data_architecture',
        task: 'Create custom fields for industry requirements',
        status: 'pending',
        dependencies: ['contact_structure'],
      },

      // Sales Process
      {
        id: 'pipeline_setup',
        phase: 'sales_process',
        task: 'Design sales pipeline stages',
        status: 'pending',
      },
      {
        id: 'lead_routing',
        phase: 'sales_process',
        task: 'Configure lead routing rules',
        status: 'pending',
        dependencies: ['pipeline_setup'],
      },
      {
        id: 'email_templates',
        phase: 'sales_process',
        task: 'Create email templates for pipeline stages',
        status: 'pending',
        dependencies: ['pipeline_setup'],
      },

      // Automation Setup
      {
        id: 'workflow_triggers',
        phase: 'automation',
        task: 'Configure workflow triggers',
        status: 'pending',
      },
      {
        id: 'task_automation',
        phase: 'automation',
        task: 'Set up automated task creation',
        status: 'pending',
        dependencies: ['workflow_triggers'],
      },
      {
        id: 'email_automation',
        phase: 'automation',
        task: 'Implement email automation sequences',
        status: 'pending',
        dependencies: ['email_templates', 'workflow_triggers'],
      },

      // Reporting & Analytics
      {
        id: 'dashboards',
        phase: 'reporting',
        task: 'Build custom dashboards',
        status: 'pending',
      },
      {
        id: 'kpi_setup',
        phase: 'reporting',
        task: 'Set up KPI tracking',
        status: 'pending',
        dependencies: ['dashboards'],
      },
      {
        id: 'automated_reports',
        phase: 'reporting',
        task: 'Create automated reports',
        status: 'pending',
        dependencies: ['kpi_setup'],
      },
    ];
  }

  static validatePhaseCompletion(phase: string, checklist: ChecklistItem[]): boolean {
    const phaseItems = checklist.filter(item => item.phase === phase);
    return phaseItems.every(item => item.status === 'completed');
  }

  static getNextTasks(checklist: ChecklistItem[]): ChecklistItem[] {
    return checklist.filter(item => {
      if (item.status !== 'pending') return false;
      if (!item.dependencies) return true;
      return item.dependencies.every(depId => {
        const dep = checklist.find(i => i.id === depId);
        return dep?.status === 'completed';
      });
    });
  }

  static updateTaskStatus(
    checklist: ChecklistItem[],
    taskId: string,
    status: ChecklistItem['status'],
    notes?: string
  ): ChecklistItem[] {
    return checklist.map(item => {
      if (item.id === taskId) {
        return { ...item, status, notes: notes || item.notes };
      }
      return item;
    });
  }
}