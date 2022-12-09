import { circlePart } from '../parts/circle';
import { guideLinePart } from '../parts/guideLine';
import { knobPart } from '../parts/knob';
import { rectPart } from '../parts/rect';
import { segmentPart } from '../parts/segment';
import { sliderPart } from '../parts/slider';

type SavePart = Pick<Part, 'name' | 'type' | 'offsetX' | 'offsetY' | 'rotation'>
  & { options?: PartWithOptions['options'] };

interface SaveFormat {
  plate: Plate;
  parts: SavePart[];
}

export function parseSaveFile(fileContents: string): { plate: Plate; parts: Part[] } {
  const parsed: SaveFormat = JSON.parse(fileContents);

  return {
    plate: parsed.plate,
    parts: parsed.parts.map((p) => {
      let part;

      if (p.type === 'circle') {
        part = circlePart(p.options as Partial<CirclePart['options']>);
      }

      if (p.type === 'guideline') {
        part = guideLinePart(p.options as Partial<GuideLinePart['options']>);
      }

      if (p.type === 'knob') {
        part = knobPart(p.options as Partial<KnobPart['options']>);
      }

      if (p.type === 'rect') {
        part = rectPart(p.options as Partial<RectPart['options']>);
      }

      if (p.type === 'segment') {
        part = segmentPart();
      }

      if (p.type === 'slider') {
        part = sliderPart(p.options as Partial<SliderPart['options']>);
      }

      if (!part) {
        throw new Error(`Unknown part "${p.type}"`);
      }

      if (typeof p.rotation !== 'undefined') {
        part.rotation = p.rotation;
      }

      part.offsetX = p.offsetX;
      part.offsetY = p.offsetY;

      return part;
    }),
  };
}

export function toSaveFormat(plate: Plate, parts: Part[]): string {
  const persistence: SaveFormat = {
    plate,
    parts: parts.map((p) => {
      const {
        name,
        type,
        offsetX,
        offsetY,
        rotation,
      } = p;

      return {
        name,
        type,
        offsetX,
        offsetY,
        rotation,
        options: 'options' in p ? p.options : undefined,
      };
    }),
  };

  return JSON.stringify(persistence);
}
