import { nanoid } from 'nanoid';

import lines from './lines';

export function knobPart(options: KnobPart['options'] = { diameter: 7.2, guideDiameter: 17 }): KnobPart {
  return {
    id: nanoid(),
    name: 'Knob',
    type: 'knob',
    width() {
      const { diameter: d, guideDiameter: gd } = this.options;

      return gd > d ? gd : d;
    },
    height() {
      const { diameter: d, guideDiameter: gd } = this.options;

      return gd > d ? gd : d;
    },
    offsetX: 0,
    offsetY: 0,
    options,
    generateLines() {
      const { diameter: d, guideDiameter: gd } = this.options;

      return [
        {
          id: 'main_hole',
          type: 'circle',
          radius: d / 2,
          position: {
            x: gd / 2,
            y: gd / 2,
          },
        },
        {
          id: 'pot_guide',
          type: 'circle',
          isGuide: true,
          radius: gd / 2,
          position: {
            x: gd / 2,
            y: gd / 2,
          },
        },
      ];
    },
    lines,
  };
}
