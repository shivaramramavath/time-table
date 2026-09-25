import type { Edge } from '@xyflow/react';

import { edgeSocket } from '../socket/edge.socket';
import { useDesignerStore } from '../store/designer.store';

export const edgeService = {
  add: async (edge: Edge) => {
    return edgeSocket.create(useDesignerStore.getState().designerId, edge);
  },

  addMany: async (edges: Edge[]) => {
    return edgeSocket.createMany(useDesignerStore.getState().designerId, edges);
  },

  remove: async (edgeId: string) => {
    return edgeSocket.delete(useDesignerStore.getState().designerId, edgeId);
  },

  removeMany: async (edgeIds: string[]) => {
    return edgeSocket.deleteMany(useDesignerStore.getState().designerId, edgeIds);
  },
};
