import { useAppContext } from '../App/AppContextProvider';

import { plateHeight, plateWidth } from '../../core/calc';

import RackPlate from './parts/RackPlate';

import './Main.scss';

function Main() {
  const { state } = useAppContext();

  const { plate } = state;

  const pixelmm = 1;

  const padding = 20;
  const width = plateWidth(plate);
  const height = plateHeight(plate);

  const totalWidth = padding * 2 + width;
  const totalHeight = padding * 2 + height;

  return (
    <main>
      <section className="designer">
        <svg viewBox={`0 0 ${totalWidth} ${totalHeight}`}>
          <RackPlate
            type={plate.type}
            strokeWidth={pixelmm}
            padding={padding}
            width={width}
            height={height}
          />
        </svg>
      </section>
    </main>
  );
}

export default Main;
