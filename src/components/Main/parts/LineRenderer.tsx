import calculatePosition from '../../../core/position';

import strokePropsByLine from '../helpers/strokePropsByLine';

interface LineRendererProps {
  relative: LineRect;
  line: LineLine;
}

function LineRenderer({ line, relative }: LineRendererProps) {
  const strokeProps = strokePropsByLine(line);
  const { x, y } = calculatePosition(line, relative);

  return (
    <line
      {...strokeProps}
      x1={x}
      x2={x + line.x}
      y1={y}
      y2={y + line.y}
    />
  );
}

export default LineRenderer;
