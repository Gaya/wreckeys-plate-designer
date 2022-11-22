import { plateHeight, plateWidth } from './calc';

export function plateToPart(plate: Plate): Part {
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  const railWidth = 15.875;
  const mountingHoleXOffset = railWidth / 2;
  const mountingHoleYOffset = 22.225;
  const mountingHoleWidth = 8;
  const mountingHoleHeight = 12;

  return {
    name: 'Back plate',
    lines: [
      // plate
      {
        id: 'base',
        type: 'rect',
        position: { x: 0, y: 0 },
        width,
        height,
        radius: plate.type === '19inch' ? 4 : 2,
      },
      // guides
      ...[1, 2].map((i): LineLine => ({
        id: `guide_${i}`,
        type: 'line',
        isGuide: true,
        position: {
          ax: i === 1 ? 'left' : 'right',
          x: railWidth,
          y: 0,
        },
        x: 0,
        y: height,
      })),
      // mounting holes
      ...(plate.height === 1 ? [1, 2] : [1, 2, 3, 4]).map((i): LineRect => {
        const x = mountingHoleXOffset - (mountingHoleWidth / 2);
        const y = mountingHoleYOffset - (mountingHoleHeight / 2);

        return {
          id: `mounting_hole_${i}`,
          type: 'rect',
          position: {
            ax: i % 2 === 0 ? 'right' : 'left',
            ay: i > 2 ? 'bottom' : 'top',
            x,
            y,
          },
          width: mountingHoleWidth,
          height: mountingHoleHeight,
          radius: mountingHoleWidth / 2,
        };
      }),
    ],
  };
}
