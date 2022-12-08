import { useCallback, useState } from 'react';

import Select from '../Select/Select';

import { useAppContext } from '../App/AppContextProvider';

function Plate() {
  const { state, actions } = useAppContext();
  const [showOptions, setShowOptions] = useState(false);

  const {
    type,
    width,
    height,
    radius,
  } = state.plate;
  const { showGuides } = state.options;

  const onUpdateType = useCallback((newType: typeof type) => {
    let w = 0;
    let h = 0;
    let r = 0;

    switch (newType) {
      case 'eurorack':
        w = 18;
        r = 1;
        break;
      case 'custom':
        w = 120;
        h = 80;
        r = 0;
        break;
      case '19inch':
      default:
        w = 19;
        h = 3;
        r = 3;
        break;
    }

    actions.updatePlate({
      type: newType,
      height: h,
      width: w,
      radius: r,
    });
  }, [actions]);

  const onUpdateWidth = useCallback((newWidth: typeof width) => {
    actions.updatePlate({ width: parseInt(newWidth.toString(), 10) });
  }, [actions]);

  const onUpdateHeight = useCallback((newHeight: typeof height) => {
    actions.updatePlate({ height: parseInt(newHeight.toString(), 10) });
  }, [actions]);

  const onUpdateRadius = useCallback((newRadius: number) => {
    actions.updatePlate({ radius: parseInt(newRadius.toString(), 10) });
  }, [actions]);

  return (
    <>
      <h2>Plate Settings</h2>
      <fieldset>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
          }, {
            name: 'Custom size',
            value: 'custom',
          }]}
          onUpdate={onUpdateType}
        />
      </fieldset>
      {showOptions && (
        <section className="options">
          {(type === 'custom' || type === 'eurorack') && (
            <fieldset>
              <label htmlFor="width">Width</label>
              <div className="input">
                <input
                  id="width"
                  name="width"
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
          {(type === 'custom') && (
            <fieldset>
              <label htmlFor="height">Height</label>
              <div className="input">
                <input
                  type="number"
                  value={height}
                  onChange={(e) => onUpdateHeight(parseFloat(e.target.value))}
                  min={1}
                />
                <span>mm</span>
              </div>
            </fieldset>
          )}
          {(type === 'custom') && (
            <fieldset>
              <label htmlFor="radius">Rounded corners</label>
              <div className="input">
                <input
                  type="number"
                  value={radius || 0}
                  onChange={(e) => onUpdateRadius(parseFloat(e.target.value))}
                  min={0}
                />
                <span>mm</span>
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
        </section>
      )}
      <button
        className="options-button"
        type="button"
        onClick={() => setShowOptions((current) => !current)}
      >
        {showOptions ? '- hide options' : '+ show options'}
      </button>
    </>
  );
}

export default Plate;
