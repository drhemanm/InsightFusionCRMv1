import React from 'react';
import { Plus, X } from 'lucide-react';

interface Props {
  conditions: Record<string, any>[];
  onChange: (conditions: Record<string, any>[]) => void;
}

export const ConditionBuilder: React.FC<Props> = ({ conditions, onChange }) => {
  const addCondition = () => {
    onChange([...conditions, { field: '', operator: 'equals', value: '' }]);
  };

  // ... rest of the component implementation ...
};