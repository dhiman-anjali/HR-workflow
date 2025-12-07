"use client";
import React, { useEffect, useState } from "react";
import type { Node } from "reactflow";

async function fetchAutomations() {
  const res = await fetch("/api/automations");
  if (!res.ok) throw new Error("Failed to fetch automations");
  return res.json();
}

export default function NodeFormPanel({ node, onSave }: { node: Node | null; onSave: (id: string, data: any) => void; }) {
  const [local, setLocal] = useState<any>(null);
  const [actions, setActions] = useState<any[]>([]);

  useEffect(() => {
    if (!node) return;
    setLocal(node.data ?? {});
  }, [node]);

  useEffect(() => {
    fetchAutomations().then(setActions).catch(() => setActions([]));
  }, []);

  if (!node) return <div style={{ padding: 8 }}>Select a node to edit its properties</div>;

  const save = () => {
    console.log('saving node --> ', node.id, local);
    onSave(node.id, local);
  };

  const renderFields = () => {
    const t = node.type;
    switch (t) {
      case "start":
        return (
          <>
            <div className="form-row"><label>Title</label><input value={local?.title || ""} onChange={(e) => setLocal({ ...local, title: e.target.value })} /></div>
            <div className="form-row"><label>Metadata (key=value per line)</label><textarea value={local?.metadataText || ""} onChange={(e) => setLocal({ ...local, metadataText: e.target.value, metadata: textToMetadata(e.target.value) })} /></div>
          </>
        );
      case "task":
        return (
          <>
            <div className="form-row"><label>Title *</label><input value={local?.title || ""} onChange={(e) => setLocal({ ...local, title: e.target.value })} /></div>
            <div className="form-row"><label>Description</label><textarea value={local?.description || ""} onChange={(e) => setLocal({ ...local, description: e.target.value })} /></div>
            <div className="form-row"><label>Assignee</label><input value={local?.assignee || ""} onChange={(e) => setLocal({ ...local, assignee: e.target.value })} /></div>
            <div className="form-row"><label>Due Date</label><input type="date" value={local?.dueDate || ""} onChange={(e) => setLocal({ ...local, dueDate: e.target.value })} /></div>
          </>
        );
      case "approval":
        return (
          <>
            <div className="form-row"><label>Title</label><input value={local?.title || ""} onChange={(e) => setLocal({ ...local, title: e.target.value })} /></div>
            <div className="form-row"><label>Approver Role</label><input value={local?.approverRole || ""} onChange={(e) => setLocal({ ...local, approverRole: e.target.value })} /></div>
            <div className="form-row"><label>Auto-approve threshold</label><input type="number" value={local?.autoApproveThreshold ?? ""} onChange={(e) => setLocal({ ...local, autoApproveThreshold: e.target.value ? Number(e.target.value) : undefined })} /></div>
          </>
        );
      case "automated":
        return (
          <>
            <div className="form-row"><label>Title</label><input value={local?.title || ""} onChange={(e) => setLocal({ ...local, title: e.target.value })} /></div>
            <div className="form-row">
              <label>Action</label>
              <select value={local?.actionId || ""} onChange={(e) => setLocal({ ...local, actionId: e.target.value, params: {} })}>
                <option value="">-- choose action --</option>
                {actions.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
              </select>
            </div>
            {local?.actionId && (() => {
              const action = actions.find((a) => a.id === local?.actionId);
              if (!action) return null;
              return (
                <>
                  <div style={{ fontSize: 12, marginBottom: 6 }} className="small-muted">Action params</div>
                  {action.params.map((p: string) => (
                    <div key={p} className="form-row">
                      <label>{p}</label>
                      <input value={(local?.params?.[p]) || ""} onChange={(e) => setLocal({ ...local, params: { ...local?.params, [p]: e.target.value } })} />
                    </div>
                  ))}
                </>
              );
            })()}
          </>
        );
      case "end":
        return (
          <>
            <div className="form-row"><label>End Message</label><input value={local?.message || ""} onChange={(e) => setLocal({ ...local, message: e.target.value })} /></div>
            <div className="form-row"><label><input type="checkbox" checked={!!local?.summary} onChange={(e) => setLocal({ ...local, summary: e.target.checked })} /> Show summary</label></div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <h3 style={{ marginTop: 0 }}>{String(node.type).toUpperCase()} Node</h3>
      <div style={{ maxHeight: 520, overflow: "auto" }}>
        {renderFields()}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
        <button className="button primary" onClick={save}>Save</button>
      </div>
    </div>
  );
}

function metadataToText(md: Record<string, string> | undefined) {
  if (!md) return "";
  return Object.entries(md).map(([k, v]) => `${k}=${v}`).join("\n");
}
function textToMetadata(txt: string) {
  const lines = txt.split("\n").map(s => s.trim()).filter(Boolean);
  const out: Record<string, string> = {};
  lines.forEach(l => {
    const idx = l.indexOf("=");
    if (idx > -1) {
      const k = l.slice(0, idx).trim();
      const v = l.slice(idx + 1).trim();
      out[k] = v;
    }
  });
  return out;
}
