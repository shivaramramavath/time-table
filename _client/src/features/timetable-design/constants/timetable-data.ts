export const timetableData = {
  _id: '66b7a1c9e123456789abcd01',
  userId: '66b7a100e123456789abcd00',

  title: 'CSE 3rd Year - Section A',
  description:
    'Weekly timetable for CSE 3rd Year Section A with theory classes and laboratory sessions.',
  stage: 'complete',

  blueprintId: '66b7a2d9e123456789abcd02',

  createdAt: '2026-08-10T10:30:00.000Z',
  updatedAt: '2026-08-14T15:45:00.000Z',

  blueprint: {
    nodes: [
      // ============================================================
      // INSTITUTION
      // ============================================================

      {
        id: 'institution-1',
        type: 'institution',
        position: { x: 100, y: 100 },

        data: {
          label: 'PVPSIT',

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },
        },
      },

      // ============================================================
      // PROGRAM
      // ============================================================

      {
        id: 'program-cse',
        type: 'program',
        position: { x: 100, y: 300 },

        data: {
          label: 'Computer Science & Engineering',

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: [
              'fac-1',
              'fac-2',
              'fac-3',
              'fac-4',
              'fac-5',
              'fac-6',
              'fac-7',
              'fac-8',
              'fac-9',
              'fac-10',
              'fac-11',
              'fac-12',
              'fac-13',
              'fac-14',
            ],

            subjectIds: [
              'subject-1',
              'subject-2',
              'subject-3',
              'subject-4',
              'subject-5',
              'subject-6',
              'subject-7',
              'subject-8',
              'subject-9',
              'subject-10',
              'subject-11',
              'subject-12',
              'subject-13',
              'subject-14',
              'subject-15',
              'subject-16',
              'subject-17',
              'subject-18',
              'subject-19',
              'subject-20',
            ],

            roomIds: [
              'room-1',
              'room-2',
              'room-3',
              'room-4',
              'room-5',
              'room-6',
              'room-7',
              'room-8',
              'lab-1',
              'lab-2',
              'lab-3',
              'lab-4',
              'lab-5',
              'lab-6',
            ],
          },
        },
      },

      // ============================================================
      // 1ST YEAR
      // ============================================================

      {
        id: 'cse-year-1',
        type: 'academic-year',
        position: { x: 100, y: 500 },

        data: {
          label: '1st Year',
          year: 1,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-3', 'fac-4'],

            subjectIds: ['subject-1', 'subject-2', 'subject-3', 'subject-4'],

            roomIds: ['room-1', 'room-2', 'room-3'],
          },
        },
      },

      // 1A
      {
        id: 'cse-year-1-section-a',
        type: 'section',
        position: { x: 0, y: 700 },

        data: {
          label: 'Section A',
          section: 'A',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-3', 'fac-4'],

            subjectIds: ['subject-1', 'subject-2', 'subject-3', 'subject-4'],

            roomIds: ['room-1'],
          },
        },
      },

      // 1B
      {
        id: 'cse-year-1-section-b',
        type: 'section',
        position: { x: 300, y: 700 },

        data: {
          label: 'Section B',
          section: 'B',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-3', 'fac-4'],

            subjectIds: ['subject-1', 'subject-2', 'subject-3', 'subject-4'],

            roomIds: ['room-2'],
          },
        },
      },

      // 1C
      {
        id: 'cse-year-1-section-c',
        type: 'section',
        position: { x: 600, y: 700 },

        data: {
          label: 'Section C',
          section: 'C',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-3', 'fac-4'],

            subjectIds: ['subject-1', 'subject-2', 'subject-3', 'subject-4'],

            roomIds: ['room-3'],
          },
        },
      },

      // ============================================================
      // 2ND YEAR
      // ============================================================

      {
        id: 'cse-year-2',
        type: 'academic-year',
        position: { x: 100, y: 900 },

        data: {
          label: '2nd Year',
          year: 2,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-5', 'fac-6', 'fac-7', 'fac-8'],

            subjectIds: ['subject-5', 'subject-6', 'subject-7', 'subject-8'],

            roomIds: ['room-4', 'room-5', 'room-6', 'room-7'],
          },
        },
      },

      // 2A
      {
        id: 'cse-year-2-section-a',
        type: 'section',
        position: { x: 0, y: 1100 },

        data: {
          label: 'Section A',
          section: 'A',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-5', 'fac-6', 'fac-7', 'fac-8'],

            subjectIds: ['subject-5', 'subject-6', 'subject-7', 'subject-8'],

            roomIds: ['room-4'],
          },
        },
      },

      // 2B
      {
        id: 'cse-year-2-section-b',
        type: 'section',
        position: { x: 300, y: 1100 },

        data: {
          label: 'Section B',
          section: 'B',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-5', 'fac-6', 'fac-7', 'fac-8'],

            subjectIds: ['subject-5', 'subject-6', 'subject-7', 'subject-8'],

            roomIds: ['room-5'],
          },
        },
      },

      // 2C
      {
        id: 'cse-year-2-section-c',
        type: 'section',
        position: { x: 600, y: 1100 },

        data: {
          label: 'Section C',
          section: 'C',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-5', 'fac-6', 'fac-7', 'fac-8'],

            subjectIds: ['subject-5', 'subject-6', 'subject-7', 'subject-8'],

            roomIds: ['room-6'],
          },
        },
      },

      // ============================================================
      // 3RD YEAR
      // ============================================================

      {
        id: 'cse-year-3',
        type: 'academic-year',
        position: { x: 100, y: 1300 },

        data: {
          label: '3rd Year',
          year: 3,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-4', 'fac-5'],

            subjectIds: ['subject-9', 'subject-10', 'subject-11', 'subject-12'],

            roomIds: ['lab-1', 'lab-2', 'lab-3', 'lab-4'],
          },
        },
      },

      // 3A
      {
        id: 'cse-year-3-section-a',
        type: 'section',
        position: { x: 0, y: 1500 },

        data: {
          label: 'Section A',
          section: 'A',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-4', 'fac-5'],

            subjectIds: ['subject-9', 'subject-10', 'subject-11', 'subject-12'],

            roomIds: ['lab-1', 'lab-2', 'lab-3', 'lab-4'],
          },
        },
      },

      // 3B
      {
        id: 'cse-year-3-section-b',
        type: 'section',
        position: { x: 300, y: 1500 },

        data: {
          label: 'Section B',
          section: 'B',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-4', 'fac-5'],

            subjectIds: ['subject-9', 'subject-10', 'subject-11', 'subject-12'],

            roomIds: ['lab-1', 'lab-2', 'lab-3', 'lab-4'],
          },
        },
      },

      // 3C
      {
        id: 'cse-year-3-section-c',
        type: 'section',
        position: { x: 600, y: 1500 },

        data: {
          label: 'Section C',
          section: 'C',
          strength: 60,

          time: {
            startTime: '09:00',
            endTime: '17:00',
            numberOfPeriods: 7,

            workingDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

            breaks: [
              {
                type: 'lunch',
                startTime: '13:00',
                endTime: '14:00',
              },
            ],
          },

          resources: {
            facultyIds: ['fac-1', 'fac-2', 'fac-4', 'fac-5'],

            subjectIds: ['subject-9', 'subject-10', 'subject-11', 'subject-12'],

            roomIds: ['lab-1', 'lab-2', 'lab-3', 'lab-4'],
          },
        },
      },
    ],

    edges: [
      {
        id: 'edge-institution-program',
        source: 'institution-1',
        target: 'program-cse',
        type: 'bezier',
      },

      {
        id: 'edge-program-year-1',
        source: 'program-cse',
        target: 'cse-year-1',
        type: 'bezier',
      },
      {
        id: 'edge-program-year-2',
        source: 'program-cse',
        target: 'cse-year-2',
        type: 'bezier',
      },
      {
        id: 'edge-program-year-3',
        source: 'program-cse',
        target: 'cse-year-3',
        type: 'bezier',
      },

      {
        id: 'edge-year-1-section-a',
        source: 'cse-year-1',
        target: 'cse-year-1-section-a',
        type: 'bezier',
      },
      {
        id: 'edge-year-1-section-b',
        source: 'cse-year-1',
        target: 'cse-year-1-section-b',
        type: 'bezier',
      },
      {
        id: 'edge-year-1-section-c',
        source: 'cse-year-1',
        target: 'cse-year-1-section-c',
        type: 'bezier',
      },

      {
        id: 'edge-year-2-section-a',
        source: 'cse-year-2',
        target: 'cse-year-2-section-a',
        type: 'bezier',
      },
      {
        id: 'edge-year-2-section-b',
        source: 'cse-year-2',
        target: 'cse-year-2-section-b',
        type: 'bezier',
      },
      {
        id: 'edge-year-2-section-c',
        source: 'cse-year-2',
        target: 'cse-year-2-section-c',
        type: 'bezier',
      },

      {
        id: 'edge-year-3-section-a',
        source: 'cse-year-3',
        target: 'cse-year-3-section-a',
        type: 'bezier',
      },
      {
        id: 'edge-year-3-section-b',
        source: 'cse-year-3',
        target: 'cse-year-3-section-b',
        type: 'bezier',
      },
      {
        id: 'edge-year-3-section-c',
        source: 'cse-year-3',
        target: 'cse-year-3-section-c',
        type: 'bezier',
      },
    ],
  },

  subjects: [
    {
      id: 'subject-1',
      name: 'Database Management Systems',
      code: 'CS301',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-2',
      name: 'Computer Networks',
      code: 'CS302',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-3',
      name: 'Software Engineering',
      code: 'CS303',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-4',
      name: 'Artificial Intelligence',
      code: 'CS304',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-5',
      name: 'Web Technologies',
      code: 'CS305',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-6',
      name: 'Cloud Computing',
      code: 'CS306',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-7',
      name: 'Operating Systems',
      code: 'CS307',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-8',
      name: 'Compiler Design',
      code: 'CS308',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-9',
      name: 'DBMS Laboratory',
      code: 'CS351',
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: 'laboratory',
        minimumCapacity: 30,
      },
    },
    {
      id: 'subject-10',
      name: 'Computer Networks Laboratory',
      code: 'CS352',
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: 'laboratory',
        minimumCapacity: 30,
      },
    },
    {
      id: 'subject-11',
      name: 'AI Laboratory',
      code: 'CS353',
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: 'laboratory',
        minimumCapacity: 30,
      },
    },
    {
      id: 'subject-12',
      name: 'Web Technologies Laboratory',
      code: 'CS354',
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: 'laboratory',
        minimumCapacity: 30,
      },
    },
    {
      id: 'subject-13',
      name: 'Machine Learning',
      code: 'CS309',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 4,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-14',
      name: 'Data Mining',
      code: 'CS310',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-15',
      name: 'Cyber Security',
      code: 'CS311',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-16',
      name: 'DevOps',
      code: 'CS312',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 3,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-17',
      name: 'Machine Learning Laboratory',
      code: 'CS355',
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: 'laboratory',
        minimumCapacity: 30,
      },
    },
    {
      id: 'subject-18',
      name: 'Cloud Computing Laboratory',
      code: 'CS356',
      duration: 120,
      labDetails: {
        isLab: true,
        weeklyPeriods: 2,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: 'laboratory',
        minimumCapacity: 30,
      },
    },
    {
      id: 'subject-19',
      name: 'Project',
      code: 'CS399',
      duration: 120,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 2,
      roomRequirements: {
        type: 'seminar-hall',
        minimumCapacity: 60,
      },
    },
    {
      id: 'subject-20',
      name: 'Professional Ethics',
      code: 'HU301',
      duration: 60,
      labDetails: {
        isLab: false,
      },
      weeklyPeriods: 2,
      periodsPerDay: 1,
      consecutivePeriods: 1,
      roomRequirements: {
        type: 'classroom',
        minimumCapacity: 60,
      },
    },
  ],

  faculties: [
    {
      id: 'fac-1',
      name: 'Dr. Rajesh Kumar',
      email: 'rajesh.kumar@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-1', 'sub-9'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-2',
      name: 'Dr. Priya Sharma',
      email: 'priya.sharma@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-2', 'sub-10'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-3',
      name: 'Prof. Anil Kumar',
      email: 'anil.kumar@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-3'],
      unavailablePeriods: 0,
    },

    {
      id: 'fac-4',
      name: 'Dr. Sneha Reddy',
      email: 'sneha.reddy@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-4', 'sub-11'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-5',
      name: 'Prof. Kiran Rao',
      email: 'kiran.rao@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-5', 'sub-12'],
      unavailablePeriods: 0,
    },

    {
      id: 'fac-6',
      name: 'Dr. Arjun Mehta',
      email: 'arjun.mehta@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-6', 'sub-18'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-7',
      name: 'Dr. Venkatesh Rao',
      email: 'venkatesh.rao@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-7'],
      unavailablePeriods: 0,
    },

    {
      id: 'fac-8',
      name: 'Prof. Meena Devi',
      email: 'meena.devi@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-8'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-9',
      name: 'Dr. Rahul Verma',
      email: 'rahul.verma@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-13', 'sub-17'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-10',
      name: 'Dr. Kavitha Rao',
      email: 'kavitha.rao@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-14'],
      unavailablePeriods: 0,
    },

    {
      id: 'fac-11',
      name: 'Prof. Suresh Babu',
      email: 'suresh.babu@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-15'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-12',
      name: 'Dr. Naveen Kumar',
      email: 'naveen.kumar@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-16'],
      unavailablePeriods: 0,
    },

    {
      id: 'fac-13',
      name: 'Dr. Swathi Priya',
      email: 'swathi.priya@pvpsit.ac.in',
      department: 'Computer Science & Engineering',
      subjectIds: ['sub-19'],
      unavailablePeriods: 1,
    },

    {
      id: 'fac-14',
      name: 'Prof. Lakshmi Narayan',
      email: 'lakshmi.narayan@pvpsit.ac.in',
      department: 'Humanities',
      subjectIds: ['sub-20'],
      unavailablePeriods: 0,
    },
  ],

  rooms: [
    {
      id: 'room-1',
      name: 'CSE Classroom 1',
      roomNumber: 'CSE-101',
      capacity: 65,
      floor: 1,
      type: 'classroom',
    },
    {
      id: 'room-2',
      name: 'CSE Classroom 2',
      roomNumber: 'CSE-102',
      capacity: 65,
      floor: 1,
      type: 'classroom',
    },
    {
      id: 'room-3',
      name: 'CSE Classroom 3',
      roomNumber: 'CSE-103',
      capacity: 70,
      floor: 1,
      type: 'classroom',
    },
    {
      id: 'room-4',
      name: 'CSE Classroom 4',
      roomNumber: 'CSE-104',
      capacity: 70,
      floor: 1,
      type: 'classroom',
    },
    {
      id: 'room-5',
      name: 'CSE Classroom 5',
      roomNumber: 'CSE-201',
      capacity: 60,
      floor: 2,
      type: 'classroom',
    },
    {
      id: 'room-6',
      name: 'CSE Classroom 6',
      roomNumber: 'CSE-202',
      capacity: 60,
      floor: 2,
      type: 'classroom',
    },
    {
      id: 'room-7',
      name: 'CSE Classroom 7',
      roomNumber: 'CSE-203',
      capacity: 65,
      floor: 2,
      type: 'classroom',
    },
    {
      id: 'room-8',
      name: 'Seminar Hall',
      roomNumber: 'CSE-SH-1',
      capacity: 120,
      floor: 2,
      type: 'seminar-hall',
    },
    {
      id: 'lab-1',
      name: 'DBMS Laboratory',
      roomNumber: 'CSE-LAB-1',
      capacity: 60,
      floor: 1,
      type: 'laboratory',
    },
    {
      id: 'lab-2',
      name: 'AI Laboratory',
      roomNumber: 'CSE-LAB-2',
      capacity: 60,
      floor: 1,
      type: 'laboratory',
    },
    {
      id: 'lab-3',
      name: 'Networks Laboratory',
      roomNumber: 'CSE-LAB-3',
      capacity: 60,
      floor: 2,
      type: 'laboratory',
    },
    {
      id: 'lab-4',
      name: 'Web Technologies Laboratory',
      roomNumber: 'CSE-LAB-4',
      capacity: 60,
      floor: 2,
      type: 'laboratory',
    },
    {
      id: 'lab-5',
      name: 'Cloud Computing Laboratory',
      roomNumber: 'CSE-LAB-5',
      capacity: 60,
      floor: 3,
      type: 'laboratory',
    },
    {
      id: 'lab-6',
      name: 'Machine Learning Laboratory',
      roomNumber: 'CSE-LAB-6',
      capacity: 60,
      floor: 3,
      type: 'laboratory',
    },
  ],

  messages: [
    {
      id: 'msg-1',
      role: 'system',
      content: 'Timetable configuration initialized.',
      createdAt: '2026-08-14T09:00:00.000Z',
    },
    {
      id: 'msg-2',
      role: 'user',
      content: 'Generate timetable for CSE 3rd Year Section A.',
      createdAt: '2026-08-14T09:01:00.000Z',
    },
    {
      id: 'msg-3',
      role: 'assistant',
      content: 'I have all required subjects, faculty and room information.',
      createdAt: '2026-08-14T09:01:05.000Z',
    },
  ],
};
