/// <reference types="react-scripts" />

interface Plate {
  type: '19inch' | 'eurorack' | 'custom';
  width: number;
  height: number;
}

type YPosition = 'top' | 'bottom' | 'middle';
type XPosition = 'left' | 'right' | 'middle';

interface PartPosition {
  ax?: XPosition;
  ay?: YPosition;
  x: number;
  y: number;
}

interface LineBase {
  // starting point
  position: PartPosition;
  isGuide?: boolean;
  dashArray?: string;
}

interface LineRect extends LineBase {
  type: 'rect';
  width: number;
  height: number;
  radius: number;
}

interface LineLine extends LineBase {
  type: 'line';
  // change in x from position
  x: number;
  // change in y from position
  y: number;
}

type PartLine = LineLine | LineRect;

interface Part {
  name: string;
  lines: PartLine[];
}
