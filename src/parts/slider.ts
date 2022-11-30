import { nanoid } from 'nanoid';

export function sliderPart(length = 75): SliderPart {
  return {
    id: nanoid(),
    name: `Slider`,
    type: 'slider',
    width: function () {
      return 7.5;
    },
    height: function () {
      return this.options.length;
    },
    offsetX: 0,
    offsetY: 0,
    options: {
      length,
    },
    lines: function() {
      return  [
        {
          id: 'mechanism',
          isGuide: true,
          type: 'rect',
          position: { x: 0, y: 0 },
          width: this.width(),
          height: this.height(),
          radius: 0,
        },
        {
          id: 'drill_hole_1',
          type: 'circle',
          position: { x: this.width() / 2, y: 2 },
          radius: 2.2 / 2,
        },
        {
          id: 'drill_hole_2',
          type: 'circle',
          position: {
            ay: 'bottom',
            x: this.width() / 2,
            y: 2,
          },
          radius: 2.2 / 2,
        },
      ];
    },
  };
}
