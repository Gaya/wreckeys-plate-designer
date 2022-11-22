import { plateHeight, plateWidth } from './calc';

export function plateToPart(plate: Plate): Part {
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  const railWidth = 15.875;
  const mountingHoleXOffset = railWidth / 2;
  const mountingHoleYOffset = 22.225;
  const mountingHoleSize = 8;
  const mountingHoleLength = 12;

  return {
    name: 'Back plate',
    lines: [
      // plate
      {
        type: 'rect',
        position: { x: 0, y: 0 },
        width,
        height,
        radius: plate.type === '19inch' ? 4 : 2,
      },
      // guides
      {
        type: 'line',
        isGuide: true,
        position: {
          x: railWidth,
          y: 0,
        },
        x: 0,
        y: height,
      },
      {
        type: 'line',
        isGuide: true,
        position: {
          ax: 'right',
          x: railWidth * -1,
          y: 0,
        },
        x: 0,
        y: height,
      },
    ],
  };
}
