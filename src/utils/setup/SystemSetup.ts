import { z } from 'zod';

export const AdminConfigSchema = z.object({
  organizationName: z.string().min(2),
  industry: z.string(),
  timezone: z.string(),
  dateFormat: z.string(),
  currency: z.string(),
  fiscalYearStart: z.string(),
  defaultLanguage: z.string(),
});

export const UserPermissionSchema = z.object({
  role: z.enum(['admin', 'manager', 'user']),
  permissions: z.array(z.string()),
  dataAccess: z.enum(['all', 'team', 'own']),
  moduleAccess: z.record(z.boolean()),
});

export class SystemSetup {
  static async validateConfiguration(config: unknown) {
    return AdminConfigSchema.parse(config);
  }

  static async validateUserPermissions(permissions: unknown) {
    return UserPermissionSchema.parse(permissions);
  }

  static getDefaultWorkflows() {
    return {
      leadAssignment: {
        type: 'round_robin',
        criteria: ['territory', 'product_line'],
      },
      dealApproval: {
        stages: ['manager_review', 'finance_review', 'final_approval'],
        thresholds: { amount: 50000 },
      },
      taskEscalation: {
        conditions: ['overdue', 'high_priority'],
        actions: ['notify_manager', 'escalate_priority'],
      },
    };
  }

  static getDataValidationRules() {
    return {
      email: { pattern: '^[^@]+@[^@]+\\.[^@]+$', required: true },
      phone: { pattern: '^\\+?[1-9]\\d{1,14}$', required: false },
      website: { pattern: '^https?://.+', required: false },
      amount: { min: 0, max: 1000000000, decimals: 2 },
    };
  }
}