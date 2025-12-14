import React, { useEffect } from 'react';
import { X, CheckCircle, Clock, Circle, Lock } from 'lucide-react';
import { formatPrerequisites } from '../utils/prerequisiteUtils';

/**
 * Modal component displaying detailed course information
 */
export default function CourseDetails({ course, status, onClose, onStatusChange }) {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!course) return null;

  const handleStatusChange = (newStatus) => {
    onStatusChange(course.code, newStatus);
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'inProgress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'unlocked':
        return <Circle className="w-5 h-5 text-slate-400" />;
      default:
        return <Lock className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-slate-800 border border-slate-700 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {getStatusIcon()}
              <div>
                <h2 className="text-2xl font-bold text-slate-100">
                  {course.code}
                  {course.isAdvanced && (
                    <span className="ml-3 bg-purple-500 text-purple-50 text-xs px-2 py-1 rounded font-semibold">
                      ADVANCED
                    </span>
                  )}
                </h2>
                <p className="text-slate-400 text-sm mt-1">{course.title}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 transition-colors p-1"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-4 space-y-6">
            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Description</h3>
              <p className="text-slate-300 leading-relaxed">{course.description}</p>
            </div>

            {/* Units */}
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Course Units</h3>
              <p className="text-slate-300">{course.units} units</p>
            </div>

            {/* Prerequisites */}
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Prerequisites</h3>
              <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                <p className="text-slate-300 font-mono text-sm">
                  {formatPrerequisites(course.prerequisites)}
                </p>
              </div>
            </div>

            {/* Corequisites */}
            {course.corequisites && (
              <div>
                <h3 className="text-lg font-semibold text-slate-100 mb-2">Corequisites</h3>
                <div className="bg-slate-900 border border-slate-700 rounded-lg p-4">
                  <p className="text-slate-300">{course.corequisites}</p>
                </div>
              </div>
            )}

            {/* Status Management */}
            <div>
              <h3 className="text-lg font-semibold text-slate-100 mb-3">Course Status</h3>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleStatusChange('completed')}
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
                    ${status === 'completed'
                      ? 'bg-green-600 border-green-500 text-green-50'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                    }
                  `}
                >
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-medium">Completed</span>
                </button>

                <button
                  onClick={() => handleStatusChange('inProgress')}
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
                    ${status === 'inProgress'
                      ? 'bg-blue-600 border-blue-500 text-blue-50'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                    }
                  `}
                >
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">In Progress</span>
                </button>

                <button
                  onClick={() => handleStatusChange('notTaken')}
                  className={`
                    flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all
                    ${status === 'notTaken' || !status || (status !== 'completed' && status !== 'inProgress')
                      ? 'bg-slate-700 border-slate-500 text-slate-200'
                      : 'bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600'
                    }
                  `}
                >
                  <Circle className="w-5 h-5" />
                  <span className="font-medium">Not Taken</span>
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-slate-800 border-t border-slate-700 px-6 py-4 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-slate-100 rounded-lg transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
