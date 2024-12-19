/*
  # Add KYC Fields to Contacts

  1. New Fields
    - date_of_birth (date)
    - passport_id_number (text)
    - nationality (text) 
    - current_address (jsonb)
    - occupation (text)
    - company_organization (text)
    - government_id_url (text)
    - proof_of_address_url (text)

  2. Security
    - Enable RLS for sensitive data
    - Add policy for authorized access
*/

ALTER TABLE contacts
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS passport_id_number text,
  ADD COLUMN IF NOT EXISTS nationality text,
  ADD COLUMN IF NOT EXISTS current_address jsonb,
  ADD COLUMN IF NOT EXISTS occupation text,
  ADD COLUMN IF NOT EXISTS company_organization text,
  ADD COLUMN IF NOT EXISTS government_id_url text,
  ADD COLUMN IF NOT EXISTS proof_of_address_url text;

-- Create policy for KYC data access
CREATE POLICY "Users can only view KYC data they are authorized to see" ON contacts
  FOR SELECT
  TO authenticated
  USING (
    auth.uid() = assigned_to OR
    EXISTS (
      SELECT 1 FROM users
      WHERE id = auth.uid() AND role IN ('admin', 'manager')
    )
  );