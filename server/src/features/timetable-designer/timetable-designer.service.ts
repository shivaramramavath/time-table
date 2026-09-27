import { RoomService, roomService } from '#features/resource/room/room.service.js';
import { FacultyService, facultyService } from '#features/resource/faculty/faculty.service.js';
import { SubjectService, subjectService } from '#features/resource/subject/subject.service.js';

import { EdgeService, edgeService } from './edge/edge.service.js';
import { NodeService, nodeService } from './node/node.service.js';

import {
  TimetableDesignerRepository,
  timetableDesignerRepository,
} from './timetable-designer.repository.js';

export class TimetableDesignerService {
  constructor(
    private readonly repository: TimetableDesignerRepository,
    private readonly roomService: RoomService,
    private readonly subjectService: SubjectService,
    private readonly facultyService: FacultyService,
    private readonly nodeService: NodeService,
    private readonly edgeService: EdgeService,
  ) {}

  async create(timetableId: string) {
    return this.repository.create({
      timetableId,
    });
  }

  async get(timetableId: string) {
    const timetableDesigner = await this.repository.findById(timetableId);

    if (!timetableDesigner) {
      return null;
    }

    const designerId = timetableDesigner._id.toString();

    const [rooms, subjects, faculties, nodes, edges] = await Promise.all([
      this.roomService.getAll(designerId),
      this.subjectService.getAll(designerId),
      this.facultyService.getAll(designerId),
      this.nodeService.getAll(designerId),
      this.edgeService.getAll(designerId),
    ]);

    return {
      ...timetableDesigner,

      rooms: rooms ?? [],
      subjects: subjects ?? [],
      faculties: faculties ?? [],

      nodes: nodes ?? [],
      edges: edges ?? [],
    };
  }

  async getOrCreate(timetableId: string) {
    const existing = await this.get(timetableId);

    if (existing) {
      return existing;
    }

    return this.create(timetableId);
  }
}

export const timetableDesignerService = new TimetableDesignerService(
  timetableDesignerRepository,
  roomService,
  subjectService,
  facultyService,
  nodeService,
  edgeService,
);
