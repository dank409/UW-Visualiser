# UW Visualizer (WORK IN PROGRESS)

A clean, frontend-only React application that helps students visualize course prerequisites and plan their academic pathway at the University of Waterloo.

## Features

### 🎯 Core Functionality

- **Interactive Graph Visualization**: Interactive graph using ReactFlow showing prerequisite relationships between courses
- **Course Search**: Search for any course by code or title with autocomplete dropdown
- **Visual Course Status**: Color-coded nodes based on status:
  - 🟢 **Green**: Completed courses
  - 🔵 **Blue**: In-progress courses
  - ⚪ **Gray**: Unlocked/available courses
  - ⚫ **Dark Gray**: Locked courses (prerequisites not met)
- **Smart Course Unlocking**: Automatically calculates which courses are available based on completed prerequisites
- **Advanced Course Filtering**: Toggle to show/hide advanced courses (4xx, 6xx level courses)
- **Course Details Modal**: Click any course node to view full details including prerequisites, corequisites, and course units

### 📊 Sidebar Information

The sidebar shows organized lists:
- **Completed Courses**: All courses you've marked as completed
- **In Progress Courses**: Courses you're currently taking
- **Unlocked Now**: Courses available with your current prerequisites
- **Unlocked Next**: Courses that will unlock after completing in-progress courses

### 💾 Data Persistence (WORK IN PROGRESS)

- Course status (completed/in-progress) is automatically saved to browser localStorage
- Progress persists across page refreshes

## Prerequisites

- Node.js 18+ and npm (or yarn/pnpm)

## Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

## Development

Start the development server:

```bash
npm run dev
```

The application will open in your browser at `http://localhost:3000`

## Usage

1. **Search for a Course**: Use the search bar at the top to find a course by code (e.g., "MATH 135") or title
2. **View Prerequisites**: The graph will display the selected course and all its prerequisites with visual connections
3. **Mark Course Status**: Click on any course node to open the details modal, then mark it as:
   - **Completed**: Course you've finished
   - **In Progress**: Course you're currently taking
   - **Not Taken**: Default state for courses you haven't taken
4. **Track Progress**: The sidebar automatically updates to show which courses are unlocked based on your progress
5. **Filter Advanced Courses**: Toggle the "Show Advanced Courses" checkbox to include/exclude advanced level courses

## Technology Stack

- **React 18+** - UI framework
- **ReactFlow 11+** - Graph visualization
- **React Router 6+** - Routing (single route)
- **Tailwind CSS 3+** - Styling
- **lucide-react** - Icons
- **Vite** - Build tool

## License

MIT License - feel free to use this project for your own purposes.
