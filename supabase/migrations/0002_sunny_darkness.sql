/*
  # Add Deal Status Field
  
  1. Changes
    - Add status field to deals table with new status options
    - Add index for status field
    - Update existing deals to have default status
*/

ALTER TABLE deals ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'new_lead' CHECK (
  status IN (
    'new_lead',
    'initial_contact',
    'in_negotiation', 
    'proposal_sent',
    'contract_pending',
    'closed_won',
    'closed_lost',
    'on_hold'
  )
);

-- Add index for the new status field
CREATE INDEX IF NOT EXISTS idx_deals_status ON deals(status);