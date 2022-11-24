import { useEffect } from 'react';

import { plateToPart } from '../../core/part-maker';
import { plateHeight, plateWidth } from '../../core/calc';

import { useAppContext } from '../App/AppContextProvider';

import Ruler from './Ruler';
import PartRenderer from './parts/PartRenderer';
import useDimensions from './hooks/useDimensions';
import useEditorContext from './hooks/useEditorContext';

function SVGRender() {
  const { state } = useAppContext();
  const dimensions = useDimensions();
  const { setPixelRatio } = useEditorContext();

  const { plate } = state;

  const padding = 10;
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  const totalWidth = padding * 2 + width;
  const totalHeight = padding * 2 + height;

  const canvasWidth =  height > width
    ? dimensions.width * (totalHeight / dimensions.height)
    : totalWidth;
  const canvasHeight =  width > height
    ? dimensions.height * (totalWidth / dimensions.width)
    : totalHeight;

  const platePart = plateToPart(plate);

  useEffect(() => {
    setPixelRatio(dimensions.width / totalWidth);
  }, [dimensions.width, setPixelRatio, totalWidth]);

  return (
    <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`}>
      <g transform={`translate(${padding}, ${padding})`}>
        <PartRenderer part={platePart} />
      </g>
    </svg>
  );
}

export default SVGRender;
