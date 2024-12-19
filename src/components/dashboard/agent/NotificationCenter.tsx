import React, { useState, useEffect } from 'react';
import { Bell, Calendar, DollarSign, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

interface AgentNotification {
  id: string;
  type: 'deal_assigned' | 'status_change' | 'deadline';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
}

interface NotificationCenterProps {
  agentId?: string;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ agentId }) => {
  const [notifications, setNotifications] = useState<AgentNotification[]>([]);

  useEffect(() => {
    // In production, fetch from API
    const mockNotifications: AgentNotification[] = [
      {
        id: '1',
        type: 'deal_assigned',
        title: 'New Deal Assigned',
        message: 'You have been assigned a new deal: Enterprise Solution Package',
        timestamp: new Date(),
        read: false,
        priority: 'high'
      },
      {
        id: '2',
        type: 'deadline',
        title: 'Upcoming Deadline',
        message: 'Deal proposal due in 2 days',
        timestamp: new Date(),
        read: false,
        priority: 'medium'
      }
    ];
    setNotifications(mockNotifications);
  }, [agentId]);

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, read: true }
        : notification
    ));
  };

  const getNotificationIcon = (type: AgentNotification['type']) => {
    switch (type) {
      case 'deal_assigned':
        return <DollarSign className="text-blue-500" size={20} />;
      case 'status_change':
        return <AlertCircle className="text-purple-500" size={20} />;
      case 'deadline':
        return <Calendar className="text-yellow-500" size={20} />;
      default:
        return <Bell className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Notifications</h2>
        <div className="relative">
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
          <Bell className="text-gray-400" size={20} />
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.read ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
            }`}
            onClick={() => markAsRead(notification.id)}
          >
            <div className="flex items-center gap-3 mb-2">
              {getNotificationIcon(notification.type)}
              <div className="flex-1">
                <h3 className="font-medium">{notification.title}</h3>
                <p className="text-sm text-gray-600">{notification.message}</p>
              </div>
              <span className="text-xs text-gray-500">
                {format(notification.timestamp, 'h:mm a')}
              </span>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="text-center text-gray-500 py-4">
            No new notifications
          </div>
        )}
      </div>
    </div>
  );
};