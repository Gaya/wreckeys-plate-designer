import LineRectRenderer from './LineRectRenderer';
import LineRenderer from './LineRenderer';

interface PartRendererProps {
  part: Part;
}

function PartRenderer({ part }: PartRendererProps) {
  return (
    <>
      {part.lines.map((line) => {
        if (line.type === 'rect') {
          return <LineRectRenderer part={part} key={line.id} rect={line} />;
        }

        if (line.type === 'line') {
          return <LineRenderer part={part} key={line.id} line={line} />;
        }

        return (
          <></>
        );
      })}
    </>
  );
}

export default PartRenderer;
