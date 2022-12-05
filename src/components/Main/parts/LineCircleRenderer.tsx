import calculatePosition from '../../../core/position';

import useStrokePropsByLine from '../hooks/useStrokePropsByLine';

interface LineCircleRendererProps {
  part: Part;
  circle: LineCircle;
}

function LineCircleRenderer({ circle, part }: LineCircleRendererProps) {
  const strokeProps = useStrokePropsByLine(circle);
  const { x, y } = calculatePosition(circle, part);

  return (
    <circle
      {...strokeProps}
      fill="transparent"
      vectorEffect="non-scaling-stroke"
      cx={x}
      cy={y}
      r={circle.radius}
    />
  );
}

export default LineCircleRenderer;
