import { memo, useState } from 'react';

import { Button } from '@/shared/ui/button';

import SubjectList from './SubjectList';
import AddSubjectForm from './AddSubjectForm';
import EditSubjectForm from './EditSubjectForm';

const Subjects = () => {
  const [type, setType] = useState<'list' | 'add-form' | 'edit-form'>('list');

  const [subjectId, setSubjectId] = useState<string | null>(null);

  return (
    <div className="flex h-full min-h-0 flex-col">
      {type === 'list' && (
        <>
          <div className="flex items-center justify-between border-b pb-3">
            <h2 className="text-sm font-semibold">Subjects</h2>

            <Button size="sm" onClick={() => setType('add-form')}>
              Add Subject
            </Button>
          </div>

          <SubjectList
            onEdit={(id) => {
              setSubjectId(id);
              setType('edit-form');
            }}
          />
        </>
      )}

      {type === 'add-form' && (
        <AddSubjectForm onCancel={() => setType('list')} onSave={() => setType('list')} />
      )}

      {type === 'edit-form' && subjectId && (
        <EditSubjectForm
          subjectId={subjectId}
          onCancel={() => {
            setSubjectId(null);
            setType('list');
          }}
          onSave={() => {
            setSubjectId(null);
            setType('list');
          }}
        />
      )}
    </div>
  );
};

export default memo(Subjects);
