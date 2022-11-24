import { SVGAttributes } from 'react';
import useDimensions from './useDimensions';

interface StrokeProps {
  stroke: SVGAttributes<any>['stroke'];
  strokeWidth: SVGAttributes<any>['strokeWidth'];
  strokeLinejoin: SVGAttributes<any>['strokeLinejoin'];
  strokeDasharray: SVGAttributes<any>['strokeDasharray'];
}

function useStrokePropsByLine(line: PartLine, part: Part): StrokeProps {
  const dimensions = useDimensions();
  const pixelinmm = (part.width / dimensions.width) + 0.1;

  return {
    stroke: line.isGuide ? '#4068ff' : '#000',
    strokeWidth: pixelinmm,
    strokeLinejoin: 'round',
    strokeDasharray: line.isGuide ? '2, 3' : undefined,
  };
}

export default useStrokePropsByLine;
