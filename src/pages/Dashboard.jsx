import React, { useState, useEffect, useCallback } from 'react';
import CourseGraph from '../components/CourseGraph';
import CourseSearch from '../components/CourseSearch';
import CourseDetails from '../components/CourseDetails';
import Sidebar from '../components/Sidebar';
import { coursesData } from '../data/mockCourses';
import {
  getUnlockedCourses,
  getNextUnlockedCourses,
  isCourseUnlocked
} from '../utils/prerequisiteUtils';
import { loadCourseProgress, saveCourseProgress } from '../utils/localStorage';
import { Settings } from 'lucide-react';

export default function Dashboard() {
  // State management
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState(new Set());
  const [inProgressCourses, setInProgressCourses] = useState(new Set());
  const [showAdvanced, setShowAdvanced] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  // Load saved progress on mount
  useEffect(() => {
    const saved = loadCourseProgress();
    setCompletedCourses(saved.completed);
    setInProgressCourses(saved.inProgress);
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    saveCourseProgress(completedCourses, inProgressCourses);
  }, [completedCourses, inProgressCourses]);

  // Calculate unlocked courses
  const unlockedCourses = getUnlockedCourses(coursesData, completedCourses);
  const nextUnlockedCourses = getNextUnlockedCourses(
    coursesData,
    completedCourses,
    inProgressCourses
  );

  // Get course status for display
  const getCourseStatus = useCallback((courseCode) => {
    if (completedCourses.has(courseCode)) return 'completed';
    if (inProgressCourses.has(courseCode)) return 'inProgress';
    if (isCourseUnlocked(coursesData[courseCode], completedCourses)) return 'unlocked';
    return 'locked';
  }, [completedCourses, inProgressCourses]);

  // Handle course status change
  const handleStatusChange = useCallback((courseCode, newStatus) => {
    setCompletedCourses(prev => {
      const next = new Set(prev);
      if (newStatus === 'completed') {
        next.add(courseCode);
      } else {
        next.delete(courseCode);
      }
      return next;
    });

    setInProgressCourses(prev => {
      const next = new Set(prev);
      if (newStatus === 'inProgress') {
        next.add(courseCode);
      } else {
        next.delete(courseCode);
      }
      return next;
    });
  }, []);

  // Handle course click
  const handleCourseClick = useCallback((courseCode) => {
    setSelectedCourse(courseCode);
    setShowDetails(true);
  }, []);

  // Handle course selection from search
  const handleCourseSelect = useCallback((courseCode) => {
    setSelectedCourse(courseCode);
    if (courseCode) {
      setShowDetails(true);
    }
  }, []);

  const selectedCourseData = selectedCourse ? coursesData[selectedCourse] : null;
  const selectedCourseStatus = selectedCourse ? getCourseStatus(selectedCourse) : null;

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        allCourses={coursesData}
        completedCourses={completedCourses}
        inProgressCourses={inProgressCourses}
        unlockedCourses={unlockedCourses}
        nextUnlockedCourses={nextUnlockedCourses}
        showAdvanced={showAdvanced}
        onCourseClick={handleCourseClick}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-slate-800 border-b border-slate-700 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">
                UW Course Prerequisite Visualizer
              </h1>
              <p className="text-sm text-slate-400 mt-1">
                Visualize course prerequisites and plan your academic pathway
              </p>
            </div>
            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showAdvanced}
                  onChange={(e) => setShowAdvanced(e.target.checked)}
                  className="w-4 h-4 text-purple-600 bg-slate-700 border-slate-600 rounded focus:ring-purple-500"
                />
                <span className="text-sm text-slate-300">Show Advanced Courses</span>
              </label>
              <Settings className="w-5 h-5 text-slate-400" />
            </div>
          </div>

          {/* Search */}
          <CourseSearch
            allCourses={coursesData}
            selectedCourse={selectedCourse}
            onCourseSelect={handleCourseSelect}
            showAdvanced={showAdvanced}
          />
        </div>

        {/* Graph Area */}
        <div className="flex-1 relative">
          {selectedCourse ? (
            <CourseGraph
              selectedCourse={selectedCourse}
              allCourses={coursesData}
              completedCourses={completedCourses}
              inProgressCourses={inProgressCourses}
              unlockedCourses={unlockedCourses}
              showAdvanced={showAdvanced}
              onCourseClick={handleCourseClick}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-8">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-slate-100 mb-2">
                  Search for a Course
                </h2>
                <p className="text-slate-400 max-w-md">
                  Use the search bar above to find a course and visualize its prerequisites.
                  The graph will show all prerequisite relationships and help you plan your academic pathway.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Course Details Modal */}
      {showDetails && selectedCourseData && (
        <CourseDetails
          course={selectedCourseData}
          status={selectedCourseStatus}
          onClose={() => setShowDetails(false)}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}
