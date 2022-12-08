import { nanoid } from 'nanoid';

import lines from './lines';

export function segmentPart(): SegmentPart {
  return {
    id: nanoid(),
    name: 'Segment Display',
    type: 'segment',
    width() {
      return 57;
    },
    height() {
      return 24;
    },
    rotation: 0,
    offsetX: 0,
    offsetY: 0,
    generateLines() {
      return [
        {
          id: 'device_guide',
          isGuide: true,
          type: 'rect',
          radius: 0,
          width: 42,
          height: 24,
          position: {
            x: 0,
            y: 0,
          },
        },
        {
          id: 'device_pin_guide',
          isGuide: true,
          type: 'rect',
          radius: 0,
          width: 15,
          height: 12,
          position: {
            x: 42,
            y: (this.height() / 2) - 6,
          },
        },
        {
          id: 'display_hole',
          type: 'rect',
          radius: 0.5,
          position: {
            x: 7 - 0.5,
            y: 5 - 0.5,
          },
          width: 31,
          height: 15,
        },
        {
          id: 'mount_top_left',
          type: 'circle',
          radius: 1.1,
          position: {
            x: 2 - 0.05,
            y: 2 - 0.05,
          },
        },
        {
          id: 'mount_bottom_left',
          type: 'circle',
          radius: 1.1,
          position: {
            x: 2 - 0.05,
            y: this.height() - 2 - 0.05,
          },
        },
        {
          id: 'mount_top_right',
          type: 'circle',
          radius: 1.1,
          position: {
            x: 40 - 0.05,
            y: 2 - 0.05,
          },
        },
        {
          id: 'mount_bottom_right',
          type: 'circle',
          radius: 1.1,
          position: {
            x: 40 - 0.05,
            y: this.height() - 2 - 0.05,
          },
        },
      ];
    },
    lines,
  };
}
