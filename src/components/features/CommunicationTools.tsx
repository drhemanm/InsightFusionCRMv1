import React from 'react';
import { MessageSquare, Mail, Phone, Calendar, Video } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

export const CommunicationTools: React.FC = () => {
  const features = [
    {
      name: "Unified Inbox",
      icon: <MessageSquare className="text-blue-500" size={24} />,
      description: "Centralize all customer communications in one place including emails, calls, and messages.",
      benefits: [
        "Single view of all customer interactions",
        "Never miss important messages",
        "Track conversation history"
      ],
      specs: "Supports email, SMS, WhatsApp, and voice integration"
    },
    {
      name: "Email Integration",
      icon: <Mail className="text-indigo-500" size={24} />,
      description: "Seamless integration with Gmail and Outlook with two-way sync and email tracking.",
      benefits: [
        "Real-time email tracking",
        "Template management",
        "Automated follow-ups"
      ],
      specs: "Supports Gmail, Outlook, and IMAP"
    },
    {
      name: "Call Center",
      icon: <Phone className="text-green-500" size={24} />,
      description: "Built-in VoIP calling with Aircall integration for professional call handling.",
      benefits: [
        "Click-to-call functionality",
        "Call recording and analytics",
        "Advanced routing options"
      ],
      specs: "Integrates with Aircall, RingCentral, and custom VoIP"
    },
    {
      name: "Meeting Scheduler",
      icon: <Calendar className="text-purple-500" size={24} />,
      description: "Smart calendar management with automated scheduling and reminders.",
      benefits: [
        "Reduce scheduling back-and-forth",
        "Automatic timezone conversion",
        "Calendar sync"
      ],
      specs: "Works with Google Calendar, Outlook, and iCal"
    },
    {
      name: "Video Conferencing",
      icon: <Video className="text-red-500" size={24} />,
      description: "Integrated video meetings with screen sharing and recording capabilities.",
      benefits: [
        "One-click meeting creation",
        "Screen sharing and recording",
        "No software installation required"
      ],
      specs: "WebRTC-based with Zoom and Teams integration"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="border-b pb-4">
        <h2 className="text-2xl font-bold">Communication Tools</h2>
        <p className="text-gray-600">Streamline your customer interactions across all channels</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature) => (
          <FeatureCard key={feature.name} {...feature} />
        ))}
      </div>
    </div>
  );
};