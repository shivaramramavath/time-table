import type {
  Connection,
  EdgeChange,
  NodeChange,
  OnConnectEnd,
} from "@xyflow/react";
import type { IsValidConnection } from "@xyflow/system";

export type Node = {
  id: string;
  type: string;
  selected?: boolean;
  position: { x: number; y: number };
  data: { label: string; type?: string };
};

export type Edge = {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
  type?: string;
};

export interface Faculty {
  id: string;
  name: string;
  email: string;

  department?: string;

  subjectIds: string[];

  unavailablePeriods: number;
}

export interface Subject {
  id: string;
  name: string;
  code: string;

  duration: number;

  labDetails: {
    isLab: boolean;
    weeklyPeriods?: number;
  };

  weeklyPeriods: number;
  periodsPerDay?: number;
  consecutivePeriods?: number;

  roomRequirements?: {
    type: "classroom" | "laboratory" | "seminar-hall";
    minimumCapacity?: number;
  };
}

export interface Room {
  id: string;
  name: string;
  roomNumber: string;

  capacity: number;
  floor: number;

  type: "classroom" | "laboratory" | "seminar-hall";
}

export interface Message {
  id: string;
  role: "system" | "user" | "assistant";
  content: string;
  createdAt: string;
  timestamp?: number;
}

export type Designer = {
  timetableId: string;
  designerId: string;
  faculties: Faculty[];
  subjects: Subject[];
  rooms: Room[];
};

export type Interactions = {
  nodes: Node[];
  edges: Edge[];

  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;

  onConnect: (connection: Connection) => void;

  onNodeDoubleClick: (event: React.MouseEvent, node: Node) => void;

  onConnectEnd: OnConnectEnd;

  isValidConnection: IsValidConnection;
};
