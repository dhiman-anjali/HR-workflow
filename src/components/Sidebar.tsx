"use client";
import React from "react";

const NODE_LIST = [
  { type: "start", label: "Start Node" },
  { type: "task", label: "Task Node" },
  { type: "approval", label: "Approval Node" },
  { type: "automated", label: "Automated Step" },
  { type: "end", label: "End Node" },
];

export default function Sidebar() {
  const onDragStart = (e: React.DragEvent, nodeType: string) => {
    e.dataTransfer.setData("application/reactflow", nodeType);
    e.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="sidebar">
      <h3>Nodes</h3>
      <p className="small-muted">Drag a node onto the canvas</p>

      <div style={{ marginTop: 12 }}>
        {NODE_LIST.map((n) => (
          <div
            key={n.type}
            className="node-item"
            draggable
            onDragStart={(e) => onDragStart(e, n.type)}
          >
            {n.label}
          </div>
        ))}
      </div>

      <div style={{ marginTop: "auto" }}>
        <h4>Notes</h4>
        <div className="small-muted">
          Click a node on the canvas to edit it in the right panel.
        </div>
      </div>
    </aside>
  );
}
