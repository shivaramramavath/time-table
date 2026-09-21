import { useEffect } from 'react';

import { registerNodeListeners } from '../socket/listeners/node.listeners';
import { registerEdgeListeners } from '../socket/listeners/edge.listeners';
import { registerSubjectListeners } from '../socket/listeners/subject.listeners';
import { registerFacultyListeners } from '../socket/listeners/faculty.listeners';
import { registerRoomListeners } from '../socket/listeners/room.listeners';

import type { Edge, Node } from '../types';

interface UseDesignerSocketListenersProps {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge[]>>;
}

export const useDesignerSocketListeners = ({
  setNodes,
  setEdges,
}: UseDesignerSocketListenersProps) => {
  useEffect(() => {
    const cleanupNode = registerNodeListeners({
      setNodes,
    });

    const cleanupEdge = registerEdgeListeners({
      setEdges,
    });

    const cleanupSubject = registerSubjectListeners();
    const cleanupFaculty = registerFacultyListeners();
    const cleanupRoom = registerRoomListeners();

    return () => {
      cleanupNode();
      cleanupEdge();
      cleanupSubject();
      cleanupFaculty();
      cleanupRoom();
    };
  }, [setNodes, setEdges]);
};
