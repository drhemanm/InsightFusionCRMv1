```typescript
import React from 'react';
import { useChangeRequestStore } from '../../store/changeRequestStore';
import { CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { format } from 'date-fns';

export const ChangeRequestManager: React.FC = () => {
  const { requests, approveRequest, rejectRequest } = useChangeRequestStore();

  const handleApprove = async (id: string) => {
    const comment = prompt('Add an optional comment:');
    await approveRequest(id, comment || undefined);
  };

  const handleReject = async (id: string) => {
    const comment = prompt('Please provide a reason for rejection:');
    if (comment) {
      await rejectRequest(id, comment);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Change Requests</h2>

      <div className="space-y-4">
        {requests.map((request) => (
          <div
            key={request.id}
            className="bg-white rounded-lg shadow p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {request.status === 'pending' && (
                  <Clock className="text-yellow-500" size={24} />
                )}
                {request.status === 'approved' && (
                  <CheckCircle className="text-green-500" size={24} />
                )}
                {request.status === 'rejected' && (
                  <XCircle className="text-red-500" size={24} />
                )}
                <div>
                  <h3 className="font-medium">
                    {request.type.charAt(0).toUpperCase() + request.type.slice(1)} Request
                  </h3>
                  <p className="text-sm text-gray-500">
                    Resource: {request.resource}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                request.status === 'approved'
                  ? 'bg-green-100 text-green-800'
                  : request.status === 'rejected'
                  ? 'bg-red-100 text-red-800'
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {request.status.toUpperCase()}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700">Reason</h4>
                <p className="mt-1 text-sm text-gray-600">{request.reason}</p>
              </div>

              {request.changes && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Changes</h4>
                  <div className="mt-1 space-y-2">
                    {request.changes.before && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Before: </span>
                        {JSON.stringify(request.changes.before)}
                      </div>
                    )}
                    {request.changes.after && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">After: </span>
                        {JSON.stringify(request.changes.after)}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {request.adminComment && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Admin Comment</h4>
                  <p className="mt-1 text-sm text-gray-600">{request.adminComment}</p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>
                  Requested on {format(request.createdAt, 'MMM d, yyyy HH:mm')}
                </span>
                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(request.id)}
                      className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(request.id)}
                      className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {requests.length === 0 && (
          <div className="text-center py-12">
            <AlertCircle className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No Change Requests</h3>
            <p className="mt-1 text-sm text-gray-500">
              There are no pending change requests at this time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
```