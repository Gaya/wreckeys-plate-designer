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
    saveAs(blob, 'wreckeys-plate-drawing.dxf');
  }, [state.parts, state.plate]);

  return (
    <>
      <h2>Save Plate</h2>
      <fieldset className="Download">
        <button type="button" onClick={convertToDXF}>
          Create DXF File
        </button>
      </fieldset>
    </>
  );
}

export default DXF;
