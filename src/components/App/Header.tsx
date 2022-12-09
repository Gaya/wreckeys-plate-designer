import { ChangeEvent, useCallback, useRef } from 'react';
import { saveAs } from 'file-saver';

import { plateToPart } from '../../parts/plate';
import toDXF from '../../core/toDXF';
import { parseSaveFile, toSaveFormat } from '../../core/saveLoad';

import { useAppContext } from './AppContextProvider';

import logo from './wreckeys-logo.svg';

import './Header.scss';

function saveFile(name: string, fileContents: string) {
  const blob = new Blob([fileContents], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, name);
}

function Header() {
  const { state, actions } = useAppContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onLoadFile = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (fileInputRef.current) {
      const file = fileInputRef.current.files ? fileInputRef.current.files[0] : null;

      if (file) {
        const fileReader = new FileReader();
        fileReader.readAsText(file);
        fileReader.onload = () => {
          if (fileReader.result) {
            const newState = parseSaveFile(fileReader.result.toString());
            actions.updatePlate(newState.plate);
            actions.setParts(newState.parts);
          }
        };
        fileReader.onerror = () => {
          // eslint-disable-next-line no-alert
          window.alert(`Something went wrong: ${fileReader.error?.message}`);
        };
      }
    }
  }, [actions]);

  const convertToSave = useCallback(() => {
    const saveString = toSaveFormat(state.plate, state.parts);

    saveFile('plate.wrk', saveString);
  }, [state.parts, state.plate]);

  const loadSave = useCallback(() => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }, []);

  const convertToDXF = useCallback(() => {
    const platePart = plateToPart(state.plate);
    const dxfString = toDXF([platePart, ...state.parts]);

    saveFile('wreckeys-plate-drawing.dxf', dxfString);
  }, [state.parts, state.plate]);

  return (
    <header>
      <menu>
        <ul>
          <li>
            <button type="button" onClick={convertToSave}>Save Design</button>
          </li>
          <li>
            <button type="button" onClick={loadSave}>Load Design</button>
            <input type="file" onChange={onLoadFile} accept=".wrk" ref={fileInputRef} />
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
