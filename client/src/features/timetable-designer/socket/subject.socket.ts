import { emitAsync } from '@/shared/socket/emit-async';
import type { Subject } from '../types';

export const subjectSocket = {
  create: (designerId: string, subject: Omit<Subject, 'id'>) => {
    return emitAsync<Subject>('subject:create', {
      designerId,
      subject,
    });
  },

  update: (designerId: string, subjectId: string, data: Partial<Subject>) => {
    return emitAsync<Subject>('subject:update', {
      designerId,
      subjectId,
      data,
    });
  },

  delete: (designerId: string, subjectId: string) => {
    return emitAsync<{ subjectId: string }>('subject:delete', {
      designerId,
      subjectId,
    });
  },
};
