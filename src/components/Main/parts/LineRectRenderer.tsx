import calculatePosition from '../../../core/position';

interface LineRectRendererProps {
  relative: LineRect;
  rect: LineRect;
}

function LineRectRenderer({ rect, relative }: LineRectRendererProps) {
  const { radius } = rect;
  const strokeColor = rect.isGuide ? '#999' : '#000';
  const strokeWidth = 1;

  const { x, y } = calculatePosition(rect, relative);

  return (
    <rect
      fill="transparent"
      stroke={strokeColor}
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
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
