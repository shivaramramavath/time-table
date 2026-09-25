import { useReactFlow } from '@xyflow/react';
import { NODE_HEIGHT, NODE_WIDTH } from '../constants';
import { generateNodeId } from '../utils/generate-ids';
import { nodeService } from '../services/node.service';

export const useDesignerDnD = () => {
  const { screenToFlowPosition, addNodes } = useReactFlow();

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);

    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (event: React.DragEvent) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = 'move';
  };

  const onDrop = (event: React.DragEvent) => {
    event.preventDefault();

    const nodeType = event.dataTransfer.getData('application/reactflow');

    if (!nodeType) {
      return;
    }

    const position = screenToFlowPosition({
      x: event.clientX - NODE_WIDTH / 2,

      y: event.clientY - NODE_HEIGHT / 2,
    });

    const node = {
      id: generateNodeId(),
      type: nodeType,
      position,
      data: {
        label: `New ${nodeType}`,
      },
    };

    // Local
    addNodes(node);

    // Server
    nodeService.add(node);
  };

  return {
    onDragStart,
    onDragOver,
    onDrop,
  };
};
