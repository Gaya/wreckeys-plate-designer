import { nanoid } from 'nanoid';

export function knobPart(diameter = 7.2, guideDiameter = 17): KnobPart {
  return {
    id: nanoid(),
    name: 'Knob',
    type: 'knob',
    width: function () {
      const { diameter: d, guideDiameter: gd } = this.options;

      return gd > d ? gd : d;
    },
    height: function () {
      const { diameter: d, guideDiameter: gd } = this.options;

      return gd > d ? gd : d;
    },
    offsetX: 0,
    offsetY: 0,
    options: {
      diameter,
      guideDiameter,
    },
    lines: function() {
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
  };
}
