import DXF from 'dxf-writer';

function degToRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}

function toDXF(parts: Part[]): string {
  const d = new DXF();

  d.setUnits('Millimeters');

  for (let part of parts) {
    // create layer for part
    d.addLayer(part.name, DXF.ACI.GREEN, 'CONTINUOUS');
    d.setActiveLayer(part.name);

    // go through lines
    for (let line of part.lines) {
      if (line.isGuide) {
        continue;
      }

      if (line.type === 'rect') {
        const x = line.position.x;
        const y = line.position.y;

        // d.drawArc(50, 50, 50, 30, 90);

        const r = line.radius
        const w = line.width;
        const h = line.height;

        if (r > 0) {
          // bottom left
          d.drawArc(x + r, y + r, r, 180, 270);
          // top right
          d.drawArc(x + r, y + h - r, r, 90, 180);
          // bottom right
          d.drawArc(x - r + w, y + r, r, 270, 0);
          // top right
          d.drawArc(x - r + w, y + h - r, r, 0, 90);
        }

        // bottom
        d.drawLine(x + r, y, x + w - r, y)
          // right
          .drawLine(x + w, y + r, x + w, y + h - r)
          // top
          .drawLine(x + w - r, y + h, x + r, y + h)
          // left
          .drawLine(x, y + h - r, x, y + r);
      }
    }
  }

  return d.toDxfString();
}

export default toDXF;
