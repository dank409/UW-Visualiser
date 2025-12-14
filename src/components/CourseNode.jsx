import React from 'react';
import { Handle, Position } from 'reactflow';
import { GraduationCap } from 'lucide-react';

/**
 * Custom node component for courses in the ReactFlow graph
 */
export default function CourseNode({ data, selected }) {
  const { course, status, showAdvanced } = data;
  
  // Don't render advanced courses if they're hidden
  if (course.isAdvanced && !showAdvanced) {
    return null;
  }

  // Determine node colors based on status
  const getNodeColors = () => {
    switch (status) {
      case 'completed':
        return {
          bg: 'bg-green-600',
          border: 'border-green-400',
          text: 'text-green-50'
        };
      case 'inProgress':
        return {
          bg: 'bg-blue-600',
          border: 'border-blue-400',
          text: 'text-blue-50'
        };
      case 'unlocked':
        return {
          bg: 'bg-slate-700',
          border: 'border-slate-500',
          text: 'text-slate-100'
        };
      case 'locked':
      default:
        return {
          bg: 'bg-slate-800',
          border: 'border-slate-600',
          text: 'text-slate-300'
        };
    }
  };

  const colors = getNodeColors();
  const isSelected = selected;

  return (
    <div
      className={`
        ${colors.bg} ${colors.border} ${colors.text}
        border-2 rounded-lg shadow-lg
        px-3 py-2 min-w-[140px]
        transition-all duration-200
        cursor-pointer
        ${isSelected ? 'ring-2 ring-yellow-400 ring-offset-2' : ''}
        hover:shadow-xl hover:scale-105
      `}
      onClick={data.onClick}
    >
      {/* Source handle (outgoing edges) */}
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-slate-400 !w-3 !h-3"
      />
      
      {/* Target handle (incoming edges) */}
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-slate-400 !w-3 !h-3"
      />

      {/* Course code */}
      <div className="flex items-center gap-1.5 mb-1">
        <GraduationCap className="w-4 h-4" />
        <div className="font-bold text-sm">{course.code}</div>
        {course.isAdvanced && (
          <span className="bg-purple-500 text-purple-50 text-xs px-1.5 py-0.5 rounded font-semibold">
            ADV
          </span>
        )}
      </div>

      {/* Course title (truncated) */}
      <div className="text-xs opacity-90 line-clamp-2 leading-tight">
        {course.title}
      </div>

      {/* Status indicator */}
      <div className="mt-1.5 text-xs font-medium opacity-75">
        {status === 'completed' && '✓ Completed'}
        {status === 'inProgress' && '→ In Progress'}
        {status === 'unlocked' && '○ Available'}
        {status === 'locked' && '🔒 Locked'}
      </div>
    </div>
  );
}
