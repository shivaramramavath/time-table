import { memo, useState } from 'react';

import FacultyList from './FacultyList';
import AddFacultyForm from './AddFacultyForm';
import EditFacultyForm from './EditFacultyForm';

const Faculties = () => {
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');
  const [facultyId, setFacultyId] = useState('');

  const handleEdit = (id: string) => {
    setFacultyId(id);
    setView('edit');
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {view === 'list' && <FacultyList onAdd={() => setView('add')} onEdit={handleEdit} />}

      {view === 'add' && (
        <AddFacultyForm onCancel={() => setView('list')} onSave={() => setView('list')} />
      )}

      {view === 'edit' && (
        <EditFacultyForm
          facultyId={facultyId}
          onCancel={() => setView('list')}
          onSave={() => setView('list')}
        />
      )}
    </div>
  );
};

export default memo(Faculties);
