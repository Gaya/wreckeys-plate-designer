import LineRectRenderer from './LineRectRenderer';
import LineRenderer from './LineRenderer';
import LineCircleRenderer from './LineCircleRenderer';

interface PartRendererProps {
  part: Part;
}

function PartRenderer({ part }: PartRendererProps) {
  return (
    <g id={part.id}>
      {part.lines.map((line) => {
        if (line.type === 'rect') {
          return <LineRectRenderer part={part} key={line.id} rect={line} />;
        }

        if (line.type === 'line') {
          return <LineRenderer part={part} key={line.id} line={line} />;
        }

        if (line.type === 'circle') {
          return <LineCircleRenderer part={part} key={line.id} circle={line} />;
        }

        return null;
      })}
    </g>
  );
}

export default PartRenderer;
