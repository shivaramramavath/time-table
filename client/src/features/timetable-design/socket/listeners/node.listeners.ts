import type { Node } from '@xyflow/react';

import { registerDesignerListeners } from './register-designer-listeners';

interface RegisterNodeListenersProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
}

export const registerNodeListeners = ({ setNodes }: RegisterNodeListenersProps) => {
  return registerDesignerListeners<Node>('node', {
    add: (node) => {
      setNodes((nodes) => {
        if (nodes.some((existing) => existing.id === node.id)) {
          return nodes;
        }

        return [...nodes, node];
      });
    },

    update: (node) => {
      setNodes((nodes) =>
        nodes.map((existing) =>
          existing.id === node.id
            ? {
                ...existing,
                ...node,
              }
            : existing,
        ),
      );
    },

    remove: (id) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== id));
    },
  });
};
