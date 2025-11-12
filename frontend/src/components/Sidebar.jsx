import React from 'react';
import { Toggle, BookMarked, GraduationCap, Sparkles } from 'lucide-react';
import { coursesData, isCourseUnlocked } from '../data/mockCourses';

const Sidebar = ({ 
  completedCourses, 
  inProgressCourses, 
  showAdvanced, 
  onToggleAdvanced,
  onCourseClick 
}) => {
  // Calculate unlocked courses
  const unlockedCourses = Object.keys(coursesData).filter(code => {
    const course = coursesData[code];
    // Skip if already completed or in progress
    if (completedCourses.includes(code) || inProgressCourses.includes(code)) return false;
    // Skip advanced courses if not showing them
    if (!showAdvanced && course.isAdvanced) return false;
    // Check if unlocked
    return isCourseUnlocked(code, completedCourses, showAdvanced);
  });

  // Calculate next unlocked (after completing in-progress courses)
  const nextUnlocked = Object.keys(coursesData).filter(code => {
    const course = coursesData[code];
    if (completedCourses.includes(code) || inProgressCourses.includes(code)) return false;
    if (!showAdvanced && course.isAdvanced) return false;
    if (unlockedCourses.includes(code)) return false;
    
    const allCompleted = [...completedCourses, ...inProgressCourses];
    return isCourseUnlocked(code, allCompleted, showAdvanced);
  });

  return (
    <div className="w-80 bg-slate-800 border-r border-slate-700 overflow-y-auto flex flex-col">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-2xl font-bold text-white mb-2">UW Course Pathways</h1>
        <p className="text-slate-400 text-sm">Visualize your academic journey</p>
      </div>

      <div className="p-4 border-b border-slate-700">
        <button
          onClick={onToggleAdvanced}
          className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all ${
            showAdvanced 
              ? 'bg-purple-600 text-white' 
              : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Advanced Courses (x4x)</span>
          </div>
          <Toggle className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Completed Courses */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="w-5 h-5 text-emerald-400" />
            <h3 className="font-semibold text-white">Completed ({completedCourses.length})</h3>
          </div>
          {completedCourses.length === 0 ? (
            <p className="text-slate-500 text-sm">No courses completed yet</p>
          ) : (
            <div className="space-y-2">
              {completedCourses.map(code => (
                <div
                  key={code}
                  onClick={() => onCourseClick(coursesData[code])}
                  className="px-3 py-2 bg-emerald-900 bg-opacity-30 border border-emerald-500 rounded cursor-pointer hover:bg-opacity-50 transition-colors"
                >
                  <div className="font-medium text-emerald-200 text-sm">{code}</div>
                  <div className="text-xs text-emerald-300 mt-1 line-clamp-1">
                    {coursesData[code]?.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* In Progress Courses */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <BookMarked className="w-5 h-5 text-blue-400" />
            <h3 className="font-semibold text-white">In Progress ({inProgressCourses.length})</h3>
          </div>
          {inProgressCourses.length === 0 ? (
            <p className="text-slate-500 text-sm">No courses in progress</p>
          ) : (
            <div className="space-y-2">
              {inProgressCourses.map(code => (
                <div
                  key={code}
                  onClick={() => onCourseClick(coursesData[code])}
                  className="px-3 py-2 bg-blue-900 bg-opacity-30 border border-blue-500 rounded cursor-pointer hover:bg-opacity-50 transition-colors"
                >
                  <div className="font-medium text-blue-200 text-sm">{code}</div>
                  <div className="text-xs text-blue-300 mt-1 line-clamp-1">
                    {coursesData[code]?.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unlocked Now */}
        <div className="p-4 border-b border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-green-500" />
            <h3 className="font-semibold text-white">Unlocked Now ({unlockedCourses.length})</h3>
          </div>
          {unlockedCourses.length === 0 ? (
            <p className="text-slate-500 text-sm">Complete prerequisites to unlock courses</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {unlockedCourses.slice(0, 15).map(code => (
                <div
                  key={code}
                  onClick={() => onCourseClick(coursesData[code])}
                  className="px-3 py-2 bg-slate-700 border border-slate-600 rounded cursor-pointer hover:bg-slate-600 transition-colors"
                >
                  <div className="font-medium text-slate-200 text-sm">{code}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {coursesData[code]?.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Unlocked Next */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-5 h-5 rounded-full bg-yellow-500" />
            <h3 className="font-semibold text-white">Unlocked Next ({nextUnlocked.length})</h3>
          </div>
          <p className="text-slate-400 text-xs mb-3">After completing current courses</p>
          {nextUnlocked.length === 0 ? (
            <p className="text-slate-500 text-sm">No additional courses yet</p>
          ) : (
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {nextUnlocked.slice(0, 15).map(code => (
                <div
                  key={code}
                  onClick={() => onCourseClick(coursesData[code])}
                  className="px-3 py-2 bg-slate-700 border border-yellow-600 rounded cursor-pointer hover:bg-slate-600 transition-colors"
                >
                  <div className="font-medium text-slate-200 text-sm">{code}</div>
                  <div className="text-xs text-slate-400 mt-1 line-clamp-1">
                    {coursesData[code]?.title}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
