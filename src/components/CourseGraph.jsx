import React, { useCallback, useMemo } from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  ReactFlowProvider
} from 'reactflow';
import 'reactflow/dist/style.css';
import CourseNode from './CourseNode';
import { getAllPrerequisiteCodes } from '../utils/prerequisiteUtils';

// Register custom node type
const nodeTypes = {
  courseNode: CourseNode
};

/**
 * Main graph visualization component using ReactFlow
 */
export default function CourseGraph({
  selectedCourse,
  allCourses,
  completedCourses,
  inProgressCourses,
  unlockedCourses,
  showAdvanced,
  onCourseClick,
  onNodesChange,
  onEdgesChange
}) {
  // Build nodes and edges from course data
  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    const nodes = [];
    const edges = [];
    const processed = new Set();

    // Helper to get course status
    const getCourseStatus = (courseCode) => {
      if (completedCourses.has(courseCode)) return 'completed';
      if (inProgressCourses.has(courseCode)) return 'inProgress';
      if (unlockedCourses.includes(courseCode)) return 'unlocked';
      return 'locked';
    };

    // Helper to recursively add courses and their prerequisites
    const addCourseAndPrerequisites = (courseCode, depth = 0, position = { x: 0, y: 0 }) => {
      if (processed.has(courseCode) || !allCourses[courseCode]) {
        return position;
      }

      processed.add(courseCode);
      const course = allCourses[courseCode];
      
      // Skip advanced courses if hidden
      if (course.isAdvanced && !showAdvanced) {
        return position;
      }

      const status = getCourseStatus(courseCode);
      const isSelected = selectedCourse === courseCode;

      // Create node
      nodes.push({
        id: courseCode,
        type: 'courseNode',
        position,
        data: {
          course,
          status,
          showAdvanced,
          onClick: () => onCourseClick(courseCode)
        },
        selected: isSelected
      });

      // Process prerequisites
      if (course.prerequisites) {
        const prereqCodes = getAllPrerequisiteCodes(course.prerequisites);
        
        // Create edges for prerequisites
        prereqCodes.forEach(prereqCode => {
          if (allCourses[prereqCode]) {
            // Add edge from prerequisite to this course
            edges.push({
              id: `e-${prereqCode}-${courseCode}`,
              source: prereqCode,
              target: courseCode,
              type: 'smoothstep',
              animated: status === 'inProgress',
              style: {
                stroke: status === 'inProgress' ? '#3b82f6' : '#64748b',
                strokeWidth: 2
              }
            });

            // Recursively add prerequisite if not already processed
            if (!processed.has(prereqCode)) {
              // Position prerequisites to the left
              const prereqPosition = {
                x: position.x - 300,
                y: position.y + (prereqCodes.indexOf(prereqCode) - prereqCodes.length / 2) * 150
              };
              addCourseAndPrerequisites(prereqCode, depth + 1, prereqPosition);
            }
          }
        });
      }
    };

    // Start from selected course or show first few courses as entry points
    if (selectedCourse && allCourses[selectedCourse]) {
      addCourseAndPrerequisites(selectedCourse, 0, { x: 400, y: 200 });
    } else {
      // Show courses with no prerequisites as entry points
      const entryCourses = Object.entries(allCourses)
        .filter(([_, course]) => !course.prerequisites && (!course.isAdvanced || showAdvanced))
        .slice(0, 5);

      entryCourses.forEach(([code, _], index) => {
        const position = {
          x: 200 + (index % 3) * 250,
          y: 200 + Math.floor(index / 3) * 200
        };
        addCourseAndPrerequisites(code, 0, position);
      });
    }

    return { nodes, edges };
  }, [selectedCourse, allCourses, completedCourses, inProgressCourses, unlockedCourses, showAdvanced, onCourseClick]);

  const [nodes, setNodes, onNodesChangeInternal] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChangeInternal] = useEdgesState(initialEdges);

  // Update nodes and edges when dependencies change
  React.useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Combine internal and external handlers
  const handleNodesChange = useCallback((changes) => {
    onNodesChangeInternal(changes);
    if (onNodesChange) onNodesChange(changes);
  }, [onNodesChangeInternal, onNodesChange]);

  const handleEdgesChange = useCallback((changes) => {
    onEdgesChangeInternal(changes);
    if (onEdgesChange) onEdgesChange(changes);
  }, [onEdgesChangeInternal, onEdgesChange]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <ReactFlowProvider>
      <div className="w-full h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={handleNodesChange}
          onEdgesChange={handleEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2, maxZoom: 1.2 }}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: false
          }}
          connectionLineStyle={{ stroke: '#64748b', strokeWidth: 2 }}
          minZoom={0.1}
          maxZoom={2}
          attributionPosition="bottom-left"
        >
          <Controls className="bg-slate-800 border-slate-700" />
          <MiniMap
            className="bg-slate-800 border-slate-700"
            nodeColor={(node) => {
              if (node.data.status === 'completed') return '#16a34a';
              if (node.data.status === 'inProgress') return '#2563eb';
              if (node.data.status === 'unlocked') return '#64748b';
              return '#475569';
            }}
            maskColor="rgba(0, 0, 0, 0.6)"
          />
          <Background color="#1e293b" gap={16} />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}
