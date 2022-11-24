import { plateToPart } from '../../core/part-maker';
import { plateHeight, plateWidth } from '../../core/calc';

import { useAppContext } from '../App/AppContextProvider';

import Ruler from './Ruler';
import PartRenderer from './parts/PartRenderer';
import useDimensions from './hooks/useDimensions';

function SVGRender() {
  const { state } = useAppContext();
  const dimensions = useDimensions();

  const { plate } = state;

  const padding = 10;
  const width = plateWidth(plate);
  const height = plateHeight(plate);
  const rulerSize = 17;

  const totalWidth = padding * 2 + width + rulerSize;
  const totalHeight = padding * 2 + height + rulerSize;

  const canvasWidth =  height > width
    ? dimensions.width * (totalHeight / dimensions.height)
    : totalWidth;
  const canvasHeight =  width > height
    ? dimensions.height * (totalWidth / dimensions.width)
    : totalHeight;

  const platePlate = plateToPart(plate);

  return (
    <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
      <g transform={`translate(0, 0)`}>
        <rect
          fill="#222"
          x={0}
          y={0}
          width={rulerSize}
          height={rulerSize}
          stroke="#ccc"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <Ruler
          orientation="vertical"
          length={width > height && canvasHeight > 0 ? canvasHeight : height}
          size={rulerSize}
          padding={padding}
        />
        <Ruler
          orientation="horizontal"
          length={height > width && canvasWidth > 0 ? canvasWidth : width}
          size={rulerSize}
          padding={padding}
        />
      </g>
      <g transform={`translate(${rulerSize + padding}, ${rulerSize + padding})`}>
        <PartRenderer part={platePlate} />
      </g>
    </svg>
  );
}

export default SVGRender;
