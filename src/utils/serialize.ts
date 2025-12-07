import type { Node, Edge } from "reactflow";

export function serializeFlow(nodes: Node[], edges: Edge[]) {
  return {
    nodes: nodes.map((n) => ({ id: n.id, type: n.type, data: n.data })),
    edges: edges.map((e) => ({ id: e.id, source: e.source, target: e.target })),
  };
}
