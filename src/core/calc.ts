function heightRatioByPlate(plate: Plate) {
  switch (plate.type) {
    case 'eurorack':
    case '19inch':
      // 1 RU is 44.45 mm;
      return 44.45;
    default:
      // custom is in mm
      return 1;
  }
}

function heightCorrection(plate: Plate) {
  switch (plate.type) {
    case 'eurorack':
    case '19inch':
      // give 4.8mm margin space
      return 4.8;
    default:
      return 0;
  }
}

function widthRatioByPlate(plate: Plate) {
  switch (plate.type) {
    case '19inch':
      // 1 inch is 25.4 mm
      return 25.4;
    case 'eurorack':
      // 1 hp is 5.08 mm
      return 5.08;
    default:
      // custom is in mm
      return 1;
  }
}

function fixPrecision(float: number): number {
  return parseFloat(float.toPrecision(12));
}

export function plateWidth(plate: Plate): number {
  if (plate.width < 0) {
    throw new Error('Plate cannot have negative width');
  }

  return fixPrecision(plate.width * widthRatioByPlate(plate));
}

export function plateHeight(plate: Plate): number {
  if (plate.height < 0) {
    throw new Error('Plate cannot have negative height');
  }

  return fixPrecision(
    Math.max(0, (plate.height * heightRatioByPlate(plate)) - heightCorrection(plate)),
  );
}
