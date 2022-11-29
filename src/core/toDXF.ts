import DXF from 'dxf-writer';

import calculatePosition from './position';

function toDXF(parts: Part[]): string {
  const platePart = parts[0];

  const d = new DXF();

  d.setUnits('Millimeters');

  for (let part of parts) {
    // create layer for part
    d.addLayer(part.name, DXF.ACI.GREEN, 'CONTINUOUS');
    d.setActiveLayer(part.name);

    // needed for the Y flipping on the plate part
    const positionY = (y: number): number => platePart.height() - y;

    const drawLine = (x1: number, y1: number, x2: number, y2: number) => {
      return d.drawLine(x1, positionY(y1), x2, positionY(y2));
    };

    const drawArc = (x: number, y: number, r: number, angle1: number, angle2: number) => {
      return d.drawArc(x, positionY(y), r, angle1, angle2);
    };

    const drawCircle = (x: number, y: number, r: number) => {
      return d.drawCircle(x, positionY(y), r);
    };

    // go through lines
    for (let line of part.lines()) {
      if (line.isGuide) {
        continue;
      }

      if (line.type === 'rect') {
        const { x, y } = calculatePosition(line, part);

        const r = line.radius
        const w = line.width;
        const h = line.height;

        if (r > 0) {
          // top left
          drawArc(x + r, y + r, r, 90, 180);
          // bottom left
          drawArc(x + r, y + h - r, r, 180, 270);
          // top right
          drawArc(x - r + w, y + r, r, 0, 90);
          // bottom right
          drawArc(x - r + w, y + h - r, r, 270, 0);
        }

        // bottom
        drawLine(x + r, y, x + w - r, y);
        // right
        drawLine(x + w, y + r, x + w, y + h - r);
        // top
        drawLine(x + w - r, y + h, x + r, y + h);
        // left
        drawLine(x, y + h - r, x, y + r);
      }

      if (line.type === 'circle') {
        const { x, y } = calculatePosition(line, part);

        drawCircle(x, y, line.radius);
      }
    }
  }

  return d.toDxfString();
}

export default toDXF;
