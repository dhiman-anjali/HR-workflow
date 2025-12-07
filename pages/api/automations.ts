import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Returns mock automation actions.
 */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).end();
  const automations = [
    { id: "send_email", label: "Send Email", params: ["to", "subject", "body"] },
    { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
    { id: "create_account", label: "Create Account", params: ["username", "role"] },
  ];
  res.status(200).json(automations);
}
