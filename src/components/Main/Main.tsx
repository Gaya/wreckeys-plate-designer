import EditorContextProvider from './EditorContextProvider';
import SVGRender from './SVGRender';
import Rulers from './Rulers';

import './Main.scss';

function Main() {
  return (
    <main>
      <section className="designer">
        <EditorContextProvider>
          <section className="designer-main">
            <SVGRender />
          </section>
          <section className="designer-rulers">
            <Rulers />
          </section>
        </EditorContextProvider>
      </section>
    </main>
  );
}

export default Main;
