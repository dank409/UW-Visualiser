import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CourseNode from './CourseNode';
import { coursesData } from '../data/mockCourses';

const nodeTypes = {
  courseNode: CourseNode,
};

const CourseGraph = ({ 
  targetCourse, 
  completedCourses, 
  inProgressCourses, 
  showAdvanced,
  onCourseClick 
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const buildGraph = useCallback(() => {
    if (!targetCourse || !coursesData[targetCourse]) {
      setNodes([]);
      setEdges([]);
      return;
    }

    const visited = new Set();
    const nodeMap = new Map();
    const edgeList = [];
    let nodeId = 0;

    // Calculate if course is unlocked
    const isCourseUnlocked = (courseCode) => {
      const course = coursesData[courseCode];
      if (!course || !course.prerequisites) return true;
      return checkPrereqNode(course.prerequisites);
    };

    const checkPrereqNode = (node) => {
      if (typeof node === 'string') {
        return completedCourses.includes(node);
      }
      if (node.type === 'AND') {
        return node.courses.every(c => 
          typeof c === 'string' ? completedCourses.includes(c) : checkPrereqNode(c)
        );
      }
      if (node.type === 'OR') {
        return node.courses.some(c => 
          typeof c === 'string' ? completedCourses.includes(c) : checkPrereqNode(c)
        );
      }
      return false;
    };

    const getStatus = (courseCode) => {
      if (completedCourses.includes(courseCode)) return 'completed';
      if (inProgressCourses.includes(courseCode)) return 'in-progress';
      return null;
    };

    const buildTree = (courseCode, level = 0, parentId = null) => {
      const course = coursesData[courseCode];
      if (!course || visited.has(courseCode)) return null;
      
      // Skip advanced courses if not showing them
      if (!showAdvanced && course.isAdvanced) return null;
      
      visited.add(courseCode);
      const currentNodeId = `node-${nodeId++}`;
      
      nodeMap.set(courseCode, {
        id: currentNodeId,
        type: 'courseNode',
        position: { x: 0, y: level * 150 },
        data: { 
          course,
          status: getStatus(courseCode),
          isUnlocked: isCourseUnlocked(courseCode),
          onClick: onCourseClick
        },
      });

      if (parentId) {
        edgeList.push({
          id: `edge-${currentNodeId}-${parentId}`,
          source: currentNodeId,
          target: parentId,
          type: 'smoothstep',
          animated: getStatus(courseCode) === 'in-progress',
          style: { 
            stroke: getStatus(courseCode) === 'completed' ? '#10b981' : 
                   getStatus(courseCode) === 'in-progress' ? '#3b82f6' : '#64748b',
            strokeWidth: 2
          },
        });
      }

      // Process prerequisites
      if (course.prerequisites) {
        processPrereqNode(course.prerequisites, level + 1, currentNodeId);
      }

      return currentNodeId;
    };

    const processPrereqNode = (node, level, parentId) => {
      if (typeof node === 'string') {
        buildTree(node, level, parentId);
      } else if (node.type === 'AND' || node.type === 'OR') {
        node.courses.forEach(course => {
          if (typeof course === 'string') {
            buildTree(course, level, parentId);
          } else {
            processPrereqNode(course, level, parentId);
          }
        });
      }
    };

    buildTree(targetCourse, 0);

    // Layout nodes using a simple algorithm
    const nodeArray = Array.from(nodeMap.values());
    const levelMap = new Map();
    
    nodeArray.forEach(node => {
      const level = node.position.y / 150;
      if (!levelMap.has(level)) {
        levelMap.set(level, []);
      }
      levelMap.get(level).push(node);
    });

    levelMap.forEach((nodesAtLevel, level) => {
      const width = nodesAtLevel.length * 250;
      nodesAtLevel.forEach((node, index) => {
        node.position.x = (index - (nodesAtLevel.length - 1) / 2) * 250;
      });
    });

    setNodes(nodeArray);
    setEdges(edgeList);
  }, [targetCourse, completedCourses, inProgressCourses, showAdvanced, onCourseClick, setNodes, setEdges]);

  useEffect(() => {
    buildGraph();
  }, [buildGraph]);

  return (
    <div className="w-full h-full bg-slate-900">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        nodesDraggable={false}
        nodesConnectable={false}
        elementsSelectable={true}
        fitView
        attributionPosition="bottom-left"
      >
        <Background color="#475569" gap={16} />
        <Controls className="bg-slate-800 border-slate-700" />
        <MiniMap 
          className="bg-slate-800 border-slate-700" 
          nodeColor={(node) => {
            if (node.data.status === 'completed') return '#10b981';
            if (node.data.status === 'in-progress') return '#3b82f6';
            if (node.data.isUnlocked) return '#475569';
            return '#1e293b';
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default CourseGraph;
