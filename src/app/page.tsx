"use client";

import React from "react";
import Sidebar from "../components/Sidebar";
import Canvas from "../components/Canvas"; // existing Canvas component in earlier code
import NodeFormPanel from "../components/NodeFormPanel";
import SandboxPanel from "../components/SandboxPanel";
import { useFlowState } from "../hooks/useFlow";
import type { Node, Edge } from "reactflow";

export default function Page() {
  const {
    nodes, setNodes,
    edges, setEdges,
    selectedNode, setSelectedNode,
  } = useFlowState();

  const onSaveNode = (id: string, data: any) => {
    setNodes((old) => old.map((n) => (n.id === id ? { ...n, data: { ...n.data, ...data } } : n)));
    setSelectedNode((s) => (s && s.id === id ? { ...s, data: { ...s.data, ...data } } : s));
  };

  return (
    <div className="app">
      <div className="sidebar">
        <Sidebar />
      </div>

      <div className="content">
        <div className="topbar">
          <strong>HR Workflow Designer</strong>
        </div>

        <div className="main">
          <div className="canvas">
            <Canvas
              nodes={nodes}
              edges={edges}
              setNodes={setNodes}
              setEdges={setEdges}
              onNodeClick={(node) => setSelectedNode(node as Node | null)}
            />
          </div>

          <div className="panel">
            <NodeFormPanel node={selectedNode as Node | null} onSave={onSaveNode} />
          </div>

          <div className="panel" style={{ width: 320 }}>
            <SandboxPanel nodes={nodes} edges={edges} />
          </div>
        </div>
      </div>
    </div>
  );
}
