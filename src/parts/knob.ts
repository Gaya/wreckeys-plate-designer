import { nanoid } from 'nanoid';

export function knobPart(diameter = 7, guideDiameter = 17): Part {
  const diameterSpacing = 0.2;

  return {
    id: nanoid(),
    name: 'Knob',
    width: (diameter / 2) + guideDiameter,
    height: guideDiameter,
    offsetX: 0,
    offsetY: 0,
    lines: [
      {
        id: 'main_hole',
        type: 'circle',
        radius: (diameter + diameterSpacing) / 2,
        position: {
          x: guideDiameter / 2,
          y: guideDiameter / 2,
        },
      },
      {
        id: 'pot_guide',
        type: 'circle',
        isGuide: true,
        radius: guideDiameter / 2,
        position: {
          x: guideDiameter / 2,
          y: guideDiameter / 2,
        },
      },
      {
        id: 'pot_cable_guide',
        type: 'rect',
        isGuide: true,
        width: guideDiameter,
        height: guideDiameter,
        radius: 0,
        position: {
          x: guideDiameter / 2,
          y: 0,
        },
      }
    ],
  };
}
