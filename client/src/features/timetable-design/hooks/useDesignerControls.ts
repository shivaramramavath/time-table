import { useCallback } from 'react';
import { useReactFlow } from '@xyflow/react';

import { generateEdgeId, generateNodeId } from '../utils/generate-ids';
import { nodeService } from '../services/node.service';
import { edgeService } from '../services/edge.service';
import useAutoArrange from './useAutoArrange';

export const useDesignerControls = () => {
  const {
    getNodes,
    getEdges,
    setNodes,
    addNodes,
    addEdges,
    deleteElements,
    zoomIn,
    zoomOut,
    fitView,
  } = useReactFlow();

  const autoArrange = useAutoArrange({
    getNodes,
    getEdges,
    setNodes,
    fitView,
  });

  const selectAll = useCallback(() => {
    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        selected: true,
      })),
    );
  }, [setNodes]);

  const deleteSelected = useCallback(async () => {
    const nodes = getNodes();
    const edges = getEdges();

    const selectedNodes = nodes.filter((node) => node.selected);

    const selectedNodeIds = new Set(selectedNodes.map((node) => node.id));

    const selectedEdges = edges.filter(
      (edge) =>
        edge.selected || selectedNodeIds.has(edge.source) || selectedNodeIds.has(edge.target),
    );

    if (!selectedNodes.length && !selectedEdges.length) {
      return;
    }

    await deleteElements({
      nodes: selectedNodes,
      edges: selectedEdges,
    });

    if (selectedNodes.length) {
      await nodeService.removeMany(selectedNodes.map((node) => node.id));
    }

    if (selectedEdges.length) {
      await edgeService.removeMany(selectedEdges.map((edge) => edge.id));
    }
  }, [getNodes, getEdges, deleteElements]);

  const duplicateSelected = useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();

    const selectedNodes = nodes.filter((node) => node.selected);

    if (!selectedNodes.length) {
      return;
    }

    const idMap = new Map<string, string>();

    const duplicatedNodes = selectedNodes.map((node) => {
      const newId = generateNodeId();

      idMap.set(node.id, newId);

      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x + 40,
          y: node.position.y + 40,
        },
        selected: true,
      };
    });

    const duplicatedEdges = edges
      .filter((edge) => idMap.has(edge.source) && idMap.has(edge.target))
      .map((edge) => ({
        ...edge,
        id: generateEdgeId(),
        source: idMap.get(edge.source)!,
        target: idMap.get(edge.target)!,
        selected: true,
      }));

    setNodes((nodes) =>
      nodes.map((node) => ({
        ...node,
        selected: false,
      })),
    );

    addNodes(duplicatedNodes);

    if (duplicatedEdges.length) {
      addEdges(duplicatedEdges);
    }

    nodeService.addMany(duplicatedNodes);

    if (duplicatedEdges.length) {
      edgeService.addMany(duplicatedEdges);
    }
  }, [getNodes, getEdges, setNodes, addNodes, addEdges]);

  const undo = useCallback(() => {
    console.log('Undo');
  }, []);

  const redo = useCallback(() => {
    console.log('Redo');
  }, []);

  const hasSelection = getNodes().some((node) => node.selected);

  return {
    hasSelection,
    selectAll,
    deleteSelected,
    duplicateSelected,
    autoArrange,
    zoomIn,
    zoomOut,
    fitView,
    undo,
    redo,
  };
};
