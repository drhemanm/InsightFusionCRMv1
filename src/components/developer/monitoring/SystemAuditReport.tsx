import React from 'react';
import { Shield, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { SystemAudit } from '../../../utils/monitoring/SystemAudit';

export const SystemAuditReport: React.FC = () => {
  const [report, setReport] = React.useState<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const performAudit = async () => {
      try {
        const auditReport = await SystemAudit.performAudit();
        setReport(auditReport);
      } catch (error) {
        console.error('Audit failed:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performAudit();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!report) return null;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'degraded':
        return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'critical':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">System Audit Report</h2>
          <p className="text-sm text-gray-500">
            Generated at {report.timestamp.toLocaleString()}
          </p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
          report.status === 'healthy' ? 'bg-green-100 text-green-800' :
          report.status === 'degraded' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          <Shield size={16} />
          {report.status.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {report.components.map((component: any) => (
          <div key={component.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">{component.name}</h3>
              {getStatusIcon(component.status)}
            </div>
            <div className="space-y-2">
              {Object.entries(component.metrics).map(([key, value]) => (
                <div key={key} className="flex justify-between text-sm">
                  <span className="text-gray-600">{key}:</span>
                  <span className="font-medium">{value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {report.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-lg p-6">
          <h3 className="font-medium text-blue-900 mb-4">Recommendations</h3>
          <ul className="space-y-2">
            {report.recommendations.map((rec: string, index: number) => (
              <li key={index} className="flex items-center gap-2 text-blue-800">
                <AlertTriangle size={16} />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};