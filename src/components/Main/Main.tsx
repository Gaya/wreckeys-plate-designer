import SizeContextProvider from './SizeContextProvider';
import SVGRender from './SVGRender';

import './Main.scss';

function Main() {
  return (
    <main>
      <section className="designer">
        <SizeContextProvider>
          <SVGRender />
        </SizeContextProvider>
      </section>
    </main>
  );
}

export default Main;
