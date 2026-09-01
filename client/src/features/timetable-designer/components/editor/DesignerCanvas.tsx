import "@xyflow/react/dist/style.css";

import {
  Background,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";

import { usePreferencesStore } from "@/shared/preferences/preferences.store";

import DesignerPanels from "../panels/DesignerPanels";

import {
  useDesignerDnD,
  useDesignerInteractions,
  useEdgeTypes,
  useNodeTypes,
} from "../../hooks";

import { useDesignerSocketListeners } from "../../hooks/useDesignerSocketListeners";

import type { Edge, Node } from "../../types";

interface Props {
  timetableId: string;
  initialNodes: Node[];
  initialEdges: Edge[];
}

const DesignerCanvas = ({ timetableId, initialNodes, initialEdges }: Props) => {
  const darkMode = usePreferencesStore((state) => state.darkMode);

  const [nodes, setNodes] = useNodesState(initialNodes);

  const [edges, setEdges] = useEdgesState(initialEdges);

  useDesignerSocketListeners({
    setNodes,
    setEdges,
  });

  const interactions = useDesignerInteractions({
    setNodes,
    setEdges,
  });

  const { onDragOver, onDrop } = useDesignerDnD();

  const nodeTypes = useNodeTypes();
  const edgeTypes = useEdgeTypes();

  return (
    <div className="absolute inset-0">
      <ReactFlow
        key={timetableId}
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={interactions.onNodesChange}
        onEdgesChange={interactions.onEdgesChange}
        onConnect={interactions.onConnect}
        isValidConnection={interactions.isValidConnection}
        onNodeDoubleClick={interactions.onNodeDoubleClick}
        onConnectEnd={interactions.onConnectEnd}
        onDragOver={onDragOver}
        onDrop={onDrop}
        colorMode={darkMode ? "dark" : "light"}
        deleteKeyCode={["Delete", "Backspace"]}
        selectionKeyCode={["Shift", "Meta"]}
        multiSelectionKeyCode={["Shift", "Control"]}
        proOptions={{
          hideAttribution: true,
        }}
        fitView
        minZoom={0.5}
        maxZoom={1.5}
        snapToGrid
        snapGrid={[20, 20]}
        panOnScroll
        panOnDrag
      >
        <Background />

        <DesignerPanels />
      </ReactFlow>
    </div>
  );
};

export default DesignerCanvas;
