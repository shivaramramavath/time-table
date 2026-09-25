import type { Edge } from '../types';
import { emitAsync } from '@/shared/socket/emit-async';

export const edgeSocket = {
  create: (designerId: string, edge: Edge) => {
    return emitAsync<Edge>('edge:create', {
      designerId,
      edge,
    });
  },

  createMany: (designerId: string, edges: Edge[]) => {
    return emitAsync<Edge[]>('edge:createMany', {
      designerId,
      edges,
    });
  },

  delete: (designerId: string, edgeId: string) => {
    return emitAsync<{ edgeId: string }>('edge:delete', {
      designerId,
      edgeId,
    });
  },

  deleteMany: (designerId: string, edgeIds: string[]) => {
    return emitAsync<{
      edgeIds: string[];
      deletedCount: number;
    }>('edge:deleteMany', {
      designerId,
      edgeIds,
    });
  },
};
