import { nanoid } from 'nanoid';

import lines from './lines';

const defaultOptions = { x: 40, y: 0 };

export function guideLinePart(opts?: Partial<GuideLinePart['options']>): GuideLinePart {
  const options = {
    x: typeof opts?.x === 'undefined' ? defaultOptions.x : opts?.x,
    y: typeof opts?.y === 'undefined' ? defaultOptions.y : opts?.y,
  };

  return {
    id: nanoid(),
    name: 'Guide Line',
    type: 'guideline',
    width() {
      return this.options.x;
    },
    height() {
      return this.options.y;
    },
    offsetX: 0,
    offsetY: 0,
    options,
    generateLines() {
      const { x, y } = this.options;

      return [
        {
          id: 'guide_line',
          isGuide: true,
          type: 'line',
          x,
          y,
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
