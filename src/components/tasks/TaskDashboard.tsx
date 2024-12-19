import React, { useState } from 'react';
import { Plus, Filter, Calendar, CheckSquare } from 'lucide-react';
import { TaskList } from './TaskList';
import { CreateTaskModal } from './CreateTaskModal';
import { ReminderManager } from '../reminders/ReminderManager';
import type { Task } from '../../types';

export const TaskDashboard: React.FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [filter, setFilter] = useState('all');
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Follow up with client',
      description: 'Send proposal follow-up',
      dueDate: new Date(),
      status: 'pending',
      priority: 'high',
      assignedTo: 'user-1',
      relatedTo: undefined
    }
  ]);

  const handleCreateTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: crypto.randomUUID()
    };
    setTasks([...tasks, newTask]);
    setIsCreateModalOpen(false);
  };

  const handleUpdateTask = (taskId: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, ...updates } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    switch (filter) {
      case 'today':
        return task.dueDate.toDateString() === new Date().toDateString();
      case 'upcoming':
        return task.dueDate > new Date();
      case 'completed':
        return task.status === 'completed';
      default:
        return true;
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Tasks & Reminders</h1>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <CheckSquare className="text-blue-500" size={24} />
                  <h2 className="text-xl font-bold">Tasks</h2>
                </div>
              </div>

              <div className="flex gap-2">
                {['all', 'today', 'upcoming', 'completed'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-3 py-1.5 rounded-lg text-sm ${
                      filter === type
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <TaskList 
              tasks={filteredTasks} 
              onTaskUpdate={handleUpdateTask}
            />
          </div>
        </div>

        <div>
          <ReminderManager />
        </div>
      </div>

      <CreateTaskModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
      />
    </div>
  );
};