import { Plate } from '../../App/AppContextProvider';

interface RackPlateProps {
  type: Plate['type'];
  strokeWidth: number;
  padding: number;
  width: number;
  height: number;
}

function RackPlate({ type, strokeWidth, padding, width, height }: RackPlateProps) {
  const radius = type === '19inch' ? 4 : 2;

  const mountingHoleXOffset = 7.9375;
  const mountingHoleYOffset = 22.225;
  const mountingHoleSize = 8;
  const mountingHoleLength = 12;

  return (
    <g transform={`translate(${padding}, ${padding})`}>
      <rect
        fill="transparent"
        stroke="#111"
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        rx={radius}
        ry={radius}
        width={width}
        height={height}
      />
      {[1, 2, 3, 4].map((i) => {
        const x = i % 2 === 1
          ? mountingHoleXOffset - (mountingHoleSize / 2)
          : width - (mountingHoleXOffset + (mountingHoleSize / 2));
        const y = i > 2
          ? mountingHoleYOffset - (mountingHoleLength / 2)
          : height - (mountingHoleYOffset + (mountingHoleLength / 2));

        return (
          <rect
            key={`hole_${i}`}
            x={x}
            y={y}
            fill="transparent"
            stroke="#111"
            strokeWidth={strokeWidth}
            strokeLinejoin="round"
            width={mountingHoleSize}
            height={mountingHoleLength}
            rx={mountingHoleSize / 2}
            ry={mountingHoleSize / 2}
          />
        );
      })}
    </g>
  );
}

export default RackPlate;
