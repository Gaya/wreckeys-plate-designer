import { useAppContext } from '../App/AppContextProvider';

import { plateHeight, plateWidth } from '../../core/calc';
import { plateToPart } from '../../core/part-maker';

import PartRenderer from './parts/PartRenderer';

import './Main.scss';

function Main() {
  const { state } = useAppContext();

  const { plate } = state;

  const padding = 20;
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  const totalWidth = padding * 2 + width;
  const totalHeight = padding * 2 + height;

  const platePlate = plateToPart(plate);

  return (
    <main>
      <section className="designer">
        <svg viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
          <g transform={`translate(${padding}, ${padding})`}>
            <PartRenderer part={platePlate} />
          </g>
        </svg>
      </section>
    </main>
  );
}

export default Main;
