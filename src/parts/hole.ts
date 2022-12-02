import { nanoid } from 'nanoid';

import lines from './lines';

export function holePart(diameter = 6): HolePart {
  return {
    id: nanoid(),
    name: `Hole`,
    type: 'hole',
    width: function () {
      return this.options.diameter;
    },
    height: function () {
      return this.options.diameter;
    },
    offsetX: 0,
    offsetY: 0,
    options: {
      diameter,
    },
    generateLines: function() {
      const { diameter } = this.options;

      return  [
        {
          id: 'main_hole',
          type: 'circle',
          radius: diameter / 2,
          position: {
            x: diameter / 2,
            y: diameter / 2,
          },
        },
      ];
    },
    lines,
  };
}
