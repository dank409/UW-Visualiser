import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { coursesData } from '../data/mockCourses';

const CourseSearch = ({ onCourseSelect, selectedCourse }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredCourses = Object.values(coursesData).filter(course =>
    course.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (courseCode) => {
    onCourseSelect(courseCode);
    setSearchTerm('');
    setIsOpen(false);
  };

  const clearSelection = () => {
    onCourseSelect(null);
    setSearchTerm('');
  };

  return (
    <div className="relative" ref={wrapperRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for a course (e.g., AMATH 231)..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {selectedCourse && (
          <button
            onClick={clearSelection}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {isOpen && searchTerm && filteredCourses.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto">
          {filteredCourses.slice(0, 10).map(course => (
            <div
              key={course.code}
              onClick={() => handleSelect(course.code)}
              className="px-4 py-3 hover:bg-slate-700 cursor-pointer transition-colors border-b border-slate-700 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-semibold text-white">{course.code}</div>
                  <div className="text-sm text-slate-300 mt-1">{course.title}</div>
                </div>
                {course.isAdvanced && (
                  <span className="text-xs px-2 py-1 bg-purple-500 text-white rounded-full">
                    Advanced
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedCourse && (
        <div className="mt-3 p-3 bg-slate-800 border border-slate-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-white">{selectedCourse}</div>
              <div className="text-sm text-slate-300 mt-1">
                {coursesData[selectedCourse]?.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseSearch;
