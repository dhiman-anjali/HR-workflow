"use client";
import React, { useCallback } from "react";
import ReactFlow, {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  Controls,
  ReactFlowProvider,
  useReactFlow,
  Node,
  Edge,
  Connection,
  NodeTypes,
} from "reactflow";
import "reactflow/dist/style.css";
import StartNode from "./nodes/StartNode";
import TaskNode from "./nodes/TaskNode";
import ApprovalNode from "./nodes/ApprovalNode";
import AutomatedNode from "./nodes/AutomatedNode";
import EndNode from "./nodes/EndNode";

type Props = {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
  onNodeClick: (node: Node | null) => void;
};

const nodeTypes: NodeTypes = {
  start: StartNode,
  task: TaskNode,
  approval: ApprovalNode,
  automated: AutomatedNode,
  end: EndNode,
};

function InnerCanvas({ nodes, edges, setNodes, setEdges, onNodeClick }: Props) {
  const rf = useReactFlow();

  const onNodesChange = useCallback((changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)), [setNodes]);
  const onEdgesChange = useCallback((changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)), [setEdges]);
  const onConnect = useCallback((params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const onDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("application/reactflow");
    if (!type) return;
    const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const position = rf.project ? rf.project({ x: event.clientX - bounds.left, y: event.clientY - bounds.top }) : { x: event.clientX - bounds.left, y: event.clientY - bounds.top };

    const id = `${type}_${Date.now()}`;
    const newNode: Node = {
      id,
      type,
      position,
      data: defaultDataForType(type),
    };
    setNodes((n) => [...n, newNode]);
  }, [rf, setNodes]);

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleNodeClick = useCallback((e: any, node: Node) => onNodeClick(node), [onNodeClick]);

  return (
    <div style={{ width: "100%", height: "100%" }} onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={handleNodeClick}
        fitView
        style={{ width: "100%", height: "100%" }} /* make sure ReactFlow fills the wrapper */
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default function Canvas(props: Props) {
  return (
    <ReactFlowProvider>
      <InnerCanvas {...props} />
    </ReactFlowProvider>
  );
}

function defaultDataForType(type: string) {
  switch (type) {
    case "start": return { title: "Start", metadata: {} };
    case "task": return { title: "Task", description: "", assignee: "", dueDate: "" };
    case "approval": return { title: "Approval", approverRole: "", autoApproveThreshold: 0 };
    case "automated": return { title: "Automated", actionId: "", params: {} };
    case "end": return { message: "End", summary: true };
    default: return {};
  }
}
