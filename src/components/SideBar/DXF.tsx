import { useCallback } from 'react';
import { saveAs } from 'file-saver';

import { plateToPart } from '../../parts/plate';
import toDXF from '../../core/toDXF';

import { useAppContext } from '../App/AppContextProvider';

function DXF() {
  const { state } = useAppContext();

  const convertToDXF = useCallback(() => {
    const platePart = plateToPart(state.plate);
    const dxfString = toDXF([platePart, ...state.parts]);

    const blob = new Blob([dxfString], { type: "text/plain;charset=utf-8" });
    saveAs(blob, 'drawing.dxf');
  }, [state.plate]);

  return (
    <>
      <h2>Download</h2>
      <fieldset>
        <button type="button" onClick={convertToDXF}>
          Create DXF
        </button>
      </fieldset>
    </>
  );
}

export default DXF;
