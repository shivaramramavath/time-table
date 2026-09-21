import { useMemo } from 'react';
import type { NodeTypes } from '@xyflow/react';

import InstitutionNode from '../components/nodes/InstitutionNode.js';
import SectionNode from '../components/nodes/SectionNode.js';
import AcademicYearNode from '../components/nodes/AcademicYearNode.js';
import ProgramNode from '../components/nodes/ProgramNode.js';

export const useNodeTypes = (): NodeTypes => {
  return useMemo(
    () => ({
      institution: InstitutionNode,
      program: ProgramNode,
      'academic-year': AcademicYearNode,
      section: SectionNode,
    }),
    [],
  );
};
