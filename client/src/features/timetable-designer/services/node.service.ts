import type { Node } from '@xyflow/react';

import { nodeSocket } from '../socket/node.socket';
import { useDesignerStore } from '../store/designer.store';

export const nodeService = {
  add: (node: Node) => {
    return nodeSocket.create(useDesignerStore.getState().designerId, node);
  },

  addMany: (nodes: Node[]) => {
    return nodeSocket.createMany(useDesignerStore.getState().designerId, nodes);
  },

  update: (nodeId: string, data: Partial<Node>) => {
    return nodeSocket.update(useDesignerStore.getState().designerId, nodeId, data);
  },

  remove: (nodeId: string) => {
    return nodeSocket.delete(useDesignerStore.getState().designerId, nodeId);
  },

  removeMany: (nodeIds: string[]) => {
    return nodeSocket.deleteMany(useDesignerStore.getState().designerId, nodeIds);
  },
};
