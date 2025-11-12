import React from 'react';
import { X, BookOpen, CheckCircle2, Clock } from 'lucide-react';
import { coursesData } from '../data/mockCourses';

const CourseDetails = ({ 
  courseCode, 
  onClose, 
  onMarkCompleted, 
  onMarkInProgress,
  onMarkNotTaken,
  status 
}) => {
  const course = coursesData[courseCode];
  
  if (!course) return null;

  const renderPrereqNode = (node, depth = 0) => {
    if (typeof node === 'string') {
      return (
        <span className="text-blue-400 hover:text-blue-300 cursor-pointer" key={node}>
          {node}
        </span>
      );
    }
    
    if (node.type === 'AND') {
      return (
        <span key={`and-${depth}`}>
          ({node.courses.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-slate-400"> AND </span>}
              {renderPrereqNode(c, depth + 1)}
            </React.Fragment>
          ))})
        </span>
      );
    }
    
    if (node.type === 'OR') {
      return (
        <span key={`or-${depth}`}>
          ({node.courses.map((c, i) => (
            <React.Fragment key={i}>
              {i > 0 && <span className="text-slate-400"> OR </span>}
              {renderPrereqNode(c, depth + 1)}
            </React.Fragment>
          ))})
        </span>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-slate-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-slate-800 border-b border-slate-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-400" />
            <div>
              <h2 className="text-2xl font-bold text-white">{course.code}</h2>
              <p className="text-slate-400 text-sm mt-1">{course.units} units</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
            <p className="text-slate-300 leading-relaxed">{course.description}</p>
          </div>

          {course.isAdvanced && (
            <div className="p-4 bg-purple-900 bg-opacity-30 border border-purple-500 rounded-lg">
              <p className="text-purple-300 text-sm">
                <span className="font-semibold">Advanced Course:</span> This is an advanced-level course
                {course.replaces && ` that replaces ${course.replaces.join(', ')}`}.
              </p>
            </div>
          )}

          {course.prerequisites && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase mb-2">Prerequisites</h4>
              <div className="text-slate-300">
                {renderPrereqNode(course.prerequisites)}
              </div>
            </div>
          )}

          {course.corequisites && (
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase mb-2">Corequisites</h4>
              <div className="text-slate-300">
                {renderPrereqNode(course.corequisites)}
              </div>
            </div>
          )}

          <div>
            <h4 className="text-sm font-semibold text-slate-400 uppercase mb-3">Mark Course Status</h4>
            <div className="flex gap-3">
              <button
                onClick={() => onMarkCompleted(courseCode)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  status === 'completed'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-emerald-600 hover:text-white'
                }`}
              >
                <CheckCircle2 className="w-5 h-5" />
                Completed
              </button>
              <button
                onClick={() => onMarkInProgress(courseCode)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg transition-all ${
                  status === 'in-progress'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-700 text-slate-300 hover:bg-blue-600 hover:text-white'
                }`}
              >
                <Clock className="w-5 h-5" />
                In Progress
              </button>
              {status && (
                <button
                  onClick={() => onMarkNotTaken(courseCode)}
                  className="px-4 py-3 rounded-lg bg-slate-700 text-slate-300 hover:bg-red-600 hover:text-white transition-all"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
