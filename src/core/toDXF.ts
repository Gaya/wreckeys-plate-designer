import DXF from 'dxf-writer';

import calculatePosition from './position';

function toDXF(parts: Part[]): string {
  const d = new DXF();

  d.setUnits('Millimeters');

  for (let part of parts) {
    // create layer for part
    d.addLayer(part.name, DXF.ACI.GREEN, 'CONTINUOUS');
    d.setActiveLayer(part.name);

    // needed for the Y flipping
    const invertY = (y: number): number => part.height - y;

    // go through lines
    for (let line of part.lines) {
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
          d.drawArc(x + r, invertY(y + r), r, 90, 180);
          // bottom left
          d.drawArc(x + r, invertY(y + h - r), r, 180, 270);
          // top right
          d.drawArc(x - r + w, invertY(y + r), r, 0, 90);
          // bottom right
          d.drawArc(x - r + w, invertY(y + h - r), r, 270, 0);
        }

        // bottom
        d.drawLine(x + r, invertY(y), x + w - r, invertY(y))
          // right
          .drawLine(x + w, invertY(y + r), x + w, invertY(y + h - r))
          // top
          .drawLine(x + w - r, invertY(y + h), x + r, invertY(y + h))
          // left
          .drawLine(x, invertY(y + h - r), x, invertY(y + r));
      }

      if (line.type === 'circle') {
        const { x, y } = calculatePosition(line, part);

        d.drawCircle(x, y, line.radius);
      }
    }
  }

  return d.toDxfString();
}

export default toDXF;
