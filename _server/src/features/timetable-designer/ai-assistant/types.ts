export type IntentType = 'create' | 'update' | 'delete' | 'query' | 'mixed' | 'unknown';

export interface Intent {
  type: IntentType;

  entities: ('node' | 'edge' | 'faculty' | 'subject' | 'room')[];

  requiresMutation: boolean;
}

export interface PlanStep {
  id: string;

  tool:
    | 'create_node'
    | 'update_node'
    | 'delete_node'
    | 'create_edge'
    | 'update_edge'
    | 'delete_edge'
    | 'create_faculty'
    | 'update_faculty'
    | 'delete_faculty'
    | 'create_subject'
    | 'update_subject'
    | 'delete_subject'
    | 'create_room'
    | 'update_room'
    | 'delete_room'
    | 'search_nodes'
    | 'search_edges'
    | 'search_faculty'
    | 'search_subjects'
    | 'search_rooms';

  args: Record<string, unknown>;

  dependsOn: string[];
}

export interface Plan {
  goal: string;
  steps: PlanStep[];
}

export interface DesignerContext {
  nodes?: unknown[];
  edges?: unknown[];
  faculties?: unknown[];
  subjects?: unknown[];
  rooms?: unknown[];
  messages?: unknown[];
}

export interface ToolResult {
  stepId: string;
  tool: string;
  success: boolean;
  data?: unknown;
  error?: string;
}

export type MessageChunkMetadata = {
  langgraph_node?: string;
  [key: string]: unknown;
};

export enum GraphStatus {
  THINKING = 'thinking',
  LOADING_CONTEXT = 'loading-context',
  ANALYZING = 'analyzing',
  UNDERSTANDING = 'understanding',
  RETRIEVING = 'retrieving',
  PLANNING = 'planning',
  VALIDATING = 'validating',
  EXECUTING = 'executing',
  VERIFYING = 'verifying',
  RESPONDING = 'responding',
}

export type GraphUpdate = Record<
  string,
  {
    status?: GraphStatus;
    [key: string]: unknown;
  }
>;
