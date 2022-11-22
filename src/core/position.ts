function xOffsetRelative(line: PartLine, relative: LineRect): number {
  if (line.position.ax === 'right') {
    return relative.width - (line.type === 'rect' ? line.width : 0);
  }

  if (line.position.ax === 'middle') {
    return relative.width / 2  - (line.type === 'rect' ? line.width / 2 : 0);
  }

  return 0;
}

function yOffsetRelative(line: PartLine, relative: LineRect): number {
  if (line.position.ay === 'bottom') {
    return relative.height - (line.type === 'rect' ? line.height : 0);
  }

  if (line.position.ay === 'middle') {
    return relative.height / 2 - (line.type === 'rect' ? line.height / 2 : 0);
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
  const xDirection = line.position.ax === 'right' ? -1 : 1;
  const yDirection = line.position.ay === 'bottom' ? -1 : 1;

  return {
    x: xOffset + xor + (line.position.x * xDirection),
    y: yOffset + yor + (line.position.y * yDirection),
  };
}

export default calculatePosition;
