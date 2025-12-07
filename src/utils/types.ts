export type NodeType = "start" | "task" | "approval" | "automated" | "end";

export interface BaseNodeData {
  title?: string;
  [k: string]: any;
}

export interface StartNodeData extends BaseNodeData {
  title: string;
  metadata?: Record<string, string>;
}

export interface TaskNodeData extends BaseNodeData {
  title: string;
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
}

export interface ApprovalNodeData extends BaseNodeData {
  title?: string;
  approverRole?: string;
  autoApproveThreshold?: number;
}

export interface AutomatedNodeData extends BaseNodeData {
  title?: string;
  actionId?: string;
  params?: Record<string, string>;
}

export interface EndNodeData extends BaseNodeData {
  message?: string;
  summary?: boolean;
}
