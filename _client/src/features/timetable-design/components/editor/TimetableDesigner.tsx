import { useEffect, useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';

import DesignerCanvas from './DesignerCanvas';
import Modal from '../modals/Modal';

import { useDesignerStore } from '../../store/designer.store';
import { timetableDesignerSocket } from '../../socket/timetable-designer.socket';

import type { Node, Edge, Faculty, Subject, Room } from '../../types';
import { useMessageStore } from '../../store/message.store';

interface Props {
  timetableId: string;
}

interface TimetableDesignerData {
  _id: string;
  faculties: Faculty[];
  subjects: Subject[];
  rooms: Room[];
  nodes: Node[];
  edges: Edge[];
}

const TimetableDesigner = ({ timetableId }: Props) => {
  const [timetableData, setTimetableData] = useState<TimetableDesignerData | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const init = useDesignerStore((state) => state.init);
  const messageClear = useMessageStore((state) => state.clear);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await timetableDesignerSocket.get<TimetableDesignerData>(timetableId);

        if (cancelled) return;

        setTimetableData(data);

        init({
          timetableId,
          designerId: data._id,
          faculties: data.faculties,
          subjects: data.subjects,
          rooms: data.rooms,
        });
      } catch (error) {
        if (cancelled) return;

        setError(error instanceof Error ? error.message : 'Failed to load timetable designer.');
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
      messageClear();
    };
  }, [timetableId, init, messageClear]);

  if (loading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading timetable designer...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-destructive">Failed to load timetable</p>

          <p className="mt-1 text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (!timetableData) {
    return null;
  }

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen flex-col">
        <main className="relative flex-1">
          <DesignerCanvas
            timetableId={timetableId}
            initialNodes={timetableData.nodes}
            initialEdges={timetableData.edges}
          />
        </main>

        <Modal />
      </div>
    </ReactFlowProvider>
  );
};

export default TimetableDesigner;
