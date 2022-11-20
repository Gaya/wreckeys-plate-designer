import { useAppContext } from '../AppContextProvider';

import './Main.scss';

function Main() {
  const { state } = useAppContext();

  const { plate } = state;

  return (
    <main>
      <svg>

      </svg>
    </main>
  );
}

export default Main;
