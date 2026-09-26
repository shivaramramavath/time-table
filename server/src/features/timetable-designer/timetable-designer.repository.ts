import { BaseRepository } from '#shared/Base/BaseRepository.js';
import { TimetableDesigner, TimetableDesignerModel } from './timetable-designer.model.js';

export class TimetableDesignerRepository extends BaseRepository<TimetableDesigner> {
  constructor(public readonly model = TimetableDesignerModel) {
    super(TimetableDesignerModel);
  }
}


export const timetableDesignerRepository = new TimetableDesignerRepository();