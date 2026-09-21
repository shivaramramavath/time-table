import {
  CheckSquare,
  Copy,
  ArrowDownNarrowWide,
  Trash2,
  ZoomIn,
  ZoomOut,
  Maximize,
  Undo2,
  Redo2,
} from 'lucide-react';

export const designerControls = [
  {
    id: 'select-all',
    icon: CheckSquare,
    label: 'Select All',
    className: 'text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600',
  },
  {
    id: 'delete',
    icon: Trash2,
    label: 'Delete Selected',
    className: 'text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600',
  },
  {
    id: 'duplicate',
    icon: Copy,
    label: 'Duplicate',
    className: 'text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600',
  },
  {
    id: 'auto-arrange',
    icon: ArrowDownNarrowWide,
    label: 'Auto Arrange',
    className: 'text-purple-500 border-purple-200 hover:bg-purple-50 hover:text-purple-600',
  },
  {
    id: 'zoom-in',
    icon: ZoomIn,
    label: 'Zoom In',
    className: 'text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800',
  },
  {
    id: 'zoom-out',
    icon: ZoomOut,
    label: 'Zoom Out',
    className: 'text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-800',
  },
  {
    id: 'fit-view',
    icon: Maximize,
    label: 'Fit View',
    className: 'text-green-500 border-green-200 hover:bg-green-50 hover:text-green-600',
  },
  {
    id: 'undo',
    icon: Undo2,
    label: 'Undo',
    className: 'text-yellow-500 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600',
  },
  {
    id: 'redo',
    icon: Redo2,
    label: 'Redo',
    className: 'text-yellow-500 border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600',
  },
] as const;
