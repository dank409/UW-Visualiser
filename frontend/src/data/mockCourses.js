// Mock UW course data with realistic prerequisites
export const coursesData = {
  // First Year Math
  'MATH 135': {
    code: 'MATH 135',
    title: 'Algebra for Honours Mathematics',
    description: 'An introduction to the language of mathematics and proof techniques through a study of the basic algebraic systems.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: false
  },
  'MATH 145': {
    code: 'MATH 145',
    title: 'Algebra (Advanced Level)',
    description: 'Advanced treatment of topics in MATH 135.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: true,
    replaces: ['MATH 135']
  },
  'MATH 137': {
    code: 'MATH 137',
    title: 'Calculus 1 for Honours Mathematics',
    description: 'Limits, derivatives, applications of derivatives, inverse functions, exponentials, logarithms, introduction to integration.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: false
  },
  'MATH 147': {
    code: 'MATH 147',
    title: 'Calculus 1 (Advanced Level)',
    description: 'Advanced treatment of topics in MATH 137.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: true,
    replaces: ['MATH 137']
  },
  'MATH 136': {
    code: 'MATH 136',
    title: 'Linear Algebra 1 for Honours Mathematics',
    description: 'Systems of linear equations, matrix algebra, vectors in n-space, vector spaces, bases, dimension, linear transformations.',
    units: 0.50,
    prerequisites: { type: 'AND', courses: ['MATH 135'] },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 146': {
    code: 'MATH 146',
    title: 'Linear Algebra 1 (Advanced Level)',
    description: 'Advanced treatment of topics in MATH 136.',
    units: 0.50,
    prerequisites: { type: 'AND', courses: ['MATH 145'] },
    corequisites: null,
    isAdvanced: true,
    replaces: ['MATH 136']
  },
  'MATH 138': {
    code: 'MATH 138',
    title: 'Calculus 2 for Honours Mathematics',
    description: 'Techniques of integration, applications of the integral, introduction to differential equations, infinite series.',
    units: 0.50,
    prerequisites: { type: 'AND', courses: ['MATH 137'] },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 148': {
    code: 'MATH 148',
    title: 'Calculus 2 (Advanced Level)',
    description: 'Advanced treatment of topics in MATH 138.',
    units: 0.50,
    prerequisites: { type: 'AND', courses: ['MATH 147'] },
    corequisites: null,
    isAdvanced: true,
    replaces: ['MATH 138']
  },

  // Second Year Math
  'MATH 237': {
    code: 'MATH 237',
    title: 'Calculus 3 for Honours Mathematics',
    description: 'Multivariable calculus: partial derivatives, multiple integrals, vector calculus.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['MATH 138', 'MATH 148'] },
        { type: 'OR', courses: ['MATH 136', 'MATH 146'] }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 247': {
    code: 'MATH 247',
    title: 'Calculus 3 (Advanced Level)',
    description: 'Advanced treatment of topics in MATH 237.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['MATH 148', 'MATH 138'] },
        { type: 'OR', courses: ['MATH 146', 'MATH 136'] }
      ]
    },
    corequisites: null,
    isAdvanced: true,
    replaces: ['MATH 237']
  },
  'MATH 235': {
    code: 'MATH 235',
    title: 'Linear Algebra 2 for Honours Mathematics',
    description: 'Determinants, eigenvalues and eigenvectors, diagonalization, inner products, orthogonality.',
    units: 0.50,
    prerequisites: { type: 'OR', courses: ['MATH 136', 'MATH 146'] },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 245': {
    code: 'MATH 245',
    title: 'Linear Algebra 2 (Advanced Level)',
    description: 'Advanced treatment of topics in MATH 235.',
    units: 0.50,
    prerequisites: { type: 'AND', courses: ['MATH 146'] },
    corequisites: null,
    isAdvanced: true,
    replaces: ['MATH 235']
  },

  // Applied Math
  'AMATH 231': {
    code: 'AMATH 231',
    title: 'Calculus 4',
    description: 'Differential equations and their applications.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['MATH 138', 'MATH 148'] }
      ]
    },
    corequisites: { type: 'OR', courses: ['MATH 237', 'MATH 247'] },
    isAdvanced: false
  },
  'AMATH 250': {
    code: 'AMATH 250',
    title: 'Introduction to Differential Equations',
    description: 'First and second order ordinary differential equations, systems of linear ODEs, applications.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['MATH 138', 'MATH 148'] },
        { type: 'OR', courses: ['MATH 136', 'MATH 146'] }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },
  'AMATH 251': {
    code: 'AMATH 251',
    title: 'Introduction to Differential Equations and Applications',
    description: 'Advanced treatment of differential equations with applications.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        'AMATH 250',
        { type: 'OR', courses: ['MATH 237', 'MATH 247'] }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },

  // Computer Science
  'CS 135': {
    code: 'CS 135',
    title: 'Designing Functional Programs',
    description: 'Introduction to computer science through functional programming.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: false
  },
  'CS 145': {
    code: 'CS 145',
    title: 'Designing Functional Programs (Advanced Level)',
    description: 'Advanced treatment of topics in CS 135.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: true,
    replaces: ['CS 135']
  },
  'CS 136': {
    code: 'CS 136',
    title: 'Elementary Algorithm Design and Data Abstraction',
    description: 'Data structures, recursion, sorting, searching, algorithm analysis.',
    units: 0.50,
    prerequisites: { type: 'OR', courses: ['CS 135', 'CS 145'] },
    corequisites: null,
    isAdvanced: false
  },
  'CS 146': {
    code: 'CS 146',
    title: 'Elementary Algorithm Design and Data Abstraction (Advanced Level)',
    description: 'Advanced treatment of topics in CS 136.',
    units: 0.50,
    prerequisites: { type: 'AND', courses: ['CS 145'] },
    corequisites: null,
    isAdvanced: true,
    replaces: ['CS 136']
  },
  'CS 240': {
    code: 'CS 240',
    title: 'Data Structures and Data Management',
    description: 'Advanced data structures: priority queues, dictionaries, graphs, string matching, compression.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['CS 136', 'CS 146'] },
        { type: 'OR', courses: ['MATH 135', 'MATH 145'] }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },
  'CS 241': {
    code: 'CS 241',
    title: 'Foundations of Sequential Programs',
    description: 'Assemblers, compilers, linkers, loaders, operating systems, concurrent programming.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['CS 136', 'CS 146'] },
        { type: 'OR', courses: ['MATH 135', 'MATH 145'] }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },
  'CS 341': {
    code: 'CS 341',
    title: 'Algorithms',
    description: 'Algorithm design techniques, graph algorithms, NP-completeness.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        'CS 240',
        { type: 'OR', courses: ['MATH 239', 'MATH 249'] }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },

  // Additional courses for pathway visualization
  'MATH 239': {
    code: 'MATH 239',
    title: 'Introduction to Combinatorics',
    description: 'Graph theory, counting techniques, generating functions.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['MATH 135', 'MATH 145'] },
        { type: 'OR', courses: ['MATH 138', 'MATH 148'] }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 249': {
    code: 'MATH 249',
    title: 'Introduction to Combinatorics (Advanced Level)',
    description: 'Advanced treatment of topics in MATH 239.',
    units: 0.50,
    prerequisites: { 
      type: 'AND', 
      courses: [
        { type: 'OR', courses: ['MATH 145', 'MATH 135'] },
        { type: 'OR', courses: ['MATH 148', 'MATH 138'] }
      ]
    },
    corequisites: null,
    isAdvanced: true,
    replaces: ['MATH 239']
  }
};

