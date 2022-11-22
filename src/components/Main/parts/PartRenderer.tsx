import LineRectRenderer from './LineRectRenderer';
import LineRenderer from './LineRenderer';

interface PartRendererProps {
  part: Part;
}

function PartRenderer({ part }: PartRendererProps) {
  return (
    <>
      {part.lines.map((line) => {
        const relative = part.lines[0];

        if (line.type === 'rect') {
          return <LineRectRenderer relative={relative} key={line.id} rect={line} />;
        }

        if (line.type === 'line') {
          return <LineRenderer relative={relative} key={line.id} line={line} />;
        }

        return (
          <></>
        );
      })}
    </>
  );
}

export default PartRenderer;
