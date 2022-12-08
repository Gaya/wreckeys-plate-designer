import lines from '../parts/lines';

import rotateLines from './rotateLines';

describe('rotateLines', () => {
  const part: PlatePart = {
    id: 'test plate',
    type: 'plate',
    name: 'test plate',
    width: () => 60,
    height: () => 40,
    offsetX: 30,
    offsetY: 20,
    generateLines(): PartLine[] {
      return [
        {
          id: 'rect_1',
          type: 'rect',
          width: 60,
          height: 30,
          radius: 4,
          position: {
            x: 0,
            y: 0,
          },
        },
        {
          id: 'rect_2',
          type: 'rect',
          width: 20,
          height: 10,
          radius: 2,
          position: {
            ax: 'right',
            ay: 'bottom',
            x: 30,
            y: 0,
          },
        },
        {
          id: 'circle_top_left',
          type: 'circle',
          radius: 5,
          position: {
            x: 5,
            y: 5,
          },
        },
        {
          id: 'circle_bottom_right',
          type: 'circle',
          radius: 5,
          position: {
            ax: 'right',
            ay: 'bottom',
            x: 5,
            y: 5,
          },
        },
        {
          id: 'line_right_vert',
          type: 'line',
          x: 0,
          y: 30,
          position: {
            ax: 'right',
            x: 20,
            y: 0,
          },
        },
        {
          id: 'line_right_horizontal',
          type: 'line',
          x: 20,
          y: 0,
          position: {
            x: 40,
            y: 20,
          },
        },
      ];
    },
    lines,
  };

  it('leaves lines untouched when part has no rotations', () => {
    expect(rotateLines(part)).toEqual(part.generateLines());
  });

  it('can handle 90 degree rotation', () => {
    const partCopy = {
      ...part,
      rotation: 90,
    };

    const lines90deg = [
      {
        id: 'rect_1',
        type: 'rect',
        width: 30,
        height: 60,
        radius: 4,
        position: {
          x: 20,
          y: -10,
        },
      },
      {
        id: 'rect_2',
        type: 'rect',
        width: 10,
        height: 20,
        radius: 2,
        position: {
          x: 10,
          y: 0,
        },
      },
      {
        id: 'circle_top_left',
        type: 'circle',
        radius: 5,
        position: {
          x: 45,
          y: -5,
        },
      },
      {
        id: 'circle_bottom_right',
        type: 'circle',
        radius: 5,
        position: {
          x: 15,
          y: 45,
        },
      },
      {
        id: 'line_right_vert',
        type: 'line',
        x: 30,
        y: 0,
        position: {
          x: 20,
          y: 30,
        },
      },
      {
        id: 'line_right_horizontal',
        type: 'line',
        x: 0,
        y: 20,
        position: {
          x: 30,
          y: 30,
        },
      },
    ];

    expect(rotateLines(partCopy)).toEqual(lines90deg);
  });

  it('can handle 180 degree rotation', () => {
    const partCopy = {
      ...part,
      rotation: 180,
    };

    const lines180deg = [
      {
        id: 'rect_1',
        type: 'rect',
        width: 60,
        height: 30,
        radius: 4,
        position: {
          x: 0,
          y: 10,
        },
      },
      {
        id: 'rect_2',
        type: 'rect',
        width: 20,
        height: 10,
        radius: 2,
        position: {
          x: 30,
          y: 0,
        },
      },
      {
        id: 'circle_top_left',
        type: 'circle',
        radius: 5,
        position: {
          x: 55,
          y: 35,
        },
      },
      {
        id: 'circle_bottom_right',
        type: 'circle',
        radius: 5,
        position: {
          x: 5,
          y: 5,
        },
      },
      {
        id: 'line_right_vert',
        type: 'line',
        x: 0,
        y: 30,
        position: {
          x: 20,
          y: 10,
        },
      },
      {
        id: 'line_right_horizontal',
        type: 'line',
        x: 20,
        y: 0,
        position: {
          x: 0,
          y: 20,
        },
      },
    ];

    expect(rotateLines(partCopy)).toEqual(lines180deg);
  });

  it('can handle 270 degree rotation', () => {
    const partCopy = {
      ...part,
      rotation: 270,
    };

    const lines270deg = [
      {
        id: 'rect_1',
        type: 'rect',
        width: 30,
        height: 60,
        radius: 4,
        position: {
          x: 10,
          y: -10,
        },
      },
      {
        id: 'rect_2',
        type: 'rect',
        width: 10,
        height: 20,
        radius: 2,
        position: {
          x: 40,
          y: 20,
        },
      },
      {
        id: 'circle_top_left',
        type: 'circle',
        radius: 5,
        position: {
          x: 15,
          y: 45,
        },
      },
      {
        id: 'circle_bottom_right',
        type: 'circle',
        radius: 5,
        position: {
          x: 45,
          y: -5,
        },
      },
      {
        id: 'line_right_vert',
        type: 'line',
        x: 30,
        y: 0,
        position: {
          x: 10,
          y: 10,
        },
      },
      {
        id: 'line_right_horizontal',
        type: 'line',
        x: 0,
        y: 20,
        position: {
          x: 30,
          y: 10,
        },
      },
    ];

    expect(rotateLines(partCopy)).toEqual(lines270deg);
  });
});
