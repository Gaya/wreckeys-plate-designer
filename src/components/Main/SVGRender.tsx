import { plateToPart } from '../../parts/plate';
import { plateHeight, plateWidth } from '../../core/calc';

import { useAppContext } from '../App/AppContextProvider';

import PartRenderer from './parts/PartRenderer';
import useEditorContext from './hooks/useEditorContext';

function SVGRender() {
  const { state } = useAppContext();
  const editor = useEditorContext();

  const { plate, parts } = state;

  const padding = 10;
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  const totalWidth = padding * 2 + width;
  const totalHeight = padding * 2 + height;

  const canvasWidth = height > width ? editor.width / editor.pixelRatio : totalWidth;
  const canvasHeight = width > height ? editor.height / editor.pixelRatio : totalHeight;

  const platePart = plateToPart(plate);

  return (
    <svg viewBox={`0 0 ${canvasWidth || 0} ${canvasHeight || 0}`}>
      <g transform={`translate(${padding}, ${padding})`}>
        <PartRenderer part={platePart} />
        {parts.map((part) => (
          <PartRenderer key={part.id} part={part} editable />
        ))}
      </g>
    </svg>
  );
}

export default SVGRender;
