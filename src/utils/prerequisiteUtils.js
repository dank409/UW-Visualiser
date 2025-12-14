/**
 * Utility functions for checking prerequisites and calculating unlocked courses
 */

/**
 * Check if a prerequisite requirement is satisfied given a set of completed courses
 * @param {string|null|object} prerequisite - Prerequisite requirement (null, string, or object)
 * @param {Set<string>} completedCourses - Set of completed course codes
 * @returns {boolean} - Whether the prerequisite is satisfied
 */
export function isPrerequisiteSatisfied(prerequisite, completedCourses) {
  if (prerequisite === null || prerequisite === undefined) {
    return true; // No prerequisite means it's satisfied
  }

  if (typeof prerequisite === 'string') {
    // Simple string prerequisite
    return completedCourses.has(prerequisite);
  }

  if (typeof prerequisite === 'object' && prerequisite.type) {
    const { type, courses } = prerequisite;
    
    if (!courses || !Array.isArray(courses)) {
      return false;
    }

    if (type === 'AND') {
      // All courses in the array must be satisfied
      return courses.every(course => {
        if (typeof course === 'string') {
          return completedCourses.has(course);
        } else if (typeof course === 'object' && course.type) {
          // Nested prerequisite structure
          return isPrerequisiteSatisfied(course, completedCourses);
        }
        return false;
      });
    } else if (type === 'OR') {
      // At least one course in the array must be satisfied
      return courses.some(course => {
        if (typeof course === 'string') {
          return completedCourses.has(course);
        } else if (typeof course === 'object' && course.type) {
          // Nested prerequisite structure
          return isPrerequisiteSatisfied(course, completedCourses);
        }
        return false;
      });
    }
  }

  return false;
}

/**
 * Check if a course is unlocked (prerequisites satisfied)
 * @param {object} course - Course object with prerequisites
 * @param {Set<string>} completedCourses - Set of completed course codes
 * @returns {boolean} - Whether the course is unlocked
 */
export function isCourseUnlocked(course, completedCourses) {
  if (!course || !course.prerequisites) {
    return true; // No prerequisites means it's always unlocked
  }

  return isPrerequisiteSatisfied(course.prerequisites, completedCourses);
}

/**
 * Get all courses that are unlocked given completed courses
 * @param {object} allCourses - All course data
 * @param {Set<string>} completedCourses - Set of completed course codes
 * @returns {string[]} - Array of unlocked course codes
 */
export function getUnlockedCourses(allCourses, completedCourses) {
  const unlocked = [];
  
  for (const [code, course] of Object.entries(allCourses)) {
    // Don't include courses that are already completed
    if (completedCourses.has(code)) {
      continue;
    }
    
    if (isCourseUnlocked(course, completedCourses)) {
      unlocked.push(code);
    }
  }
  
  return unlocked;
}

/**
 * Get courses that will unlock after completing in-progress courses
 * @param {object} allCourses - All course data
 * @param {Set<string>} completedCourses - Set of completed course codes
 * @param {Set<string>} inProgressCourses - Set of in-progress course codes
 * @returns {string[]} - Array of course codes that will unlock after completing in-progress
 */
export function getNextUnlockedCourses(allCourses, completedCourses, inProgressCourses) {
  // Simulate what would be unlocked if in-progress courses were completed
  const simulatedCompleted = new Set([...completedCourses, ...inProgressCourses]);
  const nextUnlocked = [];
  
  for (const [code, course] of Object.entries(allCourses)) {
    // Skip if already completed or in progress
    if (completedCourses.has(code) || inProgressCourses.has(code)) {
      continue;
    }
    
    // Check if it would be unlocked with simulated completion
    if (isCourseUnlocked(course, simulatedCompleted)) {
      // But make sure it's not already unlocked
      if (!isCourseUnlocked(course, completedCourses)) {
        nextUnlocked.push(code);
      }
    }
  }
  
  return nextUnlocked;
}

/**
 * Get all prerequisite course codes from a prerequisite structure
 * Recursively extracts all course codes
 * @param {string|null|object} prerequisite - Prerequisite requirement
 * @returns {string[]} - Array of all prerequisite course codes
 */
export function getAllPrerequisiteCodes(prerequisite) {
  if (prerequisite === null || prerequisite === undefined) {
    return [];
  }

  if (typeof prerequisite === 'string') {
    return [prerequisite];
  }

  if (typeof prerequisite === 'object' && prerequisite.type && Array.isArray(prerequisite.courses)) {
    const codes = [];
    for (const course of prerequisite.courses) {
      if (typeof course === 'string') {
        codes.push(course);
      } else if (typeof course === 'object' && course.type) {
        // Recursively get codes from nested structure
        codes.push(...getAllPrerequisiteCodes(course));
      }
    }
    return codes;
  }

  return [];
}

/**
 * Format prerequisite structure as a readable string
 * @param {string|null|object} prerequisite - Prerequisite requirement
 * @returns {string} - Formatted prerequisite string
 */
export function formatPrerequisites(prerequisite) {
  if (prerequisite === null || prerequisite === undefined) {
    return 'None';
  }

  if (typeof prerequisite === 'string') {
    return prerequisite;
  }

  if (typeof prerequisite === 'object' && prerequisite.type) {
    const { type, courses } = prerequisite;
    const formattedCourses = courses.map(course => {
      if (typeof course === 'string') {
        return course;
      } else if (typeof course === 'object' && course.type) {
        // Wrap nested structures in parentheses
        return `(${formatPrerequisites(course)})`;
      }
      return '';
    }).filter(Boolean);
    
    const separator = type === 'AND' ? ' AND ' : ' OR ';
    return formattedCourses.join(separator);
  }

  return 'Invalid';
}
