import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import useEditorContext from '../hooks/useEditorContext';

import LineRectRenderer from './LineRectRenderer';
import LineRenderer from './LineRenderer';
import LineCircleRenderer from './LineCircleRenderer';

interface PartRendererProps {
  part: Part;
  editable?: boolean;
}

function PartRenderer({ part, editable }: PartRendererProps) {
  const { pixelRatio } = useEditorContext();

  const startPosition = useRef<{ x: number; y: number } | null>(null);
  const [movingOffset, setMovingOffset] = useState({ dx: 0, dy: 0 });

  const onMouseDown = useCallback<MouseEventHandler<SVGElement>>((e) => {
    if (!editable) {
      return;
    }

    startPosition.current = { x: e.pageX, y: e.pageY };
  }, [editable]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (startPosition.current) {
        const dx = e.pageX - startPosition.current?.x;
        const dy = e.pageY - startPosition.current?.y;

        setMovingOffset({ dx, dy });
      }
    }

    function handleMouseUp() {
      if (startPosition.current) {
        startPosition.current = null;
        setMovingOffset({ dx: 0, dy: 0 });
      }
    }

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <g
      id={part.id}
      onMouseDown={onMouseDown}
      transform={`translate(${movingOffset.dx / pixelRatio}, ${movingOffset.dy / pixelRatio})`}
      style={{ cursor: editable ? 'move' : 'default' }}
    >
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
