import { memo, useState } from 'react';

import RoomList from './RoomList';
import AddRoomForm from './AddRoomForm';
import EditRoomForm from './EditRoomForm';

const Rooms = () => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [roomId, setRoomId] = useState('');

  const handleEdit = (id: string) => {
    setRoomId(id);
    setView('edit');
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {view === 'list' && <RoomList onAdd={() => setView('add')} onEdit={handleEdit} />}

      {view === 'add' && (
        <AddRoomForm onCancel={() => setView('list')} onSave={() => setView('list')} />
      )}

      {view === 'edit' && (
        <EditRoomForm
          roomId={roomId}
          onCancel={() => {
            setRoomId('');
            setView('list');
          }}
          onSave={() => {
            setRoomId('');
            setView('list');
          }}
        />
      )}
    </div>
  );
};

export default memo(Rooms);
