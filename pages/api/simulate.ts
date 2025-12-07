import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Simulate posted workflow graph.
 * Simple BFS traversal from start nodes producing steps.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const workflow = req.body;
    const nodes = workflow.nodes ?? [];
    const edges = workflow.edges ?? [];

    // build adjacency
    const outMap: Record<string, string[]> = {};
    nodes.forEach((n: any) => (outMap[n.id] = []));
    edges.forEach((e: any) => {
      if (!outMap[e.source]) outMap[e.source] = [];
      outMap[e.source].push(e.target);
    });

    const startNodes = nodes.filter((n: any) => (String(n.type || "").startsWith("start")));
    if (startNodes.length === 0) return res.status(200).json({ error: "No start node found", steps: [] });

    const visited = new Set<string>();
    const queue: string[] = startNodes.map((s: any) => s.id);
    const steps: string[] = [];

    while (queue.length) {
      const id = queue.shift()!;
      if (visited.has(id)) continue;
      visited.add(id);

      const node = nodes.find((n: any) => n.id === id);
      if (!node) continue;

      steps.push(`Execute ${node.type} (${node.data?.title ?? node.id})`);

      const neighbors = outMap[id] ?? [];
      for (const nb of neighbors) {
        if (!visited.has(nb)) queue.push(nb);
      }
    }

    const unvisited = nodes.filter((n: any) => !visited.has(n.id));
    if (unvisited.length) steps.push(`Warning: ${unvisited.length} node(s) unreachable`);

    res.status(200).json({ error: null, steps });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? String(err), steps: [] });
  }
}
