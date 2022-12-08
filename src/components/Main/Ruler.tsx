import { Fragment, useEffect, useState } from 'react';

import useEditorContext from './hooks/useEditorContext';

interface RulerProps {
  orientation: 'horizontal' | 'vertical';
  length: number;
  size: number;
  padding: number;
}

function Ruler({
  length,
  size,
  padding,
  orientation,
}: RulerProps) {
  const { pixelRatio } = useEditorContext();

  const [
    mousePosition,
    setMousePosition,
  ] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  if (length === 0 || pixelRatio === 0) {
    return null;
  }

  const rulerSize = Math.ceil(padding + length + padding);

  const isDetailedRuler = pixelRatio >= 5;
  const cursorPosition = Math.max(
    (orientation === 'vertical' ? mousePosition.y : mousePosition.x) - size,
    0,
  );

  return (
    <g transform={`translate(${orientation === 'horizontal' ? size : 0}, ${orientation === 'vertical' ? size : 0})`}>
      <style>
        {`
        .sizeNumber {
          font-size: 12px;
          font-family: monospace;
          font-weight: 400;
        }
        `}
      </style>
      <rect
        fill="#333"
        x={0}
        y={0}
        width={orientation === 'horizontal' ? (rulerSize * 5) * pixelRatio : size}
        height={orientation === 'vertical' ? (rulerSize * 5) * pixelRatio : size}
      />
      {new Array(rulerSize).fill('').map((_, i) => i).map((step) => {
        if (!isDetailedRuler && step % 5 !== 0) {
          return null;
        }

        const stepDivision = !isDetailedRuler ? 10 : 5;

        const stepOffset = step * pixelRatio;
        const stepLineLength = step % stepDivision === 0 ? size / 3 : size / 5;
        const textOffset = size * (2 / 3);
        const textTransformOffset = orientation === 'vertical' ? 1.7 : 2;

        return (
          <Fragment key={step}>
            {step > 0 && (
              <line
                stroke="#ccc"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
                x1={orientation === 'vertical' ? 1 : stepOffset}
                x2={orientation === 'vertical' ? stepLineLength : stepOffset}
                y1={orientation === 'vertical' ? stepOffset : 1}
                y2={orientation === 'vertical' ? stepOffset : stepLineLength}
              />
            )}
            {step % 10 === 0 && step > 0 && (
              <text
                x={orientation === 'vertical' ? textOffset : stepOffset}
                y={orientation === 'vertical' ? stepOffset : textOffset}
                fontSize={10}
                fontFamily="monospace"
                fontWeight={400}
                textAnchor="middle"
                fill="#ccc"
                transform={`translate(0, ${textTransformOffset})`}
              >
                {(step - padding) / 10}
              </text>
            )}
          </Fragment>
        );
      })}
      <line
        stroke="#f00"
        strokeWidth={1}
        strokeOpacity={0.75}
        vectorEffect="non-scaling-stroke"
        x1={orientation === 'vertical' ? 0 : cursorPosition}
        x2={orientation === 'vertical' ? size : cursorPosition}
        y1={orientation === 'vertical' ? cursorPosition : 0}
        y2={orientation === 'vertical' ? cursorPosition : size}
      />
    </g>
  );
}

export default Ruler;
