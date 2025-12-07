"use client";
import { Handle, Position } from "reactflow";
export default function TaskNode({ data }: any) {
  return (
    <div style={{ padding: 10, borderRadius: 8, background: "#fff", border: "1px solid #cbd5e1" }}>
      <div style={{ fontWeight: 700 }}>{data?.title || "Task"}</div>
      <div style={{ fontSize: 12, color: "#374151" }}>{data?.assignee ? `Assignee: ${data.assignee}` : "No assignee"}</div>
      <div style={{ marginTop: 8, fontSize: 12 }}>{data?.description}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
