/// <reference types="react-scripts" />

interface Plate {
  type: '19inch' | 'eurorack' | 'custom';
  width: number;
  height: number;
  radius: number;
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
  id: string;
  // starting point
  position: PartPosition;
  // guide options
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

interface LineCircle extends LineBase {
  type: 'circle';
  radius: number;
}

type PartLine = LineLine | LineRect | LineCircle;
type PartType = 'plate' | 'knob' | 'slider' | 'segment' | 'circle' | 'rect' | 'guideline';

interface PartBase {
  id: string;
  name: string;
  width(): number;
  height(): number;
  rotation?: number;
  offsetX?: number;
  offsetY?: number;
  generateLines(): PartLine[];
  lines(): PartLine[];
}

interface PlatePart extends PartBase {
  type: 'plate';
}

interface KnobPart extends PartBase {
  type: 'knob';
  options: {
    diameter: number;
    guideDiameter: number;
  };
}

interface CirclePart extends PartBase {
  type: 'circle';
  options: {
    diameter: number;
  };
}

interface SliderPart extends PartBase {
  type: 'slider';
  options: {
    length: number;
  };
}

interface SegmentPart extends PartBase {
  type: 'segment';
}

interface RectPart extends PartBase {
  type: 'rect';
  options: {
    width: number;
    height: number;
    radius: number;
  };
}

interface GuideLinePart extends PartBase {
  type: 'guideline';
  options: {
    x: number;
    y: number;
  };
}

type PartWithOptions = KnobPart | CirclePart | SliderPart | RectPart | GuideLinePart;
type PartWithoutOptions = PlatePart | SegmentPart;
type Part = PartWithoutOptions | PartWithOptions;
