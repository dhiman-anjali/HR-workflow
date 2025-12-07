"use client";
import { Handle, Position } from "reactflow";
export default function StartNode({ data }: any) {
  return (
    <div style={{ padding: 10, borderRadius: 8, background: "#ecfeff", border: "1px solid #06b6d4" }}>
      <div style={{ fontWeight: 700 }}>{data?.title || "Start"}</div>
      <div style={{ fontSize: 12, color: "#065f46" }}>{data?.metadata ? "Metadata set" : "No metadata"}</div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
