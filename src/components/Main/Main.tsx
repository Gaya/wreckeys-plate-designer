import EditorContextProvider from './EditorContextProvider';
import SizeContextProvider from './SizeContextProvider';
import SVGRender from './SVGRender';
import Ruler from './Ruler';

import './Main.scss';

function Main() {
  return (
    <main>
      <section className="designer">
        <EditorContextProvider>
          <section className="designer-main">
            <SizeContextProvider>
              <SVGRender />
            </SizeContextProvider>
          </section>
          <section className="designer-rulers">
            <svg width="100%" height="100%">
              <rect
                fill="#222"
                x={0}
                y={0}
                width={30}
                height={30}
                stroke="#ccc"
                strokeWidth={1}
                vectorEffect="non-scaling-stroke"
              />
              <Ruler
                orientation="horizontal"
                length={1000}
                size={30}
                padding={10}
              />
              <Ruler
                orientation="vertical"
                length={1000}
                size={30}
                padding={10}
              />
            </svg>
          </section>
        </EditorContextProvider>
      </section>
    </main>
  );
}

export default Main;
