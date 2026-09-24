import {
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  type Connection,
  type EdgeChange,
  type IsValidConnection,
  type NodeChange,
  type NodeMouseHandler,
  type OnConnectEnd,
  type Dispatch,
  type SetStateAction,
  type Node as ReactFlowNode,
  type Edge as ReactFlowEdge,
} from '@xyflow/react';

import { useCallback } from 'react';

import { useModalStore } from '../store/modal.store';

import { nodeService } from '../services/node.service';
import { edgeService } from '../services/edge.service';

import { generateEdgeId, generateNodeId } from '../utils/generate-ids';

import { designerNodes, NODE_HEIGHT, NODE_WIDTH } from '../constants';

import type { Node, Edge } from '../types';

type SetNodes = (payload: Node[] | ((nodes: Node[]) => Node[])) => void;
type SetEdges = (payload: Edge[] | ((edges: Edge[]) => Edge[])) => void;

interface Props {
  setNodes: SetNodes;
  setEdges: SetEdges;
}

export const useDesignerInteractions = ({ setNodes, setEdges }: Props) => {
  const { getEdges, getNode, addNodes, addEdges, screenToFlowPosition } = useReactFlow();

  const openModal = useModalStore((state) => state.open);

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nodes: Node[]) => applyNodeChanges(changes, nodes));

      for (const change of changes) {
        switch (change.type) {
          case 'position': {
            if (!change.position) break;

            if (!change.dragging) {
              nodeService.update(change.id, {
                position: change.position,
              });
            }

            break;
          }

          case 'remove': {
            nodeService.remove(change.id);
            break;
          }

          case 'select':
            break;

          default:
            break;
        }
      }
    },
    [setNodes],
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((edges: Edge[]) => applyEdgeChanges(changes, edges));

      for (const change of changes) {
        if (change.type === 'remove') {
          edgeService.remove(change.id);
        }
      }
    },
    [setEdges],
  );

  const createsCycle = useCallback(
    (sourceId: string, targetId: string): boolean => {
      const edges = getEdges();
      const visited = new Set<string>();

      const dfs = (nodeId: string): boolean => {
        if (nodeId === sourceId) {
          return true;
        }

        if (visited.has(nodeId)) {
          return false;
        }

        visited.add(nodeId);

        return edges.filter((edge) => edge.source === nodeId).some((edge) => dfs(edge.target));
      };

      return dfs(targetId);
    },
    [getEdges],
  );

  const isValidConnection: IsValidConnection = useCallback(
    (connection) => {
      const { source, target } = connection;

      if (!source || !target) {
        return false;
      }

      const sourceNode = getNode(source);
      const targetNode = getNode(target);

      if (!sourceNode || !targetNode) {
        return false;
      }

      if (source === target) {
        return false;
      }

      const sourceConfig = designerNodes[sourceNode.type as keyof typeof designerNodes];

      const targetConfig = designerNodes[targetNode.type as keyof typeof designerNodes];

      if (!sourceConfig || !targetConfig) {
        return false;
      }

      if (!sourceConfig.allowedChildren.includes(targetNode.type as never)) {
        return false;
      }

      const alreadyHasParent = getEdges().some((edge) => edge.target === target);

      if (alreadyHasParent) {
        return false;
      }

      if (targetConfig.allowedParent !== sourceNode.type) {
        return false;
      }

      if (createsCycle(source, target)) {
        return false;
      }

      return true;
    },
    [getNode, getEdges, createsCycle],
  );

  const onNodeDoubleClick: NodeMouseHandler = useCallback(
    (event, node) => {
      event.stopPropagation();

      if (node.type === 'start') {
        return;
      }

      openModal(node.type as never, {
        type: node.type as never,
        id: node.id,
      });
    },
    [openModal],
  );

  const onConnect = useCallback(
    (connection: Connection) => {
      if (!isValidConnection(connection)) {
        return;
      }

      const edge = {
        id: generateEdgeId(),
        ...connection,
        type: 'bezier',
      };

      addEdges(edge);
      edgeService.add(edge);
    },
    [addEdges, isValidConnection],
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (_, connectionState) => {
      if (connectionState.toNode || connectionState.toHandle) {
        return;
      }

      const sourceNode = connectionState.fromNode;

      if (!sourceNode) {
        return;
      }

      const sourceConfig = designerNodes[sourceNode.type as keyof typeof designerNodes];

      if (!sourceConfig?.allowedChildren?.length) {
        return;
      }

      const nextType = sourceConfig.allowedChildren[0];

      const nextConfig = designerNodes[nextType as keyof typeof designerNodes];

      if (!nextConfig) {
        return;
      }

      const position = screenToFlowPosition({
        x: connectionState.pointer.x - NODE_WIDTH / 2,
        y: connectionState.pointer.y - NODE_HEIGHT / 2,
      });

      const node: Node = {
        id: generateNodeId(),
        type: nextType,
        position,
        data: {
          ...sourceNode.data,
          ...nextConfig.defaultData,
        },
      };

      const edge = {
        id: generateEdgeId(),
        source: sourceNode.id,
        target: node.id,
        type: 'bezier',
      };

      addNodes(node);
      addEdges(edge);

      nodeService.add(node);
      edgeService.add(edge);
    },
    [screenToFlowPosition, addNodes, addEdges],
  );

  return {
    onNodesChange,
    onEdgesChange,
    onConnect,
    isValidConnection,
    onNodeDoubleClick,
    onConnectEnd,
  };
};
