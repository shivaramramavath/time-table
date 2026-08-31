import { socketService } from "@/shared/socket/socket.service";
import type { Node } from "@xyflow/react";

export const registerNodeListeners = ({ setNodes }: { setNodes: unknown }) => {
  const socket = socketService.getSocket();

  const handleNodeAdd = (node: Node) => {
    console.log("Node added:", node.id);

    setNodes((nodes) => {
      if (nodes.some((existingNode) => existingNode.id === node.id)) {
        return nodes;
      }

      return [...nodes, node];
    });
  };

  const handleNodeUpdate = (node: Node) => {
    console.log("Node updated:", node.id);

    setNodes((nodes) => {
      return nodes.map((existingNode) =>
        existingNode.id === node.id
          ? { ...existingNode, ...node }
          : existingNode,
      );
    });
  };

  const handleNodeDelete = (nodeId: string) => {
    console.log("Node deleted:", nodeId);

    setNodes((nodes) => {
      return nodes.filter((node) => node.id !== nodeId);
    });
  };

  socket.on("node:add", handleNodeAdd);
  socket.on("node:update", handleNodeUpdate);
  socket.on("node:delete", handleNodeDelete);

  return () => {
    socket.off("node:add", handleNodeAdd);
  };
};
