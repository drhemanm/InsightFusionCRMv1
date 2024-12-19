/*
  # Deal Tracking Enhancements

  1. New Indexes
    - Add index on deals.updated_at for better dashboard performance
    - Add composite index for assigned_to + status for agent filtering
    
  2. Activity Tracking
    - Add trigger to log deal updates in activities table
*/

-- Add new indexes for better performance
CREATE INDEX IF NOT EXISTS idx_deals_updated_at ON deals(updated_at);
CREATE INDEX IF NOT EXISTS idx_deals_assigned_status ON deals(assigned_to, status);

-- Create function to log deal updates
CREATE OR REPLACE FUNCTION log_deal_update()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO activities (
    id,
    user_id,
    activity_type,
    related_to_type,
    related_to_id,
    description
  ) VALUES (
    gen_random_uuid(),
    auth.uid(),
    'note',
    'deal',
    NEW.id,
    CASE
      WHEN NEW.status != OLD.status THEN 
        'Deal status updated from ' || OLD.status || ' to ' || NEW.status
      WHEN NEW.stage != OLD.stage THEN
        'Deal stage updated from ' || OLD.stage || ' to ' || NEW.stage
      ELSE 'Deal details updated'
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for deal updates
DROP TRIGGER IF EXISTS deal_update_trigger ON deals;
CREATE TRIGGER deal_update_trigger
  AFTER UPDATE ON deals
  FOR EACH ROW
  EXECUTE FUNCTION log_deal_update();

-- Add policy for agents to update their deals
CREATE POLICY "Agents can update their assigned deals" ON deals
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = assigned_to)
  WITH CHECK (auth.uid() = assigned_to);