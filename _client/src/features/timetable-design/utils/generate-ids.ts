import { v4 as uuid } from 'uuid';

export const generateId = (type: string) => `${type}:${uuid()}`;

export const generateNodeId = () => generateId('node');
export const generateEdgeId = () => generateId('edge');
export const generateRoomId = () => generateId('room');
export const generateSubjectId = () => generateId('subject');
export const generateFacultyId = () => generateId('faculty');
export const generateTemplateId = () => generateId('template');
export const generateMessageId = () => generateId('message');
