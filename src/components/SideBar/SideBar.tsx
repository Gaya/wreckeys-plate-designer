import { useCallback } from 'react';

import { useAppContext } from '../App/AppContextProvider';
import Select from '../Select/Select';

import './SideBar.scss';
import DXF from './DXF';

function SideBar() {
  const { state, actions } = useAppContext();

  const { type, width, height } = state.plate;

  const onUpdateType = useCallback((newType: typeof type) => {
    actions.updatePlate({ type: newType });
  }, [actions]);

  const onUpdateHeight = useCallback((newHeight: typeof height) => {
    actions.updatePlate({ height: parseInt(newHeight.toString(), 10) });
  }, [actions]);

  return (
    <aside>
      <h2>Plate Settings</h2>
      <fieldset>
        <label htmlFor="type">Plate Size</label>
        <Select
          name="type"
          value={type}
          options={[{
            name: '19" rack',
            value: '19inch',
          }, {
            name: 'Eurorack',
            value: 'eurorack',
          }, {
            name: 'Custom Size',
            value: 'custom',
          }]}
          onUpdate={onUpdateType}
        />
      </fieldset>
      {(type === 'custom' || type === 'eurorack') && (
        <fieldset>
          <label htmlFor="width">Width</label>
          <input type="number" defaultValue={width} />
        </fieldset>
      )}
      {type === '19inch' && (
        <fieldset>
          <label htmlFor="height">Height</label>
          <Select
            name="height"
            value={height}
            options={[{
              name: '1U',
              value: 1,
            }, {
              name: '2U',
              value: 2,
            }, {
              name: '3U',
              value: 3,
            }, {
              name: '4U',
              value: 4,
            }, {
              name: '5U',
              value: 5,
            }]}
            onUpdate={onUpdateHeight}
          />
        </fieldset>
      )}
      <DXF />
    </aside>
  );
}

export default SideBar;
