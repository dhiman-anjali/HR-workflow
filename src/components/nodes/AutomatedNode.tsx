"use client";
import { Handle, Position } from "reactflow";
export default function AutomatedNode({ data }: any) {
  return (
    <div style={{ padding: 10, borderRadius: 8, background: "#f0f9ff", border: "1px solid #60a5fa" }}>
      <div style={{ fontWeight: 700 }}>{data?.title || "Automated"}</div>
      <div style={{ fontSize: 12 }}>{data?.actionId ? `Action: ${data.actionId}` : "No action"}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
