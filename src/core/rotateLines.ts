function rotate(cx: number, cy: number, x: number, y: number, angle: number) {
  const radians = (Math.PI / 180) * (angle * -1);
  const cos = Math.cos(radians);
  const sin = Math.sin(radians);
  const nx = (cos * (x - cx)) + (sin * (y - cy)) + cx;
  const ny = (cos * (y - cy)) - (sin * (x - cx)) + cy;

  return [nx, ny];
}

function rotateLines(part: Part): PartLine[] {
  const untouched = part.generateLines();

  if ((part.rotation || 0) % 360 === 0) {
    return untouched;
  }

  return untouched.map((line) => {
    const lineCopy = { ...line };

    // change rect shapes to rotated
    if (lineCopy.type === 'rect' && (part.rotation === 90 || part.rotation === 270)) {
      const { width, height } = lineCopy;
      lineCopy.width = height;
      lineCopy.height = width;
    }

    // change line shapes to rotated
    if (lineCopy.type === 'line' && (part.rotation === 90 || part.rotation === 270)) {
      const { x, y } = lineCopy;
      lineCopy.x = y;
      lineCopy.y = x;
    }

    // repair position to neutral
    if (line.position.ax === 'right') {
      delete lineCopy.position.ax;
      lineCopy.position.x = part.width() - lineCopy.position.x;

      if (line.type === 'rect') {
        lineCopy.position.x = lineCopy.position.x - line.width;
      }

      if (line.type === 'line') {
        lineCopy.position.x = lineCopy.position.x - line.x;
      }
    }

    if (line.position.ay === 'bottom') {
      delete lineCopy.position.ay;
      lineCopy.position.y = part.height() - lineCopy.position.y;

      if (line.type === 'rect') {
        lineCopy.position.y = lineCopy.position.y - line.height;
      }

      if (line.type === 'line') {
        lineCopy.position.y = lineCopy.position.y - line.y;
      }
    }

    // determine new position of object
    const [nx, ny] = rotate(
      part.width() / 2,
      part.height() / 2,
      lineCopy.position.x,
      lineCopy.position.y,
      part.rotation || 0,
    );

    lineCopy.position.x = nx;
    lineCopy.position.y = ny;

    // offset position for drawing point
    if (part.rotation === 90) {
      if (lineCopy.type === 'rect') {
        lineCopy.position.x = lineCopy.position.x - lineCopy.width;
      }

      if (lineCopy.type === 'line') {
        lineCopy.position.x = lineCopy.position.x - lineCopy.x;
      }
    }

    if (part.rotation === 270) {
      if (lineCopy.type === 'rect') {
        lineCopy.position.y = lineCopy.position.y - lineCopy.height;
      }
    }

    if (part.rotation === 180) {
      if (lineCopy.type === 'rect') {
        lineCopy.position.x = lineCopy.position.x - lineCopy.width;
        lineCopy.position.y = lineCopy.position.y - lineCopy.height;
      }

      if (lineCopy.type === 'line') {
        lineCopy.position.x = lineCopy.position.x - lineCopy.x;
        lineCopy.position.y = lineCopy.position.y - lineCopy.y;
      }
    }

    // fix numbers
    const x = parseFloat(lineCopy.position.x.toFixed(2));
    const y = parseFloat(lineCopy.position.y.toFixed(2));

    lineCopy.position.x = x === 0 ? 0 : x;
    lineCopy.position.y = y === 0 ? 0 : y;

    return lineCopy;
  });
}

export default rotateLines;
