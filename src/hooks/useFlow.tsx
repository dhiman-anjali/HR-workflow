"use client";
import { useCallback, useState } from "react";
import type { Node, Edge } from "reactflow";

export function useFlowState(initialNodes: Node[] = [], initialEdges: Edge[] = []) {
  const [nodes, setNodes] = useState<Node[]>(initialNodes);
  const [edges, setEdges] = useState<Edge[]>(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const addNode = useCallback((n: Node) => setNodes((old) => [...old, n]), []);
  const updateNodeData = useCallback((id: string, data: any) => setNodes((old) => old.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n))), []);
  const removeNode = useCallback((id: string) => {
    setNodes((old) => old.filter((n) => n.id !== id));
    setEdges((old) => old.filter((e) => e.source !== id && e.target !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
  }, [selectedNode]);

  return {
    nodes, setNodes,
    edges, setEdges,
    selectedNode, setSelectedNode,
    addNode, updateNodeData, removeNode,
  };
}
