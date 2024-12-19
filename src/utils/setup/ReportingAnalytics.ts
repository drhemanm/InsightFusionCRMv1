export interface DashboardConfig {
  id: string;
  name: string;
  type: 'sales' | 'performance' | 'forecast';
  widgets: DashboardWidget[];
}

export interface DashboardWidget {
  type: string;
  title: string;
  dataSource: string;
  refresh: number;
  config: Record<string, any>;
}

export class ReportingAnalytics {
  static getDefaultDashboards(): DashboardConfig[] {
    return [
      {
        id: 'sales_overview',
        name: 'Sales Overview',
        type: 'sales',
        widgets: [
          {
            type: 'pipeline_value',
            title: 'Pipeline Value by Stage',
            dataSource: 'deals',
            refresh: 300,
            config: {
              groupBy: 'stage',
              measure: 'value',
            }
          },
          {
            type: 'conversion_rates',
            title: 'Stage Conversion Rates',
            dataSource: 'pipeline_metrics',
            refresh: 3600,
            config: {
              timeframe: 'last_90_days',
            }
          }
        ]
      },
      {
        id: 'performance_metrics',
        name: 'Team Performance',
        type: 'performance',
        widgets: [
          {
            type: 'activity_metrics',
            title: 'Activity by Type',
            dataSource: 'activities',
            refresh: 900,
            config: {
              groupBy: 'type',
              timeframe: 'this_week',
            }
          },
          {
            type: 'lead_response',
            title: 'Lead Response Time',
            dataSource: 'leads',
            refresh: 300,
            config: {
              measure: 'avg_response_time',
            }
          }
        ]
      }
    ];
  }

  static getDefaultKPIs() {
    return {
      revenue: {
        metric: 'closed_won_value',
        timeframe: 'monthly',
        comparison: 'previous_period',
      },
      pipeline_health: {
        metrics: ['win_rate', 'avg_deal_size', 'sales_cycle'],
        timeframe: 'quarterly',
      },
      activity_metrics: {
        metrics: ['calls', 'emails', 'meetings'],
        timeframe: 'weekly',
      },
    };
  }

  static getGoalTracking() {
    return {
      types: ['revenue', 'deals_closed', 'activities'],
      periods: ['monthly', 'quarterly', 'annual'],
      calculations: {
        attainment: 'actual / target * 100',
        forecast: 'pipeline * win_probability',
      },
    };
  }
}