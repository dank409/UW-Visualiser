import React from 'react';
import { CheckCircle, Clock, Unlock, Lock } from 'lucide-react';

/**
 * Sidebar component showing course lists and status
 */
export default function Sidebar({
  allCourses,
  completedCourses,
  inProgressCourses,
  unlockedCourses,
  nextUnlockedCourses,
  showAdvanced,
  onCourseClick
}) {
  const completedList = Array.from(completedCourses)
    .map(code => allCourses[code])
    .filter(Boolean)
    .filter(course => showAdvanced || !course.isAdvanced)
    .sort((a, b) => a.code.localeCompare(b.code));

  const inProgressList = Array.from(inProgressCourses)
    .map(code => allCourses[code])
    .filter(Boolean)
    .filter(course => showAdvanced || !course.isAdvanced)
    .sort((a, b) => a.code.localeCompare(b.code));

  const unlockedNowList = unlockedCourses
    .map(code => allCourses[code])
    .filter(Boolean)
    .filter(course => showAdvanced || !course.isAdvanced)
    .sort((a, b) => a.code.localeCompare(b.code));

  const unlockedNextList = nextUnlockedCourses
    .map(code => allCourses[code])
    .filter(Boolean)
    .filter(course => showAdvanced || !course.isAdvanced)
    .sort((a, b) => a.code.localeCompare(b.code));

  const CourseListItem = ({ course, onClick }) => (
    <button
      onClick={() => onClick(course.code)}
      className="w-full text-left px-3 py-2 hover:bg-slate-700 rounded transition-colors group"
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="font-semibold text-slate-100 group-hover:text-blue-400 transition-colors truncate">
            {course.code}
          </div>
          <div className="text-xs text-slate-400 truncate mt-0.5">
            {course.title}
          </div>
        </div>
        {course.isAdvanced && (
          <span className="bg-purple-500 text-purple-50 text-xs px-1.5 py-0.5 rounded font-semibold ml-2 flex-shrink-0">
            ADV
          </span>
        )}
      </div>
    </button>
  );

  return (
    <div className="w-80 bg-slate-900 border-r border-slate-800 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-slate-800">
        <h1 className="text-xl font-bold text-slate-100">Course Planner</h1>
        <p className="text-sm text-slate-400 mt-1">Track your progress</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Completed Courses */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <h2 className="font-semibold text-slate-100">
              Completed ({completedList.length})
            </h2>
          </div>
          <div className="space-y-1">
            {completedList.length > 0 ? (
              completedList.map(course => (
                <CourseListItem
                  key={course.code}
                  course={course}
                  onClick={onCourseClick}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No completed courses</p>
            )}
          </div>
        </div>

        {/* In Progress Courses */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Clock className="w-5 h-5 text-blue-500" />
            <h2 className="font-semibold text-slate-100">
              In Progress ({inProgressList.length})
            </h2>
          </div>
          <div className="space-y-1">
            {inProgressList.length > 0 ? (
              inProgressList.map(course => (
                <CourseListItem
                  key={course.code}
                  course={course}
                  onClick={onCourseClick}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No courses in progress</p>
            )}
          </div>
        </div>

        {/* Unlocked Now */}
        <div className="p-4 border-b border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Unlock className="w-5 h-5 text-slate-400" />
            <h2 className="font-semibold text-slate-100">
              Unlocked Now ({unlockedNowList.length})
            </h2>
          </div>
          <div className="space-y-1">
            {unlockedNowList.length > 0 ? (
              unlockedNowList.map(course => (
                <CourseListItem
                  key={course.code}
                  course={course}
                  onClick={onCourseClick}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No courses unlocked</p>
            )}
          </div>
        </div>

        {/* Unlocked Next */}
        <div className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Lock className="w-5 h-5 text-yellow-500" />
            <h2 className="font-semibold text-slate-100">
              Unlocked Next ({unlockedNextList.length})
            </h2>
          </div>
          <p className="text-xs text-slate-500 mb-2">
            Will unlock after completing in-progress courses
          </p>
          <div className="space-y-1">
            {unlockedNextList.length > 0 ? (
              unlockedNextList.map(course => (
                <CourseListItem
                  key={course.code}
                  course={course}
                  onClick={onCourseClick}
                />
              ))
            ) : (
              <p className="text-sm text-slate-500 italic">No courses will unlock next</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
