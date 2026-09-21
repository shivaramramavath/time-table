import { create } from 'zustand';
import type { Designer, Faculty, Room, Subject } from '../types';

type DesignerState = {
  timetableId: string;
  designerId: string;
  faculties: Faculty[];
  subjects: Subject[];
  rooms: Room[];

  init: (data: Designer) => void;

  setFaculties: (faculties: Faculty[]) => void;
  setSubjects: (subjects: Subject[]) => void;
  setRooms: (rooms: Room[]) => void;

  // ROOMS
  getRooms: () => Room[];
  getRoom: (roomId: string) => Room | undefined;
  addRoom: (room: Room) => void;
  removeRoom: (roomId: string) => void;
  updateRoom: (roomId: string, roomData: Partial<Room>) => void;

  // SUBJECTS
  getSubjects: () => Subject[];
  getSubject: (subjectId: string) => Subject | undefined;
  addSubject: (subject: Subject) => void;
  removeSubject: (subjectId: string) => void;
  updateSubject: (subjectId: string, subjectData: Partial<Subject>) => void;

  // FACULTIES
  getFaculties: () => Faculty[];
  getFaculty: (facultyId: string) => Faculty | undefined;
  addFaculty: (faculty: Faculty) => void;
  removeFaculty: (facultyId: string) => void;
  updateFaculty: (facultyId: string, facultyData: Partial<Faculty>) => void;
};

export const useDesignerStore = create<DesignerState>((set, get) => ({
  timetableId: '',
  designerId: '',
  faculties: [],
  subjects: [],
  rooms: [],

  init: (data) =>
    set({
      timetableId: data.timetableId,
      designerId: data.designerId,
      faculties: data.faculties,
      subjects: data.subjects,
      rooms: data.rooms,
    }),

  setFaculties: (faculties) => set({ faculties }),

  setSubjects: (subjects) => set({ subjects }),

  setRooms: (rooms) => set({ rooms }),

  // ROOMS
  getRooms: () => get().rooms,
  getRoom: (roomId) => get().rooms.find((r) => r.id === roomId),
  addRoom: (room) => set((state) => ({ rooms: [...state.rooms, room] })),
  removeRoom: (roomId) => set((state) => ({ rooms: state.rooms.filter((r) => r.id !== roomId) })),
  updateRoom: (roomId, roomData) =>
    set((state) => ({
      rooms: state.rooms.map((r) => (r.id === roomId ? { ...r, ...roomData } : r)),
    })),

  // SUBJECTS
  getSubjects: () => get().subjects,
  getSubject: (subjectId) => get().subjects.find((s) => s.id === subjectId),
  addSubject: (subject) => set((state) => ({ subjects: [...state.subjects, subject] })),
  removeSubject: (subjectId) =>
    set((state) => ({
      subjects: state.subjects.filter((s) => s.id !== subjectId),
    })),
  updateSubject: (subjectId, subjectData) =>
    set((state) => ({
      subjects: state.subjects.map((s) => (s.id === subjectId ? { ...s, ...subjectData } : s)),
    })),

  // FACULTIES
  getFaculties: () => get().faculties,
  getFaculty: (facultyId) => get().faculties.find((f) => f.id === facultyId),
  addFaculty: (faculty) => set((state) => ({ faculties: [...state.faculties, faculty] })),
  removeFaculty: (facultyId) =>
    set((state) => ({
      faculties: state.faculties.filter((f) => f.id !== facultyId),
    })),
  updateFaculty: (facultyId, facultyData) =>
    set((state) => ({
      faculties: state.faculties.map((f) => (f.id === facultyId ? { ...f, ...facultyData } : f)),
    })),
}));
