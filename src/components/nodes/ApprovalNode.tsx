"use client";
import { Handle, Position } from "reactflow";
export default function ApprovalNode({ data }: any) {
  return (
    <div style={{ padding: 10, borderRadius: 8, background: "#fff7ed", border: "1px solid #f59e0b" }}>
      <div style={{ fontWeight: 700 }}>{data?.title || "Approval"}</div>
      <div style={{ fontSize: 12 }}>{data?.approverRole ? `Role: ${data.approverRole}` : "Approver role not set"}</div>
      <div style={{ fontSize: 12 }}>Auto threshold: {data?.autoApproveThreshold ?? "—"}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
