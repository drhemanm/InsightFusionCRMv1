import React, { useState, useEffect } from 'react';
import { Mail, Calendar, AlertCircle } from 'lucide-react';
import { IntegrationCard } from './IntegrationCard';
import { gmailService } from '../../services/integrations/GmailIntegration';
import { calendarService } from '../../services/integrations/CalendarIntegration';

export const IntegrationsManager: React.FC = () => {
  const [gmailConnected, setGmailConnected] = useState(false);
  const [calendarConnected, setCalendarConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check initial connection status
    setGmailConnected(gmailService.getConnectionStatus());
    setCalendarConnected(calendarService.getConnectionStatus());
  }, []);

  const handleGmailConnect = async () => {
    try {
      setError(null);
      const success = await gmailService.connect();
      setGmailConnected(success);
      if (success) {
        const config = gmailService.getConfig();
        console.log('Connected Gmail account:', config.email);
      }
    } catch (error) {
      setError('Failed to connect Gmail. Please try again.');
      console.error('Gmail connection failed:', error);
    }
  };

  const handleGmailDisconnect = async () => {
    try {
      setError(null);
      await gmailService.disconnect();
      setGmailConnected(false);
    } catch (error) {
      setError('Failed to disconnect Gmail. Please try again.');
      console.error('Gmail disconnection failed:', error);
    }
  };

  const handleCalendarConnect = async () => {
    try {
      setError(null);
      const success = await calendarService.connect();
      setCalendarConnected(success);
    } catch (error) {
      setError('Failed to connect Calendar. Please try again.');
      console.error('Calendar connection failed:', error);
    }
  };

  const handleCalendarDisconnect = async () => {
    try {
      setError(null);
      await calendarService.disconnect();
      setCalendarConnected(false);
    } catch (error) {
      setError('Failed to disconnect Calendar. Please try again.');
      console.error('Calendar disconnection failed:', error);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 rounded-lg flex items-center gap-3 text-red-700">
          <AlertCircle size={20} />
          <p>{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <IntegrationCard
          title="Gmail"
          description="Sync your emails and send messages directly from the CRM"
          icon={<Mail className="text-blue-500" size={24} />}
          isConnected={gmailConnected}
          onConnect={handleGmailConnect}
          onDisconnect={handleGmailDisconnect}
        />

        <IntegrationCard
          title="Google Calendar"
          description="Schedule meetings and sync your calendar events"
          icon={<Calendar className="text-green-500" size={24} />}
          isConnected={calendarConnected}
          onConnect={handleCalendarConnect}
          onDisconnect={handleCalendarDisconnect}
        />
      </div>

      {/* Integration Status */}
      <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
        <h3 className="font-medium mb-4">Integration Status</h3>
        <div className="space-y-4">
          {gmailConnected && (
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <span className="font-medium">Gmail</span>
                <p className="text-sm text-gray-600">
                  Connected as: {gmailService.getConfig().email}
                </p>
              </div>
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
          )}
          
          {calendarConnected && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <span className="font-medium">Google Calendar</span>
                <p className="text-sm text-gray-600">
                  {calendarService.getEvents().length} events synced
                </p>
              </div>
              <span className="text-green-600 text-sm font-medium">Active</span>
            </div>
          )}
          
          {!gmailConnected && !calendarConnected && (
            <div className="text-center py-8 text-gray-500">
              <p>No active integrations</p>
              <p className="text-sm mt-2">
                Connect your accounts to enable additional features
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};