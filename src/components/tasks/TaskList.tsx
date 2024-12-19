import React from 'react';
import { format } from 'date-fns';
import { CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import type { Task } from '../../types';

interface TaskListProps {
  tasks: Task[];
  onTaskUpdate?: (taskId: string, updates: Partial<Task>) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskUpdate }) => {
  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="text-red-500" size={18} />;
      case 'medium':
        return <Clock className="text-yellow-500" size={18} />;
      case 'low':
        return <CheckCircle2 className="text-green-500" size={18} />;
    }
  };

  const handleStatusChange = (taskId: string, completed: boolean) => {
    onTaskUpdate?.(taskId, {
      status: completed ? 'completed' : 'pending'
    });
  };

  return (
    <div className="divide-y divide-gray-200">
      {tasks.length === 0 ? (
        <div className="p-8 text-center text-gray-500">
          No tasks found. Create your first task to get started!
        </div>
      ) : (
        tasks.map((task) => (
          <div key={task.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                checked={task.status === 'completed'}
                onChange={(e) => handleStatusChange(task.id, e.target.checked)}
                className="h-4 w-4 text-blue-600 rounded cursor-pointer"
              />
              
              <div className="flex-1">
                <h3 className={`font-medium ${
                  task.status === 'completed' ? 'line-through text-gray-500' : ''
                }`}>
                  {task.title}
                </h3>
                {task.description && (
                  <p className="text-sm text-gray-500">{task.description}</p>
                )}
              </div>

              <div className="flex items-center gap-4">
                {getPriorityIcon(task.priority)}
                <span className="text-sm text-gray-500">
                  {format(task.dueDate, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};