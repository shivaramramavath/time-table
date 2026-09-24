export interface Faculty {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: string;
  subjects: string[];
  unavailablePeriods: number;
  maxPerDay: number;
  maxPerWeek: number;
  status: 'active' | 'inactive';
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  type: 'Theory' | 'Lab' | 'Tutorial';
  credits: number;
  weeklyPeriods: number;
  faculty: string;
  roomType: 'Classroom' | 'Lab' | 'Seminar Hall';
  status: 'Complete' | 'Incomplete';
}

export interface Room {
  id: string;
  number: string;
  building: string;
  floor: number;
  capacity: number;
  type: 'Classroom' | 'Lab' | 'Seminar Hall' | 'Auditorium' | 'Workshop';
  equipment: string[];
  status: 'available' | 'unavailable';
}

export type Screen =
  | 'dashboard'
  | 'designer'
  | 'faculty'
  | 'subjects'
  | 'rooms'
  | 'labs'
  | 'constraints'
  | 'schedule'
  | 'analytics'
  | 'settings'
  | 'templates';
