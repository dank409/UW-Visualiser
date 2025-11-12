import React from 'react';
import { Handle, Position } from 'reactflow';
import { CheckCircle2, Clock, Lock } from 'lucide-react';

const CourseNode = ({ data }) => {
  const { course, status, isUnlocked, onClick } = data;

  const getStatusColor = () => {
    if (status === 'completed') return 'bg-emerald-600 border-emerald-500';
    if (status === 'in-progress') return 'bg-blue-600 border-blue-500';
    if (isUnlocked) return 'bg-slate-700 border-slate-500 hover:border-slate-400';
    return 'bg-slate-800 border-slate-600 opacity-60';
  };

  const getStatusIcon = () => {
    if (status === 'completed') return <CheckCircle2 className="w-4 h-4" />;
    if (status === 'in-progress') return <Clock className="w-4 h-4" />;
    if (!isUnlocked) return <Lock className="w-3 h-3" />;
    return null;
  };

  return (
    <div 
      className={`px-4 py-3 rounded-lg border-2 cursor-pointer transition-all duration-200 min-w-[180px] ${
        getStatusColor()
      } ${isUnlocked || status ? 'hover:scale-105' : ''}`}
      onClick={() => onClick(course)}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1">
          <div className="font-bold text-sm text-white mb-1">
            {course.code}
          </div>
          <div className="text-xs text-slate-200 line-clamp-2">
            {course.title}
          </div>
          {course.isAdvanced && (
            <div className="mt-1 inline-block">
              <span className="text-xs px-2 py-0.5 bg-purple-500 text-white rounded-full">
                Advanced
              </span>
            </div>
          )}
        </div>
        <div className="text-white flex-shrink-0">
          {getStatusIcon()}
        </div>
      </div>
      
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
    </div>
  );
};

export default CourseNode;
