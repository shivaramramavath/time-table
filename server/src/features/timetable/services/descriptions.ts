const descriptions = [
  'A structured timetable for organizing classes, subjects, rooms, and faculty efficiently.',
  'Plan and manage your weekly classes with a clear and organized schedule.',
  'A personalized timetable designed to keep classes, activities, and schedules organized.',
  'An organized schedule for managing subjects, faculty, rooms, sections, and class timings.',
  'A flexible timetable designed for efficient scheduling and easy management.',
  'Create and manage a well-structured class schedule tailored to your academic needs.',
  'Keep your academic schedule organized with a clear view of classes and activities.',
  'A centralized timetable for planning classes, managing schedules, and avoiding conflicts.',
];

const getRandomDescription = () => descriptions[Math.floor(Math.random() * descriptions.length)];

export { getRandomDescription };
