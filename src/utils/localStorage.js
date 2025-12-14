/**
 * Utility functions for localStorage persistence
 */

const STORAGE_KEY = 'uw-course-visualizer-progress';

/**
 * Load course progress from localStorage
 * @returns {object} - Object with completed and inProgress arrays
 */
export function loadCourseProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return {
        completed: new Set(parsed.completed || []),
        inProgress: new Set(parsed.inProgress || [])
      };
    }
  } catch (error) {
    console.error('Error loading course progress:', error);
  }
  
  return {
    completed: new Set(),
    inProgress: new Set()
  };
}

/**
 * Save course progress to localStorage
 * @param {Set<string>} completed - Set of completed course codes
 * @param {Set<string>} inProgress - Set of in-progress course codes
 */
export function saveCourseProgress(completed, inProgress) {
  try {
    const data = {
      completed: Array.from(completed),
      inProgress: Array.from(inProgress)
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving course progress:', error);
  }
}
