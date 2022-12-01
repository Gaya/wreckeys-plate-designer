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
          <input
            id="diameter"
            type="number"
            value={part.options.diameter}
            onChange={(e) => {
              const diameter = parseFloat(e.target.value)
              actions.updatePartOptions(part.id, { diameter });
            }}
          />
        </fieldset>
      )}
      {'guideDiameter' in part.options && (
        <fieldset>
          <label htmlFor="guideDiameter">Mechanism diameter:</label>
          <input
            id="guideDiameter"
            type="number"
            value={part.options.guideDiameter}
            onChange={(e) => {
              const guideDiameter = parseFloat(e.target.value)
              actions.updatePartOptions(part.id, { guideDiameter });
            }}
          />
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
    </div>
  );
}

export default PartOptions;
