import { nanoid } from 'nanoid';

export function holePart(diameter = 6): HolePart {
  return {
    id: nanoid(),
    name: `Hole`,
    type: 'hole',
    width: diameter,
    height: diameter,
    offsetX: 0,
    offsetY: 0,
    options: {
      diameter,
    },
    lines: [
      {
        id: 'main_hole',
        type: 'circle',
        radius: diameter / 2,
        position: {
          x: diameter / 2,
          y: diameter / 2,
        },
      },
    ],
  };
}
