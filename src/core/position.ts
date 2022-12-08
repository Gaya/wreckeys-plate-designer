function xOffsetRelative(line: PartLine, part: Part): number {
  if (line.position.ax === 'right') {
    return part.width() - (line.type === 'rect' ? line.width : 0);
  }

  if (line.position.ax === 'middle') {
    return part.width() / 2 - (line.type === 'rect' ? line.width / 2 : 0);
  }

  return 0;
}

function yOffsetRelative(line: PartLine, part: Part): number {
  if (line.position.ay === 'bottom') {
    return part.height() - (line.type === 'rect' ? line.height : 0);
  }

  if (line.position.ay === 'middle') {
    return part.height() / 2 - (line.type === 'rect' ? line.height / 2 : 0);
  }

  return 0;
}

function calculatePosition(line: PartLine, part: Part): { x: number; y: number; } {
  const xOffset = xOffsetRelative(line, part) + (part.offsetX || 0);
  const yOffset = yOffsetRelative(line, part) + (part.offsetY || 0);
  const xDirection = line.position.ax === 'right' ? -1 : 1;
  const yDirection = line.position.ay === 'bottom' ? -1 : 1;

  return {
    x: xOffset + (line.position.x * xDirection),
    y: yOffset + (line.position.y * yDirection),
  };
}

export default calculatePosition;
