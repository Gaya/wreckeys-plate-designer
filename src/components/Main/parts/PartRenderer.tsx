import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react';

import { useAppContext } from '../../App/AppContextProvider';

import useEditorContext from '../hooks/useEditorContext';

import LineRectRenderer from './LineRectRenderer';
import LineRenderer from './LineRenderer';
import LineCircleRenderer from './LineCircleRenderer';

interface PartRendererProps {
  part: Part;
  editable?: boolean;
}

function PartRenderer({ part, editable }: PartRendererProps) {
  const { state, actions } = useAppContext();
  const { pixelRatio } = useEditorContext();

  const mousePosition = useRef<{ x: number; y: number; dx: number; dy: number } | null>(null);
  const [movingOffset, setMovingOffset] = useState({ dx: 0, dy: 0 });

  const onMouseDown = useCallback<MouseEventHandler<SVGElement>>((e) => {
    if (!editable) {
      return;
    }

    mousePosition.current = { x: e.pageX, y: e.pageY, dx: 0, dy: 0 };
  }, [editable]);

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (mousePosition.current) {
        const dx = e.pageX - mousePosition.current?.x;
        const dy = e.pageY - mousePosition.current?.y;

        mousePosition.current = {
          ...mousePosition.current,
          dx,
          dy,
        };
        setMovingOffset({ dx, dy });
      }
    }

    function handleMouseUp() {
      if (mousePosition.current) {
        const offsetX = (part.offsetX || 0) + (mousePosition.current.dx / pixelRatio);
        const offsetY = (part.offsetY || 0) + (mousePosition.current.dy / pixelRatio);

        actions.updatePart(part.id, { offsetY, offsetX });

        // reset
        mousePosition.current = null;
        setMovingOffset({ dx: 0, dy: 0 });
      }
    }

    document.body.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseup', handleMouseUp);
    };
  }, [actions, part.id, part.offsetX, part.offsetY, pixelRatio]);

  return (
    <g
      id={part.id}
      onMouseDown={onMouseDown}
      transform={`translate(${movingOffset.dx / pixelRatio}, ${movingOffset.dy / pixelRatio})`}
      style={{ cursor: editable ? 'move' : 'default' }}
    >
      {part.lines().map((line) => {
        if (line.isGuide && !state.options.showGuides) {
          return null;
        }

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
