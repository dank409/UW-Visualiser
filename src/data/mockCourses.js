/**
 * Mock course data for University of Waterloo
 * Prerequisites can be:
 * - null: no prerequisites
 * - string: single prerequisite (e.g., "MATH 135")
 * - object: {type: 'AND'|'OR', courses: [...]} - nested structures supported
 */
export const coursesData = {
  // First year Math courses
  'MATH 135': {
    code: 'MATH 135',
    title: 'Algebra for Honours Mathematics',
    description: 'An introduction to abstract mathematical thinking, covering logic, proofs, sets, relations, functions, and number theory.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: false
  },
  'MATH 137': {
    code: 'MATH 137',
    title: 'Calculus 1 for Honours Mathematics',
    description: 'Differential and integral calculus for functions of one variable.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: false
  },
  'MATH 136': {
    code: 'MATH 136',
    title: 'Linear Algebra 1 for Honours Mathematics',
    description: 'Systems of linear equations, vector spaces, linear transformations, matrices, determinants, eigenvalues and eigenvectors.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: false
  },
  'MATH 138': {
    code: 'MATH 138',
    title: 'Calculus 2 for Honours Mathematics',
    description: 'Integration techniques, sequences and series, power series, Taylor series, and applications.',
    units: 0.50,
    prerequisites: 'MATH 137',
    corequisites: null,
    isAdvanced: false
  },
  
  // Advanced first year courses
  'MATH 145': {
    code: 'MATH 145',
    title: 'Algebra (Advanced Level)',
    description: 'Advanced level algebra course for exceptional students. More rigorous treatment of abstract algebra.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: true
  },
  'MATH 147': {
    code: 'MATH 147',
    title: 'Calculus 1 (Advanced Level)',
    description: 'Advanced level calculus course with more theoretical depth and rigor.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: true
  },
  'MATH 146': {
    code: 'MATH 146',
    title: 'Linear Algebra 1 (Advanced Level)',
    description: 'Advanced level linear algebra with deeper theoretical foundations.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: true
  },
  'MATH 148': {
    code: 'MATH 148',
    title: 'Calculus 2 (Advanced Level)',
    description: 'Advanced level calculus 2 with enhanced theoretical treatment.',
    units: 0.50,
    prerequisites: 'MATH 147',
    corequisites: null,
    isAdvanced: true
  },

  // Second year Math courses
  'MATH 235': {
    code: 'MATH 235',
    title: 'Linear Algebra 2 for Honours Mathematics',
    description: 'Advanced topics in linear algebra including inner product spaces, diagonalization, and Jordan canonical form.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: ['MATH 136', 'MATH 138']
    },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 237': {
    code: 'MATH 237',
    title: 'Calculus 3 for Honours Mathematics',
    description: 'Calculus of functions of several variables, partial derivatives, multiple integrals, line and surface integrals.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: ['MATH 137', 'MATH 136']
    },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 239': {
    code: 'MATH 239',
    title: 'Introduction to Combinatorics',
    description: 'Counting techniques, generating functions, recurrence relations, graph theory basics.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['MATH 135', 'MATH 145']
    },
    corequisites: null,
    isAdvanced: false
  },
  'MATH 245': {
    code: 'MATH 245',
    title: 'Linear Algebra 2 (Advanced Level)',
    description: 'Advanced treatment of linear algebra topics.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: ['MATH 146', 'MATH 148']
    },
    corequisites: null,
    isAdvanced: true
  },
  'MATH 247': {
    code: 'MATH 247',
    title: 'Calculus 3 (Advanced Level)',
    description: 'Advanced level multivariable calculus.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: ['MATH 147', 'MATH 146']
    },
    corequisites: null,
    isAdvanced: true
  },

  // CS courses
  'CS 135': {
    code: 'CS 135',
    title: 'Designing Functional Programs',
    description: 'Introduction to computer science using functional programming. Problem solving, recursion, data structures.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: false
  },
  'CS 136': {
    code: 'CS 136',
    title: 'Elementary Algorithm Design and Data Abstraction',
    description: 'Object-oriented programming, basic data structures, algorithm design and analysis.',
    units: 0.50,
    prerequisites: 'CS 135',
    corequisites: null,
    isAdvanced: false
  },
  'CS 145': {
    code: 'CS 145',
    title: 'Designing Functional Programs (Advanced Level)',
    description: 'Advanced functional programming course for exceptional students.',
    units: 0.50,
    prerequisites: null,
    corequisites: null,
    isAdvanced: true
  },
  'CS 146': {
    code: 'CS 146',
    title: 'Elementary Algorithm Design (Advanced Level)',
    description: 'Advanced level algorithm design and data structures.',
    units: 0.50,
    prerequisites: 'CS 145',
    corequisites: null,
    isAdvanced: true
  },
  'CS 240': {
    code: 'CS 240',
    title: 'Data Structures and Data Management',
    description: 'Advanced data structures, hashing, trees, graphs, sorting algorithms, and analysis.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['CS 136', 'CS 146']
    },
    corequisites: null,
    isAdvanced: false
  },
  'CS 241': {
    code: 'CS 241',
    title: 'Foundations of Sequential Programs',
    description: 'Programming languages, compilers, memory management, linking, assembly language.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['CS 136', 'CS 146']
    },
    corequisites: null,
    isAdvanced: false
  },
  'CS 245': {
    code: 'CS 245',
    title: 'Logic and Computation',
    description: 'Propositional and predicate logic, formal proofs, program verification, computability.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: [
        {
          type: 'OR',
          courses: ['CS 136', 'CS 146']
        },
        {
          type: 'OR',
          courses: ['MATH 135', 'MATH 145']
        }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },
  'CS 246': {
    code: 'CS 246',
    title: 'Object-Oriented Software Development',
    description: 'Advanced OOP, design patterns, software engineering principles, testing, version control.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['CS 136', 'CS 146']
    },
    corequisites: null,
    isAdvanced: false
  },
  'CS 341': {
    code: 'CS 341',
    title: 'Algorithms',
    description: 'Design and analysis of algorithms, dynamic programming, greedy algorithms, graph algorithms, NP-completeness.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: ['CS 240', {
        type: 'OR',
        courses: ['MATH 239', 'CO 342']
      }]
    },
    corequisites: null,
    isAdvanced: false
  },

  // Applied Math courses
  'AMATH 250': {
    code: 'AMATH 250',
    title: 'Introduction to Differential Equations',
    description: 'Ordinary differential equations, systems of ODEs, phase plane analysis, applications.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: [
        {
          type: 'OR',
          courses: ['MATH 137', 'MATH 147']
        },
        {
          type: 'OR',
          courses: ['MATH 136', 'MATH 146']
        }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },
  'AMATH 251': {
    code: 'AMATH 251',
    title: 'Introduction to Differential Equations (Advanced)',
    description: 'Advanced treatment of differential equations.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: ['MATH 147', 'MATH 146']
    },
    corequisites: null,
    isAdvanced: true
  },
  'AMATH 351': {
    code: 'AMATH 351',
    title: 'Ordinary Differential Equations 2',
    description: 'Advanced ODEs, stability theory, boundary value problems, numerical methods.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['AMATH 250', 'AMATH 251']
    },
    corequisites: null,
    isAdvanced: false
  },

  // Statistics courses
  'STAT 230': {
    code: 'STAT 230',
    title: 'Probability',
    description: 'Probability theory, random variables, distributions, expectation, conditional probability.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['MATH 137', 'MATH 147']
    },
    corequisites: null,
    isAdvanced: false
  },
  'STAT 231': {
    code: 'STAT 231',
    title: 'Statistics',
    description: 'Statistical inference, estimation, hypothesis testing, regression analysis.',
    units: 0.50,
    prerequisites: 'STAT 230',
    corequisites: null,
    isAdvanced: false
  },
  'STAT 330': {
    code: 'STAT 330',
    title: 'Mathematical Statistics',
    description: 'Advanced probability and statistical theory, limit theorems, estimation theory.',
    units: 0.50,
    prerequisites: {
      type: 'AND',
      courses: [
        'STAT 230',
        {
          type: 'OR',
          courses: ['MATH 237', 'MATH 247']
        }
      ]
    },
    corequisites: null,
    isAdvanced: false
  },

  // Combinatorics and Optimization
  'CO 250': {
    code: 'CO 250',
    title: 'Introduction to Optimization',
    description: 'Linear programming, simplex method, duality, network flows, integer programming.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['MATH 136', 'MATH 146']
    },
    corequisites: null,
    isAdvanced: false
  },
  'CO 342': {
    code: 'CO 342',
    title: 'Introduction to Graph Theory',
    description: 'Graph theory fundamentals, trees, connectivity, planarity, coloring, matchings.',
    units: 0.50,
    prerequisites: {
      type: 'OR',
      courses: ['MATH 239', 'MATH 249']
    },
    corequisites: null,
    isAdvanced: false
  }
};
