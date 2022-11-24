import { plateHeight, plateWidth } from '../../core/calc';
import { plateToPart } from '../../core/part-maker';

import { useAppContext } from '../App/AppContextProvider';

import SizeContextProvider from './SizeContextProvider';
import PartRenderer from './parts/PartRenderer';

import './Main.scss';

function Main() {
  const { state } = useAppContext();

  const { plate } = state;

  const padding = 10;
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  const totalWidth = padding * 2 + width;
  const totalHeight = padding * 2 + height;

  const platePlate = plateToPart(plate);

  return (
    <main>
      <section className="designer">
        <SizeContextProvider>
          <svg viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
            <g transform={`translate(${padding}, ${padding})`}>
              <PartRenderer part={platePlate} />
            </g>
          </svg>
        </SizeContextProvider>
      </section>
    </main>
  );
}

export default Main;
