function xOffsetRelative(line: PartLine, relative: LineRect): number {
  if (line.position.ax === 'right') {
    return relative.width;
  }

  if (line.position.ax === 'middle') {
    return relative.width / 2;
  }

  return 0;
}

function yOffsetRelative(line: PartLine, relative: LineRect): number {
  if (line.position.ay === 'bottom') {
    return relative.height;
  }

  if (line.position.ay === 'middle') {
    return relative.height / 2;
  }

  return 0;
}

function calculatePosition(line: PartLine, relative: LineRect): { x: number; y: number; } {
  const xOffset = relative.position.x;
  const yOffset = relative.position.y;

  // if line matches the relative line, return offset only
  if (line.id === relative.id) {
    return {
      x: xOffset,
      y: yOffset,
    };
  }

  const xor = xOffsetRelative(line, relative);
  const yor = yOffsetRelative(line, relative);

  return {
    x: xOffset + xor + line.position.x,
    y: yOffset + yor + line.position.y,
  };
}

export default calculatePosition;
