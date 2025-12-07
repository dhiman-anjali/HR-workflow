"use client";
import React, { useState } from "react";
import type { Node, Edge } from "reactflow";
import { serializeFlow } from "../utils/serialize";

async function postSimulate(payload: any) {
  const res = await fetch("/api/simulate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(await res.text());
  }
  return res.json();
}

export default function SandboxPanel({ nodes, edges }: { nodes: Node[]; edges: Edge[]; }) {
  const [logs, setLogs] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validate = () => {
    const startCount = nodes.filter(n => n.type === "start").length;
    const endCount = nodes.filter(n => n.type === "end").length;
    if (startCount === 0) return "No start node present";
    if (endCount === 0) return "No end node present";
    return null;
  };

  const run = async () => {
    setError(null);
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setRunning(true);
    setLogs([]);
    try {
      const payload = serializeFlow(nodes, edges);
      const res = await postSimulate(payload);
      if (res.error) {
        setError(res.error);
      } else {
        setLogs(res.steps);
      }
    } catch (err: any) {
      setError(err.message || String(err));
    } finally {
      setRunning(false);
    }
  };

  return (
    <div style={{ padding: 8 }}>
      <h3>Sandbox</h3>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="button primary" onClick={run} disabled={running}>{running ? "Running..." : "Run Simulation"}</button>
      </div>

      {error && <div style={{ marginTop: 8, color: "crimson" }}>{error}</div>}

      <div style={{ marginTop: 12 }}>
        <h4>Execution Log</h4>
        <div style={{ minHeight: 80, maxHeight: 320, overflow: "auto", border: "1px solid #e6e9ee", padding: 8, borderRadius: 6 }}>
          {logs.length === 0 ? <div className="small-muted">No logs yet</div> : logs.map((l, i) => <div key={i} className="log">{i + 1}. {l}</div>)}
        </div>
      </div>
    </div>
  );
}
