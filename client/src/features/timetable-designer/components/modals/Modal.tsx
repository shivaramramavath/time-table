import { memo } from 'react';

import { Dialog, DialogContent } from '@/shared/ui/dialog';

import { useModalStore } from '../../store/modal.store';

import InstitutionModal from './InstitutionModal';
import ProgramModal from './ProgramModal';
import AcademicYearModal from './AcademicYearModal';
import SectionModal from './SectionModal';
import Faculties from './faculties/Faculties';
import Subjects from './subjects/Subjects';
import Rooms from './rooms/Rooms';
import TemplateModal from './TemplateModal';

const modalComponents = {
  institution: InstitutionModal,
  program: ProgramModal,
  'academic-year': AcademicYearModal,
  section: SectionModal,
  faculties: Faculties,
  subjects: Subjects,
  rooms: Rooms,
  template: TemplateModal,
} as const;

const Modal = () => {
  const { isOpen, data, type, close } = useModalStore();

  const Component = type ? modalComponents[type] : null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) close();
      }}
    >
      <DialogContent className="w-[95vw] max-w-5xl max-h-[85vh] overflow-hidden">
        <div className="flex w-full max-h-[85vh] flex-col pt-6">
          {Component && <Component data={data} />}
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default memo(Modal);
