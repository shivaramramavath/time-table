import { edgeService } from './edge/edge.service.js';
import { facultyService } from './faculty/faculty.service.js';
import { nodeService } from './node/node.service.js';
import { roomService } from './room/room.service.js';
import { subjectService } from './subject/subject.service.js';

import { timetableDesignerRepository } from './timetable-designer.repository.js';

export const timetableDesignerService = {
  create: async (timetableId: string) => {
    return timetableDesignerRepository.create(timetableId);
  },

  get: async (timetableId: string) => {
    const timetableDesigner = await timetableDesignerRepository.get(timetableId);

    if (!timetableDesigner) {
      return null;
    }

    const designerId = timetableDesigner._id.toString();

    const [rooms, subjects, faculties, nodes, edges] = await Promise.all([
      roomService.getAll(designerId),
      subjectService.getAll(designerId),
      facultyService.getAll(designerId),
      nodeService.getAll(designerId),
      edgeService.getAll(designerId),
    ]);

    return {
      ...timetableDesigner,

      rooms: rooms ?? [],
      subjects: subjects ?? [],
      faculties: faculties ?? [],

      nodes: nodes ?? [],
      edges: edges ?? [],
    };
  },

  getOrCreate: async (timetableId: string) => {
    const existing = await timetableDesignerService.get(timetableId);

    if (existing) {
      return existing;
    }

    return timetableDesignerService.create(timetableId);
  },
};
