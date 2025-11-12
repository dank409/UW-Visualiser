import React, { useState, useEffect } from 'react';
import CourseSearch from '../components/CourseSearch';
import CourseGraph from '../components/CourseGraph';
import CourseDetails from '../components/CourseDetails';
import Sidebar from '../components/Sidebar';

const Dashboard = () => {
  const [targetCourse, setTargetCourse] = useState(null);
  const [completedCourses, setCompletedCourses] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState(null);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('uw-course-data');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCompletedCourses(data.completed || []);
        setInProgressCourses(data.inProgress || []);
        setShowAdvanced(data.showAdvanced || false);
      } catch (e) {
        console.error('Error loading saved data:', e);
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    const data = {
      completed: completedCourses,
      inProgress: inProgressCourses,
      showAdvanced
    };
    localStorage.setItem('uw-course-data', JSON.stringify(data));
  }, [completedCourses, inProgressCourses, showAdvanced]);

  const handleMarkCompleted = (courseCode) => {
    setCompletedCourses(prev => {
      if (prev.includes(courseCode)) return prev;
      return [...prev, courseCode];
    });
    setInProgressCourses(prev => prev.filter(c => c !== courseCode));
  };

  const handleMarkInProgress = (courseCode) => {
    setInProgressCourses(prev => {
      if (prev.includes(courseCode)) return prev;
      return [...prev, courseCode];
    });
    setCompletedCourses(prev => prev.filter(c => c !== courseCode));
  };

  const handleMarkNotTaken = (courseCode) => {
    setCompletedCourses(prev => prev.filter(c => c !== courseCode));
    setInProgressCourses(prev => prev.filter(c => c !== courseCode));
  };

  const getCourseStatus = (courseCode) => {
    if (completedCourses.includes(courseCode)) return 'completed';
    if (inProgressCourses.includes(courseCode)) return 'in-progress';
    return null;
  };

  const handleCourseClick = (course) => {
    setSelectedCourseForDetails(course.code);
  };

  return (
    <div className="flex h-screen bg-slate-900">
      <Sidebar
        completedCourses={completedCourses}
        inProgressCourses={inProgressCourses}
        showAdvanced={showAdvanced}
        onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
        onCourseClick={handleCourseClick}
      />

      <div className="flex-1 flex flex-col">
        <div className="bg-slate-800 border-b border-slate-700 p-6">
          <CourseSearch 
            onCourseSelect={setTargetCourse}
            selectedCourse={targetCourse}
          />
          
          {!targetCourse && (
            <div className="mt-4 p-4 bg-slate-700 rounded-lg">
              <p className="text-slate-300 text-sm">
                Search for a target course to visualize its prerequisite pathway.
                Mark courses as completed or in-progress to see what you can take next.
              </p>
            </div>
          )}
        </div>

        <div className="flex-1">
          {targetCourse ? (
            <CourseGraph
              targetCourse={targetCourse}
              completedCourses={completedCourses}
              inProgressCourses={inProgressCourses}
              showAdvanced={showAdvanced}
              onCourseClick={handleCourseClick}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl mb-4">📚</div>
                <h2 className="text-2xl font-bold text-white mb-2">Start Planning Your Courses</h2>
                <p className="text-slate-400 max-w-md">
                  Search for any course above to see its prerequisites and plan your academic pathway
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedCourseForDetails && (
        <CourseDetails
          courseCode={selectedCourseForDetails}
          onClose={() => setSelectedCourseForDetails(null)}
          onMarkCompleted={handleMarkCompleted}
          onMarkInProgress={handleMarkInProgress}
          onMarkNotTaken={handleMarkNotTaken}
          status={getCourseStatus(selectedCourseForDetails)}
        />
      )}
    </div>
  );
};

export default Dashboard;