// Helper function to get all prerequisites recursively
export function getAllPrerequisites(courseCode, showAdvanced = false) {
  const visited = new Set();
  const result = [];

  function traverse(code) {
    if (visited.has(code) || !coursesData[code]) return;
    visited.add(code);

    const course = coursesData[code];
    
    // Skip advanced courses if not showing them
    if (!showAdvanced && course.isAdvanced) {
      // Try to find regular alternative
      const regularCode = Object.keys(coursesData).find(
        key => coursesData[key].replaces && coursesData[key].replaces.includes(code)
      );
      if (regularCode) {
        traverse(regularCode);
      }
      return;
    }

    result.push(course);

    if (course.prerequisites) {
      traversePrereqNode(course.prerequisites);
    }
  }

  function traversePrereqNode(node) {
    if (typeof node === 'string') {
      traverse(node);
    } else if (node.type === 'AND' || node.type === 'OR') {
      node.courses.forEach(course => {
        if (typeof course === 'string') {
          traverse(course);
        } else {
          traversePrereqNode(course);
        }
      });
    }
  }

  traverse(courseCode);
  return result;
}

// Helper to check if a course is unlocked
export function isCourseUnlocked(courseCode, completedCourses, showAdvanced = false) {
  const course = coursesData[courseCode];
  if (!course) return false;
  
  if (!course.prerequisites) return true;
  
  return checkPrereqNode(course.prerequisites, completedCourses, showAdvanced);
}

function checkPrereqNode(node, completedCourses, showAdvanced) {
  if (typeof node === 'string') {
    // Check if completed or if advanced alternative is completed
    if (completedCourses.includes(node)) return true;
    
    const course = coursesData[node];
    if (course && course.isAdvanced && !showAdvanced) {
      // Check if regular version is completed
      const regularCode = Object.keys(coursesData).find(
        key => coursesData[key].replaces && coursesData[key].replaces.includes(node)
      );
      return regularCode && completedCourses.includes(regularCode);
    }
    
    return false;
  }
  
  if (node.type === 'AND') {
    return node.courses.every(course => 
      typeof course === 'string' 
        ? checkPrereqNode(course, completedCourses, showAdvanced)
        : checkPrereqNode(course, completedCourses, showAdvanced)
    );
  }
  
  if (node.type === 'OR') {
    return node.courses.some(course => 
      typeof course === 'string'
        ? checkPrereqNode(course, completedCourses, showAdvanced)
        : checkPrereqNode(course, completedCourses, showAdvanced)
    );
  }
  
  return false;
}
