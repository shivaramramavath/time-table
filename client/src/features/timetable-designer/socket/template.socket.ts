import { emitAsync } from '@/shared/socket/emit-async';
import type { Template } from '../types';

export const templateSocket = {
  create: (designerId: string, template: Template) =>
    emitAsync<Template>('template:create', { designerId, template }),
};
