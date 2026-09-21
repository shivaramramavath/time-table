import { useCallback } from 'react';
import dagre from 'dagre';
import { nodeService } from '../services/node.service';
import { NODE_HEIGHT, NODE_WIDTH } from '../constants';

const useAutoArrange = ({ getNodes, getEdges, setNodes }) => {
  return useCallback(() => {
    const nodes = getNodes();
    const edges = getEdges();

    if (!nodes.length) return;

    const graph = new dagre.graphlib.Graph();

    graph.setDefaultEdgeLabel(() => ({}));

    graph.setGraph({
      rankdir: 'TB',
      ranksep: NODE_WIDTH,
      nodesep: NODE_HEIGHT,
    });

    nodes.forEach((node) => {
      const width = node.measured?.width || NODE_WIDTH;
      const height = node.measured?.height || NODE_HEIGHT;

      graph.setNode(node.id, {
        width,
        height,
      });
    });

    edges.forEach((edge) => {
      graph.setEdge(edge.source, edge.target);
    });

    dagre.layout(graph);

    const arrangedNodes = nodes.map((node) => {
      const width = node.measured?.width || NODE_WIDTH;
      const height = node.measured?.height || NODE_HEIGHT;

      const position = graph.node(node.id);

      if (!position) {
        return node;
      }

      const newPosition = {
        x: position.x - width / 2,
        y: position.y - height / 2,
      };

      nodeService.update(node.id, {
        position: newPosition,
      });

      return {
        ...node,
        position: newPosition,
        style: {
          ...node.style,
          transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
        },
      };
    });

    setNodes(arrangedNodes);

    setTimeout(() => {
      setNodes((nodes) =>
        nodes.map((node) => ({
          ...node,
          style: {
            ...node.style,
            transition: undefined,
          },
        })),
      );
    }, 350);
  }, [getNodes, getEdges, setNodes]);
};

export default useAutoArrange;
