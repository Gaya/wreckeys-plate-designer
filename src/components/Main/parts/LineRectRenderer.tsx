import calculatePosition from '../../../core/position';

import useStrokePropsByLine from '../hooks/useStrokePropsByLine';

interface LineRectRendererProps {
  rect: LineRect;
  part: Part;
}

function LineRectRenderer({ rect, part }: LineRectRendererProps) {
  const { radius } = rect;

  const { x, y } = calculatePosition(rect, part);
  const strokeProps = useStrokePropsByLine(rect);

  return (
    <rect
      {...strokeProps}
      fill="transparent"
      vectorEffect="non-scaling-stroke"
      rx={radius}
      ry={radius}
      width={rect.width}
      height={rect.height}
      x={x}
      y={y}
    />
  );
}

export default LineRectRenderer;
