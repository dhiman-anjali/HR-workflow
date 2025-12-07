"use client";
import { Handle, Position } from "reactflow";
export default function EndNode({ data }: any) {
  return (
    <div style={{ padding: 10, borderRadius: 8, background: "#ecfccb", border: "1px solid #86efac" }}>
      <div style={{ fontWeight: 700 }}>{data?.message || "End"}</div>
      <div style={{ fontSize: 12 }}>{data?.summary ? "Will show summary" : "No summary"}</div>
      <Handle type="target" position={Position.Top} />
    </div>
  );
}
