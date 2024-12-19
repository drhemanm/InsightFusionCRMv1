-- Users table
CREATE TABLE users (
  id CHAR(36) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'agent', 'manager') NOT NULL,
  department VARCHAR(255),
  position VARCHAR(255),
  status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  last_login_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Organizations table
CREATE TABLE organizations (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  industry VARCHAR(255),
  size ENUM('1-10', '11-50', '51-200', '201-500', '501+'),
  annual_revenue VARCHAR(255),
  website VARCHAR(255),
  phone VARCHAR(255),
  address JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Contacts table
CREATE TABLE contacts (
  id CHAR(36) PRIMARY KEY,
  organization_id CHAR(36),
  assigned_to CHAR(36),
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(255),
  position VARCHAR(255),
  lead_source VARCHAR(255),
  lead_status ENUM('new', 'contacted', 'qualified', 'lost'),
  last_contact_date TIMESTAMP NULL,
  next_follow_up TIMESTAMP NULL,
  notes TEXT,
  custom_fields JSON,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (organization_id) REFERENCES organizations(id),
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Deals table
CREATE TABLE deals (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  assigned_to CHAR(36) NOT NULL,
  contact_id CHAR(36),
  organization_id CHAR(36),
  value DECIMAL(15,2) NOT NULL DEFAULT 0,
  currency VARCHAR(3) NOT NULL DEFAULT 'MUR',
  stage ENUM('lead', 'qualified', 'proposal', 'negotiation', 'closed-won', 'closed-lost') NOT NULL,
  status ENUM(
    'new_lead',
    'initial_contact',
    'in_negotiation',
    'proposal_sent',
    'contract_pending',
    'closed_won',
    'closed_lost',
    'on_hold'
  ) NOT NULL DEFAULT 'new_lead',
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  probability TINYINT CHECK (probability BETWEEN 0 AND 100),
  expected_close_date TIMESTAMP NULL,
  actual_close_date TIMESTAMP NULL,
  description TEXT,
  notes TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id),
  FOREIGN KEY (contact_id) REFERENCES contacts(id),
  FOREIGN KEY (organization_id) REFERENCES organizations(id)
);

-- Tasks table
CREATE TABLE tasks (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  assigned_to CHAR(36) NOT NULL,
  related_to_type ENUM('contact', 'deal', 'organization'),
  related_to_id CHAR(36),
  due_date TIMESTAMP NOT NULL,
  priority ENUM('low', 'medium', 'high') NOT NULL DEFAULT 'medium',
  status ENUM('pending', 'in_progress', 'completed', 'deferred') NOT NULL DEFAULT 'pending',
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (assigned_to) REFERENCES users(id)
);

-- Activities table
CREATE TABLE activities (
  id CHAR(36) PRIMARY KEY,
  user_id CHAR(36) NOT NULL,
  activity_type ENUM('email', 'call', 'meeting', 'note', 'task') NOT NULL,
  related_to_type ENUM('contact', 'deal', 'organization'),
  related_to_id CHAR(36),
  description TEXT NOT NULL,
  duration INT, -- in minutes
  outcome TEXT,
  scheduled_at TIMESTAMP NULL,
  completed_at TIMESTAMP NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Create indexes
CREATE INDEX idx_contacts_assigned_to ON contacts(assigned_to);
CREATE INDEX idx_deals_assigned_to ON deals(assigned_to);
CREATE INDEX idx_deals_stage ON deals(stage);
CREATE INDEX idx_deals_status ON deals(status);
CREATE INDEX idx_tasks_assigned_to ON tasks(assigned_to);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_activities_user_id ON activities(user_id);