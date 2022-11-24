import { Fragment } from "react";

import useEditorContext from './hooks/useEditorContext';

interface RulerProps {
  orientation: 'horizontal' | 'vertical';
  length: number;
  size: number;
  padding: number;
}

function Ruler({ length, size, padding, orientation }: RulerProps) {
  const { pixelRatio } = useEditorContext();

  if (length === 0 || pixelRatio === 0) {
    return null;
  }

  const rulerSize = Math.ceil((padding + length + padding) / 5);

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
      {new Array(rulerSize).fill('').map((_, step) => {
        const stepOffset = (step * 5) * pixelRatio;
        const stepLineLength = step % 2 === 0 ? size / 3 : size / 5;
        const textOffset = size * 2/3;
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
            {step % 2 === 0 && step > 0 && (
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
                {(step / 2) - (padding / 10)}
              </text>
            )}
          </Fragment>
        );
      })}
    </g>
  );
}

export default Ruler;
