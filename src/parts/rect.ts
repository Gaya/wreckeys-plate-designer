import { nanoid } from 'nanoid';

import lines from './lines';

const defaultOptions = { radius: 0, width: 40, height: 30 };

export function rectPart(opts?: Partial<RectPart['options']>): RectPart {
  const options = {
    radius: typeof opts?.radius === 'undefined'
      ? defaultOptions.radius : opts?.radius,
    width: typeof opts?.width === 'undefined'
      ? defaultOptions.width : opts?.width,
    height: typeof opts?.height === 'undefined'
      ? defaultOptions.height : opts?.height,
  };

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
