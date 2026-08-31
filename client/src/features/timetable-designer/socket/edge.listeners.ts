import { socketService } from "@/shared/socket/socket.service";
import type { Edge } from "@xyflow/react";

export type EdgeAddEvent = Edge;

export type EdgeUpdateEvent = Edge;

export interface EdgeDeleteEvent {
  id: string;
}

interface RegisterEdgeListenersProps {
  setEdges: unknown;
}

export const registerEdgeListeners = ({
  setEdges,
}: RegisterEdgeListenersProps) => {
  const socket = socketService.getSocket();

  const handleEdgeAdd = (edge: EdgeAddEvent) => {
    console.log("Edge added:", edge.id);

    setEdges((edges) => {
      if (edges.some((existingEdge) => existingEdge.id === edge.id)) {
        return edges;
      }

      return [...edges, edge];
    });
  };

  const handleEdgeUpdate = (edge: EdgeUpdateEvent) => {
    console.log("Edge updated:", edge.id);

    setEdges((edges) =>
      edges.map((existingEdge) =>
        existingEdge.id === edge.id
          ? { ...existingEdge, ...edge }
          : existingEdge,
      ),
    );
  };

  const handleEdgeDelete = ({ id }: EdgeDeleteEvent) => {
    console.log("Edge deleted:", id);

    setEdges((edges) => edges.filter((existingEdge) => existingEdge.id !== id));
  };

  socket.on("edge:add", handleEdgeAdd);
  socket.on("edge:update", handleEdgeUpdate);
  socket.on("edge:delete", handleEdgeDelete);

  return () => {
    socket.off("edge:add", handleEdgeAdd);
    socket.off("edge:update", handleEdgeUpdate);
    socket.off("edge:delete", handleEdgeDelete);
  };
};
