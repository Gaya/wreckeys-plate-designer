import { nanoid } from 'nanoid';

import lines from './lines';

export function rectPart(
  options: RectPart['options'] = { radius: 0, width: 40, height: 30 },
): RectPart {
  return {
    id: nanoid(),
    name: 'Rectangle',
    type: 'rect',
    width() {
      return this.options.width;
    },
    height() {
      return this.options.height;
    },
    offsetX: 0,
    offsetY: 0,
    rotation: 0,
    options,
    generateLines() {
      const { radius, width, height } = this.options;

      return [
        {
          id: 'rect_hole',
          type: 'rect',
          radius,
          width,
          height,
          position: {
            x: 0,
            y: 0,
          },
        },
      ];
    },
    lines,
  };
}
