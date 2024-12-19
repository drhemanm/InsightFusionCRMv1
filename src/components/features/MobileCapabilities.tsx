import React from 'react';
import { Smartphone, Wifi, Map, Bell, Shield } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const MobileCapabilities: React.FC = () => {
  const features = [
    {
      name: "Mobile App",
      icon: <Smartphone className="text-blue-500" size={24} />,
      description: "Full-featured mobile app for iOS and Android with offline capabilities.",
      benefits: [
        "Work from anywhere",
        "Real-time updates",
        "Offline access"
      ],
      specs: "Available for iOS 13+ and Android 8+"
    },
    {
      name: "Offline Mode",
      icon: <Wifi className="text-green-500" size={24} />,
      description: "Continue working without internet connection with automatic sync.",
      benefits: [
        "Uninterrupted workflow",
        "Automatic sync",
        "Data backup"
      ],
      specs: "Supports offline data caching"
    },
    {
      name: "Location Services",
      icon: <Map className="text-red-500" size={24} />,
      description: "GPS-enabled features for field sales and territory management.",
      benefits: [
        "Route optimization",
        "Check-in tracking",
        "Nearby leads"
      ],
      specs: "Uses device GPS with map integration"
    },
    {
      name: "Push Notifications",
      icon: <Bell className="text-purple-500" size={24} />,
      description: "Real-time alerts and notifications for important updates.",
      benefits: [
        "Instant updates",
        "Custom alerts",
        "Priority notifications"
      ],
      specs: "Supports rich notifications and actions"
    },
    {
      name: "Mobile Security",
      icon: <Shield className="text-indigo-500" size={24} />,
      description: "Enterprise-grade security features for mobile access.",
      benefits: [
        "Secure data access",
        "Device management",
        "Remote wipe"
      ],
      specs: "Includes MDM and biometric authentication"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Mobile Capabilities</h2>
        <p className="text-gray-600">Stay productive on the go with powerful mobile features</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.name} {...feature} />
        ))}
      </div>
    </div>
  );
};