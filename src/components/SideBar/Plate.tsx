import { useCallback } from 'react';

import Select from '../Select/Select';

import { useAppContext } from '../App/AppContextProvider';

function Plate() {
  const { state, actions } = useAppContext();

  const { type, width, height } = state.plate;
  const { showGuides } = state.options;

  const onUpdateType = useCallback((newType: typeof type) => {
    actions.updatePlate({ type: newType });
  }, [actions]);

  const onUpdateWidth = useCallback((newWidth: typeof width) => {
    actions.updatePlate({ width: parseInt(newWidth.toString(), 10) });
  }, [actions]);

  const onUpdateHeight = useCallback((newHeight: typeof height) => {
    actions.updatePlate({ height: parseInt(newHeight.toString(), 10) });
  }, [actions]);

  return (
    <>
      <h2>Plate Settings</h2>
      <fieldset>
        <label htmlFor="type">Type of Plate</label>
        <Select
          name="type"
          value={type}
          options={[{
            name: '19" rack',
            value: '19inch',
          }, {
            name: 'Eurorack',
            value: 'eurorack',
          }]}
          onUpdate={onUpdateType}
        />
      </fieldset>
      {(type === 'custom' || type === 'eurorack') && (
        <fieldset>
          <label htmlFor="width">Width</label>
          <div className="input">
            <input
              type="number"
              value={width}
              onChange={(e) => onUpdateWidth(parseFloat(e.target.value))}
              min={1}
            />
            <span>
              {type === 'eurorack' ? 'HP' : 'mm'}
            </span>
          </div>
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
      <fieldset className="inline">
        <input
          id="showSGuides"
          type="checkbox"
          checked={showGuides}
          onChange={() => actions.setGuides(!showGuides)}
        />
        <label htmlFor="showSGuides">Show Guides</label>
      </fieldset>
    </>
  )
}

export default Plate;
