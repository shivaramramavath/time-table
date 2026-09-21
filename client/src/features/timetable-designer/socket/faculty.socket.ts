import type { Faculty } from '../types';
import { emitAsync } from '@/shared/socket/emit-async';

export const facultySocket = {
  create: (designerId: string, faculty: Omit<Faculty, 'id'>) => {
    emitAsync('faculty:create', {
      designerId,
      faculty,
    });
  },

  update: (designerId: string, facultyId: string, data: Partial<Faculty>) => {
    emitAsync('faculty:update', {
      designerId,
      facultyId,
      data,
    });
  },

  delete: (designerId: string, facultyId: string) => {
    emitAsync('faculty:delete', {
      designerId,
      facultyId,
    });
  },
};
