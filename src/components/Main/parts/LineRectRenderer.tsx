import calculatePosition from '../../../core/position';

import strokePropsByLine from '../helpers/strokePropsByLine';

interface LineRectRendererProps {
  relative: LineRect;
  rect: LineRect;
}

function LineRectRenderer({ rect, relative }: LineRectRendererProps) {
  const { radius } = rect;

  const { x, y } = calculatePosition(rect, relative);
  const strokeProps = strokePropsByLine(rect);

  return (
    <rect
      {...strokeProps}
      fill="transparent"
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
