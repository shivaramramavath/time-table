import type { Edge } from "@xyflow/react";

import { registerDesignerListeners } from "./register-designer-listeners";

interface RegisterEdgeListenersProps {
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const registerEdgeListeners = ({
  setEdges,
}: RegisterEdgeListenersProps) => {
  return registerDesignerListeners<Edge>("edge", {
    add: (edge) => {
      setEdges((edges) => {
        if (edges.some((existing) => existing.id === edge.id)) {
          return edges;
        }

        return [...edges, edge];
      });
    },

    update: (edge) => {
      setEdges((edges) =>
        edges.map((existing) =>
          existing.id === edge.id
            ? {
                ...existing,
                ...edge,
              }
            : existing,
        ),
      );
    },

    remove: (id) => {
      setEdges((edges) => edges.filter((edge) => edge.id !== id));
    },
  });
};
