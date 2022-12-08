import { nanoid } from 'nanoid';

import lines from './lines';

export function guideLinePart(options: GuideLinePart['options'] = { x: 40, y: 0 }): GuideLinePart {
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
