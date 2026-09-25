interface Time {
  startTime?: string;
  endTime?: string;
  numberOfPeriods?: number;

  workingDays?: string[];

  breaks?: {
    type: 'lunch' | 'short-break';
    startTime: string;
    endTime: string;
  }[];
}

interface Resources {
  facultyIds?: string[];
  subjectIds?: string[];
  roomIds?: string[];
}

interface Position {
  x: number;
  y: number;
}

export interface Institution {
  id: string;
  position?: { x: number; y: number };
  data: {
    label: string;

    time: Time;
  };
}

export interface Program {
  id: string;
  position?: Position;

  data: {
    label: string;

    time?: Time;
    resources?: Resources;
  };
}

export interface AcademicYear {
  id: string;
  position?: Position;

  data: {
    label: string;

    year: number;

    time?: Time;

    resources?: Resources;
  };
}

export interface Section {
  id: string;
  position?: Position;

  data: {
    label: string;
    section: string;
    strength: number;

    time?: Time;

    resources?: Resources;
  };
}
