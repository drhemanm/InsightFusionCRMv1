import React, { useEffect, useState } from 'react';
import { useWellbeingStore } from '../../store/wellbeingStore';
import { Activity, Coffee, Eye, Timer, Award, X } from 'lucide-react';
import { format } from 'date-fns';

export const WellbeingTracker: React.FC = () => {
  const {
    isTracking,
    currentSession,
    breakReminders,
    wellnessStats,
    startTracking,
    stopTracking,
    completeBreak,
    skipBreak
  } = useWellbeingStore();

  const [showBreakReminder, setShowBreakReminder] = useState(true);

  useEffect(() => {
    startTracking();
    return () => stopTracking();
  }, []);

  const pendingBreak = breakReminders.find(r => r.status === 'pending');

  if (!showBreakReminder) {
    return (
      <button
        onClick={() => setShowBreakReminder(true)}
        className="fixed bottom-4 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 z-50"
        title="Show well-being tracker"
      >
        <Activity className="text-blue-500" size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {pendingBreak ? (
        <div className="bg-white rounded-lg shadow-lg p-6 w-80">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Coffee className="text-blue-500" size={24} />
              <h3 className="text-lg font-semibold">Time for a Break!</h3>
            </div>
            <button
              onClick={() => setShowBreakReminder(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>
          </div>

          <p className="text-gray-600 mb-4">
            {pendingBreak.type === 'eye_rest' && (
              "Take a 20-second break and look at something 20 feet away."
            )}
            {pendingBreak.type === 'stretch' && (
              "Stand up and stretch for a few minutes."
            )}
            {pendingBreak.type === 'water' && (
              "Stay hydrated! Time to drink some water."
            )}
            {pendingBreak.type === 'walk' && (
              "Take a short walk to refresh your mind."
            )}
          </p>

          <div className="flex gap-2">
            <button
              onClick={() => {
                completeBreak(pendingBreak.id);
                setShowBreakReminder(false);
              }}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Take Break (+{pendingBreak.points} pts)
            </button>
            <button
              onClick={() => {
                skipBreak(pendingBreak.id);
                setShowBreakReminder(false);
              }}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              Skip
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Timer className="text-blue-500" size={20} />
              <span className="font-medium">Session Time: {format(new Date(), 'HH:mm:ss')}</span>
            </div>
            <button
              onClick={() => setShowBreakReminder(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          </div>

          {wellnessStats && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Breaks Completed</span>
                <span className="font-medium">{wellnessStats.breaksCompleted}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Current Streak</span>
                <span className="font-medium">{wellnessStats.currentStreak}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Wellness Score</span>
                <span className="font-medium">{wellnessStats.wellnessScore}%</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};