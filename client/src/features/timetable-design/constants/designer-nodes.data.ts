import { School, GitBranch, Calendar, Layers, BookOpen, DoorOpen, Users } from 'lucide-react';

export const designerNodes = {
  institution: {
    title: 'Institution',
    icon: School,
    description: 'Configure institution details',

    color: 'text-blue-500',
    bg: 'bg-blue-100',

    allowedParent: null,
    allowedChildren: ['program'],

    modal: 'institution',

    defaultData: {
      label: '',
      timings: '',
      lunch: '',
      programs: 0,
    },
  },

  program: {
    title: 'Program',
    icon: GitBranch,
    description: 'Configure academic program',

    color: 'text-purple-500',
    bg: 'bg-purple-100',

    allowedParent: 'institution',
    allowedChildren: ['academic-year'],

    modal: 'program',

    defaultData: {
      label: '',
      timings: '',
      faculty: 0,
      subjects: 0,
    },
  },

  'academic-year': {
    title: 'Academic Year',
    icon: Calendar,
    description: 'Configure academic year',

    color: 'text-orange-500',
    bg: 'bg-orange-100',

    allowedParent: 'program',
    allowedChildren: ['section'],

    modal: 'academic-year',

    defaultData: {
      label: '',
      semesters: 2,
    },
  },

  section: {
    title: 'Section',
    icon: Layers,
    description: 'Configure class section',

    color: 'text-pink-500',
    bg: 'bg-pink-100',

    allowedParent: 'academic-year',
    allowedChildren: [],

    modal: 'section',

    defaultData: {
      label: '',
      strength: 60,
    },
  },
} as const;

export const catalogItems = [
  {
    type: 'faculties',
    title: 'Faculties',
    icon: Users,
    color: 'text-blue-500',
  },
  {
    type: 'subjects',
    title: 'Subjects',
    icon: BookOpen,
    color: 'text-purple-500',
  },
  {
    type: 'rooms',
    title: 'Rooms',
    icon: DoorOpen,
    color: 'text-orange-500',
  },
];
