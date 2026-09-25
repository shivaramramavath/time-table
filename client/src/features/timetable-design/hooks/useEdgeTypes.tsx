import { useMemo } from 'react';
import { BezierEdge, type EdgeProps, type EdgeTypes } from '@xyflow/react';

export const useEdgeTypes = (): EdgeTypes => {
  return useMemo(
    () => ({
      bezier: (props: EdgeProps) => <BezierEdge {...props} style={{ strokeWidth: 2 }} />,
    }),
    [],
  );
};
