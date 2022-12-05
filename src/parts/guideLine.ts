import { nanoid } from 'nanoid';

import lines from './lines';

export function guideLinePart(length = 40): GuideLinePart {
  return {
    id: nanoid(),
    name: 'Guide Line',
    type: 'guideline',
    width: function () {
      return this.options.x;
    },
    height: function () {
      return this.options.y;
    },
    offsetX: 0,
    offsetY: 0,
    options: {
      x: length,
      y: 0,
    },
    generateLines: function() {
      const { x, y } = this.options;

      return  [
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
