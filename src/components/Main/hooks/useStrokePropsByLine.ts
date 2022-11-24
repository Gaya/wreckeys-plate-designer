import { SVGAttributes } from 'react';

interface StrokeProps {
  stroke: SVGAttributes<any>['stroke'];
  strokeWidth: SVGAttributes<any>['strokeWidth'];
  strokeLinejoin: SVGAttributes<any>['strokeLinejoin'];
  strokeDasharray: SVGAttributes<any>['strokeDasharray'];
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
