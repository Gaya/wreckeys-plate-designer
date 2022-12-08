import { SVGAttributes } from 'react';

interface StrokeProps {
  stroke: SVGAttributes<unknown>['stroke'];
  strokeWidth: SVGAttributes<unknown>['strokeWidth'];
  strokeLinejoin: SVGAttributes<unknown>['strokeLinejoin'];
  strokeDasharray: SVGAttributes<unknown>['strokeDasharray'];
}

function useStrokePropsByLine(line: PartLine): StrokeProps {
  return {
    stroke: line.isGuide ? '#4068ff' : '#000',
    strokeWidth: 1,
    strokeLinejoin: 'round',
    strokeDasharray: line.isGuide ? '4, 6' : undefined,
  };
}

export default useStrokePropsByLine;
