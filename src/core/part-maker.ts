import { plateHeight, plateWidth } from './calc';

function guidelines(plate: Plate): PartLine[] {
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  if (plate.type === '19inch') {
    const railWidth = 15.875;

    return [1, 2].map((i): LineLine => ({
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
    }));
  }

  if (plate.type === 'eurorack') {
    return [1, 2].map((i): LineLine => ({
      id: `guide_${i}`,
      type: 'line',
      isGuide: true,
      position: {
        ay: i === 1 ? 'top' : 'bottom',
        x: 0,
        y: 6,
      },
      x: width,
      y: 0,
    }));
  }

  return [];
}

function mountingHoles(plate: Plate): PartLine[] {
  if (plate.type === '19inch') {
    const railWidth = 15.875;
    const mountingHoleXOffset = railWidth / 2;
    const mountingHoleYOffset = 19.825;
    const mountingHoleWidth = 4;
    const mountingHoleHeight = 8;

    return (plate.height === 1 ? [1, 2] : [1, 2, 3, 4]).map((i): LineRect => {
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
    });
  }

  if (plate.type === 'eurorack') {
    const mountingHoleXOffset = 7.5;
    const mountingHoleYOffset = 3;
    const mountingHoleWidth = 3.2;

    return (plate.height === 1 ? [1, 2] : [1, 2, 3, 4]).map((i): LineRect => {
      const x = mountingHoleXOffset - (mountingHoleWidth / 2);
      const y = mountingHoleYOffset - (mountingHoleWidth / 2);

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
        height: mountingHoleWidth,
        radius: mountingHoleWidth / 2,
      };
    });
  }

  return [];
}

export function plateToPart(plate: Plate): Part {
  const width = plateWidth(plate);
  const height = plateHeight(plate);
  const radius = plate.type === '19inch' ? 4 : 1;

  return {
    name: 'Back plate',
    width,
    height,
    lines: [
      {
        id: 'base',
        type: 'rect',
        position: { x: 0, y: 0 },
        width,
        height,
        radius,
      },
      ...guidelines(plate),
      ...mountingHoles(plate),
    ],
  };
}
