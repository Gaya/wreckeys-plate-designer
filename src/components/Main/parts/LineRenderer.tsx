import calculatePosition from '../../../core/position';

import useStrokePropsByLine from '../hooks/useStrokePropsByLine';

interface LineRendererProps {
  part: Part;
  line: LineLine;
}

function LineRenderer({ line, part }: LineRendererProps) {
  const strokeProps = useStrokePropsByLine(line);
  const { x, y } = calculatePosition(line, part);

  return (
    <line
      {...strokeProps}
      vectorEffect="non-scaling-stroke"
      x1={x}
      x2={x + line.x}
      y1={y}
      y2={y + line.y}
    />
  );
}

export default LineRenderer;
