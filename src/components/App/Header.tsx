import { useCallback } from 'react';
import { saveAs } from 'file-saver';

import { plateToPart } from '../../parts/plate';
import toDXF from '../../core/toDXF';

import { useAppContext } from './AppContextProvider';

import logo from './wreckeys-logo.svg';

import './Header.scss';

function Header() {
  const { state } = useAppContext();

  const convertToDXF = useCallback(() => {
    const platePart = plateToPart(state.plate);
    const dxfString = toDXF([platePart, ...state.parts]);

    const blob = new Blob([dxfString], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'wreckeys-plate-drawing.dxf');

    // eslint-disable-next-line no-alert
    window.alert('Converted to DXF');
  }, [state.parts, state.plate]);

  return (
    <header>
      <menu>
        <ul>
          <li>
            <button type="button">Save Design</button>
          </li>
          <li>
            <button type="button" onClick={convertToDXF}>Export to DXF</button>
          </li>
          <li>
            <a href="https://wreckeys.com">{'← Back to Wreckey\'s'}</a>
          </li>
        </ul>
      </menu>
      <img height={22} width={60} src={logo} alt="Wreckey's" title="Wreckey's" />
    </header>
  );
}

export default Header;
