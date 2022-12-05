import { plateHeight, plateWidth } from '../core/calc';

import lines from './lines';

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
    const mountingHoleYOffset = plate.height >= 3 ? 35.71 : 19.83;
    const mountingHoleWidth = 10;
    const mountingHoleHeight = 6;

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
        radius: mountingHoleHeight / 2,
      };
    });
  }

  if (plate.type === 'eurorack') {
    const mountingHoleXOffset = 7.5;
    const mountingHoleYOffset = 3;
    const mountingHoleDiameter = 3.2;
    const mountingHoleWidth = 6;

    if (plate.width === 1) {
      return [{
        id: 'mounting_hole_1',
        type: 'circle',
        position: {
          x: 5.08 / 2,
          y: mountingHoleYOffset,
        },
        radius: mountingHoleDiameter / 2,
      }, {
        id: 'mounting_hole_2',
        type: 'circle',
        position: {
          ay: 'bottom',
          x: 5.08 / 2,
          y: mountingHoleYOffset,
        },
        radius: mountingHoleDiameter / 2,
      }];
    }

    return (plate.width < 5 ? [1, 4] : [1, 2, 3, 4]).map((i): LineRect => {
      return {
        id: `mounting_hole_${i}`,
        type: 'rect',
        position: {
          ax: i % 2 === 0 ? 'right' : 'left',
          ay: i > 2 ? 'bottom' : 'top',
          x: mountingHoleXOffset - mountingHoleWidth,
          y: mountingHoleYOffset - mountingHoleDiameter / 2,
        },
        width: mountingHoleWidth,
        height: mountingHoleDiameter,
        radius: mountingHoleDiameter / 2,
      };
    });
  }

  return [];
}

export function plateToPart(plate: Plate): PlatePart {
  const width = plateWidth(plate);
  const height = plateHeight(plate);
  const radius = plate.type === '19inch' ? 3 : 1;

  return {
    id: 'plate',
    type: 'plate',
    name: 'Back plate',
    width: function () {
      return width;
    },
    height: function () {
      return height;
    },
    generateLines: function() {
      return [
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
      ];
    },
    lines,
  };
}
