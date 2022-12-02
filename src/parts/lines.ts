import rotateLines from '../core/rotateLines';

function lines(this: Part): PartLine[] {
  return rotateLines(this);
}

export default lines;
