import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';

/**
 * Search component with autocomplete dropdown
 */
export default function CourseSearch({ allCourses, selectedCourse, onCourseSelect, showAdvanced }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter courses based on search term
  const filteredCourses = useMemo(() => {
    if (!searchTerm.trim()) {
      return [];
    }

    const term = searchTerm.toLowerCase();
    return Object.entries(allCourses)
      .filter(([code, course]) => {
        // Filter out advanced courses if hidden
        if (course.isAdvanced && !showAdvanced) {
          return false;
        }
        // Search by code or title
        return (
          code.toLowerCase().includes(term) ||
          course.title.toLowerCase().includes(term)
        );
      })
      .slice(0, 10); // Limit to 10 results
  }, [searchTerm, allCourses, showAdvanced]);

  // Handle clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (courseCode) => {
    onCourseSelect(courseCode);
    setSearchTerm('');
    setIsOpen(false);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsOpen(false);
    onCourseSelect(null);
  };

  const selectedCourseData = selectedCourse ? allCourses[selectedCourse] : null;

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search courses by code or title..."
          className="w-full pl-10 pr-10 py-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        {selectedCourse && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
            aria-label="Clear selection"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Autocomplete dropdown */}
      {isOpen && filteredCourses.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl max-h-96 overflow-y-auto"
        >
          {filteredCourses.map(([code, course]) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className="w-full text-left px-4 py-3 hover:bg-slate-700 transition-colors border-b border-slate-700 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-slate-100">{code}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{course.title}</div>
                </div>
                {course.isAdvanced && (
                  <span className="bg-purple-500 text-purple-50 text-xs px-2 py-1 rounded font-semibold ml-2">
                    ADV
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected course info */}
      {selectedCourseData && (
        <div className="mt-3 p-3 bg-slate-800 border border-slate-700 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-semibold text-slate-100">
                {selectedCourseData.code}
                {selectedCourseData.isAdvanced && (
                  <span className="ml-2 bg-purple-500 text-purple-50 text-xs px-2 py-1 rounded font-semibold">
                    ADV
                  </span>
                )}
              </div>
              <div className="text-sm text-slate-400 mt-1">
                {selectedCourseData.title}
              </div>
            </div>
            <button
              onClick={handleClear}
              className="text-slate-400 hover:text-slate-200 transition-colors"
              aria-label="Clear selection"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
