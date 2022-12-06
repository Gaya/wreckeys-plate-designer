import { useAppContext } from '../../App/AppContextProvider';

interface PartOptionsProps {
  part: PartWithOptions;
}

function PartOptions({ part }: PartOptionsProps) {
  const { actions } = useAppContext();

  return (
    <div className="PartOptions">
      {'diameter' in part.options && (
        <fieldset>
          <label htmlFor="diameter">Diameter (hole):</label>
          <div className="input">
            <input
              id="diameter"
              type="number"
              min={0}
              value={part.options.diameter}
              onChange={(e) => {
                const diameter = parseFloat(e.target.value)
                actions.updatePartOptions(part.id, { diameter });
              }}
            />
            <span>mm</span>
          </div>
        </fieldset>
      )}
      {'guideDiameter' in part.options && (
        <fieldset>
          <label htmlFor="guideDiameter">Mechanism diameter:</label>
          <div className="input">
            <input
              id="guideDiameter"
              type="number"
              min={0}
              value={part.options.guideDiameter}
              onChange={(e) => {
                const guideDiameter = parseFloat(e.target.value)
                actions.updatePartOptions(part.id, { guideDiameter });
              }}
            />
            <span>mm</span>
          </div>
        </fieldset>
      )}
      {part.type === 'slider' && (
        <fieldset>
          <label htmlFor="size">Slider size:</label>
          <select
            id="size"
            value={part.options.length}
            onChange={(e) => {
              const length = parseFloat(e.target.value)
              actions.updatePartOptions(part.id, { length });
            }}
          >
            <option value={45}>45mm</option>
            <option value={60}>60mm</option>
            <option value={75}>75mm</option>
            <option value={88}>88mm</option>
          </select>
          <div className="info">Track size: {part.options.length - 4}mm</div>
        </fieldset>
      )}
      {'width' in part.options && (
        <fieldset>
          <label htmlFor="width">Width:</label>
          <div className="input">
            <input
              id="width"
              type="number"
              min={0}
              value={part.options.width}
              onChange={(e) => {
                const width = parseFloat(e.target.value)
                actions.updatePartOptions(part.id, { width });
              }}
            />
            <span>mm</span>
          </div>
        </fieldset>
      )}
      {'height' in part.options && (
        <fieldset>
          <label htmlFor="height">Height:</label>
          <div className="input">
            <input
              id="height"
              type="number"
              min={0}
              value={part.options.height}
              onChange={(e) => {
                const height = parseFloat(e.target.value)
                actions.updatePartOptions(part.id, { height });
              }}
            />
            <span>mm</span>
          </div>
        </fieldset>
      )}
      {'radius' in part.options && (
        <fieldset>
          <label htmlFor="radius">Rounded Corners:</label>
          <div className="input">
            <input
              id="radius"
              type="number"
              value={part.options.radius}
              min={0}
              onChange={(e) => {
                const radius = parseFloat(e.target.value)
                actions.updatePartOptions(part.id, { radius });
              }}
            />
            <span>mm</span>
          </div>
        </fieldset>
      )}
      {'x' in part.options && (
        <fieldset>
          <label htmlFor="x">Length X-Axis:</label>
          <div className="input">
            <input
              id="x"
              type="number"
              min={0}
              value={part.options.x}
              onChange={(e) => {
                const x = parseFloat(e.target.value)
                actions.updatePartOptions(part.id, { x });
              }}
            />
            <span>mm</span>
          </div>
        </fieldset>
      )}
      {'y' in part.options && (
        <fieldset>
          <label htmlFor="y">Length Y-Axis:</label>
          <div className="input">
            <input
              id="y"
              type="number"
              min={0}
              value={part.options.y}
              onChange={(e) => {
                const y = parseFloat(e.target.value)
                actions.updatePartOptions(part.id, { y });
              }}
            />
            <span>mm</span>
          </div>
        </fieldset>
      )}
    </div>
  );
}

export default PartOptions;
