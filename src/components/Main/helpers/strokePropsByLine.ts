import { SVGAttributes } from 'react';

interface StrokeProps {
  stroke: SVGAttributes<any>['stroke'];
  strokeWidth: SVGAttributes<any>['strokeWidth'];
  strokeLinejoin: SVGAttributes<any>['strokeLinejoin'];
  strokeDasharray: SVGAttributes<any>['strokeDasharray'];
}

function strokePropsByLine(line: PartLine): StrokeProps {
  return {
    stroke: line.isGuide ? '#999' : '#000',
    strokeWidth: 1,
    strokeLinejoin: 'round',
    strokeDasharray: line.isGuide ? '2, 3' : undefined,
  };
}

export default strokePropsByLine;
