export type Timetable = {
  _id: string;
  title: string;
  description: string;
  userId: string;
  stage: 'draft' | 'editing' | 'complete' | 'published' | 'archived';
  blueprintId: string;
  createdAt: string;
  updatedAt: string;
};
