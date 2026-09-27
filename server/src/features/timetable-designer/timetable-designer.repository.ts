import { BaseRepository } from '#shared/base/base-repository.js';
import { TimetableDesigner, TimetableDesignerModel } from './timetable-designer.model.js';

export class TimetableDesignerRepository extends BaseRepository<TimetableDesigner> {
  constructor(public readonly model = TimetableDesignerModel) {
    super(TimetableDesignerModel);
  }
}

export const timetableDesignerRepository = new TimetableDesignerRepository();
