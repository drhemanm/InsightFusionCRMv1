import React, { useState } from 'react';
import { FileText, Book, Code, Terminal, Settings, HelpCircle, History, Phone, Search, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

export const Documentation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('getting-started');

  const sections = {
    'getting-started': `
# Getting Started with InsightFusion CRM

## Quick Start Guide
1. **Sign Up and Login**
   - Create your account at [InsightFusion CRM](/)
   - Verify your email address
   - Set up two-factor authentication (recommended)

2. **Initial Setup**
   - Configure your organization settings
   - Set up your team members
   - Import existing contacts and deals
   - Customize your pipeline stages

3. **Core Features**
   - Contact Management
   - Deal Pipeline
   - Task Management
   - Communication Hub
   - AI-Powered Insights

## System Requirements
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Stable internet connection (1Mbps+)
- Minimum screen resolution: 1280x720
    `,
    'contact-management': `
# Contact Management

## Overview
The contact management system allows you to:
- Create and manage detailed contact profiles
- Track communication history
- Set follow-up reminders
- Organize contacts with tags and categories
- Monitor engagement levels

## Features
### Contact Profiles
- Basic Information
  - Name, email, phone
  - Company and position
  - Social profiles
- Custom Fields
  - Create custom fields
  - Set field types
  - Required/optional settings

### Communication Tracking
- Email integration
- Call logging
- Meeting notes
- Task assignments
    `,
    'deal-pipeline': `
# Deal Pipeline Management

## Pipeline Stages
1. **Lead**
   - Initial contact
   - Basic qualification
2. **Qualified**
   - Detailed needs assessment
   - Solution presentation
3. **Proposal**
   - Quote/proposal sent
   - Negotiation started
4. **Negotiation**
   - Terms discussion
   - Final pricing
5. **Closed Won/Lost**
   - Deal completion
   - Outcome recording

## Features
- Visual pipeline view
- Drag-and-drop deal movement
- Stage probability settings
- Automated stage updates
- Deal value forecasting
    `,
    'api-documentation': `
# API Documentation

## Authentication
\`\`\`javascript
// Get API token
const response = await fetch('/api/auth/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: 'your-email',
    password: 'your-password'
  })
});

// Use token in requests
const headers = {
  'Authorization': \`Bearer \${token}\`,
  'Content-Type': 'application/json'
};
\`\`\`

## Endpoints

### Contacts
- \`GET /api/contacts\` - List contacts
- \`POST /api/contacts\` - Create contact
- \`GET /api/contacts/:id\` - Get contact
- \`PUT /api/contacts/:id\` - Update contact
- \`DELETE /api/contacts/:id\` - Delete contact

### Deals
- \`GET /api/deals\` - List deals
- \`POST /api/deals\` - Create deal
- \`GET /api/deals/:id\` - Get deal
- \`PUT /api/deals/:id\` - Update deal
- \`DELETE /api/deals/:id\` - Delete deal

### Tasks
- \`GET /api/tasks\` - List tasks
- \`POST /api/tasks\` - Create task
- \`GET /api/tasks/:id\` - Get task
- \`PUT /api/tasks/:id\` - Update task
- \`DELETE /api/tasks/:id\` - Delete task
    `,
    'mobile-experience': `
# Mobile Experience

## Mobile Features
- Responsive design for all screen sizes
- Touch-friendly interface
- Offline capabilities
- Push notifications
- Mobile-optimized views

## Mobile Apps
- Progressive Web App (PWA)
- iOS app (coming soon)
- Android app (coming soon)

## Offline Support
- Cached data access
- Offline data entry
- Background sync
- Conflict resolution
    `,
    'troubleshooting': `
# Troubleshooting Guide

## Common Issues

### Login Problems
1. **Can't log in**
   - Check email/password
   - Clear browser cache
   - Reset password if needed

### Data Import Issues
1. **Import fails**
   - Check file format
   - Validate data structure
   - Reduce file size if too large

### Performance Issues
1. **Slow loading**
   - Check internet connection
   - Clear browser cache
   - Update browser

## Support
- Email: support@insightfusion.com
- Phone: +1-234-567-8900
- Live Chat: Available 24/7
    `
  };

  const navigation = [
    { id: 'getting-started', name: 'Getting Started', icon: Book },
    { id: 'contact-management', name: 'Contact Management', icon: Terminal },
    { id: 'deal-pipeline', name: 'Deal Pipeline', icon: Terminal },
    { id: 'api-documentation', name: 'API Documentation', icon: Code },
    { id: 'mobile-experience', name: 'Mobile Experience', icon: Phone },
    { id: 'troubleshooting', name: 'Troubleshooting', icon: HelpCircle }
  ];

  const filteredContent = sections[activeSection as keyof typeof sections]
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
    ? sections[activeSection as keyof typeof sections]
    : 'No results found';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Documentation</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search documentation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <nav className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    activeSection === item.id
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={18} />
                  <span>{item.name}</span>
                  <ChevronRight
                    size={16}
                    className={`ml-auto transition-transform ${
                      activeSection === item.id ? 'rotate-90' : ''
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="col-span-9">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="prose max-w-none">
              <ReactMarkdown>{filteredContent}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};