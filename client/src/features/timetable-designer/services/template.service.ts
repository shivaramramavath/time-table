import { templateSocket } from '../socket/template.socket';
import { useDesignerStore } from '../store/designer.store';
import type { Template } from '../types';

export const templateService = {
  create: (template: Template) =>
    templateSocket.create(useDesignerStore.getState().designerId, template),
};
