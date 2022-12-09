type SavePart = Pick<Part, 'name' | 'type' | 'offsetX' | 'offsetY' | 'rotation'>
  & { options?: PartWithOptions['options'] };

interface SaveFormat {
  plate: Plate;
  parts: SavePart[];
}

export function toSaveFormat(plate: Plate, parts: Part[]): string {
  const persistance: SaveFormat = {
    plate,
    parts: parts.map((p) => {
      const {
        name,
        type,
        offsetX,
        offsetY,
      } = p;

      return {
        name,
        type,
        offsetX,
        offsetY,
        options: 'options' in p ? p.options : undefined,
      };
    }),
  };

  return JSON.stringify(persistance);
}
