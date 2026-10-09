import type { Node } from '@xyflow/react';

import { emitAsync } from '@/shared/socket/emit-async';

export const nodeSocket = {
  create: (designerId: string, node: Node) => {
    return emitAsync<Node>('node:create', {
      designerId,
      node,
    });
  },

  createMany: (designerId: string, nodes: Node[]) => {
    return emitAsync<Node[]>('node:createMany', {
      designerId,
      nodes,
    });
  },

  update: (designerId: string, nodeId: string, data: Partial<Node>) => {
    return emitAsync<Node>('node:update', {
      designerId,
      nodeId,
      data,
    });
  },

  delete: (designerId: string, nodeId: string) => {
    return emitAsync<{ nodeId: string }>('node:delete', {
      designerId,
      nodeId,
    });
  },

  deleteMany: (designerId: string, nodeIds: string[]) => {
    return emitAsync<{ nodeIds: string[] }>('node:deleteMany', {
      designerId,
      nodeIds,
    });
  },
};
